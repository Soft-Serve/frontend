import React, { useState } from "react";
import type { FC } from "react";
import { UploadImageBox } from "@base";
import { ItemImage } from "@presentational";
import { useUploadPhoto } from "@hooks";
import ImageUploading, { ImageListType } from "react-images-uploading";

interface Props {
  logo: string;
  themeColour: string;
  themeTint: number;
}
const UpdateRestaurantLogo: FC<Props> = ({ logo, themeColour, themeTint }) => {
  const [images, setImages] = useState<ImageListType>([]);

  const onChange = (e?: ImageListType) => (e ? setImages(e) : null);

  return (
    <>
      <ImageUploading value={images} onChange={onChange} maxNumber={1}>
        {({ imageList, onImageUpload, onImageUpdate }) => (
          // write your building UI
          <div className="upload__image-wrapper">
            <button onClick={onChange}>Click or Drop here</button>
            &nbsp;
            {imageList.map((image, index) => (
              <div key={index} className="image-item">
                <img src={image.dataURL} alt="" width="100" />
              </div>
            ))}
          </div>
        )}
      </ImageUploading>
    </>
  );
};

export { UpdateRestaurantLogo };

{
  /* <label className="my-4 block font-Quicksand text-sm font-bold text-gray-900">
Restaurant Logo
</label>
<div className="flex w-full flex-wrap items-center justify-between">
<div className="m-2">
  <ItemImage width={208} photoUrl={logo} />
</div>
<UploadImageBox
  themeColour={themeColour}
  themeTint={themeTint}
  onChange={handlePhotoChange}
  imageFile={photoFile}
/>
</div> */
}
