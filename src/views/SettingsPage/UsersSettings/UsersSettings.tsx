import React, { useState } from "react";
import type { FC } from "react";
import { SignUpForm } from "src/components/Presentational/SignUpForm";
import { UsersList } from "src/components/Presentational/UsersList";
import { XIcon, UserAddIcon } from "@heroicons/react/solid";
import { Button, Card, CardContent, Modal } from "@base";
import { SettingsHeader } from "../SettingsHeader";

const UsersSettings: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePostItem = () => {
    setIsModalOpen(true);
  };
  return (
    <>
      <Modal isOpen={isModalOpen} onClose={setIsModalOpen}>
        <div>
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-semibold text-gray-800 tracking-wider uppercase mr-4">
              Add new user
            </h3>
            <Button onClick={() => setIsModalOpen(false)} size="S" colour="accent">
              <XIcon className="w-5 h-5" />
            </Button>
          </div>
          <SignUpForm />
        </div>
      </Modal>

      <Card css="mb-4">
        <CardContent>
          <SettingsHeader>Users</SettingsHeader>
          <Button onClick={handlePostItem} size="XXL">
            <span className="mr-4 text-base">New User</span>
            <UserAddIcon className="w-5 h-5" />
          </Button>
        </CardContent>
      </Card>
      <div className="w-full mt-10">
        <div className="mt-5 md:mt-0 md:col-span-2">
          <UsersList />
        </div>
      </div>
    </>
  );
};

export { UsersSettings };
