import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast"
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const description = "An interactive analytics dashboard with charts, reports, and settings, in English or Spanish.";

export const metadata: Metadata = {
  metadataBase: new URL("https://dashboard-fsucatti.fsucatti-portfolio.workers.dev"),
  title: "Interactive Dashboard",
  description,
  // Preview shown when the link is shared in chats and social networks.
  openGraph: { type: "website", title: "Interactive Dashboard", description, images: [{ url: "/og.jpg", width: 800, height: 420 }] },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "#1f2937", // Tailwind gray-800
              color: "#fff",
              border: "1px solid #374151", // gray-700
            },
            success: { iconTheme: { primary: "#14b8a6", secondary: "#fff" } }, // teal
            error: { iconTheme: { primary: "#ef4444", secondary: "#fff" } }, // red
          }}
        />
        {children}
      </body>
    </html>
  );
}
