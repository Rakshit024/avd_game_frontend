import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { FlipCardProvider } from "@/context/FlipCardContext";
import SocketProvider from "@/context/SocketContext";

const inter = Inter({
  variable: "--font-inter",
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
        className={`${inter.className} antialiased`}
      >
        <Toaster position="bottom-center" reverseOrder={false} />
        <div className="px-3 py-2">
          <SocketProvider>
            <FlipCardProvider>{children}</FlipCardProvider>
          </SocketProvider>
        </div>
      </body>
    </html>
  );
}
