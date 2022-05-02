import React from "react";
import type { FC } from "react";
import Skeleton from "react-loading-skeleton";
import { useBannersQuery } from "@shared";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/base";
import { ThemeFonts } from "@base";

interface Props {
  themeColour: string;
  themeFont: ThemeFonts;
  restaurantSlug: string;
}
const HeroBanner: FC<Props> = ({ themeColour, themeFont, restaurantSlug }) => {
  const cld = new Cloudinary({
    cloud: {
      cloudName: "softserve",
    },
  });

  const { data, loading } = useBannersQuery({
    variables: {
      restaurantSlug,
    },
    skip: !restaurantSlug,
  });

  const cldImage = cld.image(data?.banners?.[0]?.photo);
  if (loading) return <Skeleton height={40} />;

  if (!data?.banners?.[0]) return <></>;
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
                <span className={`block text-white font-${themeFont}`}>
                  {data?.banners?.[0]?.header}
                </span>
                {data?.banners?.[0]?.sub_header && (
                  <span className={`block text-white font-${themeFont}`}>
                    {data?.banners?.[0]?.sub_header}
                  </span>
                )}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { HeroBanner };
