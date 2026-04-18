import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "TSUCHIYA LAB",
    short_name: "TSUCHIYA LAB",
    description:
      "SaaS・コンサルティング・IP（キャラクター）を横断して、アイデアを事業とブランド価値へ変えるスタジオです。",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#0a0a0a",
    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/maskable-icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/maskable-icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    screenshots: [
      {
        src: "/screenshots/desktop-1280x720.png",
        sizes: "1280x720",
        type: "image/png",
        form_factor: "wide",
        label: "TSUCHIYA LAB – Desktop view",
      },
      {
        src: "/screenshots/mobile-750x1334.png",
        sizes: "750x1334",
        type: "image/png",
        form_factor: "narrow",
        label: "TSUCHIYA LAB – Mobile view",
      },
    ],
    categories: ["business", "productivity"],
    lang: "ja",
    dir: "ltr",
  };
}
