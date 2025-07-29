import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { FlipProvider } from "@/context/FlipCardContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "HPYS2025",
  description: "This game is the best in the world",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning={true}
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        
          <Toaster position="bottom-center" reverseOrder={false} />
          <div className="px-3 py-2"><FlipProvider>{children} </FlipProvider></div>
       
      </body>
    </html>
  );
}
