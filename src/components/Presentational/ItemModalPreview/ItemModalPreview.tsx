import React, { FC, Fragment } from "react";
import { Dialog, RadioGroup, Transition } from "@headlessui/react";
import { Item } from "@shared";
import { Button } from "@base";
import { ItemImage, ItemPrice } from "@presentational";
import { XIcon } from "@heroicons/react/solid";

interface Props {
  isOpen: boolean;
  onClose: (state: boolean) => void;
  item?: Item;
  themeColour: string;
  themeTint: number;
  themeFont: string;
}
const ItemModalPreview: FC<Props> = ({
  isOpen,
  onClose,
  themeColour,
  themeFont,
  themeTint,
  item,
}) => {
  const renderImage = () =>
    item?.photo && (
      <div className=" mb-4 h-full w-full flex-shrink-0 sm:w-56">
        <ItemImage
          className="inset-0 h-full w-full rounded-md  object-cover"
          unavailable={!item.available}
          photoUrl={item?.photo}
        />
      </div>
    );
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={onClose}>
        <div
          className="flex min-h-screen text-center md:block md:px-2 lg:px-4"
          style={{ fontSize: 0 }}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity md:block" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden md:inline-block md:h-screen md:align-middle" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
            enterTo="opacity-100 translate-y-0 md:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 md:scale-100"
            leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
          >
            <div className="flex w-full transform text-left text-base transition md:my-8 md:inline-block md:max-w-2xl md:px-4 md:align-middle lg:max-w-4xl">
              <div className="flex w-full items-end overflow-hidden rounded-md bg-white px-4 pt-14 pb-8 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                <div className="flex  w-full flex-col">
                  <div className="flex w-full">
                    {renderImage()}
                    <div className="ml-4 w-full">
                      <p className={`font-bold font-${themeFont}`}>{item?.name}</p>

                      <p
                        className={`font-${themeFont} mt-2 overflow-hidden text-ellipsis break-words text-sm italic text-gray-600`}
                      >
                        {item?.available ? item?.description : "** Temporarily unavailable  **"}
                      </p>
                    </div>
                    <div className="h-fit">
                      <Button
                        themeColour={themeColour}
                        themeTint={themeTint}
                        onClick={() => onClose?.(false)}
                        size="S"
                      >
                        <XIcon className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export { ItemModalPreview };
