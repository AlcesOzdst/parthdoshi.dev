async function test() {
  const routes = ["/", "/resume", "/blog", "/blog/building-in-public", "/projects/ddos-toolkit", "/nope"];
  for (const r of routes) {
    console.log("== " + r);
    try {
      const res = await fetch("http://localhost:4173" + r);
      console.log("HTTP Code: " + res.status);
      const text = await res.text();
      const title = (text.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [])[0] || "NO TITLE";
      const canonical = (text.match(/<link[^>]*rel="canonical"[^>]*>/i) || [])[0] || "NO CANONICAL";
      const h1 = (text.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i) || [])[0] || "NO H1";
      console.log("  " + title);
      console.log("  " + canonical);
      console.log("  " + h1.replace(/\s+/g, " ").substring(0, 100));
    } catch (e) {
      console.error(e.message);
    }
  }

  console.log("\n== /llms.txt (first 20 lines):");
  const llms = await fetch("http://localhost:4173/llms.txt").then(r => r.text());
  console.log(llms.split("\n").slice(0, 20).join("\n"));

  console.log("\n== /sitemap.xml (first 25 lines):");
  const sm = await fetch("http://localhost:4173/sitemap.xml").then(r => r.text());
  console.log(sm.split("\n").slice(0, 25).join("\n"));

  console.log("\n== /blog/building-in-public.md (headers & first lines):");
  const mdRes = await fetch("http://localhost:4173/blog/building-in-public.md");
  console.log("Status: " + mdRes.status);
  console.log("Content-Type: " + mdRes.headers.get("content-type"));
  const mdText = await mdRes.text();
  console.log(mdText.split("\n").slice(0, 8).join("\n"));
}

test();
