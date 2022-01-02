import React, { lazy, Suspense } from "react";
import type { FC } from "react";
import { SkeletonLandingPage } from "./SkeletonLandingPage";

const LandingPage = lazy(() => import("./DefaultLandingPage"));

const LazyLandingPage: FC = () => {
  const fallback = <SkeletonLandingPage />;
  return (
    <Suspense fallback={fallback}>
      <LandingPage />
    </Suspense>
  );
};
export { LazyLandingPage };
