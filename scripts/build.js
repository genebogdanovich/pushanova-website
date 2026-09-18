import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const localesDir = path.join(root, "locales");
const templatesDir = path.join(root, "src", "templates");
const partialsDir = path.join(root, "src", "partials");
const imagesDir = path.join(root, "src", "images");
const stylesDir = path.join(root, "src", "styles");
const staticDir = path.join(root, "src", "static");
const siteDir = path.join(root, "site");
const config = JSON.parse(fs.readFileSync(path.join(root, "site.config.json"), "utf8"));
const siteUrl = String(config.siteUrl || "").replace(/\/$/, "");
const APP_STORE_BADGE_DIR = "Download-on-the-App-Store";
const APP_STORE_BADGE_FILES = {
  en: {
    light: "Download_on_the_App_Store_Badge_US-UK_RGB_blk_092917.svg",
    dark: "Download_on_the_App_Store_Badge_US-UK_RGB_wht_092917.svg",
  },
  ru: {
    light: "Download_on_the_App_Store_Badge_RU_RGB_blk_100317.svg",
    dark: "Download_on_the_App_Store_Badge_RU_RGB_wht_100317.svg",
  },
};
const SCREENSHOTS_DIR = "screenshots";
const LOGO_FILE = "logo.svg";
const HOME_HERO_FILE = "homepage-hero.webp";

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
    typeof value.message === "string"
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

