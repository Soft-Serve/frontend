import React, { ChangeEvent, FormEvent, useState } from "react";
import type { FC } from "react";
import { Button, Input } from "@base";
import { isBasicEmailRegexValid, isEmailAtValid, isEmailDotValid } from "@utility";
import { useForgotPasswordFormMutation } from "./ForgotPasswordForm.mutation";

const ForgotPasswordForm: FC = () => {
  const [forgotPassword, { loading }] = useForgotPasswordFormMutation();
  const [isEmailDirty, setIsEmailDirty] = useState(false);
  const [input, setInput] = useState({
    email: "",
    redirect_url:
      process.env.NODE_ENV === "production"
        ? process.env.REACT_APP_PROD_API_RESET_PASSWORD_URL
        : process.env.REACT_APP_DEV_API_RESET_PASSWORD_URL,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsEmailDirty(false);
    const { value, name } = e.target;
    setInput(prevState => ({ ...prevState, [name]: value }));
  };

  const isFormValid = !!input.email;

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

  const handleEmailOnBlur = () => {
    if (input.email.length) {
      setIsEmailDirty(true);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      forgotPassword({
        variables: {
          input,
        },
      });
    }
  };

  return (
    <>
      <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <h2 className="mt-2 mb-8 text-center text-3xl font-extrabold text-gray-900">
            Reset password
          </h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <Input
              themeColour="red"
              themeTint={400}
              errors={[renderEmailErrors()]}
              onBlur={handleEmailOnBlur}
              onChange={handleChange}
              name="email"
              value={input.email}
              labelText="Email"
              required
            />

            <div>
              <Button
                themeColour="red"
                themeTint={400}
                loading={loading}
                isFullwidth
                size="XXL"
                type="submit"
              >
                Email me a reset link
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export { ForgotPasswordForm };
