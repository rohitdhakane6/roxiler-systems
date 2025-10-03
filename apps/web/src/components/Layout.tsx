import type { ReactNode } from "react";
import Header from "@/components/Header";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen mx-auto px-4">
      <Header />
      <main className="mx-auto w-full  px-4 py-6">{children}</main>
    </div>
  );
}
