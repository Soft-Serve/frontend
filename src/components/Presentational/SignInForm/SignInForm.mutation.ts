import type { MutationHookOptions } from "@apollo/client";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";

const SIGN_IN_FORM_MUTATION = gql`
  mutation SignInFormMutation($input: input) {
    signIn(input: $input) @rest(type: User, path: "auth/sign_in", method: "POST") {
      __typename
      id
      email
      first_name
      last_name
      role
      uid
      client
      access_token
      restaurant_id
      restaurant_slug
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

interface SignInFormData {
  signIn: User;
}

interface Variables {
  input: Record<string, unknown>;
}

const useSignInFormMutation = (options?: MutationHookOptions<SignInFormData, Variables>) =>
  useMutation<SignInFormData, Variables>(SIGN_IN_FORM_MUTATION, options);

export { useSignInFormMutation };
