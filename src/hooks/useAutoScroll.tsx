import React from "react";

export default function useAutoScroll<T extends HTMLElement | null>(
  ref: React.RefObject<T>,
  deps: any[],
  toBottom: boolean = false,
  offset: number = 20
) {
  const [isAtBottom, setIsAtBottom] = React.useState(true);
  const scrollToEdge = () => {
    const el = ref.current;
    if (!el) return;
    el.scrollTo({
      top: toBottom ? el.scrollHeight : 0,
      behavior: "smooth",
    });
  };
  const updateScrollState = () => {
    const el = ref.current;
    if (!el) return;
    const { scrollTop, scrollHeight, clientHeight } = el;
    const isBottom = scrollHeight - scrollTop - clientHeight <= offset;
    setIsAtBottom(isBottom);
  };
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    scrollToEdge();
    el.addEventListener("scroll", updateScrollState);
    updateScrollState();
    return () => el.removeEventListener("scroll", updateScrollState);
  }, [...deps, toBottom]);
  return { isAtBottom, scrollToEdge };
}
