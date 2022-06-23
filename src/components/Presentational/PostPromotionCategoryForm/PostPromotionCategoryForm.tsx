import React, { useState } from "react";
import type { FC } from "react";
import { Disclose, Button, Input, Dropdown, Tab, Tabs, Notification, Alert } from "@base";
import { ChevronUpIcon, ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/solid";
import { classnames } from "tailwindcss-classnames";
import Skeleton from "react-loading-skeleton";
import { Category, Menu, useCategoriesQuery, useMenusQuery } from "src/shared";
import { usePostPromotionCatgegoryMutation } from "./PostPromotionCatgegory.mutation";
import { PROMOTIONS_CATEGORIES_QUERY } from "../PromotionCategories/PromotionCategories.query";
import toast from "react-hot-toast";
import { useViewport } from "src/hooks";
import { Link } from "react-router-dom";
import { filterCategories } from "@utility";

interface Props {
  themeColour: string;
  themeTint: number;
  restaurantSlug: string;
  promotionID: number;
}

const unitsArray = [
  {
    name: "%",
    unit: "percentage",
    id: 1,
  },
  {
    name: "$",
    unit: "amount",
    id: 2,
  },
];

const PostPromotionCategoryForm: FC<Props> = ({
  themeColour,
  themeTint,
  restaurantSlug,
  promotionID,
}) => {
  const [activeMenu, setActiveMenu] = useState<Menu>();
  const [activeCategory, setActiveCategory] = useState<Category>();
  const [amount, setAmount] = useState("");
  const { width } = useViewport();
  const [unit, setUnit] = useState(unitsArray[0]);
  const onSuccess = () =>
    toast.custom(<Notification header="Promotion Category succesfully added!" />);

  const [addPromotionCategory, { loading }] = usePostPromotionCatgegoryMutation({
    refetchQueries: [
      {
        query: PROMOTIONS_CATEGORIES_QUERY,
        variables: {
          promotionID,
        },
      },
    ],
    onCompleted: () => {
      setAmount("");
      setUnit(unitsArray[0]);
      onSuccess();
    },
  });

  const { data: menusData, loading: menusLoading } = useMenusQuery({
    variables: {
      restaurantSlug,
    },
    onCompleted: completedData => setActiveMenu(completedData?.menus?.[0]),
  });

  const { data: categoriesData, loading: categoriesLoading } = useCategoriesQuery({
    fetchPolicy: "cache-and-network",
    variables: {
      menuID: activeMenu?.id || 0,
    },
    skip: !activeMenu?.id,
    onCompleted: completedData => {
      setActiveCategory(filterCategories(completedData?.categories)?.[0]);
    },
  });

  const categories = filterCategories(categoriesData?.categories);

  const handleMenuChange = (menu: Menu) => {
    setActiveMenu(menu);
  };

  const handleAddPromotionCategory = () =>
    addPromotionCategory({
      variables: {
        promotionID,
        input: {
          discount: Number(amount),
          unit: unit.unit,
          promotion_id: promotionID,
          menu_category_id: activeCategory?.id ?? 0,
          __typename: "PromotionCategory",
        },
      },
    });

  const renderMenusTabs = () => {
    if (menusLoading) return <Skeleton className="my-2" height={50} />;
    if (menusData?.menus?.length) {
      return (
        <Tabs>
          {menusData?.menus.map((menu, index) => (
            <Tab
              themeColour={themeColour}
              themeTint={themeTint}
              themeFont="Quicksand"
              onClick={() => handleMenuChange(menu)}
              numOfTabs={menusData?.menus?.length}
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

  const renderDropdown = () => {
    if (categoriesLoading) return null;
    if (categories?.length)
      return (
        <div className="mr-4">
          <Dropdown
            themeColour={themeColour}
            themeTint={themeTint}
            required
            label="Category"
            defaultValue="Select category"
            value={activeCategory}
            onChange={(cat: Category) => setActiveCategory(cat)}
            data={categories}
          />
        </div>
      );
    return (
      <Alert type="warning">
        <Link className="flex" to={`/restaurants/${restaurantSlug}/settings/categories`}>
          Create a Category first
          <ChevronRightIcon className="h-5 w-5 " />
        </Link>
      </Alert>
    );
  };

  const renderInput = () => {
    if (categoriesLoading) return null;
    if (categories?.length) {
      return (
        <div className="flex items-end">
          <Input
            onChange={e => setAmount(e.target.value)}
            value={amount}
            css={classnames("mr-4", "w-28", "sm:py-2", "py-1.5")}
            labelText="Amount"
            themeColour={themeColour}
            themeTint={themeTint}
            placeholder="10.00"
            min={0}
            step={0.1}
            required
            type="number"
            name="amount"
            id="price"
          />
          <Dropdown
            showCheckmark={false}
            themeColour={themeColour}
            themeTint={themeTint}
            required
            label="Unit"
            value={unit}
            onChange={(value: { name: string; unit: string; id: number }) => setUnit(value)}
            data={unitsArray}
          />
        </div>
      );
    }
    return null;
  };

  return (
    <Disclose
      buttonContent={open =>
        open ? (
          <Button
            isFullwidth={width < 400}
            size="XL"
            themeColour={themeColour}
            themeTint={themeTint}
          >
            Add category
            <ChevronUpIcon className="h-5 w-5 text-white" />
          </Button>
        ) : (
          <Button
            isFullwidth={width < 400}
            size="XL"
            themeColour={themeColour}
            themeTint={themeTint}
          >
            Add category
            <ChevronDownIcon className="h-5 w-5 text-white" />
          </Button>
        )
      }
    >
      <div className="my-4">{renderMenusTabs()}</div>
      <form className="my-4 flex flex-wrap items-end justify-between">
        <fieldset className="mr-4 flex flex-auto flex-wrap items-end justify-start">
          {renderDropdown()}
          {renderInput()}
        </fieldset>
        <div className="mt-4 flex w-full flex-1 justify-end">
          <Button
            isFullwidth={width < 549}
            disabled={!amount}
            onClick={() => handleAddPromotionCategory()}
            loading={loading}
            size="XXL"
            themeColour={themeColour}
            themeTint={themeTint}
          >
            Add
          </Button>
        </div>
      </form>
    </Disclose>
  );
};

export { PostPromotionCategoryForm };
