import React, { lazy, Suspense } from "react";
import type { FC } from "react";
import { SkeletonSignInPage } from "./SkeletonSignInPage";

const SignInPage = lazy(() => import("./DefaultSignInPage"));

const LazySignInPage: FC = () => {
  const fallback = <SkeletonSignInPage />;
  return (
    <Suspense fallback={fallback}>
      <SignInPage />
    </Suspense>
  );
};
export { LazySignInPage };
