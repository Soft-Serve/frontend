import React, { useState } from "react";
import type { FC } from "react";
import { PostAllergyForm, DeleteAllergyForm, UpdateAllergyForm } from "@presentational";
import { AllergiesList } from "src/components/Presentational/AllergiesList";
import type { Allergy } from "@shared";
import { Button, Card, CardContent, Modal, TabWrapper } from "@base";
import { FilterIcon } from "@heroicons/react/solid";
import { SettingsHeader } from "../SettingsHeader";

interface Props {
  themeColour: string;
  themeTint: number;
  restaurantSlug: string;
}
const AllergiesSettings: FC<Props> = ({ themeTint, themeColour, restaurantSlug }) => {
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedAllergy, setSelectedAllergy] = useState({
    name: "",
    id: 0,
    __typename: "",
    menu_item_id: 0,
    dietary_id: 0,
    filter_name: "",
  });

  const handlePostItem = () => {
    setIsPostModalOpen(true);
  };

  const handleDeleteItem = (allergy: Allergy) => {
    setSelectedAllergy(allergy);
    setIsDeleteModalOpen(true);
  };

  const handleUpdateItem = (allergy: Allergy) => {
    setSelectedAllergy(allergy);
    setIsUpdateModalOpen(true);
  };

  return (
    <TabWrapper>
      <Modal isOpen={isPostModalOpen} onClose={setIsPostModalOpen}>
        <PostAllergyForm
          restaurantSlug={restaurantSlug}
          themeColour={themeColour}
          themeTint={themeTint}
          onCompleted={setIsPostModalOpen}
        />
      </Modal>

      <Modal isOpen={isDeleteModalOpen} onClose={setIsDeleteModalOpen}>
        <DeleteAllergyForm
          restaurantSlug={restaurantSlug}
          themeColour={themeColour}
          themeTint={themeTint}
          onCompleted={setIsDeleteModalOpen}
          selectedAllergy={selectedAllergy}
        />
      </Modal>

      <Modal isOpen={isUpdateModalOpen} onClose={setIsUpdateModalOpen}>
        <UpdateAllergyForm
          restaurantSlug={restaurantSlug}
          themeColour={themeColour}
          themeTint={themeTint}
          onCompleted={setIsUpdateModalOpen}
          selectedAllergy={selectedAllergy}
        />
      </Modal>

      <Card css="mb-4">
        <CardContent>
          <SettingsHeader>Dietaries</SettingsHeader>
          <Button
            themeColour={themeColour}
            themeTint={themeTint}
            onClick={handlePostItem}
            size="XXL"
            type="button"
          >
            Add
            <FilterIcon className="ml-2 h-5 w-5" />
          </Button>
        </CardContent>
      </Card>
      <AllergiesList
        restaurantSlug={restaurantSlug}
        themeColour={themeColour}
        themeTint={themeTint}
        handleDeleteItem={handleDeleteItem}
        handleUpdateItem={handleUpdateItem}
      />
    </TabWrapper>
  );
};

export { AllergiesSettings };
