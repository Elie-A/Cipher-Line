import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import DiscordProvider from "@/components/DiscordProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "CipherLine",
    template: "%s | CipherLine",
  },
  description: "Daily cipher puzzle game. Decode the signal.",
};

function Logo() {
  return (
    <div className="flex items-center gap-2">
      <svg
        width="18"
        height="18"
        viewBox="0 0 40 40"
        fill="none"
        className="text-zinc-100"
      >
        <circle cx="20" cy="20" r="4" fill="currentColor" />
        <path
          d="M20 8C26 8 30 12 30 18"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M20 32C14 32 10 28 10 22"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>

      <span className="tracking-widest text-sm opacity-80">CipherLine</span>
    </div>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-zinc-950 text-zinc-100 font-mono">
        <DiscordProvider>
          <div className="min-h-screen flex flex-col items-center">
            {/* HEADER */}
            <header className="w-full max-w-2xl px-4 py-4 border-b border-zinc-800">
              <div className="flex justify-between items-center">
                <Logo />

                <span className="text-xs opacity-50 tracking-widest">
                  DAILY SIGNAL
                </span>
              </div>
            </header>

            {/* MAIN */}
            <main className="flex-1 w-full max-w-2xl px-4 py-6">
              {children}
            </main>

            {/* FOOTER */}
            <footer className="w-full max-w-2xl px-4 py-4 border-t border-zinc-800 text-xs opacity-40">
              decrypt • survive • repeat
            </footer>
          </div>
        </DiscordProvider>
      </body>
    </html>
  );
}