function assertEnglishDescriptions(node, path = "") {
  if (Array.isArray(node)) {
    node.forEach((item, index) => assertEnglishDescriptions(item, `${path}[${index}]`));
    return;
  }
  if (!node || typeof node !== "object") {
    return;
  }
  if (isLeaf(node)) {
    if (typeof node.description !== "string" || !node.description.trim()) {
      throw new Error(`English locale leaf at ${path || "root"} must have a translator description`);
    }
    return;
  }
  for (const [key, value] of Object.entries(node)) {
    assertEnglishDescriptions(value, path ? `${path}.${key}` : key);
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

function publicPath(code, page) {
  const prefix = code === DEFAULT_LOCALE ? "" : `/${code}`;
  switch (page) {
    case "home":
      return prefix ? `${prefix}/` : "/";
    case "features":
      return `${prefix}/features/`;
    case "support":
      return `${prefix}/support/`;
    case "privacy":
      return "/privacy/";
    case "404":
      return "/404.html";
    default:
      throw new Error(`Unknown page: ${page}`);
  }
}

function absoluteUrl(pathname) {
  return `${siteUrl}${pathname}`;
}

function posixHref(fromFile, toFile) {
  const fromDir = path.posix.dirname(fromFile);
  let rel = path.posix.relative(fromDir === "." ? "" : fromDir, toFile);
  if (!rel) {
    rel = path.posix.basename(toFile);
  }
  return rel.split(path.sep).join("/");
}

function svgSize(filePath) {
  const svg = fs.readFileSync(filePath, "utf8");
  const tag = svg.match(/<svg\b[^>]*>/)?.[0] || "";
  const width = tag.match(/\bwidth="([\d.]+)(?:px)?"/)?.[1];
  const height = tag.match(/\bheight="([\d.]+)(?:px)?"/)?.[1];
  const box = tag.match(/\bviewBox="([\d.]+)\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)"/);
  return {
    width: String(Math.round(Number(width || box?.[3] || 120))),
    height: String(Math.round(Number(height || box?.[4] || 40))),
  };
}

function readU24LE(buffer, offset) {
  return buffer[offset] | (buffer[offset + 1] << 8) | (buffer[offset + 2] << 16);
}

function webpSize(buffer) {
  if (buffer.toString("ascii", 0, 4) !== "RIFF" || buffer.toString("ascii", 8, 12) !== "WEBP") {
    return null;
  }
  let offset = 12;
  while (offset + 8 <= buffer.length) {
    const fourcc = buffer.toString("ascii", offset, offset + 4);
    const chunkSize = buffer.readUInt32LE(offset + 4);
    const data = offset + 8;
    if (fourcc === "VP8X" && data + 10 <= buffer.length) {
      return {
        width: readU24LE(buffer, data + 4) + 1,
        height: readU24LE(buffer, data + 7) + 1,
      };
    }
    if (fourcc === "VP8L" && data + 5 <= buffer.length && buffer[data] === 0x2f) {
      const bits =
        buffer[data + 1] | (buffer[data + 2] << 8) | (buffer[data + 3] << 16) | (buffer[data + 4] << 24);
      return {
        width: (bits & 0x3fff) + 1,
        height: ((bits >> 14) & 0x3fff) + 1,
      };
    }
    if (fourcc === "VP8 " && data + 10 <= buffer.length) {
      const sig = data + 3;
      if (buffer[sig] === 0x9d && buffer[sig + 1] === 0x01 && buffer[sig + 2] === 0x2a) {
        return {
          width: buffer.readUInt16LE(sig + 3) & 0x3fff,
          height: buffer.readUInt16LE(sig + 5) & 0x3fff,
        };
      }
    }
    offset = data + chunkSize + (chunkSize % 2);
  }
  return null;
}

function pngSize(buffer) {
  if (buffer.length < 24 || buffer.toString("ascii", 1, 4) !== "PNG") {
    return null;
  }
  return {
    width: buffer.readUInt32BE(16),
    height: buffer.readUInt32BE(20),
  };
}

function rasterSize(filePath) {
  const buffer = fs.readFileSync(filePath);
  const size = webpSize(buffer) || pngSize(buffer);
  if (!size) {
    throw new Error(`Could not read image size: ${filePath}`);
  }
  return {
    width: String(size.width),
    height: String(size.height),
  };
}

function loadAppStoreBadgeAsset(code, scheme) {
  const names = APP_STORE_BADGE_FILES[code] || APP_STORE_BADGE_FILES[DEFAULT_LOCALE];
  const fileName = names[scheme] || APP_STORE_BADGE_FILES[DEFAULT_LOCALE][scheme];
  const filePath = path.join(imagesDir, APP_STORE_BADGE_DIR, fileName);
  if (!fs.existsSync(filePath)) {
    if (code === DEFAULT_LOCALE) {
      throw new Error(`Missing App Store badge: ${fileName}`);
    }
    return loadAppStoreBadgeAsset(DEFAULT_LOCALE, scheme);
  }
  return {
    sitePath: `images/${APP_STORE_BADGE_DIR}/${fileName}`,
    ...svgSize(filePath),
  };
}

function loadAppStoreBadge(code) {
  const light = loadAppStoreBadgeAsset(code, "light");
  const dark = loadAppStoreBadgeAsset(code, "dark");
  return { light, dark };
}

function loadLogo(fromFile) {
  const filePath = path.join(imagesDir, LOGO_FILE);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Missing src/images/${LOGO_FILE}`);
  }
  return {
    src: posixHref(fromFile, `images/${LOGO_FILE}`),
    ...svgSize(filePath),
  };
}

function loadScreenshot(code, fileName) {
  const localizedPath = path.join(imagesDir, SCREENSHOTS_DIR, code, fileName);
  const fallbackPath = path.join(imagesDir, SCREENSHOTS_DIR, DEFAULT_LOCALE, fileName);
  const filePath = fs.existsSync(localizedPath) ? localizedPath : fallbackPath;
  if (!fs.existsSync(filePath)) {
    return null;
  }
  const used = fs.existsSync(localizedPath) ? code : DEFAULT_LOCALE;
  return {
    sitePath: `images/${SCREENSHOTS_DIR}/${used}/${fileName}`,
    ...rasterSize(filePath),
  };
}

function homeHero(code, page, locale) {
  const shot = loadScreenshot(code, HOME_HERO_FILE);
  if (!shot) {
    return undefined;
  }
  const alt = locale.home?.hero?.alt;
  if (!alt) {
    throw new Error("Missing home.hero.alt");
  }
  return {
    src: posixHref(outputFile(code, page), shot.sitePath),
    alt,
    width: shot.width,
    height: shot.height,
  };
}

function appStoreBadgeAlt(locale, page) {
  if (page === "features" && locale.features?.download) {
    return locale.features.download;
  }
  if (locale.home?.download) {
    return locale.home.download;
  }
  throw new Error("Missing App Store badge alt text");
}

function pageUrls(code, page) {
  if (page === "404") {
    return {
      home: publicPath(code, "home"),
      features: publicPath(code, "features"),
      support: publicPath(code, "support"),
      privacy: publicPath(DEFAULT_LOCALE, "privacy"),
      notFound: publicPath(DEFAULT_LOCALE, "404"),
    };
  }
  const from = outputFile(code, page);
  return {
    home: posixHref(from, outputFile(code, "home")),
    features: posixHref(from, outputFile(code, "features")),
    support: posixHref(from, outputFile(code, "support")),
    privacy: posixHref(from, outputFile(DEFAULT_LOCALE, "privacy")),
    notFound: posixHref(from, outputFile(DEFAULT_LOCALE, "404")),
  };
}

function orderedCodes(codes) {
  const rest = codes.filter((code) => code !== DEFAULT_LOCALE).sort();
  return codes.includes(DEFAULT_LOCALE) ? [DEFAULT_LOCALE, ...rest] : rest;
}

function languageEntries(codes, names, code, page) {
  const from = outputFile(code, page);
  return codes.map((other) => {
    let toCode = other;
    let toPage = page;
    if (page === "privacy") {
      toCode = DEFAULT_LOCALE;
      toPage = "privacy";
    } else if (page === "404") {
      toCode = other;
      toPage = "home";
    }
    return {
      code: other,
      name: names[other],
      url: page === "404" ? publicPath(toCode, toPage) : posixHref(from, outputFile(toCode, toPage)),
      current: other === code,
    };
  });
}

function hreflangsFor(page, codes) {
  if (SHARED_PAGES.includes(page)) {
    return [{ code: DEFAULT_LOCALE, href: absoluteUrl(publicPath(DEFAULT_LOCALE, page)) }];
  }
  return [
    ...codes.map((code) => ({
      code,
      href: absoluteUrl(publicPath(code, page)),
    })),
    { code: "x-default", href: absoluteUrl(publicPath(DEFAULT_LOCALE, page)) },
  ];
}

function pageSeo(code, page, codes, ogLocales) {
  const canonicalCode = SHARED_PAGES.includes(page) ? DEFAULT_LOCALE : code;
  const ogLocale = ogLocales[code] || ogLocales[DEFAULT_LOCALE] || "en_US";
  const ogLocaleAlternates = SHARED_PAGES.includes(page)
    ? []
    : codes.filter((item) => item !== code).map((item) => ogLocales[item]).filter(Boolean);
  return {
    canonical: absoluteUrl(publicPath(canonicalCode, page)),
    hreflangs: hreflangsFor(page, codes),
    ogLocale,
    ogLocaleAlternates,
  };
}

function xmlEscape(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function sitemapXml(codes) {
  const entries = [];
  for (const page of LOCALIZED_PAGES) {
    for (const code of codes) {
      entries.push({
        loc: absoluteUrl(publicPath(code, page)),
        hreflangs: hreflangsFor(page, codes),
      });
    }
  }
  entries.push({
    loc: absoluteUrl(publicPath(DEFAULT_LOCALE, "privacy")),
    hreflangs: hreflangsFor("privacy", codes),
  });
  const body = entries
    .map((entry) => {
      const links = entry.hreflangs
        .map(
          (item) =>
            `    <xhtml:link rel="alternate" hreflang="${xmlEscape(item.code)}" href="${xmlEscape(item.href)}"/>`
        )
        .join("\n");
      return `  <url>\n    <loc>${xmlEscape(entry.loc)}</loc>\n${links}\n  </url>`;
    })
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${body}
</urlset>
`;
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

function copyImages() {
  if (!fs.existsSync(imagesDir)) {
    return;
  }
  fs.cpSync(imagesDir, path.join(siteDir, "images"), {
    recursive: true,
    filter: (source) => path.basename(source) !== ".gitkeep",
  });
}

function copyStyles() {
  if (!fs.existsSync(stylesDir)) {
    throw new Error("Missing src/styles");
  }
  fs.cpSync(stylesDir, path.join(siteDir, "styles"), { recursive: true });
}

function copyStatic() {
  if (!fs.existsSync(staticDir)) {
    return;
  }
  for (const name of fs.readdirSync(staticDir)) {
    if (name.startsWith(".")) {
      continue;
    }
    fs.cpSync(path.join(staticDir, name), path.join(siteDir, name), { recursive: true });
  }
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
    if (code === DEFAULT_LOCALE) {
      assertEnglishDescriptions(data);
    }
    raw[code] = data;
  }
  const english = raw[DEFAULT_LOCALE];
  const resolved = {};
  const names = {};
  const ogLocales = {};
  for (const code of Object.keys(raw)) {
    const merged = code === DEFAULT_LOCALE ? english : deepMerge(english, raw[code]);
    const messages = resolveMessages(merged);
    resolved[code] = messages;
    names[code] = messages.meta.name;
    ogLocales[code] = messages.meta.ogLocale || (code === DEFAULT_LOCALE ? "en_US" : "");
  }
  return { codes: orderedCodes(Object.keys(raw)), resolved, names, ogLocales };
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

function renderPage({ page, code, templates, partials, resolved, codes, names, ogLocales }) {
  const locale = resolved[code];
  const urls = pageUrls(code, page);
  const badge = loadAppStoreBadge(code);
  const data = {
    ...locale,
    ...pageFlags(page),
    urls,
    languages: languageEntries(codes, names, code, page),
    seo: pageSeo(code, page, codes, ogLocales),
    stylesheet: posixHref(outputFile(code, page), "styles/site.css"),
    logo: loadLogo(outputFile(code, page)),
    appStoreBadge: {
      src: posixHref(outputFile(code, page), badge.light.sitePath),
      darkSrc: posixHref(outputFile(code, page), badge.dark.sitePath),
      alt: appStoreBadgeAlt(locale, page),
      width: badge.light.width,
      height: badge.light.height,
    },
  };
  if (page === "home") {
    data.home = {
      ...locale.home,
      hero: homeHero(code, page, locale),
    };
  }
  const html = renderTemplate(templates[page], [data], partials);
  return applyPlaceholders(html, urls);
}

function main() {
  if (!siteUrl) {
    throw new Error("site.config.json must set siteUrl");
  }
  const { codes, resolved, names, ogLocales } = loadLocales();
  const partials = {
    header: fs.readFileSync(path.join(partialsDir, "header.html"), "utf8"),
    footer: fs.readFileSync(path.join(partialsDir, "footer.html"), "utf8"),
    seo: fs.readFileSync(path.join(partialsDir, "seo.html"), "utf8"),
    styles: fs.readFileSync(path.join(partialsDir, "styles.html"), "utf8"),
    "app-store": fs.readFileSync(path.join(partialsDir, "app-store.html"), "utf8"),
  };
  const templates = {
    home: fs.readFileSync(path.join(templatesDir, "home.html"), "utf8"),
    features: fs.readFileSync(path.join(templatesDir, "features.html"), "utf8"),
    support: fs.readFileSync(path.join(templatesDir, "support.html"), "utf8"),
    privacy: fs.readFileSync(path.join(templatesDir, "privacy.html"), "utf8"),
    404: fs.readFileSync(path.join(templatesDir, "404.html"), "utf8"),
  };
  const pageArgs = { templates, partials, resolved, codes, names, ogLocales };

  emptySiteDir();
  copyImages();
  copyStyles();
  copyStatic();

  for (const code of codes) {
    for (const page of LOCALIZED_PAGES) {
      writeSiteFile(outputFile(code, page), renderPage({ page, code, ...pageArgs }));
    }
  }

  writeSiteFile(outputFile(DEFAULT_LOCALE, "privacy"), renderPage({ page: "privacy", code: DEFAULT_LOCALE, ...pageArgs }));
  writeSiteFile(outputFile(DEFAULT_LOCALE, "404"), renderPage({ page: "404", code: DEFAULT_LOCALE, ...pageArgs }));
  writeSiteFile("sitemap.xml", sitemapXml(codes));
  writeSiteFile(
    "robots.txt",
    `User-agent: *\nAllow: /\nSitemap: ${absoluteUrl("/sitemap.xml")}\n`
  );
  writeSiteFile("CNAME", `${new URL(siteUrl).hostname}\n`);
  console.log("Built site/");
}

main();
