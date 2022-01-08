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
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mr-4">
          Item name: <span className="font-bold underline text-red-400">{deletedItem?.name}</span>
        </h3>
        <Button
          themeColour={themeColour}
          themeTint={themeTint}
          onClick={() => onCompleted?.(false)}
          size="S"
          colour="accent"
        >
          <XIcon className="w-5 h-5" />
        </Button>
      </div>
      <p className="mt-4 text-base text-gray-400">
        Are you sure ? This item will be removed from the menu
      </p>

      <div className="flex items-center mt-4">
        <div className="flex-1 mr-2">
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
        <div className="flex-1 ml-2">
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
