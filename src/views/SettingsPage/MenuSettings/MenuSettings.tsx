import React, { useState } from "react";
import type { FC } from "react";
import { Button, Card, CardContent, Modal, TabWrapper } from "@base";
import { useRestaurantContext } from "@contexts";
import { useRestaurantQuery, useMenusQuery, Menu } from "@shared";
import { DeleteMenuForm, PostMenuForm, UpdateMenuForm } from "src/components/Presentational";
import { PlusCircleIcon } from "@heroicons/react/solid";
import { MenusList } from "./MenusList";
import { SettingsHeader } from "../SettingsHeader";

enum ModalForms {
  PostMenu = "postMenu",
  UpdateMenu = "updateMenu",
  DeleteMenu = "deleteMenu",
}

const MenuSettings: FC = () => {
  const { restaurantSlug } = useRestaurantContext();

  const { data: restaurantData } = useRestaurantQuery({
    variables: {
      restaurantSlug,
    },
  });
  const restaurantID = restaurantData?.restaurant.id;

  const { data, loading } = useMenusQuery({
    variables: {
      restaurantSlug,
    },
    skip: !restaurantSlug,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [action, setAction] = useState<ModalForms>(ModalForms.PostMenu);
  const [activeMenu, setActiveMenu] = useState(data?.menus?.[0]);

  const handleMenuModal = (modalForm: ModalForms, menu?: Menu) => {
    if (menu) {
      setActiveMenu(menu);
    }
    setAction(modalForm);
    setIsModalOpen(true);
  };

  if (!restaurantID) return <div>loading</div>;

  const postMenu = <PostMenuForm onCompleted={setIsModalOpen} restaurantID={restaurantID} />;
  const deleteMenu = <DeleteMenuForm selectedMenu={activeMenu} onCompleted={setIsModalOpen} />;
  const updateMenu = <UpdateMenuForm selectedMenu={activeMenu} onCompleted={setIsModalOpen} />;

  const forms = {
    postMenu,
    updateMenu,
    deleteMenu,
  };

  const renderModalForm = () => forms[action];

  return (
    <TabWrapper>
      <Modal isOpen={isModalOpen} onClose={setIsModalOpen}>
        {renderModalForm()}
      </Modal>
      <Card css="mb-4">
        <CardContent>
          <SettingsHeader>Menus</SettingsHeader>
          <Button size="XXL" onClick={() => handleMenuModal(ModalForms.PostMenu)}>
            <span className="mr-4 text-base hidden sm:block">Add Menu</span>
            <PlusCircleIcon className="w-5 h-5" />
          </Button>
        </CardContent>
      </Card>
      <MenusList loading={loading} handleModal={handleMenuModal} menus={data?.menus} />
    </TabWrapper>
  );
};

export { MenuSettings };
