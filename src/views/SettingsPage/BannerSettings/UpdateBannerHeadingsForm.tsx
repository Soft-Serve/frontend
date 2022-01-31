import React, { useState, FormEvent } from "react";
import type { FC, ChangeEvent } from "react";
import { Button, Input } from "@base";
import { useViewport } from "@hooks";
import { BANNERS_QUERY } from "@shared";
import { useUpdateBannerHeaders } from "./UpdateBannerHeadings.mutation";
import { useCreateNewBannerHeaders } from "./CreateNewBannerHeadings.mutation";

interface Props {
  header?: string;
  subHeader?: string;
  id?: number;
  restaurantId?: number;
  themeColour: string;
  themeTint: number;
  restaurantSlug: string;
  photo?: string;
}

type StateMap = {
  [key: string]: string;
};

const UpdateBannerHeadingsForm: FC<Props> = ({
  photo,
  restaurantSlug,
  header,
  subHeader,
  id,
  restaurantId,
  themeColour,
  themeTint,
}) => {
  const { width } = useViewport();
  const [updateBannerHeaders, { loading }] = useUpdateBannerHeaders();
  const [createNewBanner, { loading: createLoading }] = useCreateNewBannerHeaders();

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
    if (id) {
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
    } else {
      createNewBanner({
        variables: {
          input: {
            header: state.header,
            sub_header: state.subHeader,
            restaurant_id: restaurantId || 0,
            photo: photo || "",
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
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="overflow-hidden">
        <div className="bg-white py-5">
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-3">
              <Input
                themeColour={themeColour}
                themeTint={themeTint}
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
                themeColour={themeColour}
                themeTint={themeTint}
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
          <div className="bg-white px-4 py-3 text-right sm:px-6">
            <Button
              loading={loading || createLoading}
              themeColour={themeColour}
              themeTint={themeTint}
              isFullwidth={isTablet}
              size="XL"
              type="submit"
            >
              Update
            </Button>
          </div>
        )}
      </div>
    </form>
  );
};

export { UpdateBannerHeadingsForm };
