import { RestaurantContext } from "@contexts";
import { useContext } from "react";

const useRestaurantContext = () => {
  const context = useContext(RestaurantContext);
  if (context === null) {
    throw new Error("Restaurant context is not being used within a provdider");
  }
  return context;
};

export { useRestaurantContext };
