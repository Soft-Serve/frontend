import React, { ChangeEvent, FormEvent, useState } from "react";
import { useHistory } from "react-router-dom";
import type { FC } from "react";
import { Input, Button } from "@base";
import { UID, ACCESS_TOKEN, CLIENT_TOKEN } from "src/constants";
import { LogoSVG } from "@svgs";
import { isBasicEmailRegexValid, isEmailAtValid, isEmailDotValid } from "src/utility";
import { useSignInFormMutation } from "./SignInForm.mutation";

const SignInForm: FC = () => {
  const history = useHistory();
  const [isLoginSuccesFull, setIsLoginSuccessFull] = useState(true);
  const [signIn] = useSignInFormMutation({
    onCompleted: completedData => {
      localStorage.setItem(ACCESS_TOKEN, completedData.signIn.access_token);
      localStorage.setItem(UID, completedData.signIn.uid);
      localStorage.setItem(CLIENT_TOKEN, completedData.signIn.client);
      history.push(`/restaurants/${completedData.signIn.restaurant_slug}`);
      window.location.reload();
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

  return (
    <>
      <div className="sm:mx-auto sm:w-full sm:max-w-md flex justify-center flex-col items-center">
        <LogoSVG />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{" "}
          <a href="/" className="font-medium text-red-400 hover:text-red-500">
            start your 14-day free trial
          </a>
        </p>
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
              <Button isFullwidth size="XL" type="submit">
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
