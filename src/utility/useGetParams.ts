import { useLocation } from "react-router-dom";

const useGetParams = () => {
  const location = useLocation();
  return new URLSearchParams(location.search);
};

export { useGetParams };
