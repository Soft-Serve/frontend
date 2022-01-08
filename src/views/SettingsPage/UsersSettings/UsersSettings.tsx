import React, { useState } from "react";
import type { FC } from "react";
import { XIcon, UserAddIcon } from "@heroicons/react/solid";
import { UsersList, PostNewUserForm } from "@presentational";
import { Button, Card, CardContent, Modal, TabWrapper } from "@base";
import { SettingsHeader } from "../SettingsHeader";

interface Props {
  themeColour: string;
  themeTint: number;
}
const UsersSettings: FC<Props> = ({ themeTint, themeColour }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePostItem = () => {
    setIsModalOpen(true);
  };
  return (
    <TabWrapper>
      <Modal isOpen={isModalOpen} onClose={setIsModalOpen}>
        <div className="max-w-xl w-full">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mr-4">
              Add new user
            </h3>
            <Button
              themeColour={themeColour}
              themeTint={themeTint}
              onClick={() => setIsModalOpen(false)}
              size="S"
              colour="accent"
            >
              <XIcon className="w-5 h-5" />
            </Button>
          </div>
          <PostNewUserForm
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
            Add User
            <UserAddIcon className="w-5 h-5 ml-2" />
          </Button>
        </CardContent>
      </Card>
      <div className="w-full mt-10">
        <div className="mt-5 md:mt-0 md:col-span-2">
          <UsersList />
        </div>
      </div>
    </TabWrapper>
  );
};

export { UsersSettings };
