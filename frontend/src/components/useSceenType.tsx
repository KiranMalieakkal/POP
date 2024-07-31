import { useEffect, useState } from "react";
import useScreenSize from "./useScreenSize";
export default function useScreenType() {
  const screenSize = useScreenSize();
  const [isMobile, setIsMobile] = useState<boolean>(screenSize.width < 768);
  const [isDesktop, setIsDesktop] = useState<boolean>(false);
  useEffect(() => {
    // before we used 768.
    if (screenSize.width >= 960) {
      setIsMobile(false);
      setIsDesktop(true);
      return;
    }
    setIsMobile(true);
    setIsDesktop(false);
  }, [screenSize]);
  return { isMobile, isDesktop };
}
