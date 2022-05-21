import React, { useState } from "react";
import type { FC } from "react";
import { MultiSelect } from "@base";
import { PromotionCategory } from "../PromotionCard/PromotionCategories.query";

const people = [
  { id: 1, name: "Durward Reynolds" },
  { id: 2, name: "Kenton Towne" },
  { id: 3, name: "Therese Wunsch" },
  { id: 4, name: "Benedict Kessler" },
  { id: 5, name: "Katelyn Rohan" },
];

interface Props {
  promotionCategories?: PromotionCategory[];
}

const UpdatePromotionCategoryForm: FC<Props> = ({ promotionCategories }) => {
  const [selectedPeople, setSelectedPeople] = useState([people[0], people[1]]);

  return (
    <form>
      <MultiSelect
        options={people}
        values={selectedPeople}
        onChange={setSelectedPeople}
        label="Categories"
      />
    </form>
  );
};

export { UpdatePromotionCategoryForm };
