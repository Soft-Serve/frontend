import React, { ChangeEvent, ReactNode } from "react";
import type { FC } from "react";
import { ItemSize } from "@shared";
import { Input } from "@base";

interface Props {
  size?: ItemSize;
  handleChange: (e: ChangeEvent<HTMLInputElement>, id: string) => void;
  errors?: ReactNode[];
  onBlur?: () => void;
}

const SingleSize: FC<Props> = ({ handleChange, size, errors, onBlur }) => {
  if (size) {
    return (
      <div className="mt-1">
        <Input
          min={0}
          step={0.1}
          onChange={e => handleChange(e, size?.id || "")}
          labelText="Price"
          value={size.price}
          required
          errors={errors}
          onBlur={onBlur}
          name="price"
          type="number"
        />
      </div>
    );
  }
  return null;
};

export { SingleSize };
