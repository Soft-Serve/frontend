import React, { memo } from "react";
import type { FC } from "react";
import { AdvancedImage, lazyload, placeholder, responsive } from "@cloudinary/react";
import { Cloudinary, CloudinaryImage } from "@cloudinary/base";
import { Plugins } from "@cloudinary/html";
import { Effect } from "@cloudinary/base/actions/effect";
import { scale } from "@cloudinary/base/actions/resize";
import { auto } from "@cloudinary/base/qualifiers/quality";
import { quality } from "@cloudinary/base/actions/delivery";

export interface ImgProps {
  cldImg: CloudinaryImage;
  plugins?: Plugins;
  [x: string]: any;
}

interface Props extends Omit<ImgProps, "cldImg"> {
  photoUrl: string;
  width?: number;
  unavailable?: boolean;
  isDesktop?: boolean;
}

const cld = new Cloudinary({
  cloud: {
    cloudName: "softserve",
  },
});

const ItemImage: FC<Props> = memo(function ItemImage({ photoUrl, unavailable, isDesktop }) {
  const cldImage = cld.image(photoUrl);
  cldImage.resize(scale().width(200).height(200)).delivery(quality(auto()));

  if (unavailable) {
    cldImage.effect(Effect.grayscale());
  }

  if (photoUrl) {
    return (
      <div className={`relative overflow-hidden pb-48 ${isDesktop ? "w-32" : null}`}>
        <AdvancedImage
          className={`absolute inset-0 h-full w-full  object-cover  ${
            isDesktop ? "rounded-l-md" : "rounded-t-md"
          }`}
          cldImg={cldImage}
          plugins={[lazyload(), responsive({ steps: 200 }), placeholder("blur")]}
        />
      </div>
    );
  }
  return null;
});

export { ItemImage };
