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
  openGraph: {
    type: "website",
    title: "TSUCHIYA LAB",
    description: "SaaS・コンサルティング・IPスタジオ",
    url: "https://tsuchiyalab.com/",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" data-theme="dark" suppressHydrationWarning>
      <body className={`${inter.variable} ${notoSansJP.variable}`}>
        {children}
      </body>
    </html>
  );
}
