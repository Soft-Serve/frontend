import React from "react";
import type { FC } from "react";
import { useRestaurantContext } from "src/contexts";
import { useUsersQuery } from "@shared";
import { Card, CardContent, List, ListItem, SkeletonList } from "@base";

const UsersList: FC = () => {
  const { restaurantSlug } = useRestaurantContext();

  const { data, loading } = useUsersQuery({
    variables: {
      restaurantSlug,
    },
    skip: !restaurantSlug,
  });

  if (loading) {
    return <SkeletonList />;
  }

  return (
    <Card>
      <CardContent>
        <List>
          {data?.users.map(user => (
            <ListItem key={user?.id}>
              <div className="ml-3">
                <p className="text-sm font-bold text-gray-900 font-Quicksand">{`${user?.first_name} ${user?.last_name}`}</p>
                <p className="text-sm text-gray-500 font-Quicksand">{user?.email}</p>
              </div>
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export { UsersList };
