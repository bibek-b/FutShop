import { useEffect } from "react";

export const useClickOutside = (refs, onOutsideClick) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      const refArray = Array.isArray(refs) ? refs : [refs];

      const isClickedInside = refArray.some((ref) =>
        ref.current.contains(event.target),
      );

      if (!isClickedInside) {
        onOutsideClick();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [refs, onOutsideClick]);
};
