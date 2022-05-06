import React, { FC } from "react";

interface Props {
  children: React.ReactNode;
}

const Container: FC<Props> = ({ children }) => {
  return <div className="mx-auto w-full flex-1 p-2 sm:px-6 lg:px-8">{children}</div>;
};

export { Container };
