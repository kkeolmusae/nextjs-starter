import Navigation from "@/components/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | Next Movies",
    default: "Next Movies",
  },
  description: "The best movies on the best framework",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navigation /> {/** body 내부에 컴포넌트가 있어야 hydrate 될 수 있다? */}
        {children}
      </body>
    </html>
  );
}
