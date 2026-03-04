import type { Metadata } from "next";
import { ReactNode } from "react";
import { Providers } from "@providers/index";

export const metadata: Metadata = {
  title: "CV Manager",
  description: "Manage your CVs and professional profile",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
