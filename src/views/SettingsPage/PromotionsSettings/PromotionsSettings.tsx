import React, { useState } from "react";
import type { FC } from "react";
import { Card, CardContent, Modal, TabWrapper } from "@base";
import { Promotion } from "@shared";

import { SettingsHeader } from "../SettingsHeader";
import { usePromotionsQuery } from "@shared";
import { PromotionCard, UpdatePromotionCategoryForm, UpdatePromotionForm } from "@presentational";
import { PromotionCategory } from "src/components/Presentational/PromotionCard/PromotionCategories.query";

interface Props {
  themeColour: string;
  themeTint: number;
  restaurantSlug: string;
}

enum ModalForms {
  // PostPromotion = "postPromotion",
  UpdatePromotion = "updatePromotion",
  UpdateCategory = "updateCategory",
  // DeletePromotion = "deletePromotion",
}

const PromotionSettings: FC<Props> = ({ themeTint, themeColour, restaurantSlug }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activePromotion, setActivePromotion] = useState<Promotion>();
  const [activePromotionCategories, setActivePromotionCategories] = useState<PromotionCategory[]>();
  const [action, setAction] = useState<ModalForms>(ModalForms.UpdatePromotion);

  // const [activeMenu, setActiveMenu] = useState<Menu>();

  const updateCategory = (
    <UpdatePromotionCategoryForm promotionCategories={activePromotionCategories} />
  );

  const updatePromotion = (
    <UpdatePromotionForm
      onClose={setIsModalOpen}
      promotion={activePromotion}
      themeColour={themeColour}
      themeTint={themeTint}
    />
  );

  const mapModalForms = {
    updatePromotion,
    updateCategory,
  };

  const { data: promoData } = usePromotionsQuery({
    variables: {
      restaurantSlug,
    },
    onCompleted: completedData => setActivePromotion(completedData?.promotions?.[0]),
  });

  // const { data, loading: menusLoading } = useMenusQuery({
  //   variables: {
  //     restaurantSlug,
  //   },
  //   onCompleted: completedData => setActiveMenu(completedData?.menus?.[0]),
  // });

  // const [activeCategory, setActiveCategory] = useState<Category>();

  // const { data: categoriesData } = useCategoriesQuery({
  //   fetchPolicy: "network-only",
  //   variables: {
  //     menuID: activeMenu?.id || 0,
  //   },
  //   skip: !activeMenu?.id,
  //   onCompleted: completedData => {
  //     setActiveCategory(completedData?.categories?.[0]);
  //   },
  // });

  // const filteredCategories =
  //   categoriesData?.categories && categoriesData.categories.length > 1
  //     ? categoriesData.categories.filter(cat => cat.name !== "No category")
  //     : categoriesData?.categories ?? [];

  // const handleMenuChange = (menu: Menu) => {
  //   setActiveMenu(menu);
  // };

  const renderModalForm = () => mapModalForms[action];

  // const renderMenusTabs = () => {
  //   if (menusLoading) return <Skeleton className="my-2" height={50} />;
  //   if (data?.menus?.length) {
  //     return (
  //       <Tabs>
  //         {data?.menus.map((menu, index) => (
  //           <Tab
  //             themeColour={themeColour}
  //             themeTint={themeTint}
  //             themeFont="Quicksand"
  //             onClick={() => handleMenuChange(menu)}
  //             numOfTabs={data.menus.length}
  //             tabIndex={index}
  //             isActive={menu.id === activeMenu?.id}
  //             key={menu.id}
  //           >
  //             {menu.name}
  //           </Tab>
  //         ))}
  //       </Tabs>
  //     );
  //   }
  //   return null;
  // };

  // const renderDropdown = () => {
  //   if (filteredCategories.length)
  //     return (
  //       <Card css="mt-4" isOverflowHidden={false}>
  //         <Dropdown
  //           themeColour={themeColour}
  //           themeTint={themeTint}
  //           required
  //           label="Category"
  //           defaultValue="Select category"
  //           value={activeCategory}
  //           onChange={(cat: Category) => setActiveCategory(cat)}
  //           data={filteredCategories}
  //         />
  //       </Card>
  //     );
  // };

  const handleUpdatePromotion = (promotion: Promotion) => {
    setActivePromotion(promotion);
    setAction(ModalForms.UpdatePromotion);
    setIsModalOpen(true);
  };

  const handleUpdateCategories = (promotionCategories?: PromotionCategory[]) => {
    setActivePromotionCategories(promotionCategories);
    setAction(ModalForms.UpdateCategory);
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
      {/* {renderMenusTabs()}
      {renderDropdown()} */}
      <div className="mt-4  bg-white shadow sm:rounded-md">
        <ul role="list" className="divide-y divide-gray-200">
          {promoData?.promotions?.map(promo => (
            <PromotionCard
              handleUpdateCategories={handleUpdateCategories}
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
