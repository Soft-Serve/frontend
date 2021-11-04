import React, { ChangeEvent, FocusEventHandler } from "react";
import type { FC } from "react";
import { Button } from "@base";
import { PlusIcon } from "@heroicons/react/solid";
import { ItemSize } from "@shared";
import { useGlobalContext } from "@contexts";
import { MultiSizeRow } from "./MultiSizeRow";

interface Props {
  addSize: () => void;
  sizes?: ItemSize[];
  onChange: (e: ChangeEvent<HTMLInputElement>, id: string) => void;
  onBlur?: FocusEventHandler<HTMLInputElement> | undefined;
  deleteSize: (id: string) => void;
}

const MultiSize: FC<Props> = ({ addSize, sizes, deleteSize, onChange }) => {
  const { themeColour, themeTint } = useGlobalContext();
  return (
    <div className={`border-2 border-${themeColour}-${themeTint} rounded-md mt-4 shadow-lg`}>
      <div
        className={`flex items-center justify-between w-full bg-${themeColour}-${themeTint} p-2`}
      >
        <span className="text-white font-medium text-sm">Unit</span>
        <span className="text-white font-medium text-sm">Price</span>
        <Button colour="accent" onClick={addSize}>
          <PlusIcon className="w-5 h-5" />
        </Button>
      </div>
      {sizes?.map((size, index) => (
        <MultiSizeRow
          onChange={onChange}
          disableDeleteButton={sizes?.length === 1}
          deleteSize={deleteSize}
          key={size.id}
          index={index}
          size={size}
        />
      ))}
    </div>
  );
};

export { MultiSize };
