import React, { FC } from "react";

const Container: FC = ({ children }) => {
  return <div className="mx-auto w-full flex-1 p-2 sm:px-6 lg:px-8">{children}</div>;
};

export { Container };
