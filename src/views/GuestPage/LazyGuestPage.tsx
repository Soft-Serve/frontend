import React, { lazy, Suspense } from "react";
import type { FC } from "react";
import { SkeletonGuestPage } from "./SkeletonGuestPage";

const GuestPage = lazy(() => import("./DefaultGuestPage"));

const LazyGuestPage: FC = () => {
  const fallback = <SkeletonGuestPage />;
  return (
    <Suspense fallback={fallback}>
      <GuestPage />
    </Suspense>
  );
};
export { LazyGuestPage };
