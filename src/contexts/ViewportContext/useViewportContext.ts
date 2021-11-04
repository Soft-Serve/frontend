import { useContext } from "react";
import { ViewportContext } from "./ViewportContext";

const useViewportContext = () => {
  const context = useContext(ViewportContext);
  if (context === null) throw new Error("useViewportContext is not being used within a provider");
  return context;
};

export { useViewportContext };
