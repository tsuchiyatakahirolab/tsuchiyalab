"use client";

/**
 * ShareButton — Web Share API with progressive enhancement.
 * See documentation in tsuchiyatakahiro.com/src/pwa/ShareButton.tsx.
 */

import { useState, useCallback } from "react";

interface ShareButtonProps {
  url?: string;
  title?: string;
  text?: string;
  className?: string;
  children?: React.ReactNode;
}

export default function ShareButton({
  url,
  title,
  text,
  className,
  children,
}: ShareButtonProps) {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");

  const handleShare = useCallback(async () => {
    const shareData = {
      url: url ?? (typeof window !== "undefined" ? window.location.href : "/"),
      title: title ?? document.title,
      text: text ?? "",
    };

    if (typeof navigator !== "undefined" && "share" in navigator) {
      try {
        await navigator.share(shareData);
        return;
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") return;
      }
    }

    try {
      await navigator.clipboard.writeText(shareData.url);
      setStatus("copied");
      setTimeout(() => setStatus("idle"), 2000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 2000);
    }
  }, [url, title, text]);

  return (
    <button
      type="button"
      onClick={handleShare}
      className={className}
      aria-label="Share"
    >
      {status === "copied" ? "Link copied" : status === "error" ? "Failed to copy" : (children ?? "Share")}
    </button>
  );
}
