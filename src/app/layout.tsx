import { ReactNode } from "react";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-providers";
import { authUserSession } from "@/lib/auth";
import ClientSessionProvider from "@/components/providers/session-providers";
import NavigationBar from "@/components/utilities/Navbar";

const inter = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await authUserSession();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ClientSessionProvider session={session}>
            <NavigationBar />
            {children}
          </ClientSessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
