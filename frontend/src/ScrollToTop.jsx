import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation(); // Get current location

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top of the page
  }, [pathname]); // Run this effect whenever the pathname changes

  return null; // This component doesn't render anything
};

export default ScrollToTop;
