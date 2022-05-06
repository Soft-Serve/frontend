import React, { useState } from "react";
import type { FC, ChangeEvent, FormEvent } from "react";
import {
  Category,
  Item,
  ItemsData,
  ItemSize,
  ITEMS_QUERY,
  Menu,
  useCategoriesQuery,
} from "@shared";
import { Button, Input, UploadImageBox, Tooltip, TextBox, Notification, Dropdown } from "@base";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import { classnames } from "tailwindcss-classnames";
import { XIcon } from "@heroicons/react/solid";
import { MultiSize } from "@presentational";
import { useUploadPhoto } from "@hooks";
import {
  isNameValid,
  isPriceInvalid,
  isBasicNameValid,
  isNameOnlyNumbers,
  isNameInputValid,
  hasBeginningWhiteSpace,
} from "@utility";
import { usePostItemMutation } from "./PostItem.mutation";
import { RESTAURANT_ONBOARDING_QUERY } from "../Restaurant/RestaurantOnboarding.query";

interface Props {
  restaurantSlug: string;
  onCompleted?: (state: boolean) => void;
  selectedMenu?: Menu;
  themeColour: string;
  themeTint: number;
}

const PostItemForm: FC<Props> = ({
  onCompleted,
  selectedMenu,
  themeColour,
  themeTint,
  restaurantSlug,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { photoFile, setPhotoFile, fetchPhoto } = useUploadPhoto();
  const [isInputNameDirty, setIsInputNameDirty] = useState(false);
  const onSuccess = () => toast.custom(<Notification header="Item succesfully added!" />);

  const { data: categoryData } = useCategoriesQuery({
    variables: {
      menuID: selectedMenu?.id || 0,
    },
  });

  const filteredCategories =
    categoryData?.categories && categoryData.categories.length > 1
      ? categoryData.categories.filter(cat => cat.name !== "No category")
      : categoryData?.categories ?? [];

  const [activeCategory, setActiveCategory] = useState(() => filteredCategories[0]);

  const size: ItemSize = {
    price: "",
    unit: "",
    id: uuidv4(),
    menu_item_id: selectedMenu?.id || 0,
    __typename: "Size",
  };

  const [input, setInput] = useState<Item>({
    name: "",
    description: "",
    photo: "",
    available: true,
    menu_category_id: activeCategory?.id || 0,
    id: 0,
    sizes: [size],
    __typename: "Item",
  });

  const handleCategoryChange = (category: Category) => {
    setActiveCategory(category);
    setInput(prevState => ({
      ...prevState,
      menu_category_id: category.id,
    }));
  };

  const onSizeChange = (e: ChangeEvent<HTMLInputElement>, id: string) => {
    const { name, value } = e.target;
    setInput(prevState => ({
      ...prevState,
      sizes: prevState.sizes.map(currentSize =>
        currentSize.id === id ? { ...currentSize, [name]: value } : currentSize
      ),
    }));
  };

  const onAddSize = () =>
    setInput(prevState => ({ ...prevState, sizes: [...prevState.sizes, { ...size }] }));

  const onDeleteSize = (id: string) =>
    setInput(prevState => ({
      ...prevState,
      sizes: prevState.sizes.filter(currentSize => currentSize.id !== id),
    }));

  const [postItem, { loading }] = usePostItemMutation({
    refetchQueries: [
      {
        query: RESTAURANT_ONBOARDING_QUERY,
        variables: {
          restaurantSlug,
        },
      },
    ],
    onCompleted: () => {
      onCompleted?.(false);
      setIsLoading(false);
      onSuccess();
    },
    update(cache, { data: newPostItemData }) {
      const { items } = cache.readQuery({
        query: ITEMS_QUERY,
        variables: {
          categoryID: activeCategory?.id,
        },
      }) as ItemsData;

      cache.writeQuery({
        query: ITEMS_QUERY,
        variables: {
          categoryID: activeCategory?.id,
        },
        data: {
          items: [...items, newPostItemData?.postItem],
        },
      });
    },
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setIsInputNameDirty(false);
    const { value, name } = e.target;
    setInput(prevState => ({ ...prevState, [name]: value }));
  };

  const inputNameError = () => {
    const { name } = input;
    if (!isInputNameDirty) return null;
    if (!isNameValid(name)) return <span>Name is required</span>;
    if (!isBasicNameValid(name)) return <span>Name not valid</span>;
    if (isNameOnlyNumbers(name)) return <span>Name cannot only contain numbers</span>;
    if (hasBeginningWhiteSpace(name)) return <span>Name cannot begin with white space</span>;
    return null;
  };

  const isFormValid =
    isNameInputValid(input.name) &&
    !isPriceInvalid(input.sizes) &&
    activeCategory?.id &&
    !hasBeginningWhiteSpace(input.name);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isFormValid) {
      setIsLoading(true);
      const photo = await fetchPhoto();
      postItem({
        variables: {
          input: {
            ...input,
            sizes: input.sizes.map(({ id, ...rest }) => ({ ...rest })),
            photo,
          },
        },
        optimisticResponse: {
          __typename: "Mutation",
          postItem: {
            ...input,
            sizes: input.sizes.map(({ id, ...rest }) => ({ ...rest })),
            photo,
          },
        },
      });
    }
  };

  const tooltiptext = (
    <span className="w-full justify-center px-5 text-center font-Quicksand text-sm font-semibold text-white">
      Category is required
    </span>
  );

  return (
    <div className="font-Quicksand">
      <div className="flex items-center justify-between">
        <h3 className="mr-4 text-sm font-semibold uppercase tracking-wider text-gray-900">
          add new item
        </h3>
        <Button
          themeColour={themeColour}
          themeTint={themeTint}
          onClick={() => onCompleted?.(false)}
          size="S"
        >
          <XIcon className="h-5 w-5" />
        </Button>
      </div>
      <form noValidate onSubmit={handleSubmit} className="mt-4 flex flex-col">
        <Dropdown
          themeColour={themeColour}
          themeTint={themeTint}
          required
          label="Category"
          defaultValue="Select category"
          value={activeCategory}
          onChange={(cat: Category) => handleCategoryChange(cat)}
          data={filteredCategories}
        />
        <div className="mt-4">
          <Input
            themeColour={themeColour}
            themeTint={themeTint}
            onBlur={() => {
              if (input.name.length) {
                setIsInputNameDirty(true);
              }
            }}
            errors={[inputNameError()]}
            labelText="Name"
            onChange={handleInputChange}
            value={input.name}
            type="text"
            name="name"
            id="name"
            required
          />
        </div>
        <div className="mt-4">
          <TextBox
            themeColour={themeColour}
            themeTint={themeTint}
            labelText="Description"
            onChange={handleInputChange}
            value={input.description}
            name="description"
            id="description"
          />
        </div>
        <MultiSize
          themeColour={themeColour}
          themeTint={themeTint}
          onChange={onSizeChange}
          addSize={onAddSize}
          deleteSize={onDeleteSize}
          sizes={input.sizes}
        />
        <UploadImageBox
          themeColour={themeColour}
          themeTint={themeTint}
          onChange={setPhotoFile}
          imageFile={photoFile}
        />
        <Tooltip
          css={classnames("w-full")}
          isDisabled={!!activeCategory?.name}
          tooltipText={tooltiptext}
        >
          <Button
            themeColour={themeColour}
            themeTint={themeTint}
            loading={loading || isLoading}
            disabled={!isFormValid}
            isFullwidth
            size="XXL"
            type="submit"
          >
            Add Item
          </Button>
        </Tooltip>
      </form>
    </div>
  );
};

export { PostItemForm };
