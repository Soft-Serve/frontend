import React from "react";
import type { FC } from "react";
import { Modal, Button } from "@base";
import { Item } from "@shared";
import { ItemImage, ItemPrice } from "@presentational";
import { ModalDietaries } from "./ModalDietaries";

interface Props {
  isOpen: boolean;
  onClose: (state: boolean) => void;
  item?: Item;
  themeColour: string;
  themeTint: number;
  themeFont: string;
}

const ItemModal: FC<Props> = ({ isOpen, onClose, item, themeTint, themeColour, themeFont }) => {
  if (item) {
    const renderPhoto = () => {
      if (item.photo) {
        return (
          <div className="mr-2 h-full w-full flex-shrink-0 sm:w-56">
            <ItemImage
              className="inset-0 h-full w-full rounded-md  object-cover"
              unavailable={!item.available}
              photoUrl={item.photo}
            />
          </div>
        );
      }
      return null;
    };
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <div className="flex h-full w-full flex-col sm:flex-row">
          {renderPhoto()}
          <div className=" flex h-auto w-full flex-col justify-between">
            <div>
              <p className={`font-bold font-${themeFont}`}>{item.name}</p>

              <p
                className={`font-${themeFont} mt-2 overflow-hidden text-ellipsis break-words text-sm italic text-gray-600`}
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
              <ModalDietaries
                themeFont={themeFont}
                themeColour={themeColour}
                themeTint={themeTint}
                itemAvailable={item.available}
                itemID={item.id}
              />
            </div>
          </div>
        </div>
        <div className="mt-4 flex w-full items-end justify-end">
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
