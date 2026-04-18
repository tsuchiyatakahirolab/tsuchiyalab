import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Offline | TSUCHIYA LAB",
  description: "You are currently offline.",
  robots: { index: false, follow: false },
};

export default function OfflinePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="mb-4 text-[10px] font-medium tracking-[0.3em] uppercase opacity-40">
        Offline
      </p>
      <h1 className="mb-6 text-3xl font-semibold lg:text-4xl">
        You are currently offline
      </h1>
      <p className="mb-8 max-w-md text-sm leading-relaxed opacity-70">
        Please check your network connection. Pages you have previously
        visited can still be viewed offline.
      </p>
      <Link
        href="/"
        className="text-xs font-medium tracking-[0.2em] uppercase underline"
      >
        Back to home
      </Link>
    </div>
  );
}
