import React from "react";
import type { FC } from "react";
import { UploadImageSVG } from "@svgs";
import type { ImageListType } from "react-images-uploading";

interface Props {
  onChange: (e?: ImageListType | undefined) => void | null;
  imageFile?: File;
  themeColour: string;
  themeTint: number;
}

const UploadImageBox: FC<Props> = ({ onChange, imageFile, themeTint, themeColour }) => {
  return (
    <div
      className={`my-6 flex max-w-lg justify-center border-2 px-3 pt-2 pb-2 border-${themeColour}-${themeTint} rounded-md border-dashed`}
    >
      <div className="space-y-0.5 text-center">
        <div className="flex w-full text-sm text-gray-600">
          <label
            htmlFor="file-upload"
            className="relative w-full cursor-pointer rounded-md bg-white px-24 font-medium text-gray-900 focus-within:outline-none  hover:text-gray-900"
          >
            <UploadImageSVG />
            <span className="text-center font-Quicksand font-bold">Upload a photo</span>
            <button onClick={onChange}>Click or Drop here</button>
          </label>
        </div>
        <p className="text-center font-Quicksand text-xs text-gray-500">
          {imageFile?.name || "PNG, JPG, GIF up to 10MB"}
        </p>
      </div>
    </div>
  );
};

export { UploadImageBox };
