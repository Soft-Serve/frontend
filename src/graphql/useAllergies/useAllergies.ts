import { useQuery } from "@apollo/client";
import { AllergyQuery } from "@graphql";
import { GET_ALLERGIES } from "./queries";

const useAllergies = (restaurantSlug: string) => {
  const useGetAllergies = () => {
    const { data, loading, error } = useQuery<AllergyQuery>(GET_ALLERGIES, {
      variables: {
        restaurantSlug,
      },
    });

    return {
      data,
      loading,
      error,
    };
  };

  return {
    useGetAllergies,
  };
};
export { useAllergies };
