import { createContext, Dispatch, SetStateAction } from "react";

interface GlobalContextData {
  menuID: number;
  setMenuID: Dispatch<SetStateAction<number>>;
  categoryID: number;
  setCategoryID: Dispatch<SetStateAction<number>>;
  activeMenu: string;
  setActiveMenu: Dispatch<SetStateAction<string>>;
}

const GlobalContext = createContext<GlobalContextData | null>(null);

export { GlobalContext };
export type { GlobalContextData };
