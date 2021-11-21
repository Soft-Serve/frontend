import React, { useEffect, useState } from "react";
import type { FC } from "react";
import { useRestaurantContext } from "@contexts";
import { Item, useCategoriesQuery, useItemsQuery, useMenusQuery } from "@shared";
import { Button, Card, CardContent, Grid, Modal, Tab, Tabs, TabWrapper } from "@base";
import { SearchIcon, PlusCircleIcon } from "@heroicons/react/solid";
import Skeleton from "react-loading-skeleton";
import { DeleteItemForm, PostItemForm, UpdateItemForm } from "@presentational";
import { CategoryItems } from "./CategoryItems";
import { SettingsHeader } from "../SettingsHeader";

enum ModalForms {
  PostItem = "postItem",
  UpdateItem = "updateItem",
  DeleteItem = "deleteItem",
}

const ItemSettings: FC = () => {
  const { themeColour, themeTint } = useRestaurantContext();
  const { restaurantSlug } = useRestaurantContext();
  const { data: menuData, loading: menuLoading } = useMenusQuery({
    variables: {
      restaurantSlug,
    },
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(menuData?.menus?.[0]);
  const [searchValue, setSearchValue] = useState("");
  const [categoryIDForDeleteItem, setCategoryIDForDeleteItem] = useState(0);
  const [action, setAction] = useState<ModalForms>(ModalForms.PostItem);

  const { data: categoryData } = useCategoriesQuery({
    variables: {
      menuID: activeMenu?.id ? activeMenu.id : 0,
    },
  });

  const { data: itemsData } = useItemsQuery({
    variables: {
      categoryID: categoryData?.categories?.[0] ? categoryData.categories?.[0].id : 0,
    },
  });

  const [activeItem, setActiveItem] = useState(itemsData?.items?.[0]);
  useEffect(() => {
    setActiveMenu(menuData?.menus[0]);
  }, [menuData?.menus]);

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

  const mapModalForms = {
    deleteItem,
    postItem,
    updateItem,
  };

  const renderModalForm = () => {
    return mapModalForms[action];
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

  const renderMenusTabs = () => {
    if (menuLoading) return <Skeleton className="my-2" height={50} />;
    return (
      <Tabs>
        {menuData?.menus.map((menu, index) => (
          <Tab
            onClick={() => setActiveMenu(menu)}
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

  return (
    <TabWrapper>
      <Modal isOpen={isModalOpen} onClose={setIsModalOpen}>
        {renderModalForm()}
      </Modal>
      <Card css="mb-4">
        <CardContent>
          <SettingsHeader>Items</SettingsHeader>
          <Button onClick={handlePostItem} size="LG">
            <span className="mr-4 text-base">Add Item</span>
            <PlusCircleIcon className="w-5 h-5" />
          </Button>
        </CardContent>
      </Card>
      {renderMenusTabs()}
      <Card css="mt-4">
        <CardContent>
          <div className="flex flex-col w-full">
            <div className="w-full flex items-center ">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 ml-4">
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
          {categoryData?.categories?.map(category => (
            <CategoryItems
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
