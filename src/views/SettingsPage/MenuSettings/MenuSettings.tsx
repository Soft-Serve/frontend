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

interface Props {
  themeColour: string;
  themeTint: number;
}

const MenuSettings: FC<Props> = ({ themeTint, themeColour }) => {
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

  const postMenu = (
    <PostMenuForm
      themeColour={themeColour}
      themeTint={themeTint}
      onCompleted={setIsModalOpen}
      restaurantID={restaurantID}
    />
  );
  const deleteMenu = (
    <DeleteMenuForm
      themeColour={themeColour}
      themeTint={themeTint}
      selectedMenu={activeMenu}
      onCompleted={setIsModalOpen}
    />
  );
  const updateMenu = (
    <UpdateMenuForm
      themeColour={themeColour}
      themeTint={themeTint}
      selectedMenu={activeMenu}
      onCompleted={setIsModalOpen}
    />
  );

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
          <Button
            themeColour={themeColour}
            themeTint={themeTint}
            size="XXL"
            onClick={() => handleMenuModal(ModalForms.PostMenu)}
          >
            Add Menu
            <PlusCircleIcon className="w-5 h-5 ml-2" />
          </Button>
        </CardContent>
      </Card>
      <MenusList
        themeColour={themeColour}
        themeTint={themeTint}
        loading={loading}
        handleModal={handleMenuModal}
        menus={data?.menus}
      />
    </TabWrapper>
  );
};

export { MenuSettings };
