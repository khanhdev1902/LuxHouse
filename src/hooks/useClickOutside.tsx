import React from "react";

export default function useClickOutside(
  ref: React.RefObject<HTMLElement | null>,
  callback: () => void
) {
  React.useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node))
        callback();
    }
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [ref, callback]);
}
