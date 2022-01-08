import React from "react";
import type { FC } from "react";
import { Link } from "react-router-dom";
import { Button, Card, CardContent, List, ListItem, SkeletonList } from "@base";
import { Category, Menu } from "@shared";
import { DeleteSVG } from "@svgs";
import { routes } from "@routes";
import { ChevronRightIcon, PencilIcon } from "@heroicons/react/solid";

enum ModalForms {
  UpdateCategory = "updateCategory",
  DeleteCategory = "deleteCategory",
}

interface Props {
  activeMenu?: Menu;
  categories?: Category[];
  handleModal: (modalForm: ModalForms, category?: Category) => void;
  loading: boolean;
  themeColour: string;
  themeTint: number;
  restaurantSlug: string;
}
const CategoryList: FC<Props> = ({
  categories,
  handleModal,
  loading,
  activeMenu,
  themeColour,
  restaurantSlug,
  themeTint,
}) => {
  if (loading) {
    return <SkeletonList />;
  }
  return (
    <Card css="mt-4">
      <CardContent>
        <List>
          {categories
            ?.filter(category => category.name !== "No category")
            ?.map(category => (
              <ListItem key={category.id}>
                <Link
                  className="w-full py-2 cursor-pointer"
                  to={`${routes.restaurants}/${restaurantSlug}/settings/items?menu=${activeMenu?.name}&category=${category.name}`}
                >
                  <div className="flex-1 flex items-end">
                    <span className="font-bold font-Quicksand">{category.name}</span>
                    <ChevronRightIcon className="w-5 h-5" />
                  </div>
                </Link>
                <div className="ml-4 flex flex-col sm:flex-row">
                  <div className="w-full sm:mr-2 my-1">
                    <Button
                      themeColour={themeColour}
                      themeTint={themeTint}
                      isFullwidth
                      size="S"
                      onClick={() => handleModal(ModalForms.UpdateCategory, category)}
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
                      onClick={() => handleModal(ModalForms.DeleteCategory, category)}
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

export { CategoryList };
