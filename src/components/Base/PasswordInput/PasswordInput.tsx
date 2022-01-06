import React, { DetailedHTMLProps, InputHTMLAttributes, ReactNode, useState } from "react";
import { classnames, TArg } from "tailwindcss-classnames";
import type { FC } from "react";
import { useRestaurantContext } from "@contexts";

interface Props extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  labelText?: string;
  errors?: ReactNode[];
  css?: TArg;
}

const PasswordInput: FC<Props> = ({
  errors,
  labelText,
  type,
  id,
  name,
  placeholder,
  disabled,
  css,
  required,
  autoComplete = "off",
  ...rest
}) => {
  const [isPassword, setIsPassword] = useState(true);
  const hasErrors = () => {
    if (!errors) return false;
    return errors.filter(e => !!e).length > 0;
  };

  const renderErrorMessages = () => {
    return errors?.slice(0, 2).map(error => <p key={`error-item-${error}`}>{error}</p>);
  };

  const { themeColour, themeTint } = useRestaurantContext();

  return (
    <div>
      <label className={classnames("block", "text-sm", "font-bold", "text-gray-700")}>
        <span className="font-Quicksand">Password</span>
        <span className="text-red-600 ml-1">*</span>
      </label>
      <div className="relative w-full mt-2">
        <div className="absolute inset-y-0 right-0 flex items-center px-2">
          <input
            onClick={() => setIsPassword(prevState => !prevState)}
            className="hidden"
            id="toggle"
            type="checkbox"
          />
          <label
            className={`bg-gray-300 hover:bg-${themeColour}-${themeTint} hover:text-white rounded px-2 py-1 text-sm text-gray-600 font-Quicksand cursor-pointer `}
            htmlFor="toggle"
          >
            {isPassword ? "show" : "hide"}
          </label>
        </div>
        <input
          type={isPassword ? "password" : "text"}
          disabled={disabled}
          name="password"
          className={`appearance-none border-2 rounded-md border-${themeColour}-${themeTint}  w-full py-2 px-3 leading-tight bg-gray-50 focus:outline-none focus:border-${themeColour}-${themeTint} focus:bg-white text-gray-700 pr-16 `}
          id="password"
          autoComplete={autoComplete}
          {...rest}
        />
      </div>
      {hasErrors() && (
        <div
          className="mt-2 text-sm text-white font-bold p-2 text-center bg-red-600 rounded-md"
          id="email-error"
        >
          {renderErrorMessages()}
        </div>
      )}
    </div>
  );
};

PasswordInput.defaultProps = {
  disabled: false,
};

export { PasswordInput };
