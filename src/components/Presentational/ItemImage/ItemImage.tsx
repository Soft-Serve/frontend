import React, { memo } from "react";
import type { FC } from "react";
import { AdvancedImage, lazyload, placeholder, responsive } from "@cloudinary/react";
import { Cloudinary, CloudinaryImage } from "@cloudinary/base";

import { scale } from "@cloudinary/base/actions/resize";
import { Plugins } from "@cloudinary/html";
import { Effect } from "@cloudinary/base/actions/effect";
import { quality } from "@cloudinary/base/actions/delivery";
import { autoGood } from "@cloudinary/base/qualifiers/quality";

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

const ItemImage: FC<Props> = memo(function ItemImage({
  photoUrl,
  unavailable,
  width = 200,
  ...rest
}) {
  const cld = new Cloudinary({
    cloud: {
      cloudName: "softserve",
    },
  });

  const cldImage = cld.image(photoUrl);
  cldImage.resize(scale().width(width).height(208)).delivery(quality(autoGood()));

  if (unavailable) {
    cldImage.effect(Effect.grayscale());
  }

  if (photoUrl) {
    return (
      <AdvancedImage
        {...rest}
        cldImg={cldImage}
        plugins={[lazyload(), responsive(), placeholder("blur")]}
      />
    );
  }
  return null;
});

export { ItemImage };
