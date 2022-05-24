import React, { FC, ReactNode, useState } from "react";
import AnimateHeight from "react-animate-height";

interface Props {
  buttonContent: (open: boolean) => ReactNode;
  children: ReactNode;
  initialOpen?: boolean;
}
const Disclose: FC<Props> = ({ buttonContent, children, initialOpen = false }) => {
  const [open, setOpen] = useState(initialOpen);

  return (
    <div className="relative w-full">
      <div className="flex w-full justify-end" onClick={() => setOpen(!open)}>
        {buttonContent(open)}
      </div>
      <AnimateHeight id={"sliding_wrapper"} duration={300} height={open ? "auto" : 0}>
        {children}
      </AnimateHeight>
    </div>
  );
};

export { Disclose };
