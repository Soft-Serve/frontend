import { BoxSection, Button } from "@base";
import type { FC } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRightIcon } from "@heroicons/react/solid";

interface Props {
  isAdmin: boolean;
  restaurantSlug: string;
  themeColour: string;
  themeTint: number;
}

const NoItemsCTA: FC<Props> = ({ themeColour, themeTint, restaurantSlug, isAdmin }) => {
  const navigate = useNavigate();

  if (isAdmin) {
    return (
      <BoxSection>
        <div className="flex flex-col items-center justify-center font-Quicksand sm:mx-auto sm:w-full sm:max-w-md">
          <h4 className={`text-bold m-8 text-center text-2xl ${themeColour}-${themeTint}`}>
            No menu items yet!
          </h4>
          <p className={`mb-8 text-center ${themeColour}-${themeTint}`}>
            Continue to the settings page to add Items to this category
          </p>
          <div className={`flex w-full justify-around ${themeColour}-${themeTint}`}>
            <Button
              themeColour={themeColour}
              themeTint={themeTint}
              size="XXL"
              onClick={() =>
                navigate(`/restaurants/${restaurantSlug}/settings/items`, { replace: true })
              }
            >
              Add items
              <ArrowRightIcon className="ml-2 h-5 w-5 text-white" />
            </Button>
          </div>
        </div>
      </BoxSection>
    );
  }
  return (
    <div className={`bg-${themeColour}-${themeTint} rounded-md`}>
      <div className="mx-auto max-w-2xl  py-16 px-4 text-center sm:py-20 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
          <span className="block">No items to show</span>
        </h2>
        <p className="mt-4 text-lg leading-6 text-white">
          Our apologies, this might still be under construction, please come back soon!
        </p>
      </div>
    </div>
  );
};

export { NoItemsCTA };
