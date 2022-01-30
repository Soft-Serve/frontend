import React from "react";
import type { FC } from "react";

import { UpdateCurrentUserForm } from "@presentational";
import { useCurrentUserQuery } from "@shared";
import { Card, CardContent, TabWrapper } from "@base";
import { SettingsHeader } from "../SettingsHeader";

interface Props {
  themeColour: string;
  themeTint: number;
}

const AccountSettings: FC<Props> = ({ themeColour, themeTint }) => {
  const { data, loading } = useCurrentUserQuery();

  if (loading) {
    return <p>loading</p>;
  }

  if (data?.currentUser) {
    const { first_name: firstName, last_name: lastName, email, id } = data?.currentUser;
    return (
      <TabWrapper>
        <Card css="mb-4">
          <CardContent>
            <SettingsHeader>Account</SettingsHeader>
          </CardContent>
        </Card>

        <div className="mt-10 w-full">
          <div className="mt-5 md:col-span-2 md:mt-0">
            <UpdateCurrentUserForm
              themeColour={themeColour}
              themeTint={themeTint}
              firstName={firstName}
              lastName={lastName}
              email={email}
              id={id}
            />
          </div>
        </div>
      </TabWrapper>
    );
  }
  return null;
};

export { AccountSettings };
