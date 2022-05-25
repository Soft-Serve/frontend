import React, { useState } from "react";
import type { FC } from "react";
import { Card, CardContent, Modal, TabWrapper } from "@base";
import { Promotion } from "@shared";

import { SettingsHeader } from "../SettingsHeader";
import { usePromotionsQuery } from "@shared";
import { PromotionCard, UpdatePromotionForm } from "@presentational";

interface Props {
  themeColour: string;
  themeTint: number;
  restaurantSlug: string;
}

enum ModalForms {
  UpdatePromotion = "updatePromotion",
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

  const mapModalForms = {
    updatePromotion,
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

  return (
    <TabWrapper>
      <Modal isOpen={isModalOpen} onClose={setIsModalOpen}>
        {renderModalForm()}
      </Modal>
      <Card css="mb-4">
        <CardContent>
          <SettingsHeader>Promotions</SettingsHeader>
        </CardContent>
      </Card>
      <div className="flex w-full">
        <ul role="list" className="w-full divide-y divide-gray-200">
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
