import React, { useState } from "react";
import type { FC } from "react";
import { Disclose, Button, Input, Dropdown, Tab, Tabs, Notification } from "@base";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/solid";
import { classnames } from "tailwindcss-classnames";
import Skeleton from "react-loading-skeleton";
import { Category, Menu, useCategoriesQuery, useMenusQuery } from "src/shared";
import { usePostPromotionCatgegoryMutation } from "./PostPromotionCatgegory.mutation";
import { PROMOTIONS_CATEGORIES_QUERY } from "../PromotionCategories/PromotionCategories.query";
import toast from "react-hot-toast";

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
  const [unit, setUnit] = useState(unitsArray[0]);
  const onSuccess = () => toast.custom(<Notification header="Promotion succesfully added!" />);

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

  const { data: categoriesData } = useCategoriesQuery({
    fetchPolicy: "cache-and-network",
    variables: {
      menuID: activeMenu?.id || 0,
    },
    skip: !activeMenu?.id,
    onCompleted: completedData => {
      setActiveCategory(completedData?.categories?.[0]);
    },
  });

  const filteredCategories =
    categoriesData?.categories && categoriesData.categories.length > 1
      ? categoriesData.categories.filter(cat => cat.name !== "No category")
      : categoriesData?.categories ?? [];

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
    if (filteredCategories.length)
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
            data={filteredCategories}
          />
        </div>
      );
  };

  return (
    <Disclose
      buttonContent={open =>
        open ? (
          <Button size="XL" themeColour={themeColour} themeTint={themeTint}>
            Close
            <ChevronUpIcon className="h-5 w-5 text-white" />
          </Button>
        ) : (
          <Button size="XL" themeColour={themeColour} themeTint={themeTint}>
            Add Category
            <ChevronDownIcon className="h-5 w-5 text-white" />
          </Button>
        )
      }
    >
      <div className="my-4">{renderMenusTabs()}</div>
      <form className="my-4 flex flex-wrap items-end justify-between">
        <fieldset className="mr-4 flex flex-wrap items-end justify-start">
          {renderDropdown()}
          <div className="flex items-end">
            <Input
              onChange={e => setAmount(e.target.value)}
              value={amount}
              css={classnames("rounded-r-none", "border-r-0", "-mr-2", "w-28", "sm:py-2", "py-1.5")}
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
        </fieldset>
        <div className="mt-4 flex-1">
          <Button
            disabled={!amount}
            onClick={() => handleAddPromotionCategory()}
            loading={loading}
            isFullwidth
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
