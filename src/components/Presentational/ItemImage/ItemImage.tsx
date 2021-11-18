import React from "react";
import type { FC } from "react";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary, CloudinaryImage } from "@cloudinary/base";
import { fill } from "@cloudinary/base/actions/resize";
import { Plugins } from "@cloudinary/html";
import { Effect, sepia } from "@cloudinary/base/actions/effect";

export interface ImgProps {
  cldImg: CloudinaryImage;
  plugins?: Plugins;
  [x: string]: any;
}

interface Props extends Omit<ImgProps, "cldImg"> {
  photoUrl: string;
  unavailable?: boolean;
}

const ItemImage: FC<Props> = ({ photoUrl, unavailable, ...rest }) => {
  const cld = new Cloudinary({
    cloud: {
      cloudName: "softserve",
    },
  });

  const cldImage = cld.image(photoUrl);
  cldImage.resize(fill().width(192).height(192));

  if (unavailable) {
    cldImage.effect(Effect.grayscale());
  }

  if (photoUrl) {
    return <AdvancedImage {...rest} cldImg={cldImage} />;
  }
  return null;
};

export { ItemImage };
