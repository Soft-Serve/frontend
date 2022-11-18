import React, { useState } from "react";
import type { FC } from "react";
import { BoxUploadImage, Button, Notification } from "@base";
import { useUploadPhoto, useViewport } from "@hooks";
import ImageUploading, { ImageListType } from "react-images-uploading";
import { useUpdateRestaurantLogo } from "./UpdateRestaurantLogo.mutation";
import { RESTAURANT_QUERY } from "@shared";
import toast from "react-hot-toast";
import { RestaurantLogo } from "../RestaurantLogo";

interface Props {
  logo: string;
  themeColour: string;
  themeTint: number;
  id: number;
  restaurantSlug: string;
}
const UpdateRestaurantLogo: FC<Props> = ({ logo, themeColour, themeTint, id, restaurantSlug }) => {
  const onSuccess = () => toast.custom(<Notification header="Logo succesfully updated!" />);
  const { width } = useViewport();
  const isMobile = width < 475;

  const [images, setImages] = useState<ImageListType>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { setPhotoFile, fetchPhoto } = useUploadPhoto();

  const [updateLogo, { loading }] = useUpdateRestaurantLogo({
    refetchQueries: [
      {
        query: RESTAURANT_QUERY,
        variables: {
          restaurantSlug,
        },
      },
    ],
    onCompleted: () => {
      setImages([]);
      setIsLoading(false);
      onSuccess();
    },
  });

  const handleUpdate = async () => {
    setIsLoading(true);
    const newLogo = await fetchPhoto();
    updateLogo({
      variables: {
        input: {
          id,
          logo: newLogo,
        },
      },
    });
  };

  const onChange = (e?: ImageListType) => {
    if (e) {
      setImages(e);
      setPhotoFile(e[0].file);
    }
  };

  const renderImage = () => {
    if (images.length) return <img className="h-full" src={images[0].dataURL} />;
    return <RestaurantLogo dimensions={100} restaurantSlug={restaurantSlug} />;
  };

  const renderActions = (onImageUpload: () => void, onImageUpdate: (index: number) => void) => {
    const handlePhotoChange = () => {
      onImageUpdate(0);
      setPhotoFile(images[0].file);
    };

    if (images.length)
      return (
        <div className="mt-4 flex flex-wrap items-center justify-center">
          <Button
            isFullwidth={isMobile}
            disabled={loading || isLoading}
            colour="accent"
            css="mr-2"
            size="XL"
            onClick={handlePhotoChange}
            themeColour={themeColour}
            themeTint={themeTint}
          >
            Change photo
          </Button>
          <div className="ml-0 mt-4 w-full xs:ml-4 xs:mt-0 xs:w-auto">
            <Button
              isFullwidth={isMobile}
              onClick={handleUpdate}
              loading={loading || isLoading}
              size="XL"
              themeColour={themeColour}
              themeTint={themeTint}
            >
              Upload photo
            </Button>
          </div>
        </div>
      );

    if (logo) {
      return (
        <div className="mt-4 flex flex-wrap items-center justify-center">
          <Button
            isFullwidth={isMobile}
            disabled={loading || isLoading}
            colour="accent"
            css="mr-2"
            size="XL"
            onClick={handlePhotoChange}
            themeColour={themeColour}
            themeTint={themeTint}
          >
            Change photo
          </Button>
        </div>
      );
    }
    return (
      <BoxUploadImage onChange={onImageUpload} themeColour={themeColour} themeTint={themeTint} />
    );
  };

  return (
    <ImageUploading value={images} onChange={onChange} maxNumber={1}>
      {({ onImageUpload, onImageUpdate }) => (
        <>
          <span className="mb-4 font-Quicksand text-sm font-bold text-gray-900">
            Restaurant Logo
          </span>
          <div className="flex w-full flex-wrap items-center justify-center ">
            <div className="mr-4 flex h-32 w-32 items-center justify-center">{renderImage()}</div>
            {renderActions(onImageUpload, onImageUpdate)}
          </div>
        </>
      )}
    </ImageUploading>
  );
};

export { UpdateRestaurantLogo };
