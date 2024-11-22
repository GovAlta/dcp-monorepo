import { useEffect, useRef } from "react";

const useScrollToHash = () => {
  const locationHash = window.location.hash;
  const hasScrolledRef = useRef(false);
  const hashRef = useRef(locationHash);

  useEffect(() => {
    if (locationHash) {
      if (hashRef.current !== locationHash) {
        hashRef.current = locationHash;
        hasScrolledRef.current = false;
      }

      if (!hasScrolledRef.current) {
        const element = document.getElementById(hashRef.current.substring(1));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          hasScrolledRef.current = true;
        }
      }
    }
  });
};

export default useScrollToHash;