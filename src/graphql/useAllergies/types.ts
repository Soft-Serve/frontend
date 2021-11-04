interface Dietary {
  __typename: string;
  id: number;
  name: string;
  menu_item_id: number;
  dietary_id: number;
}

interface AllergyQuery {
  allergies: Dietary[];
}

export type { Dietary, AllergyQuery };
