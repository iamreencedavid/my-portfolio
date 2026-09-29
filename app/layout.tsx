import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { about, site } from "@/content/about";
import { pageMetadata } from "./_components/seo";
import { BootScreen } from "./_components/boot-screen";
import { ThemeSettings } from "./_components/theme-settings";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  ...pageMetadata({ description: site.description, path: "/" }),
  metadataBase: new URL(site.url),
  // Pages set just their file name, e.g. "skills.json · <site.title>".
  title: { default: site.title, template: `%s · ${site.title}` },
  applicationName: site.brand,
  authors: [{ name: site.owner, url: site.url }],
  creator: site.owner,
  keywords: [
    site.owner,
    "Full-Stack Engineer",
    "AI Engineer",
    ...about.stack,
    "Philippines",
  ],
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var d=document.documentElement,t=localStorage.getItem("theme");if(t==="light"||t==="dark")d.setAttribute("data-theme",t);if(sessionStorage.getItem("booted")==="1")d.setAttribute("data-booted","")}catch(e){}})()`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col font-mono">
        {children}
        <ThemeSettings />
        <BootScreen />
      </body>
    </html>
  );
}
