import "./globals.css";
import { Inter } from "next/font/google";
import WeatherDataProvider from "@/context/WeatherDataProvider";
import { Toaster } from "sonner";
import NavBar from "@/components/NavBar";
import ThemeProvider from "@/context/ThemeProvider";
const inter = Inter({ subsets: ["latin"] });
export const metadata = {
  title: "SkyCast",
  description: "Stay informed with accurate weather forecasts. Customize your weather experience on SkyCast. Be prepared for any weather condition, anytime, anywhere.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-100 dark:bg-black/80 `}>
        <WeatherDataProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            disableTransitionOnChange
          >
            <Toaster richColors />
            <div className="px-1 xs:px-2 md:px-6 lg:px-10 max-w-screen-2xl m-auto transition-colors duration-1000  ">
              <NavBar />
              {children}
            </div>
          </ThemeProvider>
        </WeatherDataProvider>
      </body>
    </html>
  );
}
