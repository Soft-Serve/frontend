import React, { ChangeEvent, Dispatch, FormEvent, SetStateAction, useState } from "react";
import type { FC } from "react";
import { Button, Input } from "@base";
import {
  isBasicEmailRegexValid,
  isEmailAtValid,
  isEmailDotValid,
  isEmailValid,
  isNameInputValid,
  isNameOnlyNumbers,
  isNameValid,
  isPasswordConfirmd,
  isPasswordSixChar,
} from "@utility";

const PostNewUserForm: FC = () => {
  const [input, setInput] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });

  const [isFirstNameDirty, setIsFirstNameDirty] = useState(false);
  const [isLastNameDirty, setIsLastNameDirty] = useState(false);
  const [isEmailDirty, setIsEmailDirty] = useState(false);
  const [isPasswordDirty, setIsPasswordDirty] = useState(false);
  const [isPasswordConfirmationDirty, setIsPasswordConfirmationDirty] = useState(false);

  const handleBlur = (state: string, setDirty: Dispatch<SetStateAction<boolean>>) => {
    if (state.length) setDirty(true);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setInput(prevState => ({ ...prevState, [name]: value }));
  };

  const getNameErrors = (name: string, isDirtyState: boolean) => {
    if (!isDirtyState) return null;
    if (!isNameValid(name)) return <span>Name is required</span>;
    if (isNameOnlyNumbers(name)) return <span>Name cannot only contain numbers</span>;
    return null;
  };

  const getEmailErrors = () => {
    if (!isEmailDirty) return null;
    if (!isEmailAtValid(input.email)) return <span>@ is required</span>;
    if (!isEmailDotValid(input.email)) return <span>Dot is required</span>;
    if (!isBasicEmailRegexValid(input.email)) return <span>Email is not valid</span>;
    return null;
  };

  const getPasswordErrors = (password: string, isDirtyState: boolean) => {
    if (!isDirtyState) return null;
    if (!isNameValid(password)) return <span>Password is required</span>;
    if (!isPasswordSixChar(password)) return <span>Password must be atleast 6 characters</span>;
    return null;
  };

  const getPasswordConfirmationErrors = () => {
    if (!isPasswordConfirmationDirty) return null;
    if (!isPasswordConfirmd(input.password, input.passwordConfirmation))
      return <span>Passwords dont match</span>;
    return null;
  };

  const isFormValid = () =>
    isNameInputValid(input.firstName) &&
    !isNameOnlyNumbers(input.firstName) &&
    !isNameOnlyNumbers(input.lastName) &&
    isNameInputValid(input.lastName) &&
    isEmailValid(input.email) &&
    isNameInputValid(input.password) &&
    isPasswordSixChar(input.password) &&
    isPasswordConfirmd(input.password, input.passwordConfirmation);

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <Input
        required
        value={input.firstName}
        onChange={handleChange}
        onBlur={() => handleBlur(input.firstName, setIsFirstNameDirty)}
        errors={[getNameErrors(input.firstName, isFirstNameDirty)]}
        labelText="First name"
        type="text"
        name="firstName"
        id="firstName"
      />

      <Input
        required
        value={input.lastName}
        onChange={handleChange}
        onBlur={() => handleBlur(input.lastName, setIsLastNameDirty)}
        errors={[getNameErrors(input.lastName, isLastNameDirty)]}
        labelText="Last name"
        type="text"
        name="lastName"
        id="lastName"
      />

      <Input
        required
        value={input.email}
        onChange={handleChange}
        onBlur={() => handleBlur(input.email, setIsEmailDirty)}
        errors={[getEmailErrors()]}
        labelText="Email"
        autoComplete="email"
        type="email"
        name="email"
        id="email"
      />

      <Input
        required
        value={input.password}
        onChange={handleChange}
        onBlur={() => handleBlur(input.password, setIsPasswordDirty)}
        errors={[getPasswordErrors(input.password, isPasswordDirty)]}
        labelText="Password"
        type="password"
        name="password"
        id="password"
      />

      <Input
        required
        value={input.passwordConfirmation}
        onChange={handleChange}
        onBlur={() => handleBlur(input.passwordConfirmation, setIsPasswordConfirmationDirty)}
        errors={[
          getPasswordErrors(input.passwordConfirmation, isPasswordConfirmationDirty),
          getPasswordConfirmationErrors(),
        ]}
        labelText="Confirm password"
        type="password"
        name="passwordConfirmation"
        id="passwordConfirmation"
      />
      <Button disabled={!isFormValid()} css="mt-4" isFullwidth size="XXL" type="submit">
        Sign up
      </Button>
    </form>
  );
};

export { PostNewUserForm };
