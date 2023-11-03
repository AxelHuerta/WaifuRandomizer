import { create } from "zustand";
import { persist } from "zustand/middleware";

type State = {
  favoriteWaifus: string[];
};

type Actions = {
  setFavoriteWaifus: (favoriteWaifus: string[]) => void;
};

export const useWaifuData = create(
  persist<State & Actions>(
    (set) => ({
      favoriteWaifus: [],

      // setters
      setFavoriteWaifus: (favoriteWaifus: string[]) =>
        set(() => ({
          favoriteWaifus,
        })),
    }),
    { name: "waifuData" },
  ),
);
