import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { APP_STORE_BADGES, SUPERSEDED_APP_STORE_BADGES } from "./app-store-badges.js";

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
const SCREENSHOTS_DIR = "screenshots";
const ICON_NAV_FILE = "icon-64.webp";
const ICON_HERO_FILE = "icon-256.webp";
const OG_IMAGE_FILE = "og.png";
const PRIVACY_TITLE = "Privacy Policy for Pushanova";
const PRIVACY_DESCRIPTION =
  "How Pushanova handles information on iPhone, iPad, and Apple Watch. Pushanova does not require an account.";
const IPHONE_HOME_FILE = "iphone-home.webp";
const IPHONE_WATCH_FILE = "iphone-watch.webp";
const IPHONE_LEVELS_FILE = "iphone-levels.webp";
const IPHONE_START_FILE = "iphone-start.webp";
const IPHONE_PROGRESS_FILE = "iphone-progress.webp";
const WATCH_STATS_FILE = "watch-stats.webp";
const IPHONE_COUNTING_FILE = "iphone-counting.webp";
const WATCH_COUNTING_FILE = "watch-counting.webp";
const SCREENSHOT_PHONE_WIDTH = 800;

const APP_STORE_CAMPAIGN = {
  id: "6451240468",
  pt: "124125728",
  mt: "8",
};

function appStoreCampaignUrl(code) {
  const params = new URLSearchParams({
    pt: APP_STORE_CAMPAIGN.pt,
    ct: `website-${code}`,
    mt: APP_STORE_CAMPAIGN.mt,
  });
  return `https://apps.apple.com/app/apple-store/id${APP_STORE_CAMPAIGN.id}?${params}`;
}

