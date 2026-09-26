import { useEffect, useState } from "react";

/** Returns the id of the section currently crossing ~38% of the viewport. */
export function useScrollSpy(ids: string[]): string {
  const [active, setActive] = useState(ids[0] ?? "");

  useEffect(() => {
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!els.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-38% 0px -61% 0px", threshold: 0 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [ids.join(",")]);

  return active;
}
