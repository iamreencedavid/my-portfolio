import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { site } from "@/content/about";
import { BootScreen } from "./boot-screen";
import { ThemeSettings } from "./theme-settings";
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
  title: site.brand,
  description: "Portfolio of a full-stack engineer building developer tools.",
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
