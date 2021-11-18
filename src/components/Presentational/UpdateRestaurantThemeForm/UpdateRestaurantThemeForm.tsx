import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import type { FC } from "react";
import { Input, Button, UploadImageBox, Modal } from "@base";
import { ColourPicker, ItemImage } from "@presentational";
import { useRestaurantContext } from "@contexts";
import { RESTAURANT_QUERY } from "@shared";
import { useUploadPhoto, useViewport } from "@hooks";
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
  const { photoFile, setPhotoFile, fetchPhoto } = useUploadPhoto();
  const { width } = useViewport();

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
  const isLogoUpdated = logo !== input.logo;
  const isThemeUpdated = isThemeColourUpdated || isThemeTintUpdated;

  useEffect(() => {
    if (!photoFile) return;

    const updateLogoState = async () => {
      const newLogo = await fetchPhoto();
      setInput(prevState => ({ ...prevState, newLogo }));
    };

    updateLogoState();
  }, [photoFile, fetchPhoto]);

  const [updateRestaurantTheme, { loading }] = useUpdateRestaurantTheme({
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
          logo: input.logo,
        },
      },
    });
  };

  const renderUpdateSlugButton = () => {
    if (isNameUpdated || isThemeUpdated || isLogoUpdated) {
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
        <div>
          <label className="text-sm font-medium text-gray-900 block my-4">Restaurant Logo</label>
          <div className="flex items-center w-full justify-between flex-wrap">
            <div className="m-2">
              <ItemImage photoUrl={input.logo} />
            </div>
            <UploadImageBox onChange={setPhotoFile} imageFile={photoFile} />
          </div>
        </div>
        {renderUpdateSlugButton()}
      </form>
    </>
  );
};

export { UpdateRestaurantThemeForm };
