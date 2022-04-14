import React, { useState } from "react";
import type { FC } from "react";
import { useViewportContext } from "@contexts";
import { useNavigate } from "react-router-dom";
import { Container, Grid, BoxSection, Button, ThemeFonts } from "@base";
import { MenuItem, ItemModal } from "@presentational";
import { routes } from "@routes";
import { Item, useItemsQuery } from "@shared";
import Skeleton from "react-loading-skeleton";

interface Props {
  themeColour: string;
  themeTint: number;
  themeFont: ThemeFonts;
  restaurantSlug: string;
  categoryID: number;
}
const Items: FC<Props> = ({ themeTint, themeColour, themeFont, restaurantSlug, categoryID }) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { width } = useViewportContext();
  const { data, loading, error } = useItemsQuery({
    variables: {
      categoryID,
    },
    skip: !categoryID,
  });

  const [selectedItem, setSelectedItem] = useState(data?.items?.[0]);

  const getGridSize = () => {
    if (width < 1450) return "M";
    return "LG";
  };

  const handleClick = (item: Item) => {
    setSelectedItem(item);
    setIsModalOpen(prevState => !prevState);
  };

  if (loading)
    return (
      <Container>
        <Skeleton width="100%" className="m-4" count={4} height={250} />
      </Container>
    );
  if (error) return <p>error</p>;
  if (data?.items.length === 0) {
    return (
      <Container>
        <BoxSection>
          <div className="flex flex-col items-center justify-center sm:mx-auto sm:w-full sm:max-w-md">
            <h4 className={`text-bold m-8 text-center text-2xl ${themeColour}-${themeTint}`}>
              No menu items yet!
            </h4>
            <p className={`mb-8 text-center ${themeColour}-${themeTint}`}>
              You can either add items directly to the menu or create <strong>categories</strong>{" "}
              and add items to each categories.
            </p>
            <div className={`flex w-full justify-around ${themeColour}-${themeTint}`}>
              <Button
                themeColour={themeColour}
                themeTint={themeTint}
                size="XL"
                onClick={() => navigate(`${routes.settings}/${restaurantSlug}/categories`)}
              >
                Create categories
              </Button>
              <Button
                themeColour={themeColour}
                themeTint={themeTint}
                size="XL"
                onClick={() => navigate(`${routes.settings}/${restaurantSlug}/items`)}
              >
                Add items
              </Button>
            </div>
          </div>
        </BoxSection>
      </Container>
    );
  }
  return (
    <Container>
      <div className="my-2 w-full">
        <Grid size={getGridSize()}>
          {data?.items?.map(item => (
            <MenuItem
              key={item.id}
              themeColour={themeColour}
              themeFont={themeFont}
              themeTint={themeTint}
              item={item}
              tabIndex={0}
              onKeyDown={() => handleClick(item)}
              onClick={() => handleClick(item)}
              role="button"
            />
          ))}
        </Grid>
        <ItemModal
          themeFont={themeFont}
          themeColour={themeColour}
          themeTint={themeTint}
          isOpen={isModalOpen}
          onClose={setIsModalOpen}
          item={selectedItem}
        />
      </div>
    </Container>
  );
};

export { Items };
