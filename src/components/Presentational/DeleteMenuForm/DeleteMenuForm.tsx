import React, { FormEvent } from "react";
import type { FC } from "react";
import { Button, Notification } from "@base";
import { Columns, Column } from "@interface";
import { MENUS_QUERY, Menu } from "@shared";
import type { MenusData } from "@shared";
import { XIcon } from "@heroicons/react/solid";
import toast from "react-hot-toast";
import { useDeleteMenuMutation } from "./DeleteForm.mutation";

interface Props {
  onCompleted?: (state: boolean) => void;
  selectedMenu?: Menu;
  themeColour: string;
  themeTint: number;
  restaurantSlug: string;
}

const DeleteMenuForm: FC<Props> = ({
  onCompleted,
  selectedMenu,
  themeColour,
  themeTint,
  restaurantSlug,
}) => {
  const onSuccess = () => toast.custom(<Notification header="Menu succesfully deleted!" />);

  const [deleteMenu, { loading }] = useDeleteMenuMutation({
    onCompleted: () => {
      onCompleted?.(false);
      onSuccess();
    },
    update(cache, { data: deletedMenuData }) {
      const { menus } =
        cache.readQuery<MenusData>({
          query: MENUS_QUERY,
          variables: {
            restaurantSlug,
          },
        }) ?? {};

      cache.writeQuery<MenusData>({
        query: MENUS_QUERY,
        variables: {
          restaurantSlug,
        },
        data: {
          menus: menus?.filter(menu => menu.id !== deletedMenuData?.deleteMenu.id) || [],
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
      <div className="flex items-center justify-between">
        <h3 className="mr-4 text-sm font-semibold uppercase tracking-wider text-gray-900">
          Menu name:{" "}
          <span className={`font-bold underline text-${themeColour}-${themeTint}`}>
            {selectedMenu?.name}
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
        All items and categories within this menu will be deleted!
      </p>
      <Columns isMarginless>
        <Column>
          <Button
            themeColour={themeColour}
            themeTint={themeTint}
            colour="accent"
            onClick={() => onCompleted?.(false)}
            size="M"
            css="text-center"
          >
            Cancel
          </Button>
        </Column>
        <Column>
          <Button
            themeColour={themeColour}
            themeTint={themeTint}
            loading={loading}
            size="LG"
            type="submit"
            css="text-center"
          >
            Delete
          </Button>
        </Column>
      </Columns>
    </form>
  );
};

export { DeleteMenuForm };
