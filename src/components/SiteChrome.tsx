"use client";

import { usePathname } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

/**
 * Public chrome (Nav + Footer) is hidden on /admin routes so the admin
 * shell can own the layout.
 */
export default function SiteChrome({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <Nav />
      <main className="flex-1 relative">{children}</main>
      <Footer />
    </>
  );
}
