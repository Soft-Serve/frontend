import React from "react";
import type { FC } from "react";
import { AdvancedImage, responsive, lazyload, placeholder } from "@cloudinary/react";
import { Cloudinary, CloudinaryImage } from "@cloudinary/base";
import { fill } from "@cloudinary/base/actions/resize";
import { Plugins } from "@cloudinary/html";
import { Effect } from "@cloudinary/base/actions/effect";
import { useViewport } from "src/hooks";

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
  const { width } = useViewport();

  const getImageWidth = () => {
    if (width < 515) return width - 16;
    return 160;
  };

  const cld = new Cloudinary({
    cloud: {
      cloudName: "softserve",
    },
  });

  const cldImage = cld.image(photoUrl);
  cldImage.resize(fill().width(getImageWidth()).height(160));

  if (unavailable) {
    cldImage.effect(Effect.grayscale());
  }

  if (photoUrl) {
    return (
      <AdvancedImage
        {...rest}
        cldImg={cldImage}
        plugins={[lazyload(), responsive([200, 400, 500]), placeholder("blur")]}
      />
    );
  }
  return null;
};

export { ItemImage };
