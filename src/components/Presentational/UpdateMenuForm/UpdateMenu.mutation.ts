import { gql, MutationHookOptions, useMutation } from "@apollo/client";

export const UPDATE_MENU = gql`
  mutation UpdateMenu($input: input) {
    updateMenu(input: $input) @rest(type: Menu, path: "menus/{args.input.id}", method: "PATCH") {
      id
      name
      restaurant_id
      __typename
    }
  }
`;

interface Menu {
  id: number;
  name: string;
  restaurant_id?: number;
  __typename: string;
}

interface UpdateMenuData {
  __typename: string;
  updateMenu: Menu;
}

interface Variables {
  input: Menu;
}

const useUpdateMenuMutation = (options?: MutationHookOptions<UpdateMenuData, Variables>) =>
  useMutation<UpdateMenuData, Variables>(UPDATE_MENU, options);

export { useUpdateMenuMutation };
