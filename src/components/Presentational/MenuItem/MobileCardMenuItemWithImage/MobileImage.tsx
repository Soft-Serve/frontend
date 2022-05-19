import React, { memo } from "react";
import type { FC } from "react";
import { AdvancedImage, lazyload, placeholder, responsive } from "@cloudinary/react";
import { Cloudinary, CloudinaryImage } from "@cloudinary/base";
import { Plugins } from "@cloudinary/html";
import { Effect } from "@cloudinary/base/actions/effect";

export interface ImgProps {
  cldImg: CloudinaryImage;
  plugins?: Plugins;
  [x: string]: any;
}

interface Props extends Omit<ImgProps, "cldImg"> {
  photoUrl: string;
  width?: number;
  unavailable?: boolean;
}

const cld = new Cloudinary({
  cloud: {
    cloudName: "softserve",
  },
});

const MobileImage: FC<Props> = memo(function ItemImage({ photoUrl, unavailable }) {
  const cldImage = cld.image(photoUrl);

  if (unavailable) {
    cldImage.effect(Effect.grayscale());
  }

  if (photoUrl) {
    return (
      <div className="relative overflow-hidden pb-48">
        <AdvancedImage
          className="absolute inset-0 h-full w-full object-cover"
          cldImg={cldImage}
          plugins={[lazyload(), responsive({ steps: 200 }), placeholder("blur")]}
        />
      </div>
    );
  }
  return null;
});

export { MobileImage };
