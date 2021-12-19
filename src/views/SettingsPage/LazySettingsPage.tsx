import React, { lazy, Suspense } from "react";
import type { FC } from "react";
import { SkeletonSettingsPage } from "./SkeletonSettingsPage";

const SettingsPage = lazy(() => import("./DefaultSettingsPage"));

const LazySettingsPage: FC = () => {
  const fallback = <SkeletonSettingsPage />;
  return (
    <Suspense fallback={fallback}>
      <SettingsPage />
    </Suspense>
  );
};
export { LazySettingsPage };
