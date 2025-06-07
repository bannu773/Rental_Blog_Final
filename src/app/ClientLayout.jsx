"use client";
import { ThemeContextProvider } from "@/context/ThemeContext.jsx";
import ThemeProvider from "@/providers/ThemeProvider";
import AuthProvider from "@/providers/AuthProvider";
import LoaderProvider from "@/providers/LoaderProvider";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";

export default function ClientLayout({ children }) {
  return (
    <AuthProvider>
      <ThemeContextProvider>
        <ThemeProvider>
          <LoaderProvider>
            <div className="container">
              <div className="wrapper">
                <Navbar />
                {children}
                <Footer />
              </div>
            </div>
          </LoaderProvider>
        </ThemeProvider>
      </ThemeContextProvider>
    </AuthProvider>
  );
} 