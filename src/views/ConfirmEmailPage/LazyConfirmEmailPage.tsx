import React, { lazy, Suspense } from "react";
import type { FC } from "react";
import { LoadingScreen } from "@base";

const ConfirmEmailPage = lazy(() => import("./DefaultConfirmEmailPage"));

const LazyConfirmEmailPage: FC = () => {
  const fallback = <LoadingScreen />;
  return (
    <Suspense fallback={fallback}>
      <ConfirmEmailPage />
    </Suspense>
  );
};
export { LazyConfirmEmailPage };
