import gql from "graphql-tag";

const GET_ALLERGIES = gql`
  query allergies($restaurantSlug: Int!) {
    allergies(restaurantSlug: $restaurantSlug)
      @rest(type: Dietary, path: "restaurants/{args.restaurantSlug}/dietaries") {
      id
      name
      __typename
    }
  }
`;

export { GET_ALLERGIES };
