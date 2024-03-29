import React, { DetailedHTMLProps, TextareaHTMLAttributes, ReactNode } from "react";
import { TArg } from "tailwindcss-classnames";
import type { FC } from "react";
import * as styles from "./styles";

interface Props
  extends DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> {
  labelText?: string;
  errors?: ReactNode[];
  css?: TArg;
  themeColour: string;
  themeTint: number;
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
  themeColour,
  themeTint,
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

  return (
    <div>
      <label htmlFor={name} className="sr-only">
        {labelText || name}
      </label>
      {labelText && (
        <label htmlFor={name} className={styles.label}>
          <span className="font-Quicksand">{labelText}</span>
          {required && <span className="text-red-600">*</span>}
        </label>
      )}
      <textarea
        rows={4}
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
          className="mt-2 rounded-md bg-red-600 p-2 text-center text-sm font-bold text-white"
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
