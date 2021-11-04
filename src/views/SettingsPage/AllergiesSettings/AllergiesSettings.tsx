import React, { useState } from "react";
import type { FC } from "react";
import { PostAllergyForm, DeleteAllergyForm, UpdateAllergyForm } from "@presentational";
import { AllergiesList } from "src/components/Presentational/AllergiesList";
import type { Allergy } from "@shared";
import { Button, Card, CardContent, Modal } from "@base";
import { FilterIcon } from "@heroicons/react/solid";
import { SettingsHeader } from "../SettingsHeader";

const AllergiesSettings: FC = () => {
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedAllergy, setSelectedAllergy] = useState({
    name: "",
    id: 0,
    __typename: "",
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
    <>
      <Modal isOpen={isPostModalOpen} onClose={setIsPostModalOpen}>
        <PostAllergyForm onCompleted={setIsPostModalOpen} />
      </Modal>

      <Modal isOpen={isDeleteModalOpen} onClose={setIsDeleteModalOpen}>
        <DeleteAllergyForm onCompleted={setIsDeleteModalOpen} selectedAllergy={selectedAllergy} />
      </Modal>

      <Modal isOpen={isUpdateModalOpen} onClose={setIsUpdateModalOpen}>
        <UpdateAllergyForm onCompleted={setIsUpdateModalOpen} selectedAllergy={selectedAllergy} />
      </Modal>

      <Card css="mb-4">
        <CardContent>
          <SettingsHeader>Dietaries</SettingsHeader>
          <Button onClick={handlePostItem} size="LG" type="button">
            <span className="mr-4 text-base">Add Dietary</span>
            <FilterIcon className="w-5 h-5" />
          </Button>
        </CardContent>
      </Card>
      <AllergiesList handleDeleteItem={handleDeleteItem} handleUpdateItem={handleUpdateItem} />
    </>
  );
};

export { AllergiesSettings };
