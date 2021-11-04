import React, { DetailedHTMLProps, TextareaHTMLAttributes, ReactNode } from "react";
import { TArg } from "tailwindcss-classnames";
import type { FC } from "react";
import { useGlobalContext } from "@contexts";
import * as styles from "./styles";

interface Props
  extends DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> {
  labelText?: string;
  errors?: ReactNode[];
  css?: TArg;
}

const TextBox: FC<Props> = ({
  errors,
  labelText,
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

  const { themeColour, themeTint } = useGlobalContext();

  return (
    <div>
      <label htmlFor={name} className="sr-only">
        {labelText || name}
      </label>
      {labelText && (
        <label htmlFor={name} className={styles.label}>
          {labelText} {required && <span className="text-red-600">*</span>}
        </label>
      )}
      <textarea
        autoComplete={autoComplete}
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

TextBox.defaultProps = {
  disabled: false,
};

export { TextBox };
