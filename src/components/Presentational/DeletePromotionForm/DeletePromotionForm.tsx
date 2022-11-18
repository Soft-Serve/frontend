import React, { FormEvent } from "react";
import type { FC } from "react";
import { Button, Notification } from "@base";
import { XIcon } from "@heroicons/react/solid";
import toast from "react-hot-toast";
import { Promotion, PromotionsData, PROMOTIONS_QUERY } from "@shared";
import { useDeletePromotionMutation } from "./DeletePromotion.mutation";

interface Props {
  promotion?: Promotion;
  onCompleted?: (state: boolean) => void;
  themeColour: string;
  themeTint: number;
  restaurantSlug: string;
}

const DeletePromotionForm: FC<Props> = ({
  promotion,
  onCompleted,
  themeColour,
  themeTint,
  restaurantSlug,
}) => {
  const onSuccess = () => toast.custom(<Notification header="Promotion succesfully deleted!" />);

  const [deletePromotion, { loading }] = useDeletePromotionMutation({
    onCompleted: () => {
      onCompleted?.(false);
      onSuccess();
    },
    update(cache, { data: deletePromotionData }) {
      const { promotions } = cache.readQuery({
        query: PROMOTIONS_QUERY,
        variables: {
          restaurantSlug,
        },
      }) as PromotionsData;

      cache.writeQuery({
        query: PROMOTIONS_QUERY,
        variables: {
          restaurantSlug,
        },
        data: {
          promotions: promotions?.filter(
            promo => promo.id !== deletePromotionData?.deletePromotion?.id
          ),
        },
      });
    },
  });

  const handleDeleteMenu = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (promotion?.id)
      deletePromotion({
        variables: {
          promotionID: promotion.id,
        },
      });
  };

  return (
    <form noValidate onSubmit={handleDeleteMenu}>
      <div className="flex items-center justify-between">
        <h3 className="mr-4 text-sm font-semibold uppercase tracking-wider text-gray-900">
          Promotion name:{" "}
          <span className={`font-bold underline text-${themeColour}-${themeTint}`}>
            {promotion?.name}
          </span>
        </h3>
        <Button
          themeColour={themeColour}
          themeTint={themeTint}
          onClick={() => onCompleted?.(false)}
          size="S"
        >
          <XIcon className="h-5 w-5" />
        </Button>
      </div>
      <p className="my-8 font-Quicksand text-base text-gray-900 underline">
        all promotion prices and categories for this promotion will be removed!
      </p>
      <div className="mt-4 flex items-center">
        <div className="mr-2 w-full">
          <Button
            themeColour={themeColour}
            themeTint={themeTint}
            colour="accent"
            onClick={() => onCompleted?.(false)}
            size="M"
            isFullwidth
            css="text-center"
          >
            Cancel
          </Button>
        </div>
        <div className="w-full">
          <Button
            loading={loading}
            themeColour={themeColour}
            themeTint={themeTint}
            size="LG"
            isFullwidth
            type="submit"
            css="text-center"
          >
            Delete
          </Button>
        </div>
      </div>
    </form>
  );
};

export { DeletePromotionForm };
