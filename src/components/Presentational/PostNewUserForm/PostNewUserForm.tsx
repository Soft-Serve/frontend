import React, { ChangeEvent, FormEvent, useState } from "react";
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
import { useNavigate } from "react-router-dom";
import { useCurrentUserQuery, USERS_QUERY, useSignUpFormMutation } from "@shared";

enum FieldNames {
  FIRST_NAME = "first_name",
  LAST_NAME = "last_name",
  EMAIL = "email",
  PASSWORD = "password",
  PASSWORD_CONFIRMATION = "password_confirmation",
  NAME = "name",
  SLUG = "slug",
}

interface Props {
  setIsModalOpen?: (state: boolean) => void;
  themeColour: string;
  themeTint: number;
  restaurantSlug: string;
}

interface MappableObject {
  [key: string]: string;
}

interface InputState extends MappableObject {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  password_confirmation: string;
  name: string;
  slug: string;
}

const { FIRST_NAME, LAST_NAME, EMAIL, PASSWORD, PASSWORD_CONFIRMATION, NAME, SLUG } = FieldNames;

const PostNewUserForm: FC<Props> = ({ setIsModalOpen, themeColour, themeTint, restaurantSlug }) => {
  const navigate = useNavigate();
  const [input, setInput] = useState<InputState>({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password_confirmation: "",
    name: "",
    slug: "",
  });

  const [touchedFields, setTouchedFields] = useState<MappableObject>({});

  const { data: userData, loading: userLoading } = useCurrentUserQuery({
    skip: !restaurantSlug,
  });
  const [signUp] = useSignUpFormMutation({
    onCompleted: () => {
      if (userData?.currentUser && setIsModalOpen) {
        setIsModalOpen(false);
      }
      if (!userData?.currentUser) {
        navigate("/confirm");
      }
    },
    refetchQueries: [
      {
        query: USERS_QUERY,
        variables: {
          restaurantSlug,
        },
      },
    ],
  });

  const handleBlur = (field: string) =>
    setTouchedFields(prevTouchedFields => ({ ...prevTouchedFields, [field]: field }));

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signUp({
      variables: {
        input,
      },
    });
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
    if (!touchedFields[EMAIL]) return null;
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
    if (!touchedFields[PASSWORD_CONFIRMATION]) return null;
    if (!isPasswordConfirmd(input.password, input.password_confirmation))
      return <span>Passwords dont match</span>;
    return null;
  };

  const isFormValid = () =>
    isNameInputValid(input.first_name) &&
    !isNameOnlyNumbers(input.first_name) &&
    !isNameOnlyNumbers(input.last_name) &&
    isNameInputValid(input.last_name) &&
    isEmailValid(input.email) &&
    isNameInputValid(input.password) &&
    isPasswordSixChar(input.password) &&
    isPasswordConfirmd(input.password, input.password_confirmation);

  if (userLoading) {
    return <p>loading</p>;
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
        {!userData?.currentUser && (
          <>
            <Input
              themeColour={themeColour}
              themeTint={themeTint}
              required
              value={input.name}
              onChange={handleChange}
              onBlur={() => handleBlur(NAME)}
              errors={[getNameErrors(input.name, !!touchedFields[NAME])]}
              labelText="Restaurant name"
              type="text"
              name={NAME}
              id={NAME}
            />
            <Input
              themeColour={themeColour}
              themeTint={themeTint}
              required
              value={input.slug}
              onChange={handleChange}
              onBlur={() => handleBlur(SLUG)}
              errors={[getNameErrors(input.slug, !!touchedFields[SLUG])]}
              labelText="Slug"
              type="text"
              name={SLUG}
              id={SLUG}
            />
          </>
        )}
        <Input
          themeColour={themeColour}
          themeTint={themeTint}
          required
          value={input.first_name}
          onChange={handleChange}
          onBlur={() => handleBlur(FIRST_NAME)}
          errors={[getNameErrors(input.first_name, !!touchedFields[FIRST_NAME])]}
          labelText="First name"
          type="text"
          name={FIRST_NAME}
          id={FIRST_NAME}
        />
        <Input
          themeColour={themeColour}
          themeTint={themeTint}
          required
          value={input.last_name}
          onChange={handleChange}
          onBlur={() => handleBlur(LAST_NAME)}
          errors={[getNameErrors(input.last_name, !!touchedFields[LAST_NAME])]}
          labelText="Last name"
          type="text"
          name={LAST_NAME}
          id={LAST_NAME}
        />
        <Input
          themeColour={themeColour}
          themeTint={themeTint}
          required
          value={input.email}
          onChange={handleChange}
          onBlur={() => handleBlur(EMAIL)}
          errors={[getEmailErrors()]}
          labelText="Email"
          autoComplete="email"
          type="email"
          name={EMAIL}
          id={EMAIL}
        />
        <div className=" hidden w-full md:block"></div>
        <Input
          css="mt-4"
          themeColour={themeColour}
          themeTint={themeTint}
          required
          value={input.password}
          onChange={handleChange}
          onBlur={() => handleBlur(PASSWORD)}
          errors={[getPasswordErrors(input.password, !!touchedFields[PASSWORD])]}
          labelText="Password"
          type="password"
          name={PASSWORD}
          id={PASSWORD}
        />
        <Input
          css="mt-4"
          themeColour={themeColour}
          themeTint={themeTint}
          required
          value={input.password_confirmation}
          onChange={handleChange}
          onBlur={() => handleBlur(PASSWORD_CONFIRMATION)}
          errors={[
            getPasswordErrors(input.password_confirmation, !!touchedFields[PASSWORD_CONFIRMATION]),
            getPasswordConfirmationErrors(),
          ]}
          labelText="Confirm password"
          type="password"
          name={PASSWORD_CONFIRMATION}
          id={PASSWORD_CONFIRMATION}
        />
      </form>
      <Button
        themeTint={themeTint}
        themeColour={themeColour}
        disabled={!isFormValid()}
        css="mt-8"
        isFullwidth
        size="XXL"
        type="submit"
      >
        Add new user
      </Button>
    </>
  );
};

export { PostNewUserForm };
