import React, { ChangeEvent, FormEvent, useState } from "react";
import type { FC } from "react";
import { Input, Button, Modal, Notification } from "@base";
import toast from "react-hot-toast";

import { ColourPicker } from "@presentational";
import { useRestaurantContext } from "@contexts";
import { RESTAURANT_QUERY } from "@shared";
import { useViewport } from "@hooks";
import { useUpdateRestaurantTheme } from "./UpdateRestautantTheme.mutation";

interface Props {
  id: number;
  logo: string;
  restaurantName: string;
  restaurantThemeColour: string;
  restaurantThemeTint: number;
}

const UpdateRestaurantThemeForm: FC<Props> = ({
  id,
  logo,
  restaurantName,
  restaurantThemeColour,
  restaurantThemeTint,
}) => {
  const [isColourModalOpen, setIsColourModalOpen] = useState(false);
  const { themeColour, themeTint, restaurantSlug } = useRestaurantContext();
  const { width } = useViewport();
  const onSuccess = () => toast.custom(<Notification header="Theme succesfully updated!" />);

  const [input, setInput] = useState({
    logo,
    restaurantName,
  });
  const [currentThemeColour, setCurrentThemeColour] = useState(themeColour);
  const [currentThemeTint, setCurrentThemeTint] = useState(themeTint);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setInput(prevState => ({ ...prevState, [name]: value }));
  };
  const isTablet = width < 592;

  const isThemeColourUpdated = restaurantThemeColour !== themeColour;
  const isThemeTintUpdated = restaurantThemeTint !== themeTint;
  const isNameUpdated = restaurantName !== input.restaurantName;
  const isThemeUpdated = isThemeColourUpdated || isThemeTintUpdated;

  const [updateRestaurantTheme, { loading }] = useUpdateRestaurantTheme({
    onCompleted: () => onSuccess(),
    refetchQueries: [
      {
        query: RESTAURANT_QUERY,
        variables: {
          restaurantSlug,
        },
      },
    ],
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateRestaurantTheme({
      variables: {
        input: {
          id,
          name: input.restaurantName,
          tint: currentThemeTint,
          colour: currentThemeColour,
        },
      },
    });
  };

  const renderUpdateSlugButton = () => {
    if (isNameUpdated || isThemeUpdated) {
      return (
        <div className="px-4 py-3  text-right sm:px-6 mt-4">
          <Button loading={loading} isFullwidth={isTablet} size="XXL" type="submit">
            Update
          </Button>
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <Modal isOpen={isColourModalOpen} onClose={setIsColourModalOpen}>
        <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mr-4">
          Select Restaurant Theme Colour
        </h3>
        <ColourPicker
          setTheme={setCurrentThemeColour}
          setTint={setCurrentThemeTint}
          onClose={setIsColourModalOpen}
        />
      </Modal>
      <form onSubmit={handleSubmit}>
        <Input
          value={input.restaurantName}
          onChange={handleChange}
          labelText="Restaurant name"
          type="text"
          name="restaurantName"
          id="restaurantName"
        />
        <div className="flex items-end">
          <div>
            <span className="font-medium text-gray-900 text-sm">Theme Colour</span>
            <div className={`w-20 h-20 bg-${themeColour}-${themeTint} mr-4 rounded-md mt-2`}>
              <span className="sr-only">colour</span>
            </div>
          </div>
          <Button size="XL" onClick={() => setIsColourModalOpen(true)}>
            select colour
          </Button>
        </div>
        {renderUpdateSlugButton()}
      </form>
    </>
  );
};

export { UpdateRestaurantThemeForm };
