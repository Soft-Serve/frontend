import React from "react";
import type { FC } from "react";
import { FullLogoSVG } from "@svgs";
import { useRestaurantContext } from "@contexts";
import { useRestaurantQuery } from "@shared";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/base";
import { fill } from "@cloudinary/base/actions/resize";
import { byRadius } from "@cloudinary/base/actions/roundCorners";
import { outline } from "@cloudinary/base/actions/effect";
import { outer } from "@cloudinary/base/qualifiers/outlineMode";

interface Props {
  dimensions: number;
  borderColor?: string;
  borderWidth?: number;
}

const RestaurantLogo: FC<Props> = ({ dimensions, borderColor = "white", borderWidth = 3 }) => {
  const { restaurantSlug } = useRestaurantContext();
  const { data: restaurantData } = useRestaurantQuery({
    variables: {
      restaurantSlug,
    },
    skip: !restaurantSlug,
  });
  const cld = new Cloudinary({
    cloud: {
      cloudName: "softserve",
    },
  });
  const logo = restaurantData?.restaurant?.logo;
  const cldImage = cld.image(logo);
  cldImage
    .resize(fill().width(dimensions).height(dimensions))
    .roundCorners(byRadius(10))
    .effect(outline().mode(outer()).width(borderWidth).color(borderColor));
  return (
    <>
      {logo ? (
        <AdvancedImage cldImg={cldImage} />
      ) : (
        <FullLogoSVG className="w-20 fill-current stroke-current text-white" />
      )}
    </>
  );
};

export { RestaurantLogo };
