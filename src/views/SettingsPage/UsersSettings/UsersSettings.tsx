import React, { useState } from "react";
import type { FC } from "react";
import { UserAddIcon } from "@heroicons/react/solid";
import { UsersList, PostNewUserForm } from "@presentational";
import { Button, TabWrapper } from "@base";
import { SettingsHeader } from "../SettingsHeader";
import { Box, Container, Dialog, DialogHeader, Column, Columns } from "@interface";

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
      <Dialog
        themeColour={themeColour}
        themeTint={themeTint}
        isOpen={isModalOpen}
        onClose={setIsModalOpen}
      >
        <DialogHeader themeColour={themeColour} themeTint={themeTint} onClose={setIsModalOpen}>
          <h3 className="mr-4 text-sm font-semibold uppercase tracking-wider text-gray-900">
            Add new user
          </h3>
        </DialogHeader>
        <Container containerWidth="full">
          <PostNewUserForm
            restaurantSlug={restaurantSlug}
            themeColour={themeColour}
            themeTint={themeTint}
            setIsModalOpen={setIsModalOpen}
          />
        </Container>
      </Dialog>

      <Box>
        <Columns isMarginless isStackingOnMobile={false}>
          <Column className="justify-center">
            <SettingsHeader>Users</SettingsHeader>
          </Column>
          <Column columnWidth="small">
            <Button
              themeColour={themeColour}
              themeTint={themeTint}
              onClick={handlePostItem}
              size="XXL"
            >
              Add
              <UserAddIcon className="ml-2 h-5 w-5" />
            </Button>
          </Column>
        </Columns>
      </Box>
      <div className="mt-10 w-full">
        <div className="mt-5 md:col-span-2 md:mt-0">
          <UsersList restaurantSlug={restaurantSlug} />
        </div>
      </div>
    </TabWrapper>
  );
};

export { UsersSettings };
