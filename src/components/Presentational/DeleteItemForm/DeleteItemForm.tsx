import React, { FormEvent } from "react";
import type { FC } from "react";
import { Item, ItemsData, ITEMS_QUERY } from "@shared";
import { Button } from "@base";
import { XIcon } from "@heroicons/react/solid";
import { useDeleteItemMutation } from "./DeleteItem.mutation";

interface Props {
  onCompleted?: (state: boolean) => void;
  categoryID?: number;
  deletedItem?: Item;
  themeColour: string;
  themeTint: number;
}

const DeleteItemForm: FC<Props> = ({
  onCompleted,
  categoryID,
  deletedItem,
  themeTint,
  themeColour,
}) => {
  const [deleteItem, { loading }] = useDeleteItemMutation({
    onCompleted: () => onCompleted?.(false),
    update(cache, { data: deletedItemData }) {
      const { items } = cache.readQuery({
        query: ITEMS_QUERY,
        variables: {
          categoryID,
        },
      }) as ItemsData;
      cache.writeQuery({
        query: ITEMS_QUERY,
        variables: {
          categoryID,
        },
        data: {
          items: items.filter(item => item.id !== deletedItemData?.deleteItem?.id),
        },
      });
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (deletedItem) {
      deleteItem({
        variables: {
          input: {
            ...deletedItem,
          },
        },
        optimisticResponse: {
          __typename: "Mutation",
          deleteItem: {
            ...deletedItem,
          },
        },
      });
    }
  };

  return (
    <form noValidate onSubmit={handleSubmit}>
      <div className="flex items-center justify-between font-Quicksand">
        <h3 className="mr-4 text-sm font-semibold uppercase tracking-wider text-gray-900">
          Item name:{" "}
          <span className={`font-bold underline text-${themeColour}-${themeTint}`}>
            {deletedItem?.name}
          </span>
        </h3>
        <Button
          themeColour={themeColour}
          themeTint={themeTint}
          onClick={() => onCompleted?.(false)}
          size="S"
        >
          <XIcon className="h-5 w-5" />
        </Button>
      </div>
      <p className="my-8 font-Quicksand text-base text-gray-900 underline">
        This item will be removed from the menu
      </p>

      <div className="mt-4 flex items-center">
        <div className="mr-2 w-full">
          <Button
            themeColour={themeColour}
            themeTint={themeTint}
            colour="accent"
            onClick={() => onCompleted?.(false)}
            size="M"
            isFullwidth
            css="text-center"
          >
            Cancel
          </Button>
        </div>
        <div className="w-full">
          <Button
            themeColour={themeColour}
            themeTint={themeTint}
            loading={loading}
            size="LG"
            isFullwidth
            type="submit"
            css="text-center"
          >
            Delete
          </Button>
        </div>
      </div>
    </form>
  );
};

export { DeleteItemForm };
