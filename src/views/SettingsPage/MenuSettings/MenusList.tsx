import React from "react";
import type { FC } from "react";
import { Button, Card, CardContent, List, ListItem, SkeletonList } from "@base";
import { Menu } from "@shared";
import { DeleteSVG } from "@svgs";
import { ChevronRightIcon, PencilIcon } from "@heroicons/react/solid";

import { Link } from "react-router-dom";
import { routes } from "@routes";
import { useRestaurantContext } from "@contexts";

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
}
const MenusList: FC<Props> = ({ menus, handleModal, loading, themeColour, themeTint }) => {
  const { restaurantSlug } = useRestaurantContext();
  if (loading) {
    return <SkeletonList />;
  }
  return (
    <Card>
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
                <div className="w-full sm:mr-2 my-1">
                  <Button
                    themeColour={themeColour}
                    themeTint={themeTint}
                    isFullwidth
                    size="S"
                    onClick={() => handleModal(ModalForms.UpdateMenu, menu)}
                  >
                    Edit
                    <PencilIcon className="w-5 h-5 ml-2" />
                  </Button>
                </div>
                <div className="w-full my-1">
                  <Button
                    themeColour={themeColour}
                    themeTint={themeTint}
                    isFullwidth
                    colour="accent"
                    size="S"
                    onClick={() => handleModal(ModalForms.DeleteMenu, menu)}
                  >
                    Delete
                    <DeleteSVG className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              </div>
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export { MenusList };
