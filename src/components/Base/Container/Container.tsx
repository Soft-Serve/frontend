import React, { FC } from "react";

const Container: FC = ({ children }) => {
  return <div className="w-full mx-auto sm:px-6 lg:px-8 p-2 flex-1">{children}</div>;
};

export { Container };
