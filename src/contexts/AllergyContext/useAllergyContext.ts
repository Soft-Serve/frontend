import { useContext } from "react";
import { AllergyContext } from "@contexts";

const useAllergyContext = () => {
  const context = useContext(AllergyContext);
  if (context === null) throw new Error("useAllergyContext is not being used within a provider");
  return context;
};

export { useAllergyContext };
