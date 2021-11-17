import React from "react";
import type { FC } from "react";
import { useItemSizeQuery } from "@shared";
import Skeleton from "react-loading-skeleton";

interface Props {
  itemID: number;
}

const ItemPrice: FC<Props> = ({ itemID }) => {
  const { data, error, loading } = useItemSizeQuery({
    variables: {
      itemID,
    },
  });

  const renderPrice = () => {
    if (data?.itemSizes?.length === 1) {
      const singlePrice = Number(data?.itemSizes[0]?.price).toFixed(2);
      return (
        <span className="text-md font-medium text-gray-900 underline">$ {`${singlePrice}`}</span>
      );
    }

    return data?.itemSizes?.map(size => (
      <div className="mr-2 flex justify-between items-center" key={size.id}>
        <span className="font-medium text-gray-600 mr-1 text-sm">{size.unit}:</span>
        <span className="text-md font-medium text-gray-900 ">${Number(size.price).toFixed(2)}</span>
      </div>
    ));
  };

  if (loading) return <Skeleton className="m-2" count={2} width={30} height={30} />;
  if (error) return <p>errror</p>;

  return <>{renderPrice()}</>;
};

export { ItemPrice };
