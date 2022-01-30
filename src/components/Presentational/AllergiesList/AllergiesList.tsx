import React from "react";
import type { FC } from "react";
import { useAllergiesQuery } from "@shared";
import Skeleton from "react-loading-skeleton";
import { Card, CardContent, List, ListItem } from "@base";
import { AllergiesDropdown } from "./AllergiesDropdown";
import { classnames } from "tailwindcss-classnames";

interface Props {
  handleUpdateItem: any;
  handleDeleteItem: any;
  themeColour: string;
  themeTint: number;
  restaurantSlug: string;
}

const AllergiesList: FC<Props> = ({
  handleDeleteItem,
  handleUpdateItem,
  themeTint,
  themeColour,
  restaurantSlug,
}) => {
  const { data, loading } = useAllergiesQuery({
    variables: {
      restaurantSlug,
      active: false,
    },
  });

  if (loading) {
    return (
      <>
        {[...new Array(3)].map((_, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={index} className="mx-2">
            <Skeleton width={120} height={40} />
          </div>
        ))}
      </>
    );
  }

  return (
    <Card css={classnames("mt-4", "overflow-visible")}>
      <CardContent>
        <List>
          {data?.allergies?.map(allergy => (
            <ListItem key={allergy.id}>
              <div className="flex w-0 flex-1 items-center">
                <span className="ml-2 w-0 flex-1 font-Quicksand font-bold">{`${allergy.name} / ${allergy.filter_name}`}</span>
              </div>
              <div className="ml-4 flex flex-col sm:flex-row">
                <AllergiesDropdown
                  themeColour={themeColour}
                  themeTint={themeTint}
                  handleDelete={() => handleDeleteItem(allergy)}
                  handleUpdate={() => handleUpdateItem(allergy)}
                />
              </div>
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export { AllergiesList };