const EXTERNAL = {
  termsUrl: "https://www.apple.com/legal/internet-services/itunes/dev/stdeula/",
  instagramUrl: "https://www.instagram.com/pushanova.app",
  aboutUrl: "https://genebogdanovich.com/",
  email: "help@pushanova.com",
  mailto: "mailto:help@pushanova.com",
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

function tokens(text, pattern) {
  return text.match(pattern) || [];
}

function sameTokens(left, right) {
  return left.length === right.length && left.every((token, index) => token === right[index]);
}

function assertLocaleParity(english, locale, code) {
  const errors = [];

  function visit(base, other, path) {
    if (errors.length >= 15) {
      return;
    }
    const here = path || code;
    if (Array.isArray(base)) {
      if (!Array.isArray(other)) {
        errors.push(`${code}: ${here} must be an array`);
        return;
      }
      if (other.length !== base.length) {
        errors.push(`${code}: ${here} has ${other.length} items; English has ${base.length}`);
        return;
      }
      base.forEach((item, index) => visit(item, other[index], `${here}[${index}]`));
      return;
    }
    if (isLeaf(base)) {
      if (!isLeaf(other)) {
        errors.push(`${code}: ${here} must be a message`);
        return;
      }
      const extra = Object.keys(other).filter((key) => key !== "message" && key !== "description");
      if (extra.length) {
        errors.push(`${code}: ${here} has unexpected keys: ${extra.join(", ")}`);
      }
      const basePlaceholders = tokens(base.message, /\{[^{}]+\}/g);
      const otherPlaceholders = tokens(other.message, /\{[^{}]+\}/g);
      if (!sameTokens(basePlaceholders, otherPlaceholders)) {
        errors.push(
          `${code}: ${here} placeholders are ${JSON.stringify(otherPlaceholders)}; English has ${JSON.stringify(basePlaceholders)}`
        );
      }
      const baseTags = tokens(base.message, /<\/?[a-zA-Z][^>]*>/g);
      const otherTags = tokens(other.message, /<\/?[a-zA-Z][^>]*>/g);
      if (!sameTokens(baseTags, otherTags)) {
        errors.push(`${code}: ${here} HTML tags do not match English`);
      }
      return;
    }
    if (!base || typeof base !== "object") {
      return;
    }
    if (!other || typeof other !== "object" || Array.isArray(other)) {
      errors.push(`${code}: ${here} must be an object`);
      return;
    }
    const baseKeys = Object.keys(base);
    const otherKeys = Object.keys(other);
    const missing = baseKeys.filter((key) => !otherKeys.includes(key));
    const unexpected = otherKeys.filter((key) => !baseKeys.includes(key));
    if (missing.length || unexpected.length) {
      const parts = [];
      if (missing.length) {
        parts.push(`missing ${missing.join(", ")}`);
      }
      if (unexpected.length) {
        parts.push(`unexpected ${unexpected.join(", ")}`);
      }
      errors.push(`${code}: ${here} ${parts.join("; ")}`);
      return;
    }
    for (const key of baseKeys) {
      visit(base[key], other[key], path ? `${path}.${key}` : key);
    }
  }

  visit(english, locale, "");
  if (errors.length) {
    throw new Error(errors.join("\n"));
  }
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

function assetHref(code, page, toFile) {
  if (page === "404") {
    return `/${toFile}`;
  }
  return posixHref(outputFile(code, page), toFile);
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

function assertBadgeCatalog() {
  const dir = path.join(imagesDir, APP_STORE_BADGE_DIR);
  const onDisk = new Set(fs.readdirSync(dir).filter((name) => name.endsWith(".svg")));
  const used = new Set(SUPERSEDED_APP_STORE_BADGES);
  for (const [code, pair] of Object.entries(APP_STORE_BADGES)) {
    for (const scheme of ["light", "dark"]) {
      const fileName = pair[scheme];
      if (!onDisk.has(fileName)) {
        throw new Error(`Badge map for ${code} points at a missing file: ${fileName}`);
      }
      used.add(fileName);
    }
  }
  const unused = [...onDisk].filter((name) => !used.has(name)).sort();
  if (unused.length) {
    throw new Error(`App Store badges are not mapped:\n${unused.join("\n")}`);
  }
}

function loadAppStoreBadgeAsset(code, scheme) {
  const pair = APP_STORE_BADGES[code];
  if (!pair) {
    throw new Error(`No App Store badge for locale ${code}`);
  }
  const fileName = pair[scheme];
  const filePath = path.join(imagesDir, APP_STORE_BADGE_DIR, fileName);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Missing App Store badge for ${code}: ${fileName}`);
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

function loadIcon(code, page, fileName) {
  const filePath = path.join(imagesDir, fileName);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Missing src/images/${fileName}`);
  }
  return {
    src: assetHref(code, page, `images/${fileName}`),
    ...rasterSize(filePath),
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

function pageShot(code, page, fileName, alt) {
  const shot = loadScreenshot(code, fileName);
  if (!shot) {
    return undefined;
  }
  if (!alt) {
    throw new Error(`Missing alt for ${fileName}`);
  }
  return {
    src: posixHref(outputFile(code, page), shot.sitePath),
    alt,
    width: shot.width,
    height: shot.height,
    scale: String(Math.max(1, Number(shot.width) / SCREENSHOT_PHONE_WIDTH)),
  };
}

function homeHero(code, page, locale) {
  return pageShot(code, page, IPHONE_HOME_FILE, locale.home?.hero?.alt);
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

function pageUrls(code) {
  return {
    home: publicPath(code, "home"),
    features: publicPath(code, "features"),
    support: publicPath(code, "support"),
    privacy: publicPath(DEFAULT_LOCALE, "privacy"),
    notFound: publicPath(DEFAULT_LOCALE, "404"),
  };
}

function orderedCodes(codes) {
  const rest = codes.filter((code) => code !== DEFAULT_LOCALE).sort();
  return codes.includes(DEFAULT_LOCALE) ? [DEFAULT_LOCALE, ...rest] : rest;
}

function languageEntries(codes, names, code, page) {
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
      url: publicPath(toCode, toPage),
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

function loadOgImage() {
  const filePath = path.join(staticDir, OG_IMAGE_FILE);
  if (!fs.existsSync(filePath)) {
    throw new Error("Missing src/static/og.png");
  }
  return {
    url: absoluteUrl(`/${OG_IMAGE_FILE}`),
    ...rasterSize(filePath),
  };
}

function ogTitleFor(page, locale) {
  switch (page) {
    case "home":
      return locale.home.meta.ogTitle;
    case "features":
      return locale.features.meta.title;
    case "support":
      return locale.support.meta.title;
    case "privacy":
      return PRIVACY_TITLE;
    case "404":
      return locale.notFound.meta.title;
    default:
      throw new Error(`Unknown page: ${page}`);
  }
}

function ogDescriptionFor(page, locale) {
  switch (page) {
    case "home":
      return locale.home.meta.ogDescription;
    case "features":
      return locale.features.meta.description;
    case "support":
      return locale.support.meta.description;
    case "privacy":
      return PRIVACY_DESCRIPTION;
    case "404":
      return locale.notFound.meta.description;
    default:
      throw new Error(`Unknown page: ${page}`);
  }
}

function slugifyFaqId(text) {
  const slug = String(text)
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return slug || "question";
}

function uniqueFaqId(used, slug) {
  let id = slug;
  let n = 2;
  while (used.has(id)) {
    id = `${slug}-${n}`;
    n += 1;
  }
  used.add(id);
  return id;
}

function withFaqIds(items, englishItems, prefix, used) {
  return items.map((item, index) => {
    const englishQuestion = englishItems[index]?.question ?? item.question;
    const slug = slugifyFaqId(englishQuestion);
    const id = uniqueFaqId(used, prefix ? `${prefix}-${slug}` : slug);
    return { ...item, id };
  });
}

function withSupportFaqIds(sections, englishSections) {
  const used = new Set();
  return sections.map((section, index) => {
    const englishSection = englishSections[index] || {};
    const prefix = englishSection.id || section.id;
    if (!Array.isArray(section.items)) {
      return section;
    }
    return {
      ...section,
      items: withFaqIds(section.items, englishSection.items || [], prefix, used),
    };
  });
}

function faqJsonLd(inLanguage, canonical, items) {
  const payload = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage,
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      url: `${canonical}#${item.id}`,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.text,
      },
    })),
  };
  return JSON.stringify(payload).replaceAll("<", "\\u003c");
}

