import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToHash = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // If URL has hash like #discount
    if (hash) {
      const el = document.getElementById(hash.replace("#", ""));
      
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 100); // delay ensures DOM is ready
        return;
      }
    }

    // Default: scroll to top
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [pathname, hash]);

  return null;
};

export default ScrollToHash;