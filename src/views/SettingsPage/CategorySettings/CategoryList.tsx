import React from "react";
import type { FC } from "react";
import { Link } from "react-router-dom";
import { Button, Card, CardContent, List, ListItem, SkeletonList } from "@base";
import { Category, Menu } from "@shared";
import { UpdateSVG, DeleteSVG } from "src/svgs";
import { routes } from "@routes";
import { useRestaurantContext } from "@contexts";

enum ModalForms {
  UpdateCategory = "updateCategory",
  DeleteCategory = "deleteCategory",
}

interface Props {
  activeMenu?: Menu;
  categories?: Category[];
  handleModal: (modalForm: ModalForms, category?: Category) => void;
  loading: boolean;
}
const CategoryList: FC<Props> = ({ categories, handleModal, loading, activeMenu }) => {
  const { restaurantSlug } = useRestaurantContext();

  if (loading) {
    return <SkeletonList />;
  }
  return (
    <Card css="mt-4">
      <CardContent>
        <List>
          {categories?.map(category => (
            <ListItem key={category.id}>
              <div className="w-0 flex-1 flex items-center">
                <Link
                  to={`${routes.settings}/${restaurantSlug}/items?menu=${activeMenu?.name}&category=${category.name}`}
                >
                  <span className="ml-2 flex-1 w-0 font-medium">{category.name}</span>
                </Link>
              </div>
              <div className="ml-4 flex flex-col sm:flex-row">
                <div className="w-full sm:mr-2 my-1">
                  <Button
                    isFullwidth
                    size="XS"
                    onClick={() => handleModal(ModalForms.UpdateCategory, category)}
                  >
                    <span className="mr-4 text-base">Update</span>
                    <UpdateSVG className="w-5 h-5" />
                  </Button>
                </div>
                <div className="w-full my-1">
                  <Button
                    isFullwidth
                    colour="accent"
                    size="XS"
                    onClick={() => handleModal(ModalForms.DeleteCategory, category)}
                  >
                    <span className="mr-4 text-base">Delete</span>
                    <DeleteSVG className="w-5 h-5" />
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
