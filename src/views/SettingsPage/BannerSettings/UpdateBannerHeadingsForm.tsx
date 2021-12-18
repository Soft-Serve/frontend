import React, { useState, FormEvent } from "react";
import type { FC, ChangeEvent } from "react";
import { Button, Input } from "@base";
import { useViewport } from "@hooks";
import { BANNERS_QUERY } from "@shared";
import { useRestaurantContext } from "@contexts";
import { useUpdateBannerHeaders } from "./UpdateBannerHeadings.mutation";

interface Props {
  header?: string;
  subHeader?: string;
  id?: number;
  restaurantId?: number;
}

type StateMap = {
  [key: string]: string;
};

const UpdateBannerHeadingsForm: FC<Props> = ({ header, subHeader, id, restaurantId }) => {
  const { width } = useViewport();
  const [updateBannerHeaders] = useUpdateBannerHeaders();
  const { restaurantSlug } = useRestaurantContext();

  const isTablet = width < 550;
  const bannerHeadings = {
    header: header || "",
    subHeader: subHeader || "",
  } as StateMap;

  const [state, setState] = useState(bannerHeadings);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setState(prevState => ({ ...prevState, [name]: value }));
  };

  const isFieldsUpdated = () => {
    if (Object.keys(bannerHeadings).length === Object.keys(state).length) {
      return !Object.keys(bannerHeadings).every(
        key =>
          Object.prototype.hasOwnProperty.call(state, key) && state[key] === bannerHeadings[key]
      );
    }
    return false;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateBannerHeaders({
      variables: {
        input: {
          header: state.header,
          sub_header: state.subHeader,
          id: id || 0,
          restaurantId: restaurantId || 0,
        },
      },
      refetchQueries: [
        {
          query: BANNERS_QUERY,
          variables: {
            restaurantSlug,
          },
        },
      ],
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="overflow-hidden">
        <div className="py-5 bg-white">
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-3">
              <Input
                onChange={handleChange}
                value={state.header}
                labelText="Header"
                type="text"
                name="header"
                id="header"
                autoComplete="header"
              />
            </div>

            <div className="col-span-6 sm:col-span-3">
              <Input
                onChange={handleChange}
                value={state.subHeader}
                labelText="SubHeader"
                type="text"
                name="subHeader"
                id="subHeader"
                autoComplete="header"
              />
            </div>
          </div>
        </div>
        {isFieldsUpdated() && (
          <div className="px-4 py-3 bg-white text-right sm:px-6">
            <Button isFullwidth={isTablet} size="XL" type="submit">
              Update
            </Button>
          </div>
        )}
      </div>
    </form>
  );
};

export { UpdateBannerHeadingsForm };
