import React from "react";
import type { FC } from "react";
import { UploadImageSVG } from "@svgs";
import { useRestaurantContext } from "@contexts";

interface Props {
  onChange: (value: File | undefined) => void;
  imageFile?: File;
}

const UploadImageBox: FC<Props> = ({ onChange, imageFile }) => {
  const { themeColour, themeTint } = useRestaurantContext();
  return (
    <div
      className={`my-6 max-w-lg flex justify-center px-3 pt-2 pb-2 border-2 border-${themeColour}-${themeTint} border-dashed rounded-md`}
    >
      <div className="space-y-0.5 text-center">
        <div className="flex text-sm text-gray-600 w-full">
          <label
            htmlFor="file-upload"
            className="relative cursor-pointer bg-white rounded-md font-medium text-gray-900 hover:text-gray-900 focus-within:outline-none w-full  px-24"
          >
            <UploadImageSVG />
            <span className="text-center font-Quicksand font-bold">Upload a photo</span>
            <input
              type="file"
              id="file-upload"
              name="menu-photo"
              accept="image/*"
              onChange={e => onChange(e.target?.files?.[0])}
              className="sr-only"
            />
          </label>
        </div>
        <p className="text-xs text-gray-500 text-center font-Quicksand">
          {imageFile?.name || "PNG, JPG, GIF up to 10MB"}
        </p>
      </div>
    </div>
  );
};

export { UploadImageBox };
