import React from "react";
import type { FC } from "react";
import { useUsersQuery } from "@shared";
import { List, ListItem, SkeletonList } from "@base";
import { Box } from "@interface";

interface Props {
  restaurantSlug: string;
}
const UsersList: FC<Props> = ({ restaurantSlug }) => {
  const { data, loading } = useUsersQuery({
    variables: {
      restaurantSlug,
    },
  });

  if (loading) {
    return <SkeletonList />;
  }

  return (
    <Box>
      <List>
        {data?.users.map(user => (
          <ListItem key={user?.id}>
            <div className="ml-3">
              <p className="font-Quicksand text-sm font-bold text-gray-900">{`${user?.first_name} ${user?.last_name}`}</p>
              <p className="font-Quicksand text-sm text-gray-500">{user?.email}</p>
            </div>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export { UsersList };
