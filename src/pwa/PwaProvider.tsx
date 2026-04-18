"use client";

/**
 * PwaProvider — central PWA orchestration component.
 * See documentation in tsuchiyatakahiro.com/src/pwa/PwaProvider.tsx for
 * the architecture rationale and Tier 2/3 extension points.
 */

import { useEffect } from "react";

export default function PwaProvider() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("serviceWorker" in navigator)) return;
    if (process.env.NODE_ENV !== "production") return;

    const register = async () => {
      try {
        const reg = await navigator.serviceWorker.register("/sw.js", {
          scope: "/",
          updateViaCache: "none",
        });

        reg.addEventListener("updatefound", () => {
          const newWorker = reg.installing;
          if (!newWorker) return;
          newWorker.addEventListener("statechange", () => {
            if (
              newWorker.state === "installed" &&
              navigator.serviceWorker.controller
            ) {
              // New SW waiting — silently activate on next navigation.
            }
          });
        });
      } catch {
        // SW registration failed — silently ignore.
      }
    };

    void register();
  }, []);

  return null;
}
