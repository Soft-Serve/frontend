import type { MutationHookOptions } from "@apollo/client";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";

const RESET_PASSWORD_FORM_MUTATION = gql`
  mutation ResetPasswordFormMutation($input: input) {
    resetPassword(input: $input) @rest(type: User, path: "auth/password", method: "PATCH") {
      __typename
    }
  }
`;

interface User {
  __typename: string;
}

interface ResetPasswordFormData {
  signIn: User;
}

interface ResetPasswordInput {
  password: string;
  password_confirmation: string;
  email: string;
}

interface Variables {
  input: ResetPasswordInput;
}

const useResetPasswordFormMutation = (
  options?: MutationHookOptions<ResetPasswordFormData, Variables>
) => useMutation<ResetPasswordFormData, Variables>(RESET_PASSWORD_FORM_MUTATION, options);

export { useResetPasswordFormMutation };
