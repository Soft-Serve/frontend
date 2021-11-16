import React, { useState, useEffect } from "react";
import type { FC } from "react";
import { Button, Card, CardContent, Modal, Tab, Tabs } from "@base";
import { useRestaurantContext } from "src/contexts";
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

const CategorySettings: FC = () => {
  const { restaurantSlug } = useRestaurantContext();

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
      menuID: activeMenu?.id ? activeMenu.id : 0,
    },
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
    <PostCategoryForm menuID={activeMenu?.id ? activeMenu.id : 0} onCompleted={setIsModalOpen} />
  );
  const updateCategory = (
    <UpdateCategoryForm
      menuID={activeMenu?.id ? activeMenu.id : 0}
      onCompleted={setIsModalOpen}
      selectedCategory={activeCategory}
    />
  );

  const deleteCategory = (
    <DeleteCategoryForm
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
    <>
      <Modal isOpen={isModalOpen} onClose={setIsModalOpen}>
        {renderModalForm()}
      </Modal>
      <Card css="mb-4">
        <CardContent>
          <SettingsHeader>Categories</SettingsHeader>
          <Button size="LG" onClick={() => handleModal(ModalForms.PostCategory)}>
            <span className="mr-4 text-base">Add Category</span>
            <ViewGridAddIcon className="w-5 h-5" />
          </Button>
        </CardContent>
      </Card>
      {renderMenusTabs()}
      <CategoryList
        loading={loading}
        handleModal={handleModal}
        categories={categoriesData?.categories}
      />
    </>
  );
};

export { CategorySettings };
