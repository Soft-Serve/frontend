import React, { FormEvent, useState } from "react";
import type { FC } from "react";
import toast from "react-hot-toast";
import { AttachedLabelInput, Button, Notification } from "@base";
import { useViewport } from "@hooks";
import { isNameOnlyNumbers } from "@utility";
import { useUpdateRestaurantSlug } from "./UpdateRestaurantSlug.mutation";

interface Props {
  slug: string;
  id: number;
  themeColour: string;
  themeTint: number;
}
const slugRegex = new RegExp(/^[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*$/);

const UpdateRestaurantSlugForm: FC<Props> = ({ slug, id, themeColour, themeTint }) => {
  const [slugState, setSlugState] = useState(slug);
  const { width } = useViewport();

  const isTablet = width < 550;
  const isBasicSlugValid = (newSlug: string) => slugRegex.test(newSlug);
  const isSlugUpdated = slugState !== slug;

  const isValidSlug = isBasicSlugValid(slugState) && !isNameOnlyNumbers(slugState) && isSlugUpdated;

  const renderUpdateSlugButton = () => {
    if (!isValidSlug) return null;
    return (
      <div className="px-4 py-3  text-right sm:px-6 mt-4">
        <Button
          themeColour={themeColour}
          themeTint={themeTint}
          size="XXL"
          isFullwidth={isTablet}
          type="submit"
        >
          <span className="font-Quicksand font-bold">Update</span>
        </Button>
      </div>
    );
  };

  const onSuccess = () => toast.custom(<Notification header="Slug succesfully updated!" />);

  const [updateRestaurantSlug] = useUpdateRestaurantSlug({
    onCompleted: completedData => {
      window.location.assign(`/settings/${completedData?.updateRestaurantSlug?.slug}/restaurant`);
      onSuccess();
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateRestaurantSlug({
      variables: {
        input: {
          slug: slugState,
          id,
        },
      },
    });
  };

  const renderError = () => {
    if (isNameOnlyNumbers(slugState)) {
      return (
        <div
          className="mt-2 text-sm text-white font-bold p-2 text-center bg-red-600 rounded-md"
          id="email-error"
        >
          Slug can not only contain numbers
        </div>
      );
    }
    if (isBasicSlugValid(slugState)) return null;
    return (
      <div
        className="mt-2 text-sm text-white font-bold p-2 text-center bg-red-600 rounded-md"
        id="email-error"
      >
        slug can not end with dash or contain any spaces
      </div>
    );
  };

  return (
    <form className="p-4" onSubmit={handleSubmit}>
      <AttachedLabelInput
        themeColour={themeColour}
        themeTint={themeTint}
        label="Slug"
        attachedLabel="softserveapp.com/restaurants/"
        id="slug"
        value={slugState}
        onChange={e => setSlugState(e.target.value)}
      />
      {renderUpdateSlugButton()}
      {renderError()}
    </form>
  );
};

export { UpdateRestaurantSlugForm };
