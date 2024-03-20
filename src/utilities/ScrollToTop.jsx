import React, { useEffect } from "react";

export default function ScrollToTop() {
  useEffect(() => {
    window.scrollTo(0, 0);
    const onRouteChange = () => {
      window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", onRouteChange);
    return () => {
      window.removeEventListener("hashchange", onRouteChange);
    };
  }, []);
  return null;
}
