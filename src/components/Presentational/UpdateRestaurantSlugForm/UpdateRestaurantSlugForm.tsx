import React, { FormEvent, useState } from "react";
import type { FC } from "react";
import toast from "react-hot-toast";
import { AttachedLabelInput, Button, Notification } from "@base";
import { useViewport } from "@hooks";
import { useUpdateRestaurantSlug } from "./UpdateRestaurantSlug.mutation";

interface Props {
  slug: string;
  id: number;
}

const UpdateRestaurantSlugForm: FC<Props> = ({ slug, id }) => {
  const [slugState, setSlugState] = useState(slug);
  const { width } = useViewport();

  const isTablet = width < 550;

  const renderUpdateSlugButton = () => {
    if (slug === slugState) return null;
    return (
      <div className="px-4 py-3  text-right sm:px-6 mt-4">
        <Button size="XXL" isFullwidth={isTablet} type="submit">
          Update
        </Button>
      </div>
    );
  };

  const onSuccess = () => toast.custom(<Notification header="Slug succesfully updated!" />);

  const [updateRestaurantSlug] = useUpdateRestaurantSlug({
    onCompleted: completedData => {
      window.location.assign(`/settings/${completedData.updateRestaurantSlug.slug}/restaurant`);
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

  return (
    <form className="p-4" onSubmit={handleSubmit}>
      <AttachedLabelInput
        label="Slug"
        attachedLabel="www.softserve.com/restaurants/"
        id="slug"
        value={slugState}
        onChange={e => setSlugState(e.target.value)}
      />
      {renderUpdateSlugButton()}
    </form>
  );
};

export { UpdateRestaurantSlugForm };
