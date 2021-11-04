import React, { ChangeEvent, FormEvent, useState } from "react";
import type { FC } from "react";
import {
  ItemsData,
  ITEMS_QUERY,
  Menu,
  Item,
  useItemSizeQuery,
  ItemSize,
  ITEM_SIZES_QUERY,
} from "@shared";
import { Button, Input, Tab, Tabs, TextBox } from "@base";

import { XIcon } from "@heroicons/react/solid";
import { MultiSize, SingleSize } from "@presentational";
import {
  isBasicNameValid,
  isNameInputValid,
  isNameOnlyNumbers,
  isNameValid,
  isPriceInvalid,
} from "@utility";
import { v4 as uuidv4 } from "uuid";
import { useUpdateItemMutation } from "./UpdateItem.mutation";

interface Props {
  onCompleted?: (state: boolean) => void;
  selectedMenu?: Menu;
  selectedItem?: Item;
}

const UpdateItemForm: FC<Props> = ({ onCompleted, selectedItem }) => {
  const { data: itemSizeData, loading } = useItemSizeQuery({
    variables: {
      itemID: selectedItem?.id || 0,
    },
  });

  const [itemType, setItemType] = useState<"single" | "multi">(
    itemSizeData?.itemSizes?.length === 1 ? "single" : "multi"
  );

  const [sizes, setSizes] = useState(itemSizeData?.itemSizes);

  const [input, setInput] = useState({
    name: selectedItem?.name || "",
    description: selectedItem?.description || "",
    available: selectedItem?.available || true,
    menu_category_id: selectedItem?.menu_category_id || 0,
    id: selectedItem?.id || 0,
    __typename: "Item",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value, name } = e.target;
    setInput(prevState => ({ ...prevState, [name]: value }));
  };

  const [updateItem, { loading: updateLoading }] = useUpdateItemMutation({
    onCompleted: () => onCompleted?.(false),
    refetchQueries: [
      {
        query: ITEM_SIZES_QUERY,
        variables: {
          itemID: selectedItem?.id,
        },
      },
    ],
    update(cache, { data: updatedItem }) {
      const { items } = cache.readQuery({
        query: ITEMS_QUERY,
        variables: {
          categoryID: selectedItem?.menu_category_id,
        },
      }) as ItemsData;
      cache.writeQuery({
        query: ITEMS_QUERY,
        variables: {
          categoryID: selectedItem?.menu_category_id,
        },
        data: {
          items: items.map(item =>
            item.id === updatedItem?.updateItem?.id ? { ...updatedItem.updateItem } : item
          ),
        },
      });
    },
  });

  const size: ItemSize = {
    price: "",
    unit: "",
    id: uuidv4(),
    menu_item_id: selectedItem?.id || 0,
    __typename: "Size",
  };

  const onSizeChange = (e: ChangeEvent<HTMLInputElement>, id: string) => {
    const { name, value } = e.target;
    setSizes(prevSizes => {
      if (prevSizes) {
        return [
          ...prevSizes.map(prevSize =>
            prevSize.id === id ? { ...prevSize, [name]: value } : prevSize
          ),
        ];
      }
      return [];
    });
  };

  const onAddSize = () => setSizes(prevSizes => [...(prevSizes || []), { ...size }]);

  const onDeleteSize = (id: string) =>
    setSizes(prevSizes => prevSizes?.filter(currentSize => currentSize.id !== id));

  const inputPriceError = () => {
    if (sizes) {
      if (isPriceInvalid(sizes)) return <span>Price is required</span>;
    }

    return null;
  };

  const inputNameError = () => {
    const { name } = input;
    if (!isNameValid(name)) return <span>Name is required</span>;
    if (!isBasicNameValid(name)) return <span>Name not valid</span>;
    if (isNameOnlyNumbers(name)) return <span>Name cannot only contain numbers</span>;
    return null;
  };

  const renderSizeInputs = () => {
    if (loading) {
      return <span>loading</span>;
    }
    return itemType === "single" ? (
      <SingleSize errors={[inputPriceError()]} size={sizes?.[0]} handleChange={onSizeChange} />
    ) : (
      <MultiSize
        onChange={onSizeChange}
        addSize={onAddSize}
        deleteSize={onDeleteSize}
        sizes={sizes}
      />
    );
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateItem({
      variables: {
        input: {
          ...input,
          sizes:
            sizes?.map(({ id, ...rest }) =>
              typeof id === "number" ? { id, ...rest } : { ...rest }
            ) || [],
        },
      },
      optimisticResponse: {
        __typename: "Mutation",
        updateItem: {
          ...input,
          sizes:
            sizes?.map(({ id, ...rest }) =>
              typeof id === "number" ? { id, ...rest } : { ...rest }
            ) || [],
        },
      },
    });
  };

  const isFormValid = isNameInputValid(input.name) && sizes && !isPriceInvalid(sizes);

  return (
    <div>
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-semibold text-gray-800 tracking-wider uppercase mr-4">
          Update {input.name}
        </h3>
        <Button onClick={() => onCompleted?.(false)} size="S" colour="accent">
          <XIcon className="w-5 h-5" />
        </Button>
      </div>
      <form onSubmit={handleSubmit} className="mt-4 flex flex-col">
        <Input
          errors={[inputNameError()]}
          onChange={handleInputChange}
          labelText="Name:"
          value={input.name}
          type="text"
          name="name"
          id="name"
          required
        />
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
        <div className="mt-4 rounded-md sm:flex-shrink-0">
          <Button
            loading={updateLoading}
            disabled={!isFormValid}
            isFullwidth
            size="XXL"
            type="submit"
          >
            Update
          </Button>
        </div>
      </form>
    </div>
  );
};

export { UpdateItemForm };
