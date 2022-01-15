import React, { useState } from "react";
import type { FC } from "react";
import { GlobalContext } from "@contexts";

const GlobalProvider: FC = ({ children }) => {
  const [menuID, setMenuID] = useState(0);
  const [categoryID, setCategoryID] = useState(0);
  const [activeMenu, setActiveMenu] = useState("");

  return (
    <GlobalContext.Provider
      value={{
        activeMenu,
        setActiveMenu,
        menuID,
        setMenuID,
        categoryID,
        setCategoryID,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
export { GlobalProvider };
