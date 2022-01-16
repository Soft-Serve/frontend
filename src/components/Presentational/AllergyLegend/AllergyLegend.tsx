import React, { FC } from "react";
import { BreadCrumbsNavigation, DietarySvg, Toggle } from "@base";
import { useAllergyContext } from "@contexts";
import { Allergy, useAllergiesQuery } from "@shared";
import { ActionTypes } from "src/contexts/AllergyContext/types";
import Skeleton from "react-loading-skeleton";
import { classnames } from "tailwindcss-classnames";

interface Props {
  themeColour: string;
  themeTint: number;
  themeFont: string;
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
    return (
      <>
        {data?.allergies?.map(allergy => (
          <div key={allergy.id} className={`w-full`}>
            <div
              className={`flex whitespace-nowrap rounded-md p-2 items-center w-full bg-white my-2 justify-between border-2 border-${themeColour}-${themeTint}`}
              onKeyDown={() => handleClick(allergy)}
              role="button"
              onClick={() => handleClick(allergy)}
              tabIndex={0}
            >
              <div key={allergy.id} className="inline-flex items-center">
                <div className="flex items-center">
                  {DietarySvg(
                    allergy,
                    themeColour,
                    themeTint,
                    classnames("mx-1", "text-white", "w-8", "h-8", "p-2")
                  )}
                  <span className={`font-${themeFont} font-bold ml-2`}>{allergy.name}</span>
                </div>
              </div>
              <Toggle
                themeColour={themeColour}
                themeTint={themeTint}
                isEnabled={isAllergyActive(allergy)}
              />
            </div>
          </div>
        ))}
      </>
    );
  };

  if (data?.allergies && data?.allergies?.length < 1) return <></>;

  return (
    <BreadCrumbsNavigation>
      <div className={`w-full  flex flex-col`}>{renderAllergies()}</div>
    </BreadCrumbsNavigation>
  );
};

export { AllergyLegend };
