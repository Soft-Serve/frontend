import React, { useEffect, useState } from "react";
import type { FC } from "react";
import { useHistory } from "react-router-dom";
import { useRestaurantContext } from "@contexts";
import { Category, Item, Menu, useCategoriesQuery, useItemsQuery, useMenusQuery } from "@shared";
import { Button, Card, CardContent, Grid, Modal, Tab, Tabs, TabWrapper } from "@base";
import { SearchIcon, PlusCircleIcon } from "@heroicons/react/solid";
import Skeleton from "react-loading-skeleton";
import { AddDietaryForm, DeleteItemForm, PostItemForm, UpdateItemForm } from "@presentational";
import { useGetParams } from "@utility";
import { CategoryItems } from "./CategoryItems";
import { SettingsHeader } from "../SettingsHeader";

enum ModalForms {
  PostItem = "postItem",
  UpdateItem = "updateItem",
  DeleteItem = "deleteItem",
  AddDietary = "addDietary",
}

const ItemSettings: FC = () => {
  const { themeColour, themeTint, restaurantSlug } = useRestaurantContext();
  const params = useGetParams();
  const history = useHistory();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: menuData, loading: menuLoading } = useMenusQuery({
    variables: {
      restaurantSlug,
    },
    skip: !restaurantSlug,
  });

  const [activeMenu, setActiveMenu] = useState(menuData?.menus?.[0]);
  const [searchValue, setSearchValue] = useState("");
  const [categoryIDForDeleteItem, setCategoryIDForDeleteItem] = useState(0);
  const [action, setAction] = useState<ModalForms>(ModalForms.PostItem);

  const { data: categoryData } = useCategoriesQuery({
    variables: {
      menuID: activeMenu?.id || 0,
    },
    skip: !activeMenu?.id,
  });

  const { data: itemsData } = useItemsQuery({
    variables: {
      categoryID: categoryData?.categories?.[0]?.id || 0,
    },
    skip: !categoryData?.categories?.[0]?.id,
  });

  const [activeItem, setActiveItem] = useState(itemsData?.items?.[0]);
  useEffect(() => {
    setActiveMenu(menuData?.menus[0]);
  }, [menuData?.menus]);

  const menuParam = params.get("menu");
  const categoryParam = params.get("category");

  useEffect(() => {
    if (menuParam) {
      const selectedMenu = menuData?.menus?.find(menu => menu.name === menuParam);
      setActiveMenu(selectedMenu);
    }
  }, [menuData?.menus, menuParam]);

  const deleteItem = (
    <DeleteItemForm
      onCompleted={setIsModalOpen}
      deletedItem={activeItem}
      categoryID={categoryIDForDeleteItem}
    />
  );

  const postItem = <PostItemForm selectedMenu={activeMenu} onCompleted={setIsModalOpen} />;

  const updateItem = (
    <UpdateItemForm
      selectedMenu={activeMenu}
      selectedItem={activeItem}
      onCompleted={setIsModalOpen}
    />
  );

  const addDietary = <AddDietaryForm item={activeItem} />;

  const mapModalForms = {
    deleteItem,
    postItem,
    updateItem,
    addDietary,
  };

  const renderModalForm = () => {
    return mapModalForms[action];
  };

  const handleAddDietary = (item: Item) => {
    setAction(ModalForms.AddDietary);
    setActiveItem(item);
    setIsModalOpen(true);
  };

  const handleDeleteItem = (item: Item, categoryID: number) => {
    setAction(ModalForms.DeleteItem);
    setActiveItem(item);
    setCategoryIDForDeleteItem(categoryID);
    setIsModalOpen(true);
  };

  const handleUpdateItem = (item: Item, categoryID: number) => {
    setAction(ModalForms.UpdateItem);
    setActiveItem(item);
    setCategoryIDForDeleteItem(categoryID);
    setIsModalOpen(true);
  };

  const handlePostItem = () => {
    setAction(ModalForms.PostItem);
    setIsModalOpen(true);
  };

  const handleActiveMenu = (menu: Menu) => {
    if (categoryParam) {
      params.delete("category");
      history.replace({
        search: params.toString(),
      });
    }
    setActiveMenu(menu);
  };

  const renderMenusTabs = () => {
    if (menuLoading) return <Skeleton className="my-2" height={50} />;
    return (
      <Tabs>
        {menuData?.menus?.map((menu, index) => (
          <Tab
            themeFont="Quicksand"
            onClick={() => handleActiveMenu(menu)}
            numOfTabs={menuData.menus.length}
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

  const filteredCategories = (categories?: Category[]) => {
    if (!categoryParam) return categories;
    return categories?.filter(category => category.name === categoryParam);
  };

  return (
    <TabWrapper>
      <Modal isOpen={isModalOpen} onClose={setIsModalOpen}>
        {renderModalForm()}
      </Modal>
      <Card css="mb-4">
        <CardContent css="flex-col">
          <div className="flex w-full items-center justify-between mb-4">
            <SettingsHeader>Items</SettingsHeader>
            <Button onClick={handlePostItem} size="XXL">
              Add Item
              <PlusCircleIcon className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
      {renderMenusTabs()}
      <Card css="mt-4">
        <CardContent>
          <div className="flex flex-col w-full">
            <div className="w-full flex items-center ">
              <label
                htmlFor="search"
                className="block text-sm font-bold text-gray-900 ml-4 font-Quicksand"
              >
                Search items
              </label>
              <div className="flex-1 min-w-0 ml-4 mt-1">
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </div>
                  <input
                    value={searchValue}
                    onChange={e => setSearchValue(e.target.value)}
                    type="search"
                    name="search"
                    id="search"
                    className={`focus:ring-${themeColour}-${themeTint} focus:border-${themeColour}-${themeTint} block w-full pl-10 sm:text-sm border-2 border-${themeColour}-${themeTint} rounded-md h-full py-2 focus:outline-none`}
                  />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="mt-8">
        <Grid size="SM">
          {filteredCategories(categoryData?.categories)?.map(category => (
            <CategoryItems
              handleAddDietary={handleAddDietary}
              handleUpdateItem={handleUpdateItem}
              searchValue={searchValue}
              key={category.id}
              handleDeleteItem={handleDeleteItem}
              categoryID={category.id}
            />
          ))}
        </Grid>
      </div>
    </TabWrapper>
  );
};

export { ItemSettings };
