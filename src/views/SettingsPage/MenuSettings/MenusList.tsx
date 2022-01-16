import React from "react";
import type { FC } from "react";
import { Card, CardContent, List, ListItem, SkeletonList } from "@base";
import { Menu } from "@shared";
import { ChevronRightIcon } from "@heroicons/react/solid";

import { Link } from "react-router-dom";
import { routes } from "@routes";
import { MenuDropdown } from "./MenuDropdown";

enum ModalForms {
  UpdateMenu = "updateMenu",
  DeleteMenu = "deleteMenu",
}

interface Props {
  menus?: Menu[];
  handleModal: (modalForm: ModalForms, menu: Menu) => void;
  loading: boolean;
  themeColour: string;
  themeTint: number;
  restaurantSlug: string;
}
const MenusList: FC<Props> = ({
  menus,
  handleModal,
  loading,
  themeColour,
  themeTint,
  restaurantSlug,
}) => {
  if (loading) {
    return <SkeletonList />;
  }
  return (
    <Card css="overflow-visible">
      <CardContent>
        <List>
          {menus?.map(menu => (
            <ListItem key={menu.id}>
              <Link
                className="w-full py-2 cursor-pointer"
                to={`${routes.restaurants}/${restaurantSlug}/settings/items?menu=${menu.name}`}
              >
                <div className="flex-1 flex items-end">
                  <span className="font-bold text-gray-900 font-Quicksand">{menu.name}</span>
                  <ChevronRightIcon className="w-5 h-5" />
                </div>
              </Link>
              <div className="ml-4 flex flex-col lg:flex-row">
                <MenuDropdown
                  themeColour={themeColour}
                  themeTint={themeTint}
                  handleDelete={() => handleModal(ModalForms.DeleteMenu, menu)}
                  handleUpdate={() => handleModal(ModalForms.UpdateMenu, menu)}
                />
              </div>
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export { MenusList };
