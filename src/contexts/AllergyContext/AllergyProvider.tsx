import React, { useReducer } from "react";
import type { FC } from "react";
import { AllergyContext } from "@contexts";
import type { Allergy, Action } from "./types";
import { ACTION_TYPES } from "./types";

const AllergyProvider: FC = ({ children }) => {
  const reducer = (activeAllergies: Allergy[], action: Action) => {
    switch (action.type) {
      case ACTION_TYPES.ADD:
        return [...activeAllergies, action.payload];

      case ACTION_TYPES.REMOVE:
        return [...activeAllergies.filter(activeAllergy => activeAllergy.id !== action.payload.id)];

      default:
        return activeAllergies;
    }
  };
  const [activeAllergies, dispatch] = useReducer(reducer, []);

  const isAllergyActive = (allergy: Allergy) => {
    return !!activeAllergies.find(activeAllergy => activeAllergy.id === allergy.id);
  };

  return (
    <AllergyContext.Provider
      value={{
        isAllergyActive,
        activeAllergies,
        dispatch,
      }}
    >
      {children}
    </AllergyContext.Provider>
  );
};
export { AllergyProvider };
