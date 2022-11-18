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
import { Button, Input, TextBox, UploadImageBox } from "@base";
import { XIcon } from "@heroicons/react/solid";
import { MultiSize } from "@presentational";
import { isNameInputValid, isNameOnlyNumbers, isNameValid, isPriceInvalid } from "@utility";
import { v4 as uuidv4 } from "uuid";
import { useUpdateItemMutation } from "./UpdateItem.mutation";
import { useUploadPhoto } from "src/hooks";
import { Container } from "@interface";

interface Props {
  onCompleted?: (state: boolean) => void;
  selectedMenu?: Menu;
  selectedItem?: Item;
  themeColour: string;
  themeTint: number;
}

const UpdateItemForm: FC<Props> = ({ onCompleted, selectedItem, themeColour, themeTint }) => {
  const { data: itemSizeData } = useItemSizeQuery({
    variables: {
      itemID: selectedItem?.id || 0,
    },
  });
  const { photoFile, setPhotoFile, fetchPhoto } = useUploadPhoto();

  const [sizes, setSizes] = useState(itemSizeData?.itemSizes);

  const [input, setInput] = useState({
    name: selectedItem?.name || "",
    description: selectedItem?.description || "",
    available: selectedItem?.available || true,
    menu_category_id: selectedItem?.menu_category_id || 0,
    id: selectedItem?.id || 0,
    __typename: "Item",
    photo: selectedItem?.photo || "",
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

  const onAddSize = () => setSizes(prevSizes => [...(prevSizes || []), { ...size, id: uuidv4() }]);

  const onDeleteSize = (id: string) =>
    setSizes(prevSizes => prevSizes?.filter(currentSize => currentSize.id !== id));

  const inputNameError = () => {
    const { name } = input;
    if (!isNameValid(name)) return <span>Name is required</span>;
    if (!isNameInputValid(name)) return <span>Name not valid</span>;
    if (isNameOnlyNumbers(name)) return <span>Name cannot only contain numbers</span>;
    return null;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const photo = await fetchPhoto();
    updateItem({
      variables: {
        input: {
          ...input,
          sizes:
            sizes?.map(({ id, ...rest }) =>
              typeof id === "number" ? { id, ...rest } : { ...rest }
            ) || [],
          photo,
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

  const staticContent = (
    <div className="mb-4 flex items-center justify-between">
      <h3 className="mr-4 text-sm font-semibold uppercase tracking-wider text-gray-900">
        Update {input.name}
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
  );

  return (
    <Container isScrollable adjustHeight={75} containerWidth="full" staticContent={staticContent}>
      <div className="font-Quicksand">
        <form onSubmit={handleSubmit} className="mt-4 flex flex-col">
          <Input
            themeColour={themeColour}
            themeTint={themeTint}
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
            sizes={sizes}
          />
          <UploadImageBox
            themeColour={themeColour}
            themeTint={themeTint}
            onChange={setPhotoFile}
            imageFile={photoFile}
          />
          <div className="mt-4 rounded-md sm:flex-shrink-0">
            <Button
              themeColour={themeColour}
              themeTint={themeTint}
              loading={updateLoading}
              disabled={!isFormValid}
              isFullwidth
              size="XXL"
              type="submit"
            >
              Update Item
            </Button>
          </div>
        </form>
      </div>
    </Container>
  );
};

export { UpdateItemForm };
