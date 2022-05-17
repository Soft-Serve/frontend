import React from "react";
import type { FC } from "react";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/base";
import { ThemeFonts } from "@base";

interface Props {
  header?: string;
  subHeader?: string;
  image?: string;
  themeColour: string;
  themeFont: ThemeFonts;
  restaurantSlug: string;
}

const cld = new Cloudinary({
  cloud: {
    cloudName: "softserve",
  },
});

const HeroBanner: FC<Props> = ({ themeColour, themeFont, image, header, subHeader }) => {
  const cldImage = cld.image(image);

  if (!image) return null;

  return (
    <div className="w-full">
      <div className="relative w-full">
        <div className="absolute inset-x-0 bottom-0 h-1/2 w-full bg-gray-100" />
        <div className=" mx-auto w-full">
          <div className="relative  md:overflow-hidden">
            <div className="overflow-hidden">
              <AdvancedImage
                className="absolute inset-0 h-full w-full object-cover"
                cldImg={cldImage}
              />
              <div
                className={`absolute inset-0 bg-${themeColour}-200 mix-blend-multiply brightness-75`}
              />
            </div>
            <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
              <h1 className="text-center text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                <span className={`block text-white font-${themeFont}`}>{header}</span>
              </h1>
              <h3 className="text-md text-center text-xl font-bold tracking-tight sm:text-2xl lg:text-3xl">
                {subHeader && (
                  <span className={`block text-white font-${themeFont}`}>{subHeader}</span>
                )}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { HeroBanner };
