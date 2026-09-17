import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const localesDir = path.join(root, "locales");
const templatesDir = path.join(root, "src", "templates");
const partialsDir = path.join(root, "src", "partials");
const siteDir = path.join(root, "site");

const EXTERNAL = {
  appStoreUrl: "https://apps.apple.com/app/push-up-counter-pushanova/id6451240468",
  termsUrl: "https://www.apple.com/legal/internet-services/itunes/dev/stdeula/",
  email: "info@genebogdanovich.com",
  mailto: "mailto:info@genebogdanovich.com",
  refundUrl: "https://reportaproblem.apple.com",
};

const DEFAULT_LOCALE = "en";
const LOCALIZED_PAGES = ["home", "features", "support"];
const SHARED_PAGES = ["privacy", "404"];

function isLeaf(value) {
  return (
    Boolean(value) &&
    typeof value === "object" &&
    !Array.isArray(value) &&
    typeof value.message === "string" &&
    typeof value.description === "string"
  );
}

function deepMerge(base, override) {
  if (override === undefined) {
    return base;
  }
  if (base === undefined) {
    return override;
  }
  if (isLeaf(base) || isLeaf(override) || Array.isArray(base) || Array.isArray(override)) {
    return override;
  }
  if (
    typeof base === "object" &&
    base !== null &&
    typeof override === "object" &&
    override !== null
  ) {
    const out = {};
    const keys = new Set([...Object.keys(base), ...Object.keys(override)]);
    for (const key of keys) {
      out[key] = deepMerge(base[key], override[key]);
    }
    return out;
  }
  return override;
}

function resolveMessages(node) {
  if (Array.isArray(node)) {
    return node.map(resolveMessages);
  }
  if (isLeaf(node)) {
    return node.message;
  }
  if (node && typeof node === "object") {
    const out = {};
    for (const [key, value] of Object.entries(node)) {
      out[key] = resolveMessages(value);
    }
    return out;
  }
  return node;
}

function assertDescriptions(node, path = "") {
  if (Array.isArray(node)) {
    node.forEach((item, index) => assertDescriptions(item, `${path}[${index}]`));
    return;
  }
  if (!node || typeof node !== "object") {
    return;
  }
  if (isLeaf(node)) {
    if (!node.description.trim()) {
      throw new Error(`Empty translator description at ${path || "root"}`);
    }
    return;
  }
  if (typeof node.message === "string" || typeof node.description === "string") {
    throw new Error(`Locale leaf at ${path || "root"} must have string message and description`);
  }
  for (const [key, value] of Object.entries(node)) {
    assertDescriptions(value, path ? `${path}.${key}` : key);
  }
}

function outputFile(code, page) {
  const prefix = code === DEFAULT_LOCALE ? "" : `${code}/`;
  switch (page) {
    case "home":
      return `${prefix}index.html`;
    case "features":
      return `${prefix}features/index.html`;
    case "support":
      return `${prefix}support/index.html`;
    case "privacy":
      return "privacy/index.html";
    case "404":
      return "404.html";
    default:
      throw new Error(`Unknown page: ${page}`);
  }
}

function posixHref(fromFile, toFile) {
  const fromDir = path.posix.dirname(fromFile);
  let rel = path.posix.relative(fromDir === "." ? "" : fromDir, toFile);
  if (!rel) {
    rel = path.posix.basename(toFile);
  }
  return rel.split(path.sep).join("/");
}

function pageUrls(code, page) {
  const from = outputFile(code, page);
  return {
    home: posixHref(from, outputFile(code, "home")),
    features: posixHref(from, outputFile(code, "features")),
    support: posixHref(from, outputFile(code, "support")),
    privacy: posixHref(from, outputFile(DEFAULT_LOCALE, "privacy")),
    notFound: posixHref(from, outputFile(DEFAULT_LOCALE, "404")),
  };
}

function languageEntries(codes, names, code, page) {
  const from = outputFile(code, page);
  const targetPage = SHARED_PAGES.includes(page) ? page : page;
  return codes.map((other) => {
    const toCode = SHARED_PAGES.includes(targetPage) ? DEFAULT_LOCALE : other;
    const toPage = SHARED_PAGES.includes(targetPage) ? targetPage : page;
    return {
      code: other,
      name: names[other],
      url: posixHref(from, outputFile(toCode, toPage)),
      current: other === code,
    };
  });
}

