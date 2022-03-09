import { useCallback, useState, useRef } from 'react';

export default function useInfiniteScrolling(isLoading, options = null) {
  const [isNextFetched, setNextFetched] = useState(false);
  const observer = useRef();
  const lastElementRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setNextFetched(true);
        }
      }, options);
      if (node) observer.current.observe(node);
    },
    [isLoading, options]
  );
  return [lastElementRef, isNextFetched, setNextFetched];
}
