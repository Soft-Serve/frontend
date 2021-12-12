import { createContext, Dispatch, SetStateAction } from "react";

interface RestaurantContextData {
  restaurantSlug: string;
  setRestaurantSlug: Dispatch<SetStateAction<string>>;
  themeColour: string;
  setThemeColour: Dispatch<SetStateAction<string>>;
  themeFont: string;
  setThemeFont: Dispatch<SetStateAction<string>>;
  themeTint: number;
  setThemeTint: Dispatch<SetStateAction<number>>;
}

const RestaurantContext = createContext<RestaurantContextData | null>(null);

export { RestaurantContext };
export type { RestaurantContextData };
