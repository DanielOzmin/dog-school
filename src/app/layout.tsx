import Navbar from "@/components/navbar";
import "./globals.css";
import { RootLayoutType } from "./types/types";
import { AuthProvider } from "./context/authContext";



export default function RootLayout({ children }: RootLayoutType) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Navbar />
          {children}
        </AuthProvider>
        <footer></footer>
      </body>
    </html>
  );
}
