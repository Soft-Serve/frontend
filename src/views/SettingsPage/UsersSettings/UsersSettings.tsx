import React, { useState } from "react";
import type { FC } from "react";
import { XIcon, UserAddIcon } from "@heroicons/react/solid";
import { UsersList, PostNewUserForm } from "@presentational";
import { Button, Card, CardContent, Modal, TabWrapper } from "@base";
import { SettingsHeader } from "../SettingsHeader";

interface Props {
  themeColour: string;
  themeTint: number;
  restaurantSlug: string;
}
const UsersSettings: FC<Props> = ({ themeTint, themeColour, restaurantSlug }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePostItem = () => {
    setIsModalOpen(true);
  };
  return (
    <TabWrapper>
      <Modal isOpen={isModalOpen} onClose={setIsModalOpen}>
        <div className="w-full max-w-xl">
          <div className="flex items-center justify-between">
            <h3 className="mr-4 text-sm font-semibold uppercase tracking-wider text-gray-900">
              Add new user
            </h3>
            <Button
              themeColour={themeColour}
              themeTint={themeTint}
              onClick={() => setIsModalOpen(false)}
              size="S"
            >
              <XIcon className="h-5 w-5" />
            </Button>
          </div>
          <PostNewUserForm
            restaurantSlug={restaurantSlug}
            themeColour={themeColour}
            themeTint={themeTint}
            setIsModalOpen={setIsModalOpen}
          />
        </div>
      </Modal>

      <Card css="mb-4">
        <CardContent>
          <SettingsHeader>Users</SettingsHeader>
          <Button
            themeColour={themeColour}
            themeTint={themeTint}
            onClick={handlePostItem}
            size="XXL"
          >
            Add
            <UserAddIcon className="ml-2 h-5 w-5" />
          </Button>
        </CardContent>
      </Card>
      <div className="mt-10 w-full">
        <div className="mt-5 md:col-span-2 md:mt-0">
          <UsersList restaurantSlug={restaurantSlug} />
        </div>
      </div>
    </TabWrapper>
  );
};

export { UsersSettings };
