import React from "react";
import type { FC } from "react";
import { useViewportContext } from "@contexts";
import { Container, Grid, ThemeFonts } from "@base";
import { MenuItem } from "@presentational";
import { Category, useCurrentUserQuery, useItemsQuery } from "@shared";
import Skeleton from "react-loading-skeleton";
import { NoItemsCTA } from "./NoItemsCTA";

interface Props {
  themeColour: string;
  themeTint: number;
  themeFont: ThemeFonts;
  restaurantSlug: string;
  category?: Category;
}
const Items: FC<Props> = ({ themeTint, themeColour, themeFont, restaurantSlug, category }) => {
  const { width } = useViewportContext();
  const { data: userData, loading: userLoading } = useCurrentUserQuery();

  const { data, loading, error } = useItemsQuery({
    variables: {
      categoryID: category?.id || 0,
    },
    skip: !category?.id,
  });

  const getGridSize = () => {
    if (width < 1450) return "M";
    return "LG";
  };

  if (loading || userLoading)
    return (
      <Container>
        <Skeleton width="100%" className="m-4" count={4} height={250} />
      </Container>
    );
  if (error) return <p>error</p>;
  if (data?.items?.length === 0 && !loading) {
    return (
      <Container>
        <NoItemsCTA
          isAdmin={!!userData?.currentUser}
          themeColour={themeColour}
          themeTint={themeTint}
          restaurantSlug={restaurantSlug}
        />
      </Container>
    );
  }
  return (
    <Container>
      <div className="my-2 w-full">
        <Grid size={getGridSize()}>
          {data?.items?.map(item => (
            <MenuItem
              categoryType={category?.category_type}
              key={item.id}
              themeColour={themeColour}
              themeFont={themeFont}
              themeTint={themeTint}
              item={item}
              tabIndex={0}
              role="button"
            />
          ))}
        </Grid>
      </div>
    </Container>
  );
};

export { Items };
