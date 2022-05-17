import React, { useReducer } from "react";
import type { FC } from "react";
import { AllergyContext } from "@contexts";
import type { Allergy, Action } from "./types";
import { ActionTypes } from "./types";

export enum LifeStyles {
  Vegan = "Vegan",
  Vegeterian = "Vegetarian",
}

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

interface Props {
  children: React.ReactNode;
}

const isAllergyVegetarianOrVegan = (name: string) =>
  name === LifeStyles.Vegan || name === LifeStyles.Vegeterian;

const AllergyProvider: FC<Props> = ({ children }) => {
  const [activeAllergies, dispatch] = useReducer(reducer, []);
  const isUserVegan = activeAllergies.some(allergy => allergy.name === "Vegan");
  const isUserVegetarian = activeAllergies.some(allergy => allergy.name === "Vegetarian");

  const isAllergyActive = (allergy: Allergy) => {
    return !!activeAllergies.find(activeAllergy => activeAllergy.id === allergy.id);
  };

  return (
    <AllergyContext.Provider
      value={{
        isAllergyVegetarianOrVegan,
        isUserVegan,
        isUserVegetarian,
        activeAllergies,
        isAllergyActive,
        dispatch,
      }}
    >
      {children}
    </AllergyContext.Provider>
  );
};
export { AllergyProvider };
