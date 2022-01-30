import React, { ChangeEvent, FormEvent, useState } from "react";
import type { FC } from "react";
import { Button, PasswordInput } from "@base";
import { useResetPasswordFormMutation } from "./ResetPasswordForm.mutation";

const ResetPasswordForm: FC = () => {
  const [isLoginSuccesFul, setIsLoginSuccessFull] = useState(true);
  const [signIn, { loading }] = useResetPasswordFormMutation({
    onError: () => setIsLoginSuccessFull(false),
  });

  const [input, setInput] = useState({
    password_confirmation: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setInput(prevState => ({ ...prevState, [name]: value }));
  };

  const isFormValid = !!input.password_confirmation && !!input.password;

  const renderLoginError = () => {
    if (!isLoginSuccesFul) {
      return <span>Password is invalid</span>;
    }
    return null;
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
      <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <h2 className="mt-2 mb-8 text-center text-3xl font-extrabold text-gray-900">
            Enter a new password
          </h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <PasswordInput
              id="password"
              name="password"
              themeColour="red"
              themeTint={400}
              type="password"
              errors={[renderLoginError()]}
              onChange={handleChange}
              value={input.password}
              required
            />
            <PasswordInput
              id="password_confirmation"
              name="password_confirmation"
              labelText="Confirm password"
              themeColour="red"
              themeTint={400}
              type="password_confirmation"
              errors={[renderLoginError()]}
              onChange={handleChange}
              value={input.password_confirmation}
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
                Reset password
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export { ResetPasswordForm };
