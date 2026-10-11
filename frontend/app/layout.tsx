import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";

export const metadata: Metadata = {
  title: "JP.DEV | Portfolio",
  description: "JP's personal portfolio and project work",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <footer className="site-footer">
          <div className="site-footer-inner">
            <p>JP.DEV · Portfolio skeleton</p>
            <a href="/health">Health check</a>
          </div>
        </footer>
      </body>
    </html>
  );
}
