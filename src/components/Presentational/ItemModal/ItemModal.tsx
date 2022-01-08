import React from "react";
import type { FC } from "react";
import { Modal, Button } from "@base";
import { Item } from "@shared";
import { ItemImage, ItemPrice } from "@presentational";
import { useRestaurantContext } from "src/contexts";
import { ModalDietaries } from "./ModalDietaries";

interface Props {
  isOpen: boolean;
  onClose: (state: boolean) => void;
  item?: Item;
  themeColour: string;
  themeTint: number;
}

const ItemModal: FC<Props> = ({ isOpen, onClose, item, themeTint, themeColour }) => {
  const { themeFont } = useRestaurantContext();
  if (item) {
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <div className="flex w-full h-full sm:flex-row flex-col">
          {item?.photo && (
            <div className="flex-shrink-0 h-full sm:w-56 w-full mr-2">
              <ItemImage
                className="inset-0 w-full h-full object-cover  rounded-md"
                unavailable={!item.available}
                photoUrl={item?.photo}
              />
            </div>
          )}
          <div className=" flex flex-col w-full h-auto justify-between">
            <div>
              <p className={`font-bold font-${themeFont}`}>{item?.name}</p>

              <p
                className={`font-${themeFont} italic text-gray-600 mt-2 text-sm break-words text-ellipsis overflow-hidden`}
              >
                {item.available ? item.description : "** Temporarily unavailable  **"}
              </p>
              <ItemPrice
                themeFont={themeFont}
                themeColour={themeColour}
                themeTint={themeTint}
                withImage
                position="start"
                itemID={item?.id}
              />
            </div>
            <div className="w-full">
              <ModalDietaries itemAvailable={item?.available} itemID={item.id} />
            </div>
          </div>
        </div>
        <div className="flex justify-end items-end w-full mt-4">
          <Button
            themeColour={themeColour}
            themeTint={themeTint}
            isFullwidth
            onClick={() => onClose(false)}
            size="XXL"
          >
            Close
          </Button>
        </div>
      </Modal>
    );
  }
  return null;
};

export { ItemModal };
