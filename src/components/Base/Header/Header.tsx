import React, { FC } from "react";

interface Props {
  children: React.ReactNode;
}
const Header: FC<Props> = ({ children }) => {
  return (
    <header className="bg-white p-6 sm:flex sm:items-center sm:justify-between">{children}</header>
  );
};

export { Header };
