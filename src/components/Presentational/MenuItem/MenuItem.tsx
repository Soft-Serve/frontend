import React from "react";
import type { FC, DetailedHTMLProps, HTMLAttributes } from "react";
import { useAllergyContext, useViewportContext } from "@contexts";
import { Item, useDietaryQuery } from "@shared";
import { CardMenuItemWithImage } from "./CardMenuItemWithImage";
import { CardMenuItemWithoutImage } from "./CardMenuItemWithoutImage";
import { MobileCardMenuItemWithImage, MobileSkeletonMenuItem } from "./MobileCardMenuItemWithImage";
import { intersection } from "@utility";
import { ThemeFonts } from "@base";

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  item: Item;
  themeColour: string;
  themeTint: number;
  themeFont: ThemeFonts;
}

const MenuItem: FC<Props> = ({ item, themeTint, themeColour, themeFont, ...rest }) => {
  const { width } = useViewportContext();
  const { activeAllergies } = useAllergyContext();

  const { data, loading } = useDietaryQuery({
    variables: {
      itemID: item.id,
    },
  });

  const isMobile = width < 412;
  const hasImage = !!item?.photo?.length;

  const renderItemWithImage = () =>
    isMobile ? (
      <MobileCardMenuItemWithImage
        themeFont={themeFont}
        themeColour={themeColour}
        themeTint={themeTint}
        item={item}
        {...rest}
      />
    ) : (
      <CardMenuItemWithImage
        themeFont={themeFont}
        themeColour={themeColour}
        themeTint={themeTint}
        item={item}
        {...rest}
      />
    );

  const renderItemWithoutImage = () => (
    <CardMenuItemWithoutImage
      themeFont={themeFont}
      themeColour={themeColour}
      themeTint={themeTint}
      item={item}
      {...rest}
    />
  );

  if (loading) return <MobileSkeletonMenuItem />;

  if (!loading && data?.dietaries && intersection(activeAllergies, data?.dietaries)) {
    return null;
  }

  return hasImage ? renderItemWithImage() : renderItemWithoutImage();
};

export { MenuItem };
