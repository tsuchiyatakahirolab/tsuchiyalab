import type { Metadata } from "next";
import { Inter, Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-noto-sans-jp",
  display: "swap",
  weight: ["300", "400", "500", "700", "800"],
});

export const metadata: Metadata = {
  title: "TSUCHIYA LAB | SaaS・コンサルティング・IPスタジオ",
  description:
    "TSUCHIYA LABは、SaaS・コンサルティング・IP（キャラクター）を横断して、アイデアを事業とブランド価値へ変えるスタジオです。",
  metadataBase: new URL("https://tsuchiyalab.com"),
  icons: {
    icon: "/icon.svg",
  },
  openGraph: {
    type: "website",
    title: "TSUCHIYA LAB | SaaS・コンサルティング・IPスタジオ",
    description:
      "SaaS・コンサルティング・IP（キャラクター）を横断して、アイデアを事業とブランド価値へ変えるスタジオです。",
    url: "https://tsuchiyalab.com/",
    siteName: "TSUCHIYA LAB",
    locale: "ja_JP",
  },
  twitter: {
    card: "summary_large_image",
    title: "TSUCHIYA LAB",
    description: "SaaS・コンサルティング・IPスタジオ",
  },
  alternates: {
    canonical: "https://tsuchiyalab.com",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "TSUCHIYA LAB",
  url: "https://tsuchiyalab.com",
  email: "info@tsuchiyalab.com",
  description:
    "SaaS・コンサルティング・IP（キャラクター）を横断して、アイデアを事業とブランド価値へ変えるスタジオです。",
  sameAs: ["https://x.com/tsuchiyalab"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" data-theme="dark" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} ${notoSansJP.variable}`}>
        {children}
      </body>
    </html>
  );
}
