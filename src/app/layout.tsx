import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { Toaster } from "sonner";


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
    default: "SkillBridge | Find Expert Tutors & Learn with Confidence",
    template: "%s | SkillBridge",
  },
  description:
    "SkillBridge is an online tutoring platform that connects students with qualified tutors for personalized learning, seamless booking, secure messaging, and interactive online sessions.",
  keywords: [
    "SkillBridge",
    "online tutoring",
    "find tutors",
    "private tutors",
    "online learning",
    "student tutor platform",
    "education",
    "tutoring",
    "Bangladesh tutors",
    "book tutors",
  ],
  authors: [{ name: "Sabrina Mostafa" }],
  creator: "Sabrina Mostafa",
  publisher: "SkillBridge",
  applicationName: "SkillBridge",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="">

            {children}

            <Toaster
              position="bottom-right"
              richColors
              closeButton
              expand={false}
              toastOptions={{
                classNames: {
                  toast:
                    "rounded-xl border shadow-lg font-medium",
                  title: "text-sm font-semibold",
                  description: "text-sm text-muted-foreground",
                  success:
                    "!bg-background !text-foreground !border-green-200",
                  error:
                    "!bg-background !text-foreground !border-red-200",
                  warning:
                    "!bg-background !text-foreground !border-yellow-200",
                  info:
                    "!bg-background !text-foreground !border-blue-200",
                },
              }}
            />

          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
