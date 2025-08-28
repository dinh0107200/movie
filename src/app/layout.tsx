import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import HeaderLayout from "@/components/layout/header/HeaderLayout";
import FooterLayout from "@/components/layout/footer/FooterLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rổ Phim - Xem Phim Online HD, Phim Mới Cập Nhật Nhanh",
  description:
    "Rổ Phim - Website xem phim online miễn phí, chất lượng HD, cập nhật phim mới nhất nhanh chóng. Thưởng thức kho phim đa dạng từ hành động, tình cảm đến hoạt hình.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black`}
      >
        <HeaderLayout />
        {children}
        <FooterLayout />
      </body>
    </html>
  );
}
