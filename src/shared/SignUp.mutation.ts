import type { MutationHookOptions } from "@apollo/client";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";

const SIGN_UP_MUTATION = gql`
  mutation SignUpFormMutation($input: input) {
    signUp(input: $input) @rest(type: User, path: "auth", method: "POST") {
      __typename
    }
  }
`;

interface User {
  data: any;
  id: number;
  restaurant_id: number;
  restaurant_slug: string;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  __typename: string;
  uid: string;
  access_token: string;
  client: string;
}

interface SignUpFormData {
  signUp: User;
}

interface Variables {
  input: Record<string, unknown>;
}

const useSignUpFormMutation = (options?: MutationHookOptions<SignUpFormData, Variables>) =>
  useMutation<SignUpFormData, Variables>(SIGN_UP_MUTATION, options);

export { useSignUpFormMutation };
