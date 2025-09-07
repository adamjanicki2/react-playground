import { useEffect } from "react";

export default function useTitle(title: string | undefined) {
  useEffect(() => {
    if (title) {
      document.title = title;
    }
  }, [title]);
}
