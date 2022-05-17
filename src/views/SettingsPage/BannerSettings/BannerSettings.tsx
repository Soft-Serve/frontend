import React, { useState } from "react";
import type { FC } from "react";
import ImageUploading from "react-images-uploading";

import { ItemImage } from "@presentational";
import { BANNERS_QUERY, useBannersQuery, useRestaurantQuery } from "@shared";
import {
  BoxUploadImage,
  Button,
  Card,
  CardContent,
  HeroBanner,
  TabWrapper,
  ThemeFonts,
} from "@base";
import { classnames } from "tailwindcss-classnames";
import { useUploadPhoto, useViewport } from "@hooks";
import { SettingsHeader } from "../SettingsHeader";
import { UpdateBannerHeadingsForm } from "./UpdateBannerHeadingsForm";
import { SkeletonBannerSettings } from "./SkeletonBannerSettings";
import { useUpdateBannerImageMutation } from "./UpdateBannerImage.mutation";
import { useCreateNewBannerImage } from "./CreateBannerImagePhoto.mutation";
import type { ImageListType } from "react-images-uploading";

interface Props {
  themeColour: string;
  themeTint: number;
  themeFont: ThemeFonts;
  restaurantSlug: string;
}
const BannerSettings: FC<Props> = ({ themeTint, themeColour, themeFont, restaurantSlug }) => {
  const { width } = useViewport();
  const isMobile = width < 475;
  const [images, setImages] = useState<ImageListType>([]);

  const [isLoading, setIsLoading] = useState(false);
  const { data, loading } = useBannersQuery({
    variables: {
      restaurantSlug,
    },
  });

  const { data: restaurantData, loading: restaurantLoading } = useRestaurantQuery({
    variables: {
      restaurantSlug,
    },
  });

  const [updatePhoto] = useUpdateBannerImageMutation({
    onCompleted: () => {
      setImages([]);
      setIsLoading(false);
    },
  });
  const [createPhoto] = useCreateNewBannerImage({
    onCompleted: () => {
      setImages([]);
      setIsLoading(false);
    },
  });

  const { setPhotoFile, fetchPhoto } = useUploadPhoto();

  const handleUpdatePhoto = async () => {
    setIsLoading(true);
    const photo = await fetchPhoto();
    if (data?.banners?.[0]?.photo && photo) {
      updatePhoto({
        variables: {
          input: {
            id: data?.banners?.[0]?.id || 0,
            restaurantId: restaurantData?.restaurant?.id || 0,
            photo,
          },
        },
        refetchQueries: [
          {
            query: BANNERS_QUERY,
            variables: {
              restaurantSlug,
            },
          },
        ],
      });
    } else if (photo) {
      createPhoto({
        variables: {
          input: {
            header:
              data?.banners?.[0]?.header || restaurantData?.restaurant?.name || restaurantSlug,
            restaurant_id: restaurantData?.restaurant?.id || 0,
            photo,
          },
        },
        refetchQueries: [
          {
            query: BANNERS_QUERY,
            variables: {
              restaurantSlug,
            },
          },
        ],
      });
    }
  };

  const renderBannerPhoto = () => {
    if (images.length)
      return (
        <div className="mr-4 flex h-32 w-32 items-center justify-center">
          <img src={images[0].dataURL} />
        </div>
      );
    else if (!images.length && data?.banners?.[0]?.photo) {
      return (
        <div className="mr-4 flex h-32 w-32 items-center justify-center">
          <ItemImage photoUrl={data.banners[0].photo} />
        </div>
      );
    }
    return null;
  };

  const onChange = (e?: ImageListType) => {
    if (e) {
      setImages(e);
      setPhotoFile(e[0].file);
    }
  };

  const renderActions = (onImageUpload: () => void, onImageUpdate: (index: number) => void) => {
    const handlePhotoChange = () => {
      onImageUpdate(0);
      setPhotoFile(images[0].file);
    };

    if (images.length)
      return (
        <div className="my-2 flex flex-wrap items-center justify-center">
          <Button
            isFullwidth={isMobile}
            disabled={loading || isLoading}
            colour="accent"
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
              onClick={handleUpdatePhoto}
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

    return (
      <BoxUploadImage
        imageFile={images[0]?.file}
        onChange={onImageUpload}
        themeColour={themeColour}
        themeTint={themeTint}
      />
    );
  };

  const renderBanner = () => {
    if (data?.banners?.[0]?.photo) {
      return (
        <Card>
          <HeroBanner
            restaurantSlug={restaurantSlug}
            themeColour={themeColour}
            themeFont={themeFont}
          />
        </Card>
      );
    }
    return null;
  };

  if (loading || restaurantLoading) return <SkeletonBannerSettings />;

  return (
    <TabWrapper>
      <Card css="mb-4">
        <CardContent>
          <SettingsHeader>Banner</SettingsHeader>
        </CardContent>
      </Card>
      {renderBanner()}
      <Card css={classnames("flex-col", "mt-4")}>
        <UpdateBannerHeadingsForm
          photo={data?.banners?.[0]?.photo ? data?.banners?.[0]?.photo : ""}
          restaurantSlug={restaurantSlug}
          themeColour={themeColour}
          themeTint={themeTint}
          restaurantId={restaurantData?.restaurant?.id}
          subHeader={data?.banners?.[0]?.sub_header}
          header={data?.banners?.[0]?.header}
          id={data?.banners?.[0]?.id}
        />
        <label className="my-4 block font-Quicksand text-sm font-bold text-gray-900">
          Hero image
        </label>
        <div className="flex w-full flex-wrap items-center justify-center sm:justify-between">
          {renderBannerPhoto()}
          <ImageUploading value={images} onChange={onChange} maxNumber={1}>
            {({ onImageUpload, onImageUpdate }) => (
              <>{renderActions(onImageUpload, onImageUpdate)}</>
            )}
          </ImageUploading>
        </div>
      </Card>
    </TabWrapper>
  );
};

export { BannerSettings };
