import { cp, mkdir, readdir, rm } from "node:fs/promises";
import { extname, join } from "node:path";

const root = new URL("../", import.meta.url);
const dist = new URL("../dist/", import.meta.url);
const client = new URL("../dist/client/", import.meta.url);
const server = new URL("../dist/server/", import.meta.url);
const publicExtensions = new Set([".html", ".css", ".js", ".jpg", ".jpeg", ".png", ".webp"]);

await rm(dist, { recursive: true, force: true });
await mkdir(client, { recursive: true });
await mkdir(server, { recursive: true });

for (const entry of await readdir(root, { withFileTypes: true })) {
  if (!entry.isFile() || !publicExtensions.has(extname(entry.name).toLowerCase())) continue;
  if (entry.name.startsWith("implementation-") || entry.name.startsWith("qa-")) continue;
  await cp(new URL(entry.name, root), new URL(entry.name, client));
}

await cp(new URL("../worker/index.js", import.meta.url), new URL("index.js", server));
console.log("Autos Alegre build ready in dist/");
