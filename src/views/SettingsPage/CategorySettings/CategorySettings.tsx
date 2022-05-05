import React, { useState } from "react";
import type { FC } from "react";
import { Alert, Button, Card, CardContent, Modal, Tab, Tabs, TabWrapper } from "@base";
import { useCategoriesQuery, useMenusQuery, Category, Menu } from "@shared";
import {
  UpdateCategoryForm,
  DeleteCategoryForm,
  PostCategoryForm,
} from "src/components/Presentational";
import Skeleton from "react-loading-skeleton";
import { ChevronRightIcon, ViewGridAddIcon } from "@heroicons/react/solid";

import { CategoryList } from "./CategoryList";
import { SettingsHeader } from "../SettingsHeader";
import { Link } from "react-router-dom";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [action, setAction] = useState<ModalForms>(ModalForms.PostCategory);
  const [activeMenu, setActiveMenu] = useState<Menu>();
  const [activeCategory, setActiveCategory] = useState<Category>();

  const { data, loading: menusLoading } = useMenusQuery({
    variables: {
      restaurantSlug,
    },
    onCompleted: completedData => setActiveMenu(completedData?.menus?.[0]),
  });

  const { data: categoriesData, loading } = useCategoriesQuery({
    variables: {
      menuID: activeMenu?.id || 0,
    },
    skip: !activeMenu?.id,
    onCompleted: completedData => setActiveCategory(completedData?.categories?.[0]),
  });

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
    if (data?.menus?.length) {
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
    }
    return null;
  };

  const renderCategories = () => {
    if (categoriesData?.categories?.length && categoriesData?.categories.length > 1) {
      return (
        <CategoryList
          restaurantSlug={restaurantSlug}
          themeColour={themeColour}
          themeTint={themeTint}
          activeMenu={activeMenu}
          loading={loading}
          handleModal={handleModal}
          categories={categoriesData?.categories}
        />
      );
    }
  };

  const renderAlert = () => {
    if (loading || categoriesData?.categories?.length) return null;
    return (
      <Alert type="warning">
        <Link className="flex" to={`/restaurants/${restaurantSlug}/settings/menus`}>
          Create a new Menu first before creating a new category
          <ChevronRightIcon className="h-5 w-5 " />
        </Link>
      </Alert>
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
            disabled={!data?.menus?.length}
            themeColour={themeColour}
            themeTint={themeTint}
            size="XXL"
            onClick={() => handleModal(ModalForms.PostCategory)}
          >
            Add
            <ViewGridAddIcon className="ml-2 h-5 w-5" />
          </Button>
        </CardContent>
      </Card>
      {renderMenusTabs()}
      {renderCategories()}
      {renderAlert()}
    </TabWrapper>
  );
};

export { CategorySettings };
