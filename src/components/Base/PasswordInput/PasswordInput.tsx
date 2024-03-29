import React, { DetailedHTMLProps, InputHTMLAttributes, ReactNode, useState } from "react";
import { classnames, TArg } from "tailwindcss-classnames";
import type { FC } from "react";

interface Props extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  labelText?: string;
  errors?: ReactNode[];
  css?: TArg;
  themeColour: string;
  themeTint: number;
  name: string;
}

const PasswordInput: FC<Props> = ({
  value,
  errors,
  labelText,
  type,
  id,
  name,
  placeholder,
  disabled,
  css,
  required,
  themeTint,
  themeColour,
  autoComplete = "off",
  ...rest
}) => {
  const [isPassword, setIsPassword] = useState(true);

  const hasErrors = () => {
    if (!errors) return false;
    return errors.filter(e => !!e).length > 0;
  };

  const renderErrorMessages = () => {
    return (
      errors
        ?.slice(0, 2)
        // eslint-disable-next-line react/no-array-index-key
        .map((error, index) => <p key={`error-item-${name}-${index}`}>{error}</p>)
    );
  };

  return (
    <div>
      <label className={classnames("block", "text-sm", "font-bold", "text-gray-700")}>
        <span className="font-Quicksand">{labelText || "Password"}</span>
        <span className="ml-1 text-red-600">*</span>
      </label>
      <div className="relative mt-2 w-full">
        <div className="absolute inset-y-0 right-0 flex items-center px-2">
          <input
            onClick={() => setIsPassword(prevState => !prevState)}
            className="hidden"
            id={`toggle${name}`}
            type="checkbox"
          />
          <label
            className={`bg-gray-300 hover:bg-${themeColour}-${themeTint} cursor-pointer rounded px-2 py-1 font-Quicksand text-sm text-gray-600 hover:text-white `}
            htmlFor={`toggle${name}`}
          >
            {isPassword ? "show" : "hide"}
          </label>
        </div>
        <input
          value={value}
          type={isPassword ? "password" : "text"}
          disabled={disabled}
          className={`block w-full shadow-sm sm:text-sm focus:ring-${themeColour}-${themeTint} focus:border-${themeColour}-${themeTint} rounded-md border-2 shadow-md border-${themeColour}-${themeTint}`}
          autoComplete={autoComplete}
          name={name}
          {...rest}
        />
      </div>
      {hasErrors() && (
        <div
          className="mt-2 rounded-md bg-red-600 p-2 text-center text-sm font-bold text-white"
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
