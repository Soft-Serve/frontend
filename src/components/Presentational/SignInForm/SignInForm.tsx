import React, { ChangeEvent, FormEvent, useState } from "react";
import type { FC } from "react";
import { Input, Button } from "@base";
import { uid, accessToken, clientToken } from "src/constants";
import { LogoSVG } from "@svgs";
import { useNavigate } from "react-router";
import { isBasicEmailRegexValid, isEmailAtValid, isEmailDotValid } from "src/utility";
import { useViewport } from "@hooks";
import { useSignInFormMutation } from "./SignInForm.mutation";

const SignInForm: FC = () => {
  const [isLoginSuccesFull, setIsLoginSuccessFull] = useState(true);
  const { width } = useViewport();
  const navigate = useNavigate();
  const [signIn, { loading }] = useSignInFormMutation({
    onCompleted: completedData => {
      localStorage.setItem(accessToken, completedData.signIn.access_token);
      localStorage.setItem(uid, completedData.signIn.uid);
      localStorage.setItem(clientToken, completedData.signIn.client);
      if (completedData?.signIn?.restaurant_slug) {
        navigate(`/restaurants/${completedData?.signIn?.restaurant_slug}`);
      }
    },

    onError: () => setIsLoginSuccessFull(false),
  });
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [isEmailDirty, setIsEmailDirty] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsEmailDirty(false);
    const { value, name } = e.target;
    setInput(prevState => ({ ...prevState, [name]: value }));
  };

  const isFormValid = !!input.email && !!input.password;

  const renderEmailErrors = () => {
    if (!isEmailDirty) return null;
    if (!isEmailAtValid(input.email)) {
      return <span>@ is required</span>;
    }
    if (!isEmailDotValid(input.email)) {
      return <span>Dot is required</span>;
    }
    if (!isBasicEmailRegexValid(input.email)) {
      return <span>Email is not valid</span>;
    }

    return null;
  };

  const renderLoginError = () => {
    if (!isLoginSuccesFull) {
      return <span>Email or password is invalid</span>;
    }
    return null;
  };

  const handleEmailOnBlur = () => {
    if (input.email.length) {
      setIsEmailDirty(true);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      setIsLoginSuccessFull(true);
      signIn({
        variables: {
          input,
        },
      });
    }
  };

  const isSmallerThenTablet = width < 500;

  const renderCTA = () => {
    if (isSmallerThenTablet)
      return <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in</h2>;
    return (
      <>
        <LogoSVG />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{" "}
          <a href="/sign-up" className="font-medium text-red-400 hover:text-red-500">
            start your 14-day free trial
          </a>
        </p>
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
          <form className="space-y-6" onSubmit={handleSubmit}>
            <Input
              errors={[renderEmailErrors()]}
              onBlur={handleEmailOnBlur}
              onChange={handleChange}
              name="email"
              value={input.email}
              labelText="Email"
              required
            />
            <Input
              type="password"
              errors={[renderLoginError()]}
              onChange={handleChange}
              name="password"
              value={input.password}
              labelText="Password"
              required
            />

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <a href="/" className="font-medium text-gray-700 hover:text-gray-900 underline">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <Button loading={loading} isFullwidth size="XXL" type="submit">
                Sign in
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export { SignInForm };
