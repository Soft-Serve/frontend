import React from "react";
import { RadioGroup } from "@headlessui/react";
import type { FC } from "react";

interface Props {
  value: any;
  onChange: (e: any) => void;
  children: React.ReactNode;
}
const RadioTiles: FC<Props> = ({ value, onChange, children }) => {
  return (
    <RadioGroup value={value} onChange={onChange}>
      {children}
    </RadioGroup>
  );
};

export { RadioTiles };
