import { Inter } from "next/font/google";
import "./globals.css";
import Auth0ProviderWithConfig from "@/providers/Auth0Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "RentInstant Blog",
  description: "Your go-to resource for everything about RentInstant",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Auth0ProviderWithConfig>
          {children}
        </Auth0ProviderWithConfig>
      </body>
    </html>
  );
} 