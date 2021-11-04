import { createContext } from "react";
import type { Allergy, Dispatch } from "./types";

interface AllergyContextData {
  activeAllergies: Allergy[];
  dispatch: Dispatch;
  isAllergyActive: (allergy: Allergy) => boolean;
}

const AllergyContext = createContext<AllergyContextData | null>(null);

export { AllergyContext };

export type { AllergyContextData };
