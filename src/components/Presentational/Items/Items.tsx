import React, { useState } from "react";
import type { FC } from "react";
import { useGlobalContext, useViewportContext, useRestaurantContext } from "@contexts";
import { Container, Grid, BoxSection, Button } from "@base";
import { MenuItem, ItemModal } from "@presentational";
import { routes } from "src/routes";
import { Item, useItemsQuery } from "@shared";
import Skeleton from "react-loading-skeleton";

const Items: FC = () => {
  const { categoryID } = useGlobalContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { width } = useViewportContext();
  const { restaurantSlug, themeColour, themeTint } = useRestaurantContext();
  const { data, loading, error } = useItemsQuery({
    variables: {
      categoryID,
    },
  });

  const [selectedItem, setSelectedItem] = useState(data?.items?.[0]);

  const renderGridSize = () => (width < 1340 ? "SM" : "M");

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
          <div className="sm:mx-auto sm:w-full sm:max-w-md flex justify-center flex-col items-center">
            <h4 className={`m-8 text-center text-bold text-2xl ${themeColour}-${themeTint}`}>
              No menu items yet!
            </h4>
            <p className={`mb-8 text-center ${themeColour}-${themeTint}`}>
              You can either add items directly to the menu or create <strong>categories</strong>{" "}
              and add items to each categories.
            </p>
            <div className={`flex justify-around w-full ${themeColour}-${themeTint}`}>
              <Button
                size="XL"
                onClick={() =>
                  window.location.assign(`${routes.settings}/${restaurantSlug}/categories`)
                }
              >
                Create categories
              </Button>
              <Button
                size="XL"
                onClick={() => window.location.assign(`${routes.settings}/${restaurantSlug}/items`)}
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
      <>
        <Grid size={renderGridSize()}>
          {data?.items?.map(item => (
            <div
              tabIndex={0}
              onKeyDown={() => handleClick(item)}
              onClick={() => handleClick(item)}
              role="button"
              key={item.id}
            >
              <MenuItem item={item} />
            </div>
          ))}
        </Grid>
        <ItemModal isOpen={isModalOpen} onClose={setIsModalOpen} item={selectedItem} />
      </>
    </Container>
  );
};

export { Items };
