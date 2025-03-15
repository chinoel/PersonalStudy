import type { Metadata } from "next";
import "./globals.css";
import SessionProviderWrapper from "@/app/components/SessionProviderWrapper";
import Header from "@/app/components/header/page";
import Footer from "@/app/components/footer/page";

export const metadata: Metadata = {
  title: "오늘은 일본어",
  description: "Word Study Only Me",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body>
          <SessionProviderWrapper>
            <Header />
            {children}
            <Footer />
          </SessionProviderWrapper>
      </body>
    </html>
  );
}