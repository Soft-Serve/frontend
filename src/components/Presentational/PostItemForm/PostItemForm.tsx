import React, { useEffect, useState } from "react";
import type { FC, ChangeEvent, FormEvent } from "react";
import { Item, ItemsData, ItemSize, ITEMS_QUERY, Menu, useCategoriesQuery } from "@shared";
import { Button, Dropdown, Input, UploadImageBox, Tooltip, Tab, Tabs, TextBox } from "@base";
import { v4 as uuidv4 } from "uuid";

import { classnames } from "tailwindcss-classnames";
import { XIcon } from "@heroicons/react/solid";
import { MultiSize, SingleSize } from "@presentational";

import { useUploadPhoto } from "@hooks";
import {
  isNameValid,
  isPriceInvalid,
  isBasicNameValid,
  isNameOnlyNumbers,
  isNameInputValid,
  isBasicPriceValid,
} from "@utility";
import { usePostItemMutation } from "./PostItem.mutation";

interface Props {
  onCompleted?: (state: boolean) => void;
  selectedMenu?: Menu;
}

const PostItemForm: FC<Props> = ({ onCompleted, selectedMenu }) => {
  const { photoFile, setPhotoFile, fetchPhoto } = useUploadPhoto();
  const [itemType, setItemType] = useState<"single" | "multi">("single");
  const [isInputNameDirty, setIsInputNameDirty] = useState(false);
  const [isInputPriceDirty, setIsInputPriceDirty] = useState(false);

  const { data: categoryData } = useCategoriesQuery({
    variables: {
      menuID: selectedMenu?.id || 0,
    },
  });

  const [activeCategory, setActiveCategory] = useState(categoryData?.categories?.[0]);

  useEffect(() => {
    if (categoryData?.categories?.length === 1) {
      setActiveCategory(categoryData?.categories?.[0]);
    } else {
      setActiveCategory(undefined);
    }
  }, [selectedMenu, categoryData?.categories]);

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
    onCompleted: () => onCompleted?.(false),
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
    return null;
  };

  const inputPriceError = () => {
    if (!isInputPriceDirty) return null;
    if (isPriceInvalid(input.sizes)) return <span>Price is required</span>;
    if (isBasicPriceValid(input.sizes)) return <span>Price is not valid </span>;
    return null;
  };

  const isFormValid =
    isNameInputValid(input.name) && !isPriceInvalid(input.sizes) && activeCategory?.id;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isFormValid) {
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

  const renderSizeInputs = () =>
    itemType === "single" ? (
      <SingleSize
        handleChange={onSizeChange}
        onBlur={() => {
          if (!isPriceInvalid(input.sizes)) setIsInputPriceDirty(true);
        }}
        errors={[inputPriceError()]}
        size={input.sizes[0]}
      />
    ) : (
      <MultiSize
        onChange={onSizeChange}
        addSize={onAddSize}
        deleteSize={onDeleteSize}
        sizes={input.sizes}
      />
    );

  const tooltiptext = (
    <span className="text-center px-5 text-white justify-center w-full text-sm font-semibold">
      Category is required
    </span>
  );

  return (
    <div>
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-semibold text-gray-800 tracking-wider uppercase mr-4">
          add new item
        </h3>
        <Button onClick={() => onCompleted?.(false)} size="S" colour="accent">
          <XIcon className="w-5 h-5" />
        </Button>
      </div>
      <form noValidate onSubmit={handleSubmit} className="mt-4 flex flex-col">
        <Dropdown
          required
          label="Category"
          defaultValue="Select category"
          value={activeCategory}
          onChange={setActiveCategory}
          data={categoryData?.categories}
        />
        <div className="mt-4">
          <Input
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
            labelText="Description"
            onChange={handleInputChange}
            value={input.description}
            name="description"
            id="description"
          />
        </div>
        <div className="my-2">
          <Tabs>
            <Tab
              onClick={() => setItemType("single")}
              numOfTabs={1}
              tabIndex={0}
              isActive={itemType === "single"}
            >
              Single Price
            </Tab>
            <Tab
              onClick={() => setItemType("multi")}
              numOfTabs={1}
              tabIndex={0}
              isActive={itemType === "multi"}
            >
              Multiple Prices
            </Tab>
          </Tabs>
        </div>
        {renderSizeInputs()}

        <UploadImageBox onChange={setPhotoFile} imageFile={photoFile} />
        <Tooltip
          css={classnames("w-full")}
          isDisabled={!!activeCategory?.name}
          tooltipText={tooltiptext}
        >
          <Button loading={loading} disabled={!isFormValid} isFullwidth size="XXL" type="submit">
            Add Item
          </Button>
        </Tooltip>
      </form>
    </div>
  );
};

export { PostItemForm };
