import { create } from "zustand";

interface DrawerState {
  drawerOpen: boolean;
  toggleDrawer: () => void;
}

export const useDrawerStore = create<DrawerState>((set) => ({
  drawerOpen: false,
  toggleDrawer: () =>
    set((state) => ({
      drawerOpen: !state.drawerOpen,
    })),
}));
