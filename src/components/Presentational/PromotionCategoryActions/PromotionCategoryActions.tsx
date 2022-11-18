import { Button } from "@base";
import type { FC } from "react";
import { PromotionCategory } from "../PromotionCategories/PromotionCategories.query";
import "./styles.css";

interface MappableObject {
  [key: string]: any;
}

enum Actions {
  UPDATE = "UPDATE",
  DELETE = "DELETE",
}

type MappablePromo = PromotionCategory & MappableObject;

interface Props {
  handleDeleteCategoryPromotion: (
    promoCategory: PromotionCategory,
    action: keyof typeof Actions
  ) => void;
  handleUpdateCategoryPromotion: (
    promoCategory: PromotionCategory,
    action: keyof typeof Actions
  ) => void;
  promoCategory: MappablePromo;
  themeColour: string;
  themeTint: number;
}
const PromotionCategoryActions: FC<Props> = ({
  promoCategory,
  themeColour,
  themeTint,
  handleDeleteCategoryPromotion,
  handleUpdateCategoryPromotion,
}) => {
  return (
    <tr
      key={promoCategory.id}
      className={`wrap mb-4 flex flex-none flex-col rounded-md border-b-0 sm:mb-0 sm:table-row sm:border-b-2 border-${themeColour}-${themeTint} font-Quicksand`}
    >
      <td className={`p-4`}>
        <p className={`text-bold text-${themeColour}-${themeTint}`}>
          {promoCategory.unit === "percentage" &&
            `${promoCategory.discount}% off ${promoCategory.menu_category_name}`}
          {promoCategory.unit === "amount" &&
            `$${promoCategory.discount} off ${promoCategory.menu_category_name}`}
        </p>
        <p>
          <strong>Menu:</strong> {promoCategory.menu_name}
        </p>
      </td>
      <td className={`p-3`}>
        <div className="flex w-full items-end justify-end">
          <Button
            colour="accent"
            onClick={() => handleDeleteCategoryPromotion(promoCategory, Actions.DELETE)}
            css="mr-2"
            themeColour={themeColour}
            themeTint={themeTint}
          >
            Delete
          </Button>
          <Button
            onClick={() => handleUpdateCategoryPromotion(promoCategory, Actions.UPDATE)}
            themeColour={themeColour}
            themeTint={themeTint}
          >
            Update
          </Button>
        </div>
      </td>
    </tr>
  );
};

export { PromotionCategoryActions };
