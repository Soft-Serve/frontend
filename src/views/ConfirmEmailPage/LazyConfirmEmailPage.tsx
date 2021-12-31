import React, { lazy, Suspense } from "react";
import type { FC } from "react";
import { SkeletonConfirmEmailPage } from "./SkeletonConfirmEmailPage";

const ConfirmEmailPage = lazy(() => import("./DefaultConfirmEmailPage"));

const LazyConfirmEmailPage: FC = () => {
  const fallback = <SkeletonConfirmEmailPage />;
  return (
    <Suspense fallback={fallback}>
      <ConfirmEmailPage />
    </Suspense>
  );
};
export { LazyConfirmEmailPage };
