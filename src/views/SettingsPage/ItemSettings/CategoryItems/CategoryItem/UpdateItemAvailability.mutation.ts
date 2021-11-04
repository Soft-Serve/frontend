import gql from "graphql-tag";
import type { MutationHookOptions } from "@apollo/client";
import { useMutation } from "@apollo/client";

export const UPDATE_ITEM_AVAILABILITY = gql`
  mutation UpdateItemAvailability($input: input) {
    updateItemAvailability(input: $input)
      @rest(type: Item, path: "menu_items/{args.input.id}", method: "PATCH") {
      id
      available
    }
  }
`;

interface Item {
  id: number;
  available: boolean;
}

interface Variables {
  input: Item;
}

interface UpdateItemAvailabilityData {
  __typename: string;
  updateItemAvailability: Item;
}

const useUpdateItemAvailability = (
  options?: MutationHookOptions<UpdateItemAvailabilityData, Variables>
) => useMutation<UpdateItemAvailabilityData, Variables>(UPDATE_ITEM_AVAILABILITY, options);

export { useUpdateItemAvailability };
