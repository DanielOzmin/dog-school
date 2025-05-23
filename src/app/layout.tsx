import Navbar from "@/components/navbar";
import "./globals.css";
import { RootLayoutType } from "./types/types";



export default function RootLayout({children}: RootLayoutType) {
  return (
    <html lang="en">
      <body>
        <Navbar/>
        {children}
        <footer></footer>
      </body>
    </html>
  );
}
