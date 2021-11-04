import type { MutationHookOptions } from "@apollo/client";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";

const SIGN_OUT_MUTATION = gql`
  mutation SignOutMutation($input: input) {
    signOut(input: $input) @rest(type: SignOut, path: "auth/sign_out", method: "DELETE") {
      __typename
    }
  }
`;

interface SignOutData {
  __typename: string;
}

interface Variables {
  input: Record<string, unknown>;
}

const useSignOutMutation = (options?: MutationHookOptions<SignOutData, Variables>) =>
  useMutation<SignOutData, Variables>(SIGN_OUT_MUTATION, options);

export { useSignOutMutation };
