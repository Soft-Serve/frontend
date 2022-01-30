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
    <div className={`border-2 border-${themeColour}-${themeTint} mt-4 rounded-md`}>
      <div
        className={`flex w-full items-center justify-between border-b-2 p-2 border-${themeColour}-${themeTint}`}
      >
        <span className="ml-2 text-sm font-bold text-gray-900">Unit</span>
        <span className="text-sm  font-bold text-gray-900">
          Price <span className="text-red-500">*</span>
        </span>
        <Button themeColour={themeColour} themeTint={themeTint} colour="primary" onClick={addSize}>
          <PlusIcon className="h-5 w-5" />
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
