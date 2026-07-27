"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";
import HomeFooter from "../landing/HomeFooter";


export default function FooterSwitcher() {
  const pathname = usePathname();

  if (pathname === "/") {
    return <HomeFooter />;
  }

  return <Footer />;
}