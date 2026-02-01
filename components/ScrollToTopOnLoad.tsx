"use client";

import { useEffect } from "react";

export default function ScrollToTopOnLoad() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.location.pathname !== "/") return;

    if (window.location.hash) {
      const cleanUrl = window.location.pathname + window.location.search;
      window.history.replaceState(null, "", cleanUrl);
    }

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  return null;
}
