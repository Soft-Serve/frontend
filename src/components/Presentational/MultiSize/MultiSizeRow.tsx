import React, { useState } from "react";
import type { FC, ChangeEvent } from "react";
import { Input, Button } from "@base";
import { TrashIcon } from "@heroicons/react/solid";
import { ItemSize } from "src/shared";

interface Props {
  size: Pick<ItemSize, "price" | "unit" | "id">;
  disableDeleteButton?: boolean;
  deleteSize: (id: string) => void;
  index: number;
  onChange: (e: ChangeEvent<HTMLInputElement>, id: string) => void;
}

const MultiSizeRow: FC<Props> = ({ size, deleteSize, index, onChange, disableDeleteButton }) => {
  const isPriceValid = () => !!size.price;
  const isUnitValid = () => !!size.unit;
  const [isPriceDirty, setIsPriceDirty] = useState(false);
  const [isUnitDirty, setIsUnitDirty] = useState(false);

  const renderPriceError = () => {
    if (!isPriceDirty) return null;
    if (!isPriceValid()) return <span>Price is required</span>;
    return null;
  };

  const renderUnitError = () => {
    if (!isUnitDirty) return null;
    if (!isUnitValid()) return <span>Unit is required</span>;
    return null;
  };

  const errors = [renderPriceError(), renderUnitError()];

  const renderErrorMessages = (errorIndex: number) => {
    return errors
      ?.slice(0, 2)
      .map(error => <p key={`error-item-${error}-${errorIndex}`}>{error}</p>);
  };

  const hasErrors = () => {
    if (!errors) return false;
    return errors.filter(e => !!e).length > 0;
  };

  return (
    <>
      <div className="flex items-center justify-between w-full p-2">
        <div className="w-40">
          <Input
            onBlur={() => setIsUnitDirty(true)}
            onChange={e => onChange(e, size?.id || "")}
            value={size.unit}
            placeholder="small"
            type="text"
            name="unit"
            id="unit"
            required
          />
        </div>
        <div className="mx-2">
          <Input
            min={0}
            step={0.1}
            onBlur={() => setIsPriceDirty(true)}
            required
            type="number"
            value={size.price}
            onChange={e => onChange(e, size?.id || "")}
            name="price"
            id="price"
          />
        </div>
        <div className="w-16">
          <Button
            disabled={disableDeleteButton}
            onClick={() => deleteSize(size?.id || "")}
            size="S"
            colour="accent"
            css="border-none"
          >
            <TrashIcon className="w-5 h-5" />
          </Button>
        </div>
      </div>
      {hasErrors() && (
        <div
          className="m-2 text-sm text-white font-bold p-2 text-center bg-red-600 rounded-md"
          id="email-error"
        >
          {renderErrorMessages(index)}
        </div>
      )}
    </>
  );
};

export { MultiSizeRow };
