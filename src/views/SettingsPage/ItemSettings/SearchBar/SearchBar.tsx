import { SearchIcon } from "@heroicons/react/solid";
import { Box } from "@interface";
import type { Dispatch, FC, SetStateAction } from "react";

interface Props {
  searchValue: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
  themeColour: string;
  themeTint: number;
}
const SearchBar: FC<Props> = ({ themeColour, themeTint, searchValue, setSearchValue }) => {
  return (
    <Box>
      <div className="flex w-full flex-col">
        <div className="flex w-full items-center ">
          <label
            htmlFor="search"
            className="ml-4 block font-Quicksand text-sm font-bold text-gray-900"
          >
            Search items
          </label>
          <div className="ml-4 mt-1 min-w-0 flex-1">
            <div className="relative rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input
                value={searchValue}
                onChange={e => setSearchValue(e.target.value)}
                type="search"
                name="search"
                id="search"
                className={`focus:ring-${themeColour}-${themeTint} focus:border-${themeColour}-${themeTint} block w-full border-2 pl-10 sm:text-sm border-${themeColour}-${themeTint} h-full rounded-md py-2 focus:outline-none`}
              />
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
};

export { SearchBar };
