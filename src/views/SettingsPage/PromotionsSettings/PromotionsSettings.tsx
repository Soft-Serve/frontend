import React, { useState } from "react";
import type { FC } from "react";
import { Button, TabWrapper } from "@base";
import { Promotion } from "@shared";
import { Box, Column, Columns, Dialog } from "@interface";
import { SettingsHeader } from "../SettingsHeader";
import { usePromotionsQuery } from "@shared";
import {
  DeletePromotionForm,
  PostPromotionForm,
  PromotionCard,
  UpdatePromotionForm,
} from "@presentational";
import { LightningBoltIcon } from "@heroicons/react/solid";

interface Props {
  themeColour: string;
  themeTint: number;
  restaurantSlug: string;
}

enum ModalForms {
  UpdatePromotion = "updatePromotion",
  PostPromotion = "postPromotion",
  DeletePromotion = "deletePromotion",
}

const PromotionSettings: FC<Props> = ({ themeTint, themeColour, restaurantSlug }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activePromotion, setActivePromotion] = useState<Promotion>();
  const [action, setAction] = useState<ModalForms>(ModalForms.UpdatePromotion);

  const updatePromotion = (
    <UpdatePromotionForm
      restaurantSlug={restaurantSlug}
      onClose={setIsModalOpen}
      promotion={activePromotion}
      themeColour={themeColour}
      themeTint={themeTint}
    />
  );

  const postPromotion = (
    <PostPromotionForm
      restaurantSlug={restaurantSlug}
      onClose={setIsModalOpen}
      themeColour={themeColour}
      themeTint={themeTint}
    />
  );

  const deletePromotion = (
    <DeletePromotionForm
      onCompleted={setIsModalOpen}
      promotion={activePromotion}
      restaurantSlug={restaurantSlug}
      themeColour={themeColour}
      themeTint={themeTint}
    />
  );

  const mapModalForms = {
    updatePromotion,
    postPromotion,
    deletePromotion,
  };

  const { data: promoData } = usePromotionsQuery({
    variables: {
      restaurantSlug,
    },
    onCompleted: completedData => setActivePromotion(completedData?.promotions?.[0]),
  });

  const renderModalForm = () => mapModalForms[action];

  const handleUpdatePromotion = (promotion: Promotion) => {
    setActivePromotion(promotion);
    setAction(ModalForms.UpdatePromotion);
    setIsModalOpen(true);
  };

  const handleAddPromotion = () => {
    setAction(ModalForms.PostPromotion);
    setIsModalOpen(true);
  };

  const handleDeletePromotion = (promotion: Promotion) => {
    setActivePromotion(promotion);
    setAction(ModalForms.DeletePromotion);
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
        {renderModalForm()}
      </Dialog>
      <Box>
        <Columns isMarginless isStackingOnMobile={false}>
          <Column className="justify-center">
            <SettingsHeader>Promotions</SettingsHeader>
          </Column>
          <Column columnWidth="small">
            <Button
              onClick={handleAddPromotion}
              themeColour={themeColour}
              themeTint={themeTint}
              size="XXL"
            >
              Add
              <LightningBoltIcon className="ml-2 h-5 w-5" />
            </Button>
          </Column>
        </Columns>
      </Box>
      <div className="flex w-full">
        <ul role="list" className="w-full space-y-4 divide-y divide-gray-200">
          {promoData?.promotions?.map(promo => (
            <PromotionCard
              restaurantSlug={restaurantSlug}
              handleDeletePromotion={handleDeletePromotion}
              handleUpdatePromotion={handleUpdatePromotion}
              key={promo.id}
              themeColour={themeColour}
              themeTint={themeTint}
              promo={promo}
            />
          ))}
        </ul>
      </div>
    </TabWrapper>
  );
};

export { PromotionSettings };
