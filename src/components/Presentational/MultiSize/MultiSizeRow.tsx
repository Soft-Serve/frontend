import React, { useState } from "react";
import type { FC, ChangeEvent } from "react";
import { Input, Button } from "@base";
import { TrashIcon } from "@heroicons/react/solid";
import { ItemSize } from "src/shared";
import { classnames } from "tailwindcss-classnames";

interface Props {
  numberOfSizes: number;
  themeColour: string;
  themeTint: number;
  size: Pick<ItemSize, "price" | "unit" | "id">;
  disableDeleteButton?: boolean;
  deleteSize: (id: string) => void;
  index: number;
  onChange: (e: ChangeEvent<HTMLInputElement>, id: string) => void;
}

const MultiSizeRow: FC<Props> = ({
  numberOfSizes,
  size,
  deleteSize,
  index,
  onChange,
  disableDeleteButton,
  themeTint,
  themeColour,
}) => {
  const isPriceValid = () => !!size.price;
  const [isPriceDirty, setIsPriceDirty] = useState(false);

  const renderPriceError = () => {
    if (!isPriceDirty) return null;
    if (!isPriceValid()) return <span>Price is required</span>;
    return null;
  };

  const errors = [renderPriceError()];

  const renderErrorMessages = (errorIndex: number) => {
    return errors
      ?.slice(0, 2)
      .map(error => <p key={`error-item-${error}-${errorIndex}`}>{error}</p>);
  };

  const hasErrors = () => {
    if (!errors) return false;
    return errors.filter(e => !!e).length > 0;
  };

  const renderSizeInput = () => {
    if (numberOfSizes === 1) return null;
    return (
      <div className="w-40">
        <Input
          themeColour={themeColour}
          themeTint={themeTint}
          onChange={e => onChange(e, size?.id || "")}
          value={size.unit}
          placeholder="5 OZ"
          type="text"
          name="unit"
          id="unit"
          required
        />
      </div>
    );
  };

  return (
    <>
      <div className="flex w-full items-center justify-between p-2">
        {renderSizeInput()}
        <div className={classnames("mx-2", { ["max-w-xs"]: numberOfSizes === 1 })}>
          <Input
            themeColour={themeColour}
            themeTint={themeTint}
            placeholder="27.00"
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
            themeColour={themeColour}
            themeTint={themeTint}
            disabled={disableDeleteButton}
            onClick={() => deleteSize(size?.id || "")}
            size="S"
            colour="accent"
            css={classnames("border-none", "mt-2")}
          >
            <TrashIcon className="h-5 w-5" />
          </Button>
        </div>
      </div>
      {hasErrors() && (
        <div
          className="m-2 rounded-md bg-red-600 p-2 text-center text-sm font-bold text-white"
          id="email-error"
        >
          {renderErrorMessages(index)}
        </div>
      )}
    </>
  );
};

export { MultiSizeRow };
