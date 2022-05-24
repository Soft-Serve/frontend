import React, { FC } from "react";
import { BreadCrumbsNavigation, ThemeFonts } from "@base";
import { useAllergyContext } from "@contexts";
import { Allergy, useAllergiesQuery } from "@shared";
import { ActionTypes } from "src/contexts/AllergyContext/types";
import Skeleton from "react-loading-skeleton";
import { AllergyButton } from "./AllergyButton";

interface Props {
  themeColour: string;
  themeTint: number;
  themeFont: ThemeFonts;
  restaurantSlug: string;
}

const AllergyLegend: FC<Props> = ({ themeColour, themeTint, themeFont, restaurantSlug }) => {
  const { dispatch, activeAllergies } = useAllergyContext();

  const isAllergyActive = (currentAllergy: Allergy) =>
    !!activeAllergies.find(activeAllergy => activeAllergy.id === currentAllergy.id);

  const handleClick = (allergy: Allergy) => {
    return isAllergyActive(allergy)
      ? dispatch({ type: ActionTypes.REMOVE, payload: allergy })
      : dispatch({ type: ActionTypes.ADD, payload: allergy });
  };

  const { data, loading } = useAllergiesQuery({
    variables: {
      restaurantSlug,
      active: true,
    },
  });

  const renderAllergies = () => {
    if (loading) {
      return (
        <>
          {[...new Array(3)].map((_, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <div key={index} className="mx-2">
              <Skeleton width={120} height={40} />
            </div>
          ))}
        </>
      );
    }
    return data?.allergies?.map(allergy => (
      <AllergyButton
        key={allergy.id}
        isAllergyActive={isAllergyActive}
        allergy={allergy}
        themeColour={themeColour}
        themeFont={themeFont}
        themeTint={themeTint}
        handleClick={handleClick}
      />
    ));
  };

  if (data?.allergies && data?.allergies?.length < 1) return <></>;

  return (
    <BreadCrumbsNavigation>
      <div className="min-w-0 flex-1"></div>
      <div className="h-96 overflow-scroll rounded-md border-2 border-white p-2">
        {renderAllergies()}
      </div>
    </BreadCrumbsNavigation>
  );
};

export { AllergyLegend };
