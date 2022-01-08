import React, { ChangeEvent, FormEvent, useState } from "react";
import toast from "react-hot-toast";
import type { FC } from "react";
import { Button, Grid, Input, Notification } from "@base";
import { RESTAURANT_QUERY } from "@shared";
import { useViewport } from "@hooks";
import { useRestaurantContext } from "@contexts";
import { useUpdateRestaurantAddress } from "./UpdateRestaurantAddress.mutation";

interface Props {
  themeColour: string;
  themeTint: number;
  restaurantName: string;
  addressLineOne: string;
  addressLineTwo: string;
  city: string;
  province: string;
  postalCode: string;
  id: number;
}

type StateMap = {
  [key: string]: any;
};

const UpdateRestaurantAddressForm: FC<Props> = ({
  restaurantName,
  addressLineOne,
  addressLineTwo,
  city,
  province,
  postalCode,
  themeColour,
  themeTint,
  id,
}) => {
  const address = {
    restaurantName,
    addressLineOne,
    addressLineTwo,
    city,
    province,
    postalCode,
  } as StateMap;

  const [input, setInput] = useState(address);
  const { restaurantSlug } = useRestaurantContext();
  const { width } = useViewport();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setInput(prevState => ({ ...prevState, [name]: value }));
  };

  const isAddressUpdated = () => {
    if (Object.keys(address).length === Object.keys(input).length) {
      return !Object.keys(address).every(
        key => Object.prototype.hasOwnProperty.call(input, key) && input[key] === address[key]
      );
    }
    return false;
  };
  const onSuccess = () => toast.custom(<Notification header="Slug succesfully updated!" />);

  const [updateRestaurantAddress, { loading }] = useUpdateRestaurantAddress({
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
    updateRestaurantAddress({
      variables: {
        input: {
          id,
          address_line_1: input.addressLineOne,
          address_line_2: input.addressLineTwo,
          postal_code: input.postalCode,
          city: input.city,
          province: input.province,
        },
      },
    });
  };

  const renderUpdateSlugButton = () => {
    if (isAddressUpdated()) {
      return (
        <div className="px-4 py-3  text-right sm:px-6 mt-4">
          <Button
            themeColour={themeColour}
            themeTint={themeTint}
            loading={loading}
            size="XXL"
            isFullwidth={width < 1024}
            type="submit"
          >
            <span className="font-Quicksand">Update</span>
          </Button>
        </div>
      );
    }
    return null;
  };

  const gridSize = () => {
    if (width > 1300) return "LG";
    if (width < 1300 && width > 1024) return "M";
    if (width < 1024) return "LG";
    return "SM";
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <Grid size={gridSize()}>
        <Input
          themeColour={themeColour}
          themeTint={themeTint}
          value={input.restaurantName || ""}
          onChange={handleChange}
          labelText="Restaurant name"
          type="text"
          name="restaurantName"
          id="restaurantName"
        />

        <Input
          themeColour={themeColour}
          themeTint={themeTint}
          labelText="Address line 1"
          type="text"
          name="addressLineOne"
          id="addressLineOne"
          onChange={handleChange}
          value={input.addressLineOne || ""}
        />

        <Input
          themeColour={themeColour}
          themeTint={themeTint}
          labelText="Address line 2"
          type="text"
          name="addressLineTwo"
          id="addressLineTwo"
          onChange={handleChange}
          value={input.addressLineTwo || ""}
          autoComplete="addressLineTwo"
        />

        <Input
          themeColour={themeColour}
          themeTint={themeTint}
          labelText="City"
          type="text"
          name="city"
          id="city"
          onChange={handleChange}
          value={input.city || ""}
        />

        <Input
          themeColour={themeColour}
          themeTint={themeTint}
          labelText="Province"
          type="text"
          name="province"
          id="province"
          onChange={handleChange}
          value={input.province || ""}
        />

        <Input
          themeColour={themeColour}
          themeTint={themeTint}
          labelText="Postal code"
          type="text"
          name="postalCode"
          id="postalCode"
          onChange={handleChange}
          value={input.postalCode || ""}
        />
      </Grid>

      {renderUpdateSlugButton()}
    </form>
  );
};

export { UpdateRestaurantAddressForm };
