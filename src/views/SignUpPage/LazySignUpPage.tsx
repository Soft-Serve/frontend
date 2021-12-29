import React, { lazy, Suspense } from "react";
import type { FC } from "react";
import { SkeletonSignUpPage } from "./SkeletonSignUpPage";

const SignUpPage = lazy(() => import("./DefaultSignUpPage"));

const LazySignUpPage: FC = () => {
  const fallback = <SkeletonSignUpPage />;
  return (
    <Suspense fallback={fallback}>
      <SignUpPage />
    </Suspense>
  );
};
export { LazySignUpPage };
