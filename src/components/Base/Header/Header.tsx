import React, { FC } from "react";

const Header: FC = ({ children }) => {
  return (
    <header className="bg-white p-6 sm:flex sm:items-center sm:justify-between">{children}</header>
  );
};

export { Header };
