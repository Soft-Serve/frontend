import React from "react";
import type { FC } from "react";
import { useGlobalContext, useViewportContext } from "@contexts";
import { Container, Grid } from "@base";
import { MenuItem } from "@presentational";
import { useItemsQuery } from "@shared";
import Skeleton from "react-loading-skeleton";

const Items: FC = () => {
  const { categoryID } = useGlobalContext();
  const { width } = useViewportContext();
  const { data, loading, error } = useItemsQuery({
    variables: {
      categoryID,
    },
  });

  const renderGridSize = () => (width < 1340 ? "SM" : "M");

  if (loading)
    return (
      <Container>
        <Skeleton width="100%" className="m-4" count={4} height={250} />
      </Container>
    );
  if (error) return <p>error</p>;
  return (
    <Container>
      <Grid size={renderGridSize()}>
        {data?.items?.map(item => (
          <MenuItem item={item} key={item.id} />
        ))}
      </Grid>
    </Container>
  );
};

export { Items };
