import { access, readdir } from "node:fs/promises";

await access(new URL("../dist/server/index.js", import.meta.url));
await access(new URL("../dist/client/index.html", import.meta.url));
await access(new URL("../.openai/hosting.json", import.meta.url));

const pages = (await readdir(new URL("../dist/client/", import.meta.url))).filter((name) => name.endsWith(".html"));
if (pages.length < 8) throw new Error(`Expected at least 8 HTML pages, found ${pages.length}`);
console.log(`Sites package validated with ${pages.length} HTML pages.`);
