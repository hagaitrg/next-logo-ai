import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Logo Generator",
  description:
    "Design your perfect logo with our easy-to-use Logo Generator. Choose from thousands of templates, customize with your brand colors and fonts, and download high-quality logos instantly. Perfect for businesses, startups, and personal brands.",
  keywords: [
    "logo generator",
    "create logo online",
    "custom logo design",
    "free logo maker",
    "professional logo design",
    "brand logo creator",
    "logo templates",
    "business logo maker",
    "startup logo design",
    "instant logo download",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${plusJakartaSans.variable} antialiased`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
