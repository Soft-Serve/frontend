export const useStyles = (themeColour: string, themeTint: number) => {
  const cursorStyles = (id: number) =>
    id ? "cursor-pointer focus:outline-none" : "cursor-not-allowed opacity-25";

  const activeStyles = (active: boolean) =>
    active ? `"ring-2 ring-offset-2 ring-${themeColour}-${themeTint}"` : "";

  const checkedStyles = (checked: boolean) => {
    const text = `text-${themeColour}-${themeTint}`;
    return checked
      ? `bg-${themeColour}-${themeTint} border-transparent text-white hover:bg-${themeColour}-${
          themeTint + 100
        }`
      : `border-2 border-${themeColour}-${themeTint} bg-white text-gray-900 hover:bg-gray-50 ${text}`;
  };

  const baseStyles = `mx-2 flex items-center justify-center rounded-md  py-3 px-3 text-sm font-medium uppercase sm:flex-1`;

  return {
    baseStyles,
    activeStyles,
    checkedStyles,
    cursorStyles,
  };
};
