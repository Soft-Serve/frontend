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
import { useNavigate } from "react-router-dom";
import { useCurrentUserQuery, USERS_QUERY, useSignUpFormMutation } from "@shared";

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

  const [isFirstNameDirty, setIsFirstNameDirty] = useState(false);
  const [isLastNameDirty, setIsLastNameDirty] = useState(false);
  const [isEmailDirty, setIsEmailDirty] = useState(false);
  const [isPasswordDirty, setIsPasswordDirty] = useState(false);
  const [isPasswordConfirmationDirty, setIsPasswordConfirmationDirty] = useState(false);
  const [isNameDirty, setIsNameDirty] = useState(false);
  const [isSlugDirty, setIsSlugDirty] = useState(false);

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

  const handleBlur = (state: string, setDirty: Dispatch<SetStateAction<boolean>>) => {
    if (state.length) setDirty(true);
  };

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
    <form onSubmit={handleSubmit} className="w-full">
      {!userData?.currentUser && (
        <>
          <Input
            themeColour={themeColour}
            themeTint={themeTint}
            required
            value={input.name}
            onChange={handleChange}
            onBlur={() => handleBlur(input.name, setIsNameDirty)}
            errors={[getNameErrors(input.name, isNameDirty)]}
            labelText="Restaurant name"
            type="text"
            name="name"
            id="name"
          />
          <Input
            themeColour={themeColour}
            themeTint={themeTint}
            required
            value={input.slug}
            onChange={handleChange}
            onBlur={() => handleBlur(input.name, setIsSlugDirty)}
            errors={[getNameErrors(input.slug, isSlugDirty)]}
            labelText="Slug"
            type="text"
            name="slug"
            id="slug"
          />
        </>
      )}
      <Input
        themeColour={themeColour}
        themeTint={themeTint}
        required
        value={input.first_name}
        onChange={handleChange}
        onBlur={() => handleBlur(input.first_name, setIsFirstNameDirty)}
        errors={[getNameErrors(input.first_name, isFirstNameDirty)]}
        labelText="First name"
        type="text"
        name="first_name"
        id="first_name"
      />

      <Input
        themeColour={themeColour}
        themeTint={themeTint}
        required
        value={input.last_name}
        onChange={handleChange}
        onBlur={() => handleBlur(input.last_name, setIsLastNameDirty)}
        errors={[getNameErrors(input.last_name, isLastNameDirty)]}
        labelText="Last name"
        type="text"
        name="last_name"
        id="last_name"
      />

      <Input
        themeColour={themeColour}
        themeTint={themeTint}
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
        css="mt-4"
        themeColour={themeColour}
        themeTint={themeTint}
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
        css="mt-4"
        themeColour={themeColour}
        themeTint={themeTint}
        required
        value={input.password_confirmation}
        onChange={handleChange}
        onBlur={() => handleBlur(input.password_confirmation, setIsPasswordConfirmationDirty)}
        errors={[
          getPasswordErrors(input.password_confirmation, isPasswordConfirmationDirty),
          getPasswordConfirmationErrors(),
        ]}
        labelText="Confirm password"
        type="password"
        name="password_confirmation"
        id="password_confirmation"
      />
      <Button
        themeTint={themeTint}
        themeColour={themeColour}
        disabled={!isFormValid()}
        css="mt-4"
        isFullwidth
        size="XXL"
        type="submit"
      >
        Add new user
      </Button>
    </form>
  );
};

export { PostNewUserForm };
