import { useEffect } from "react";
import { useLocation } from "react-router-dom";

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
  }
}

const GA_ID = "G-16PRGTCXQ1";

export default function Analytics() {
  const location = useLocation();

  useEffect(() => {
    if (typeof window.gtag !== "function") return;
    window.gtag("config", GA_ID, {
      page_path: location.pathname + location.search,
    });
  }, [location]);

  return null;
}
