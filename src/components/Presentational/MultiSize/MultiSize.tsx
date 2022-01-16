import React, { ChangeEvent, FocusEventHandler } from "react";
import type { FC } from "react";
import { Button } from "@base";
import { PlusIcon } from "@heroicons/react/solid";
import { ItemSize } from "@shared";
import { MultiSizeRow } from "./MultiSizeRow";

interface Props {
  themeColour: string;
  themeTint: number;
  addSize: () => void;
  sizes?: ItemSize[];
  onChange: (e: ChangeEvent<HTMLInputElement>, id: string) => void;
  onBlur?: FocusEventHandler<HTMLInputElement> | undefined;
  deleteSize: (id: string) => void;
}

const MultiSize: FC<Props> = ({ addSize, sizes, deleteSize, onChange, themeColour, themeTint }) => {
  return (
    <div className={`border-2 border-${themeColour}-${themeTint} rounded-md mt-4`}>
      <div
        className={`flex items-center justify-between w-full p-2 border-b-2 border-${themeColour}-${themeTint}`}
      >
        <span className="text-gray-900 font-bold text-sm ml-2">Unit</span>
        <span className="text-gray-900  font-bold text-sm">
          Price <span className="text-red-500">*</span>
        </span>
        <Button themeColour={themeColour} themeTint={themeTint} colour="primary" onClick={addSize}>
          <PlusIcon className="w-5 h-5" />
        </Button>
      </div>
      {sizes?.map((size, index) => (
        <MultiSizeRow
          themeColour={themeColour}
          themeTint={themeTint}
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
