import { Button } from "@base";
import React, { FormEvent } from "react";
import type { FC } from "react";
import { MENUS_QUERY, Menu } from "@shared";
import type { MenusData } from "@shared";
import { XIcon } from "@heroicons/react/solid";
import { useRestaurantContext } from "src/contexts";
import { useDeleteMenuMutation } from "./DeleteForm.mutation";

interface Props {
  onCompleted?: (state: boolean) => void;
  selectedMenu?: Menu;
}

const DeleteMenuForm: FC<Props> = ({ onCompleted, selectedMenu }) => {
  const { restaurantSlug } = useRestaurantContext();

  const [deleteMenu, { loading }] = useDeleteMenuMutation({
    onCompleted: () => onCompleted?.(false),
    update(cache, { data: deletedMenuData }) {
      const { menus } = cache.readQuery({
        query: MENUS_QUERY,
        variables: {
          restaurantSlug,
        },
      }) as MenusData;
      cache.writeQuery({
        query: MENUS_QUERY,
        variables: {
          restaurantSlug,
        },
        data: {
          menus: menus.filter(menu => menu.id !== deletedMenuData?.deleteMenu.id),
        },
      });
    },
  });

  const handleDeleteMenu = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    deleteMenu({
      variables: {
        input: {
          ...selectedMenu,
        },
      },
      optimisticResponse: {
        __typename: "Mutation",
        deleteMenu: {
          ...selectedMenu,
        },
      },
    });
  };

  return (
    <form noValidate onSubmit={handleDeleteMenu}>
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mr-4">
          Menu name: <span className="font-bold underline text-red-400">{selectedMenu?.name}</span>
        </h3>
        <Button onClick={() => onCompleted?.(false)} size="S" colour="accent">
          <XIcon className="w-5 h-5" />
        </Button>
      </div>
      <p className="mt-4 text-base text-gray-400">
        Are you sure ? You will delete all categories and items within this menu
      </p>
      <div className="flex mt-4">
        <div className="w-full mr-2">
          <Button
            colour="accent"
            onClick={() => onCompleted?.(false)}
            size="M"
            isFullwidth
            type="submit"
            css="text-center"
          >
            Cancel
          </Button>
        </div>
        <div className="w-full">
          <Button loading={loading} size="LG" isFullwidth type="submit" css="text-center">
            Delete
          </Button>
        </div>
      </div>
    </form>
  );
};

export { DeleteMenuForm };
