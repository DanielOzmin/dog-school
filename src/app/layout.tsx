import "./globals.css";
import { RootLayoutType } from "./types/types";
import Image from "next/image";
import Link from "next/link";



export default function RootLayout({children}: RootLayoutType) {
  return (
    <html lang="en">
      <body>
        <nav className="bg-[#0098DB] text-white">
          <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <Link href="/home"><Image src="/footer_logo.jpg" alt="logo" width={150} height={150}/></Link>
          <ul className="flex gap-8 text-base font-medium">
            <li><Link className="hover:underline underline-offset-4" href="/home">Naptár</Link></li>
            <li><Link className="hover:underline underline-offset-4" href="/courses">Tanfolyamok</Link></li>
            <li><Link className="hover:underline underline-offset-4" href="/applications">Jelentkezéseim</Link></li>
            <li><Link className="hover:underline underline-offset-4" href="/">Kijelentkezés</Link></li>
          </ul>
          </div>
        </nav>

        {children}
        <footer></footer>
      </body>
    </html>
  );
}
