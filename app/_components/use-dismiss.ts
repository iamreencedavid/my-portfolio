import { useEffect, type RefObject } from "react";

// While `open`, Escape closes; with `ref`, so does a pointer-down outside it.
// Takes the state setter (stable) so the listeners attach once per opening.
export function useDismiss(
  open: boolean,
  setOpen: (open: boolean) => void,
  ref?: RefObject<HTMLElement | null>,
) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onPointer = (e: PointerEvent) => {
      if (!ref?.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    if (ref) document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open, setOpen, ref]);
}
