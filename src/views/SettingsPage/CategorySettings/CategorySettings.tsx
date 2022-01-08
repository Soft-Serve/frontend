import React, { useState, useEffect } from "react";
import type { FC } from "react";
import { Button, Card, CardContent, Modal, Tab, Tabs, TabWrapper } from "@base";
import { useCategoriesQuery, useMenusQuery, Category } from "@shared";
import {
  UpdateCategoryForm,
  DeleteCategoryForm,
  PostCategoryForm,
} from "src/components/Presentational";
import Skeleton from "react-loading-skeleton";
import { ViewGridAddIcon } from "@heroicons/react/solid";

import { CategoryList } from "./CategoryList";
import { SettingsHeader } from "../SettingsHeader";

enum ModalForms {
  PostCategory = "postCategory",
  UpdateCategory = "updateCategory",
  DeleteCategory = "deleteCategory",
}

interface Props {
  themeColour: string;
  themeTint: number;
  restaurantSlug: string;
}

const CategorySettings: FC<Props> = ({ themeTint, themeColour, restaurantSlug }) => {
  const { data, loading: menusLoading } = useMenusQuery({
    variables: {
      restaurantSlug,
    },
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [action, setAction] = useState<ModalForms>(ModalForms.PostCategory);
  const [activeMenu, setActiveMenu] = useState(data?.menus?.[0]);

  useEffect(() => {
    if (data?.menus?.length) {
      setActiveMenu(data.menus[0]);
    }
  }, [data]);

  const { data: categoriesData, loading } = useCategoriesQuery({
    variables: {
      menuID: activeMenu?.id || 0,
    },
    skip: !activeMenu?.id,
  });

  const [activeCategory, setActiveCategory] = useState(categoriesData?.categories?.[0]);

  useEffect(() => {
    if (categoriesData?.categories?.length) {
      setActiveCategory(categoriesData?.categories?.[0]);
    }
  }, [categoriesData]);

  const handleModal = (modalForm: ModalForms, category?: Category) => {
    if (category) {
      setActiveCategory(category);
    }
    setAction(modalForm);
    setIsModalOpen(true);
  };

  const postCategory = (
    <PostCategoryForm
      themeColour={themeColour}
      themeTint={themeTint}
      menuID={activeMenu?.id ? activeMenu.id : 0}
      onCompleted={setIsModalOpen}
    />
  );
  const updateCategory = (
    <UpdateCategoryForm
      themeColour={themeColour}
      themeTint={themeTint}
      menuID={activeMenu?.id ? activeMenu.id : 0}
      onCompleted={setIsModalOpen}
      selectedCategory={activeCategory}
    />
  );

  const deleteCategory = (
    <DeleteCategoryForm
      themeColour={themeColour}
      themeTint={themeTint}
      menuID={activeMenu?.id ? activeMenu.id : 0}
      onCompleted={setIsModalOpen}
      selectedCategory={activeCategory}
    />
  );

  const forms = {
    postCategory,
    updateCategory,
    deleteCategory,
  };

  const renderModalForm = () => forms[action];

  const renderMenusTabs = () => {
    if (menusLoading) return <Skeleton className="my-2" height={50} />;
    return (
      <Tabs>
        {data?.menus.map((menu, index) => (
          <Tab
            themeColour={themeColour}
            themeTint={themeTint}
            themeFont="Quicksand"
            onClick={() => setActiveMenu(menu)}
            numOfTabs={data.menus.length}
            tabIndex={index}
            isActive={menu.id === activeMenu?.id}
            key={menu.id}
          >
            {menu.name}
          </Tab>
        ))}
      </Tabs>
    );
  };

  return (
    <TabWrapper>
      <Modal isOpen={isModalOpen} onClose={setIsModalOpen}>
        {renderModalForm()}
      </Modal>
      <Card css="mb-4">
        <CardContent>
          <SettingsHeader>Categories</SettingsHeader>
          <Button
            themeColour={themeColour}
            themeTint={themeTint}
            size="XXL"
            onClick={() => handleModal(ModalForms.PostCategory)}
          >
            Add Category
            <ViewGridAddIcon className="w-5 h-5 ml-2" />
          </Button>
        </CardContent>
      </Card>
      {renderMenusTabs()}
      <CategoryList
        restaurantSlug={restaurantSlug}
        themeColour={themeColour}
        themeTint={themeTint}
        activeMenu={activeMenu}
        loading={loading}
        handleModal={handleModal}
        categories={categoriesData?.categories}
      />
    </TabWrapper>
  );
};

export { CategorySettings };
