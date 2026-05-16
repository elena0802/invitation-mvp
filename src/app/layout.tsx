import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "모바일초대장 MVP",
  description: "로그인 없이 생성하고 공개 URL로 보는 모바일초대장 MVP",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="min-h-dvh bg-[#f7efe6]">
      <body className="min-h-dvh bg-[#f7efe6]">{children}</body>
    </html>
  );
}
