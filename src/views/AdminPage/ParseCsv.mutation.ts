import gql from "graphql-tag";
import type { MutationHookOptions } from "@apollo/client";
import { useMutation } from "@apollo/client";

const PARSE_CSV_MUTATION = gql`
  mutation ParseCsv($input: input) {
    parseCsv(input: $input) @rest(type: Csv, path: "parse_csv", method: "POST") {
      file_path
      restaurant_id
      __typename
    }
  }
`;

interface Csv {
  restaurant_id: any;
  file_path: any;
}

interface ParseCsvMutationData {
  __typename: string;
  parseCsv: Csv;
}

interface Variables {
  input: Csv;
}

const useParseCsvMutation = (options?: MutationHookOptions<ParseCsvMutationData, Variables>) =>
  useMutation<ParseCsvMutationData, Variables>(PARSE_CSV_MUTATION, options);

export { useParseCsvMutation, PARSE_CSV_MUTATION };
