import type { FC } from "react";
import { Navigate } from "react-router-dom";
import { routes } from "@routes";
import { User } from "src/shared/Users.query";
import { PageNotFound } from "../PageNotFound";

interface Props {
  user?: User;
  restaurantID: number;
  children: React.ReactNode;
}
const ProtectedRoute: FC<Props> = ({ user, children, restaurantID }) => {
  const isUserValid = user?.restaurant_id === restaurantID;
  if (user && isUserValid) return <>{children}</>;
  else if (user && !isUserValid) return <PageNotFound />;
  else if (!user) return <Navigate to={routes.signIn} replace />;
  return null;
};

export { ProtectedRoute };
