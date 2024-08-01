import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type CodeStore = {
  code: string | null;
  setCode: (code: string) => void;
};

/**
 * A hook for getting and setting the current theme preference.
 */
const useCodeStore = create(
  persist<CodeStore>(
    (set) => ({
      code: null,
      setCode: (code: string) => set({ code }),
    }),
    {
      name: "saved-code-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCodeStore;
