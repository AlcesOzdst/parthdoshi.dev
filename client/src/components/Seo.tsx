import { useEffect } from "react";
import { useLocation } from "wouter";
import { getRouteMeta, CANONICAL_HOST } from "@/seo/routes";

export function Seo() {
  const [location] = useLocation();

  useEffect(() => {
    const meta = getRouteMeta(location);
    if (!meta) return;

    document.title = meta.title;

    // Helper to update or create meta tags
    const setMeta = (name: string, content: string, isProperty = false) => {
      const attr = isProperty ? "property" : "name";
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    setMeta("description", meta.description);
    setMeta("og:title", meta.title, true);
    setMeta("og:description", meta.description, true);
    setMeta("og:url", `${CANONICAL_HOST}${meta.path === "/" ? "/" : meta.path}`, true);
    setMeta("og:image", `${CANONICAL_HOST}${meta.ogImage}`, true);
    setMeta("twitter:title", meta.title);
    setMeta("twitter:description", meta.description);
    setMeta("twitter:image", `${CANONICAL_HOST}${meta.ogImage}`);

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", `${CANONICAL_HOST}${meta.path === "/" ? "/" : meta.path}`);
  }, [location]);

  return null;
}
