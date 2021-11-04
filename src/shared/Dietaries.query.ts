import { useQuery } from "@apollo/client";
import type { QueryHookOptions } from "@apollo/client";
import gql from "graphql-tag";

const DIETARIES_QUERY = gql`
  query DietariesQuery($itemID: Int!) {
    dietaries(itemID: $itemID)
      @rest(
        type: Dietary
        path: "menu_items/{args.itemID}/dietary_instances?active={args.active}"
      ) {
      id
      name
      menu_item_id
      dietary_id
    }
  }
`;

interface Dietary {
  id: number;
  name: string;
  menu_item_id: number;
  dietary_id: number;
  __typename: string;
}

interface DietaryData {
  dietaries: Dietary[];
}

interface Variables {
  itemID: number;
}

const useDietaryQuery = (options?: QueryHookOptions<DietaryData, Variables>) =>
  useQuery<DietaryData, Variables>(DIETARIES_QUERY, options);

export { useDietaryQuery };
