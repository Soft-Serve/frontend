import React, { FormEvent } from "react";
import type { FC } from "react";
import { Button, Notification } from "@base";
import { MENUS_QUERY, Menu } from "@shared";
import type { MenusData } from "@shared";
import { XIcon } from "@heroicons/react/solid";
import toast from "react-hot-toast";
import { useRestaurantContext } from "src/contexts";
import { useDeleteMenuMutation } from "./DeleteForm.mutation";

interface Props {
  onCompleted?: (state: boolean) => void;
  selectedMenu?: Menu;
  themeColour: string;
  themeTint: number;
}

const DeleteMenuForm: FC<Props> = ({ onCompleted, selectedMenu, themeColour, themeTint }) => {
  const { restaurantSlug } = useRestaurantContext();
  const onSuccess = () => toast.custom(<Notification header="Menu succesfully deleted!" />);

  const [deleteMenu, { loading }] = useDeleteMenuMutation({
    onCompleted: () => {
      onCompleted?.(false);
      onSuccess();
    },
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
        Are you sure ? You will delete all categories and items within this menu
      </p>
      <div className="flex mt-4">
        <div className="w-full mr-2">
          <Button
            themeColour={themeColour}
            themeTint={themeTint}
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

export { DeleteMenuForm };