function tokenize(template) {
  const tokens = [];
  const re = /\{\{(>|#|\/)?\s*([^}]+?)\s*\}\}/g;
  let last = 0;
  let match;
  while ((match = re.exec(template))) {
    if (match.index > last) {
      tokens.push({ type: "text", value: template.slice(last, match.index) });
    }
    const sigil = match[1] || "";
    const inner = match[2].trim();
    if (inner === "else") {
      tokens.push({ type: "else" });
    } else if (sigil === ">") {
      tokens.push({ type: "partial", name: inner });
    } else if (sigil === "#") {
      const [kind, ...rest] = inner.split(/\s+/);
      if (kind === "each" || kind === "if") {
        tokens.push({ type: "open", kind, path: rest.join(" ").trim() });
      } else {
        throw new Error(`Unknown block helper: ${kind}`);
      }
    } else if (sigil === "/") {
      tokens.push({ type: "close", kind: inner.split(/\s+/)[0] });
    } else {
      tokens.push({ type: "var", path: inner });
    }
    last = match.index + match[0].length;
  }
  if (last < template.length) {
    tokens.push({ type: "text", value: template.slice(last) });
  }
  return tokens;
}

function nest(tokens) {
  const root = { type: "open", kind: "root", path: "", children: [], elseChildren: null, inElse: false };
  const stack = [root];
  for (const token of tokens) {
    const current = stack[stack.length - 1];
    if (token.type === "open") {
      const node = { ...token, children: [], elseChildren: null, inElse: false };
      current.children.push(node);
      stack.push(node);
    } else if (token.type === "else") {
      if (current.kind !== "if") {
        throw new Error("{{else}} is only valid inside {{#if}}");
      }
      current.elseChildren = [];
      current.inElse = true;
    } else if (token.type === "close") {
      if (current.kind !== token.kind && current.kind !== "root") {
        throw new Error(`Unexpected {{/${token.kind}}} (open {{#${current.kind}}})`);
      }
      stack.pop();
    } else {
      (current.inElse ? current.elseChildren : current.children).push(token);
    }
  }
  if (stack.length !== 1) {
    throw new Error("Unclosed template block");
  }
  return root;
}

function lookup(contexts, path) {
  if (path === "this" || path === ".") {
    const context = contexts[0];
    if (context && typeof context === "object" && "this" in context) {
      return context.this;
    }
    return context;
  }
  const parts = path.split(".");
  for (const context of contexts) {
    let current = context;
    let found = true;
    for (const part of parts) {
      if (current == null || typeof current !== "object" || !(part in current)) {
        found = false;
        break;
      }
      current = current[part];
    }
    if (found) {
      return current;
    }
  }
  return undefined;
}

function renderTree(node, contexts, partials) {
  if (node.type === "text") {
    return node.value;
  }
  if (node.type === "var") {
    const value = lookup(contexts, node.path);
    if (value === undefined) {
      throw new Error(`Missing template key: ${node.path}`);
    }
    if (value == null) {
      return "";
    }
    return String(value);
  }
  if (node.type === "partial") {
    const source = partials[node.name];
    if (source == null) {
      throw new Error(`Missing partial: ${node.name}`);
    }
    return renderTemplate(source, contexts, partials);
  }
  if (node.kind === "root") {
    return node.children.map((child) => renderTree(child, contexts, partials)).join("");
  }
  if (node.kind === "each") {
    const items = lookup(contexts, node.path);
    if (!Array.isArray(items)) {
      throw new Error(`{{#each ${node.path}}} expected an array`);
    }
    return items
      .map((item) => {
        const childContext =
          item && typeof item === "object" && !Array.isArray(item)
            ? { ...item, this: item }
            : { this: item };
        return node.children.map((child) => renderTree(child, [childContext, ...contexts], partials)).join("");
      })
      .join("");
  }
  if (node.kind === "if") {
    const value = lookup(contexts, node.path);
    const truthy = Array.isArray(value) ? value.length > 0 : Boolean(value);
    const branch = truthy ? node.children : node.elseChildren || [];
    return branch.map((child) => renderTree(child, contexts, partials)).join("");
  }
  throw new Error(`Unknown node kind: ${node.kind}`);
}

function renderTemplate(template, contexts, partials) {
  return renderTree(nest(tokenize(template)), contexts, partials);
}

function applyPlaceholders(html, urls) {
  const values = {
    ...EXTERNAL,
    homeUrl: urls.home,
    featuresUrl: urls.features,
    supportUrl: urls.support,
    privacyUrl: urls.privacy,
    notFoundUrl: urls.notFound,
  };
  return html.replace(/\{([a-zA-Z]+)\}/g, (full, name) => (Object.hasOwn(values, name) ? values[name] : full));
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function emptySiteDir() {
  fs.rmSync(siteDir, { recursive: true, force: true });
  fs.mkdirSync(siteDir, { recursive: true });
}

function writeSiteFile(relativePath, contents) {
  const fullPath = path.join(siteDir, relativePath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, contents);
}

function loadLocales() {
  const files = fs.readdirSync(localesDir).filter((name) => name.endsWith(".json")).sort();
  if (!files.includes(`${DEFAULT_LOCALE}.json`)) {
    throw new Error("Missing locales/en.json");
  }
  const raw = {};
  for (const file of files) {
    const code = path.basename(file, ".json");
    const data = readJson(path.join(localesDir, file));
    assertDescriptions(data);
    raw[code] = data;
  }
  const english = raw[DEFAULT_LOCALE];
  const resolved = {};
  const names = {};
  for (const code of Object.keys(raw)) {
    const merged = code === DEFAULT_LOCALE ? english : deepMerge(english, raw[code]);
    const messages = resolveMessages(merged);
    resolved[code] = messages;
    names[code] = messages.meta.name;
  }
  return { codes: Object.keys(raw), resolved, names };
}

function pageFlags(page) {
  return {
    isHome: page === "home",
    isFeatures: page === "features",
    isSupport: page === "support",
    isPrivacy: page === "privacy",
    isNotFound: page === "404",
  };
}

function renderPage({ page, code, templates, partials, resolved, codes, names }) {
  const locale = resolved[code];
  const urls = pageUrls(code, page);
  const data = {
    ...locale,
    ...pageFlags(page),
    urls,
    languages: languageEntries(codes, names, code, page),
  };
  const html = renderTemplate(templates[page], [data], partials);
  return applyPlaceholders(html, urls);
}

function main() {
  const { codes, resolved, names } = loadLocales();
  const partials = {
    header: fs.readFileSync(path.join(partialsDir, "header.html"), "utf8"),
    footer: fs.readFileSync(path.join(partialsDir, "footer.html"), "utf8"),
  };
  const templates = {
    home: fs.readFileSync(path.join(templatesDir, "home.html"), "utf8"),
    features: fs.readFileSync(path.join(templatesDir, "features.html"), "utf8"),
    support: fs.readFileSync(path.join(templatesDir, "support.html"), "utf8"),
    privacy: fs.readFileSync(path.join(templatesDir, "privacy.html"), "utf8"),
    404: fs.readFileSync(path.join(templatesDir, "404.html"), "utf8"),
  };

  emptySiteDir();

  for (const code of codes) {
    for (const page of LOCALIZED_PAGES) {
      writeSiteFile(
        outputFile(code, page),
        renderPage({ page, code, templates, partials, resolved, codes, names })
      );
    }
  }

  writeSiteFile(
    outputFile(DEFAULT_LOCALE, "privacy"),
    renderPage({
      page: "privacy",
      code: DEFAULT_LOCALE,
      templates,
      partials,
      resolved,
      codes,
      names,
    })
  );
  writeSiteFile(
    outputFile(DEFAULT_LOCALE, "404"),
    renderPage({
      page: "404",
      code: DEFAULT_LOCALE,
      templates,
      partials,
      resolved,
      codes,
      names,
    })
  );
  console.log("Built site/");
}

main();
