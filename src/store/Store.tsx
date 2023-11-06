import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Data } from "../types/Data";

type State = {
  favoriteWaifus: Data[];
};

type Actions = {
  setFavoriteWaifus: (favoriteWaifus: Data[]) => void;
};

export const useWaifuData = create(
  persist<State & Actions>(
    (set) => ({
      favoriteWaifus: [],

      // setters
      setFavoriteWaifus: (favoriteWaifus: Data[]) =>
        set(() => ({
          favoriteWaifus,
        })),
    }),
    { name: "waifuData" },
  ),
);
