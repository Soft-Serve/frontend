import { createContext, Dispatch, SetStateAction } from "react";

interface GlobalContextData {
  restaurantSlug: string;
  setRestaurantSlug: Dispatch<SetStateAction<string>>;
  themeColour: string;
  setThemeColour: Dispatch<SetStateAction<string>>;
  themeTint: number;
  setThemeTint: Dispatch<SetStateAction<number>>;
  textColour: string;
  setTextColour: Dispatch<SetStateAction<string>>;
  menuID: number;
  setMenuID: Dispatch<SetStateAction<number>>;
  categoryID: number;
  setCategoryID: Dispatch<SetStateAction<number>>;
  activeMenu: string;
  setActiveMenu: Dispatch<SetStateAction<string>>;
  currentUser: any;
  setCurrentUser: Dispatch<SetStateAction<any>>;
}

const GlobalContext = createContext<GlobalContextData | null>(null);

export { GlobalContext };
export type { GlobalContextData };
