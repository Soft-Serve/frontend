import type { FC } from "react";
import { Navigate } from "react-router-dom";
import { routes } from "@routes";
import { User } from "src/shared/Users.query";
import { PageNotFound } from "../PageNotFound";

interface Props {
  user?: User;
  restaurantID: number;
}
const ProtectedRoute: FC<Props> = ({ user, children, restaurantID }) => {
  const isUserValid = user?.restaurant_id === restaurantID;
  if (user && isUserValid) return <>{children}</>;
  else if (!user) return <Navigate to={routes.signIn} replace />;
  if (user && !isUserValid) return <PageNotFound />;
  return null;
};

export { ProtectedRoute };
