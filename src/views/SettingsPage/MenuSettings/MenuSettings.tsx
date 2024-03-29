import React, { useState } from "react";
import type { FC } from "react";
import { Button, TabWrapper } from "@base";
import { Dialog, Box, Column, Columns } from "@interface";
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
  restaurantSlug: string;
}

const MenuSettings: FC<Props> = ({ themeTint, themeColour, restaurantSlug }) => {
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

  const postMenu = (
    <PostMenuForm
      restaurantSlug={restaurantSlug}
      themeColour={themeColour}
      themeTint={themeTint}
      onCompleted={setIsModalOpen}
      restaurantID={restaurantID || 0}
    />
  );
  const deleteMenu = (
    <DeleteMenuForm
      restaurantSlug={restaurantSlug}
      themeColour={themeColour}
      themeTint={themeTint}
      selectedMenu={activeMenu}
      onCompleted={setIsModalOpen}
    />
  );
  const updateMenu = (
    <UpdateMenuForm
      restaurantSlug={restaurantSlug}
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

  const renderMenus = () => {
    if (data?.menus?.length) {
      return (
        <MenusList
          restaurantSlug={restaurantSlug}
          themeColour={themeColour}
          themeTint={themeTint}
          loading={loading}
          handleModal={handleMenuModal}
          menus={data?.menus}
        />
      );
    }
    return null;
  };

  return (
    <TabWrapper>
      <Dialog
        themeColour={themeColour}
        themeTint={themeTint}
        isOpen={isModalOpen}
        onClose={setIsModalOpen}
      >
        {renderModalForm()}
      </Dialog>
      <Box>
        <Columns isMarginless isStackingOnMobile={false}>
          <Column className="justify-center">
            <SettingsHeader>Menus</SettingsHeader>
          </Column>
          <Column columnWidth="small">
            <Button
              themeColour={themeColour}
              themeTint={themeTint}
              size="XXL"
              onClick={() => handleMenuModal(ModalForms.PostMenu)}
            >
              Add
              <PlusCircleIcon className="ml-2 h-5 w-5" />
            </Button>
          </Column>
        </Columns>
      </Box>
      {renderMenus()}
    </TabWrapper>
  );
};

export { MenuSettings };
