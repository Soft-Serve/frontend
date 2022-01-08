import React from "react";
import type { FC } from "react";
import { classnames } from "tailwindcss-classnames";
import { Card, Columns, Title, Column } from "@base";
import { useAllergyContext } from "@contexts";
import { intersection } from "@utility";
import { Dietaries, ItemImage, ItemPrice } from "@presentational";
import { useItemSizeQuery, Item as ItemInterface, useDietaryQuery } from "@shared";

interface Props {
  item: ItemInterface;
  themeColour: string;
  themeTint: number;
  themeFont: string;
}

const Item: FC<Props> = ({ item, themeColour, themeTint, themeFont }) => {
  const { data, error, loading } = useDietaryQuery({
    variables: {
      itemID: item.id,
    },
  });

  const { loading: isSizesLoading, error: isSizesError } = useItemSizeQuery({
    variables: {
      itemID: item.id,
    },
  });
  const { activeAllergies } = useAllergyContext();

  if (data?.dietaries && intersection(activeAllergies, data?.dietaries)) {
    return null;
  }

  if (loading || isSizesLoading) return <p>loading</p>;
  if (error || isSizesError) return <p>error</p>;

  return (
    <Card key={item.id} withPadding={false}>
      <Column isFullwidth css={classnames("flex", "justify-end", "h-1")}>
        <Dietaries itemID={item.id} />
      </Column>
      <Columns>
        <Column isMarginLess flexBehavior="initial">
          <ItemImage photoUrl={item.photo} />
        </Column>
        <Column isFullwidth>
          <div>
            <Title type="h4" className="text-base font-medium text-gray-700 mr-2 block">
              {item.name}
            </Title>
            {item.description && (
              <p className="mt-1 text-sm text-gray-500 block">{item.description}</p>
            )}
          </div>
          <div className="flex w-full py-2 flex-wrap h-auto items-start m-0">
            <ItemPrice
              themeFont={themeFont}
              themeColour={themeColour}
              themeTint={themeTint}
              itemID={item.id}
            />
          </div>
        </Column>
      </Columns>
    </Card>
  );
};

export { Item };
