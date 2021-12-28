import React from "react";
import type { FC } from "react";
import { useRestaurantContext } from "src/contexts";
import { useAllergiesQuery } from "@shared";
import Skeleton from "react-loading-skeleton";
import { Button, Card, CardContent, List, ListItem } from "@base";
import { DeleteSVG } from "@svgs";
import { PencilIcon } from "@heroicons/react/solid";

interface Props {
  handleUpdateItem: any;
  handleDeleteItem: any;
}

const AllergiesList: FC<Props> = ({ handleDeleteItem, handleUpdateItem }) => {
  const { restaurantSlug } = useRestaurantContext();

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
    <Card css="mt-4">
      <CardContent>
        <List>
          {data?.allergies?.map(allergy => (
            <ListItem key={allergy.id}>
              <div className="w-0 flex-1 flex items-center">
                <span className="ml-2 flex-1 w-0 font-bold font-Quicksand">{`${allergy.name} / ${allergy.filter_name}`}</span>
              </div>
              <div className="ml-4 flex flex-col sm:flex-row">
                <div className="w-full sm:mr-2 my-1">
                  <Button isFullwidth size="S" onClick={() => handleUpdateItem(allergy)}>
                    Edit
                    <PencilIcon className="w-5 h-5 ml-2" />
                  </Button>
                </div>
                <div className="w-full my-1">
                  <Button
                    isFullwidth
                    colour="accent"
                    size="S"
                    onClick={() => handleDeleteItem(allergy)}
                  >
                    Delete
                    <DeleteSVG className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              </div>
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export { AllergiesList };
