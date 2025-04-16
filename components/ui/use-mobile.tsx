import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return; // Prevent running on the server or invalid matchMedia

    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);

    return () => {
      if (mql) {
        mql.removeEventListener("change", onChange);
      }
    };
  }, []);

  return !!isMobile;
}