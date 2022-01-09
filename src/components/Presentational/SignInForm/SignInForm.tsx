import React, { ChangeEvent, FormEvent, useState } from "react";
import type { FC } from "react";
import { Input, Button, PasswordInput } from "@base";
import { uid, accessToken, clientToken } from "@constants";
import { useNavigate } from "react-router";
import { LogoSVG } from "@svgs";
import { isBasicEmailRegexValid, isEmailAtValid, isEmailDotValid } from "@utility";
import { useViewport } from "@hooks";
import { useSignInFormMutation } from "./SignInForm.mutation";

interface Props {
  themeColour: string;
  themeTint: number;
}
const SignInForm: FC<Props> = ({ themeColour, themeTint }) => {
  const [isLoginSuccesFull, setIsLoginSuccessFull] = useState(true);
  const { width } = useViewport();
  const navigate = useNavigate();
  const [signIn, { loading }] = useSignInFormMutation({
    onCompleted: completedData => {
      localStorage.setItem(accessToken, completedData?.signIn?.access_token);
      localStorage.setItem(uid, completedData?.signIn?.uid);
      localStorage.setItem(clientToken, completedData?.signIn?.client);
      navigate(`/restaurants/${completedData?.signIn?.restaurant_slug}`);
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

  const isSmallerThenTablet = width < 500;

  const renderCTA = () => {
    if (isSmallerThenTablet)
      return <h2 className="text-center text-3xl font-extrabold text-gray-900">Sign in</h2>;
    return (
      <>
        <LogoSVG className={`text-${themeColour}-${themeTint}`} />
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{" "}
          <a
            href="/sign-up"
            className={`font-bold text-${themeColour}-${themeTint} hover:text-${themeColour}-${
              themeTint + 100
            }`}
          >
            start your 14-day free trial
          </a>
        </p>
      </>
    );
  };

  return (
    <>
      <div className="sm:mx-auto sm:w-full sm:max-w-md flex justify-center flex-col items-center mt-10">
        {renderCTA()}
      </div>
      <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <Input
              themeColour={themeColour}
              themeTint={themeTint}
              errors={[renderEmailErrors()]}
              onBlur={handleEmailOnBlur}
              onChange={handleChange}
              name="email"
              value={input.email}
              labelText="Email"
              required
            />
            <PasswordInput
              id="password"
              name="password"
              themeColour={themeColour}
              themeTint={themeTint}
              type="password"
              errors={[renderLoginError()]}
              onChange={handleChange}
              value={input.password}
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
              <Button
                themeColour={themeColour}
                themeTint={themeTint}
                loading={loading}
                isFullwidth
                size="XXL"
                type="submit"
              >
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
