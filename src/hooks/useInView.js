import { useEffect, useState } from "react";

export function useInView(threshold = 0.2) {
  const [node, setNode] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!node) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [node, threshold]);

  return [setNode, visible];
}
