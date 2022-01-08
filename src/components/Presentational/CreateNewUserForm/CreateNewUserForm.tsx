import React from "react";
import type { FC } from "react";
import { PostNewUserForm } from "@presentational";
import { LogoSVG } from "@svgs";
import { useViewport } from "@hooks";

interface Props {
  themeColour: string;
  themeTint: number;
}

const CreateNewUserForm: FC<Props> = ({ themeTint, themeColour }) => {
  const { width } = useViewport();
  const isSmallerThenTablet = width < 500;

  const renderCTA = () => {
    if (isSmallerThenTablet)
      return <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in</h2>;
    return (
      <>
        <LogoSVG />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign up for Soft Serve
        </h2>
      </>
    );
  };
  return (
    <>
      <div className="sm:mx-auto sm:w-full sm:max-w-md flex justify-center flex-col items-center">
        {renderCTA()}
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <PostNewUserForm themeColour={themeColour} themeTint={themeTint} />
        </div>
      </div>
    </>
  );
};

export { CreateNewUserForm };
