import React from "react";
import type { FC } from "react";
import { Button, Card, CardContent, List, ListItem, SkeletonList } from "@base";
import { Menu } from "@shared";
import { UpdateSVG, DeleteSVG } from "src/svgs";

enum ModalForms {
  UpdateMenu = "updateMenu",
  DeleteMenu = "deleteMenu",
}

interface Props {
  menus?: Menu[];
  handleModal: (modalForm: ModalForms, menu: Menu) => void;
  loading: boolean;
}
const MenusList: FC<Props> = ({ menus, handleModal, loading }) => {
  if (loading) {
    return <SkeletonList />;
  }
  return (
    <Card>
      <CardContent>
        <List>
          {menus?.map(menu => (
            <ListItem key={menu.id}>
              <div className="w-0 flex-1 flex items-center">
                <span className="ml-2 flex-1 w-0 font-medium">{menu.name}</span>
              </div>
              <div className="ml-4 flex flex-col sm:flex-row">
                <div className="w-full sm:mr-2 my-1">
                  <Button
                    isFullwidth
                    size="XS"
                    onClick={() => handleModal(ModalForms.UpdateMenu, menu)}
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
                    onClick={() => handleModal(ModalForms.DeleteMenu, menu)}
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

export { MenusList };
