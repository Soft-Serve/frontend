import React, { useState } from "react";
import type { FC } from "react";
import { Button, Card, CardContent, Modal, TabWrapper } from "@base";
import { Promotion } from "@shared";

import { SettingsHeader } from "../SettingsHeader";
import { usePromotionsQuery } from "@shared";
import { PostPromotionForm, PromotionCard, UpdatePromotionForm } from "@presentational";
import { LightningBoltIcon } from "@heroicons/react/solid";

interface Props {
  themeColour: string;
  themeTint: number;
  restaurantSlug: string;
}

enum ModalForms {
  UpdatePromotion = "updatePromotion",
  PostPromotion = "postPromotion",
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

  const mapModalForms = {
    updatePromotion,
    postPromotion,
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

  return (
    <TabWrapper>
      <Modal isOpen={isModalOpen} onClose={setIsModalOpen}>
        {renderModalForm()}
      </Modal>
      <Card css="mb-4">
        <CardContent>
          <SettingsHeader>Promotions</SettingsHeader>
          <Button
            onClick={handleAddPromotion}
            themeColour={themeColour}
            themeTint={themeTint}
            size="XXL"
          >
            Add
            <LightningBoltIcon className="ml-2 h-5 w-5" />
          </Button>
        </CardContent>
      </Card>
      <div className="flex w-full">
        <ul role="list" className="w-full space-y-4 divide-y divide-gray-200">
          {promoData?.promotions?.map(promo => (
            <PromotionCard
              restaurantSlug={restaurantSlug}
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
