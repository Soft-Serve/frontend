import React from "react";
import type { FC } from "react";

import { UpdateCurrentUserForm } from "@presentational";
import { useCurrentUserQuery } from "@shared";
import { Card, CardContent } from "@base";
import { SettingsHeader } from "../SettingsHeader";

const AccountSettings: FC = () => {
  const { data, loading } = useCurrentUserQuery();
  if (loading) {
    return <p>loading</p>;
  }

  if (data?.currentUser) {
    const { first_name, last_name, email, id } = data.currentUser;
    return (
      <>
        <Card css="mb-4">
          <CardContent>
            <SettingsHeader>Account</SettingsHeader>
          </CardContent>
        </Card>

        <div className="w-full mt-10">
          <div className="mt-5 md:mt-0 md:col-span-2">
            <UpdateCurrentUserForm
              firstName={first_name}
              lastName={last_name}
              email={email}
              id={id}
            />
          </div>
        </div>
      </>
    );
  }
  return null;
};

export { AccountSettings };
