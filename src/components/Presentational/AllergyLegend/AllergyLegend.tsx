import React, { FC } from "react";
import { BreadCrumbsNavigation, ThemeFonts } from "@base";
import { Column, Columns } from "@interface";
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
      <Column key={allergy.id} columnWidth="six">
        <AllergyButton
          isAllergyActive={isAllergyActive}
          allergy={allergy}
          themeColour={themeColour}
          themeFont={themeFont}
          themeTint={themeTint}
          handleClick={handleClick}
        />
      </Column>
    ));
  };

  if (data?.allergies && data?.allergies?.length < 1) return <></>;

  return (
    <BreadCrumbsNavigation>
      <Columns className="!flex-col">{renderAllergies()}</Columns>
    </BreadCrumbsNavigation>
  );
};

export { AllergyLegend };
