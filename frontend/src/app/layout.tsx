import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Statusly — Let people know what you're up to",
  description: "A decentralized status board on Botchain Testnet.",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className="bg-charcoal-950 text-slate-200 antialiased min-h-screen selection:bg-purple-900/50 selection:text-purple-200">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
