import React, { useReducer } from "react";
import type { FC } from "react";
import { AllergyContext } from "@contexts";
import type { Allergy, Action } from "./types";
import { ActionTypes } from "./types";

const reducer = (activeAllergies: Allergy[], action: Action) => {
  switch (action.type) {
    case ActionTypes.ADD:
      return [...activeAllergies, action.payload];

    case ActionTypes.REMOVE:
      return [...activeAllergies.filter(activeAllergy => activeAllergy.id !== action.payload.id)];

    default:
      return activeAllergies;
  }
};

const AllergyProvider: FC = ({ children }) => {
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