function pageSeo(code, page, codes, ogLocales, locale, ogImage) {
  const canonicalCode = SHARED_PAGES.includes(page) ? DEFAULT_LOCALE : code;
  const ogLocale = ogLocales[code] || ogLocales[DEFAULT_LOCALE] || "en_US";
  const ogLocaleAlternates = SHARED_PAGES.includes(page)
    ? []
    : codes.filter((item) => item !== code).map((item) => ogLocales[item]).filter(Boolean);
  return {
    noindex: page === "404",
    canonical: absoluteUrl(publicPath(canonicalCode, page)),
    hreflangs: hreflangsFor(page, codes),
    ogLocale,
    ogLocaleAlternates,
    ogTitle: ogTitleFor(page, locale),
    ogDescription: ogDescriptionFor(page, locale),
    ogImage: ogImage.url,
    ogImageWidth: ogImage.width,
    ogImageHeight: ogImage.height,
    ogImageAlt: locale.meta.ogImageAlt,
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

function applyPlaceholders(html, urls, code) {
  const values = {
    ...EXTERNAL,
    appStoreUrl: appStoreCampaignUrl(code),
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
    raw[code] = readJson(path.join(localesDir, file));
  }
  const english = raw[DEFAULT_LOCALE];
  assertEnglishDescriptions(english);
  for (const code of Object.keys(raw)) {
    if (code !== DEFAULT_LOCALE) {
      assertLocaleParity(english, raw[code], code);
    }
  }
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
    hasHeartRateNote: page === "home" || page === "features",
  };
}

function renderPage({ page, code, templates, partials, resolved, codes, names, ogLocales, ogImage }) {
  const locale = resolved[code];
  const english = resolved[DEFAULT_LOCALE];
  const urls = pageUrls(code);
  const badge = loadAppStoreBadge(code);
  const data = {
    ...locale,
    ...pageFlags(page),
    urls,
    languages: languageEntries(codes, names, code, page),
    seo: pageSeo(code, page, codes, ogLocales, locale, ogImage),
    stylesheet: assetHref(code, page, "styles/site.css"),
    icon: loadIcon(code, page, ICON_NAV_FILE),
    heroIcon: loadIcon(code, page, ICON_HERO_FILE),
    appStoreBadge: {
      src: posixHref(outputFile(code, page), badge.light.sitePath),
      darkSrc: posixHref(outputFile(code, page), badge.dark.sitePath),
      alt: appStoreBadgeAlt(locale, page),
      width: badge.light.width,
      height: badge.light.height,
    },
  };
  if (page === "home") {
    const qnaItems = withFaqIds(locale.home.qna.items, english.home.qna.items, "", new Set());
    data.home = {
      ...locale.home,
      hero: homeHero(code, page, locale),
      start: {
        ...locale.home.start,
        image: pageShot(code, page, IPHONE_LEVELS_FILE, locale.home?.start?.alt),
      },
      how: {
        ...locale.home.how,
        image: pageShot(code, page, IPHONE_WATCH_FILE, locale.home?.how?.alt),
      },
      closing: {
        ...locale.home.closing,
        image: pageShot(code, page, IPHONE_START_FILE, locale.home?.closing?.alt),
      },
      qna: {
        ...locale.home.qna,
        items: qnaItems,
      },
    };
    data.seo.faqJsonLd = faqJsonLd(
      locale.meta.code,
      data.seo.canonical,
      qnaItems.map((item) => ({
        question: item.question,
        id: item.id,
        text: item.paragraphs.join("\n\n"),
      }))
    );
  }
  if (page === "support") {
    const sections = withSupportFaqIds(locale.support.sections, english.support.sections);
    data.support = {
      ...locale.support,
      sections,
    };
    data.seo.faqJsonLd = faqJsonLd(
      locale.meta.code,
      data.seo.canonical,
      sections.flatMap((section) =>
        (section.items || []).map((item) => ({
          question: item.question,
          id: item.id,
          text: item.answer,
        }))
      )
    );
  }
  if (page === "features") {
    data.features = {
      ...locale.features,
      hero: pageShot(code, page, WATCH_COUNTING_FILE, locale.features?.hero?.alt),
      watch: {
        ...locale.features.watch,
        image: pageShot(code, page, IPHONE_WATCH_FILE, locale.features?.watch?.alt),
      },
      program: {
        ...locale.features.program,
        image: pageShot(code, page, IPHONE_LEVELS_FILE, locale.features?.program?.alt),
      },
      progress: {
        ...locale.features.progress,
        image: pageShot(code, page, IPHONE_PROGRESS_FILE, locale.features?.progress?.alt),
      },
      live: {
        ...locale.features.live,
        image: pageShot(code, page, WATCH_STATS_FILE, locale.features?.live?.alt),
      },
      counting: {
        ...locale.features.counting,
        image: pageShot(code, page, IPHONE_COUNTING_FILE, locale.features?.counting?.alt),
      },
      closing: {
        ...locale.features.closing,
        image: pageShot(code, page, IPHONE_START_FILE, locale.features?.closing?.alt),
      },
    };
  }
  const html = renderTemplate(templates[page], [data], partials);
  return applyPlaceholders(html, urls, code);
}

function main() {
  if (!siteUrl) {
    throw new Error("site.config.json must set siteUrl");
  }
  assertBadgeCatalog();
  const { codes, resolved, names, ogLocales } = loadLocales();
  const ogImage = loadOgImage();
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
  const pageArgs = { templates, partials, resolved, codes, names, ogLocales, ogImage };

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
