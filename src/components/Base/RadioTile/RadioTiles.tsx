import React from "react";
import { RadioGroup } from "@headlessui/react";
import type { FC } from "react";

interface Props {
  value: any;
  onChange: (e: any) => void;
}
const RadioTiles: FC<Props> = ({ value, onChange, children }) => {
  return (
    <RadioGroup value={value} onChange={onChange}>
      {children}
    </RadioGroup>
  );
};

export { RadioTiles };
