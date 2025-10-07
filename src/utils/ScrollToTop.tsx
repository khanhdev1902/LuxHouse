import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
interface ScrollToTopProps {
  behavior?: "auto" | "smooth";
}
const ScrollToTop: React.FC<ScrollToTopProps> = ({ behavior = "auto" }) => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: behavior });
  }, [pathname]);
  return null;
};
export default ScrollToTop;