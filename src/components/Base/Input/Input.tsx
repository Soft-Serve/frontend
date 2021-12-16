import React, { DetailedHTMLProps, InputHTMLAttributes, ReactNode } from "react";
import { TArg } from "tailwindcss-classnames";
import type { FC } from "react";
import { useRestaurantContext } from "@contexts";
import * as styles from "./styles";

interface Props extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  labelText?: string;
  errors?: ReactNode[];
  css?: TArg;
}

const Input: FC<Props> = ({
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
      <label htmlFor={name} className="sr-only">
        {labelText || name}
      </label>
      {labelText && (
        <label htmlFor={name} className={styles.label}>
          <span className="font-Quicksand font-semibold">{labelText} </span>
          {required && <span className="text-red-600">*</span>}
        </label>
      )}
      <input
        autoComplete={autoComplete}
        type={type}
        name={name}
        id={id}
        className={styles.buildStyles(!!disabled, themeColour, themeTint, css)}
        disabled={disabled}
        placeholder={placeholder}
        {...rest}
      />
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

Input.defaultProps = {
  disabled: false,
};

export { Input };
