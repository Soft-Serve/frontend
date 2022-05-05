import React, { useEffect, useState } from "react";
import type { FC } from "react";
import Skeleton from "react-loading-skeleton";
import { Link, useNavigate } from "react-router-dom";
import { Category, Item, Menu, useCategoriesQuery, useItemsQuery, useMenusQuery } from "@shared";
import {
  Alert,
  Button,
  Card,
  CardContent,
  Grid,
  Modal,
  Tab,
  Tabs,
  TabWrapper,
  ThemeFonts,
} from "@base";
import { PlusCircleIcon, ChevronRightIcon } from "@heroicons/react/solid";
import { AddDietaryForm, DeleteItemForm, PostItemForm, UpdateItemForm } from "@presentational";
import { useGetParams } from "@utility";
import { CategoryItems } from "./CategoryItems";
import { SettingsHeader } from "../SettingsHeader";
import { SearchBar } from "./SearchBar";

enum ModalForms {
  PostItem = "postItem",
  UpdateItem = "updateItem",
  DeleteItem = "deleteItem",
  AddDietary = "addDietary",
}

interface Props {
  themeColour: string;
  themeTint: number;
  themeFont: ThemeFonts;
  restaurantSlug: string;
}

const ItemSettings: FC<Props> = ({ themeColour, themeTint, themeFont, restaurantSlug }) => {
  const params = useGetParams();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<Menu>();
  const [searchValue, setSearchValue] = useState("");
  const [categoryIDForDeleteItem, setCategoryIDForDeleteItem] = useState(0);
  const [action, setAction] = useState<ModalForms>(ModalForms.PostItem);
  const menuParam = params.get("menu");
  const categoryParam = params.get("category");

  const { data: menuData, loading: menuLoading } = useMenusQuery({
    variables: {
      restaurantSlug,
    },

    onCompleted: completedData => setActiveMenu(completedData?.menus?.[0]),
  });

  const { data: categoryData, loading } = useCategoriesQuery({
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
    if (menuParam) {
      const selectedMenu = menuData?.menus?.find(menu => menu.name === menuParam);
      setActiveMenu(selectedMenu);
    }
  }, [menuParam]);

  const deleteItem = (
    <DeleteItemForm
      themeColour={themeColour}
      themeTint={themeTint}
      onCompleted={setIsModalOpen}
      deletedItem={activeItem}
      categoryID={categoryIDForDeleteItem}
    />
  );

  const postItem = (
    <PostItemForm
      restaurantSlug={restaurantSlug}
      themeColour={themeColour}
      themeTint={themeTint}
      selectedMenu={activeMenu}
      onCompleted={setIsModalOpen}
    />
  );

  const updateItem = (
    <UpdateItemForm
      themeColour={themeColour}
      themeTint={themeTint}
      selectedMenu={activeMenu}
      selectedItem={activeItem}
      onCompleted={setIsModalOpen}
    />
  );

  const addDietary = (
    <AddDietaryForm
      restaurantSlug={restaurantSlug}
      themeColour={themeColour}
      themeTint={themeTint}
      onCompleted={setIsModalOpen}
      item={activeItem}
    />
  );

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
      navigate(params.toString(), { replace: true });
    }
    setActiveMenu(menu);
  };

  const renderMenusTabs = () => {
    if (menuLoading) return <Skeleton className="my-2" height={50} />;
    return (
      <Tabs>
        {menuData?.menus?.map((menu, index) => (
          <Tab
            themeTint={themeTint}
            themeColour={themeColour}
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

  const renderSearchBar = () => {
    if (loading) return null;
    if (categoryData?.categories?.length) {
      <SearchBar
        themeColour={themeColour}
        themeTint={themeTint}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />;
    } else {
      return (
        <Alert type="warning">
          <Link className="flex" to={`/restaurants/${restaurantSlug}/settings/menus`}>
            Create a new Menu first before creating a new item
            <ChevronRightIcon className="h-5 w-5 " />
          </Link>
        </Alert>
      );
    }
  };

  return (
    <TabWrapper>
      <Modal isOpen={isModalOpen} onClose={setIsModalOpen}>
        {renderModalForm()}
      </Modal>
      <Card css="mb-4">
        <CardContent css="flex-col">
          <div className="mb-4 flex w-full items-center justify-between">
            <SettingsHeader>Items</SettingsHeader>
            <Button
              disabled={!categoryData?.categories?.length}
              themeColour={themeColour}
              themeTint={themeTint}
              onClick={handlePostItem}
              size="XXL"
            >
              Add
              <PlusCircleIcon className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </CardContent>
      </Card>
      {renderMenusTabs()}
      {renderSearchBar()}
      <div className="mt-8">
        <Grid size="SM">
          {filteredCategories(categoryData?.categories)?.map(category => (
            <CategoryItems
              themeFont={themeFont}
              themeColour={themeColour}
              themeTint={themeTint}
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
