import React from "react";
export default function useToggle(initial: boolean = false) {
  const [value, setValue] = React.useState<boolean>(initial);
  const toggle = () => setValue((v) => !v);
  const on = () => setValue(true);
  const off = () => setValue(false);
  return { value, toggle, on, off };
}
