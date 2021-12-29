import React from "react";
import type { FC } from "react";
import Skeleton from "react-loading-skeleton";
import { useRestaurantContext } from "src/contexts";
import { useBannersQuery } from "@shared";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/base";

const HeroBanner: FC = () => {
  const cld = new Cloudinary({
    cloud: {
      cloudName: "softserve",
    },
  });

  const { themeColour, restaurantSlug, themeFont } = useRestaurantContext();
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
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gray-100 w-full" />
        <div className=" w-full mx-auto">
          <div className="relative  md:overflow-hidden">
            <div className="overflow-hidden">
              <AdvancedImage
                className="absolute inset-0 w-full h-full object-cover"
                cldImg={cldImage}
              />
              <div className={`absolute inset-0 bg-${themeColour}-200 mix-blend-multiply`} />
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
