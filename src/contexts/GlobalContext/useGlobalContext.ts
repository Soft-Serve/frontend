import { GlobalContext } from "@contexts";
import { useContext } from "react";

const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (context === null) {
    throw new Error("useGlobal context is not being used within a provdider");
  }
  return context;
};

export { useGlobalContext };
