import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "site");
const port = Number(process.env.PORT || 8765);

const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".webp": "image/webp",
  ".jpg": "image/jpeg",
  ".ico": "image/x-icon",
  ".webmanifest": "application/manifest+json",
};

function safePath(urlPath) {
  const decoded = decodeURIComponent((urlPath || "/").split("?")[0]);
  const full = path.normalize(path.join(root, decoded));
  if (!full.startsWith(root)) {
    return null;
  }
  return full;
}

function send(res, status, filePath) {
  const data = fs.readFileSync(filePath);
  res.writeHead(status, {
    "Content-Type": types[path.extname(filePath)] || "application/octet-stream",
  });
  res.end(data);
}

http
  .createServer((req, res) => {
    let filePath = safePath(req.url);
    if (!filePath) {
      res.writeHead(400);
      res.end("Bad request");
      return;
    }
    try {
      if (fs.statSync(filePath).isDirectory()) {
        filePath = path.join(filePath, "index.html");
      }
      send(res, 200, filePath);
    } catch {
      send(res, 404, path.join(root, "404.html"));
    }
  })
  .listen(port, "127.0.0.1", () => {
    console.log(`http://127.0.0.1:${port}/`);
  });
