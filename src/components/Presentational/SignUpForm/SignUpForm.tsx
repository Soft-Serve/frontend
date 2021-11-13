import React, { ChangeEvent, useState, FormEvent } from "react";
import { XCircleIcon } from "@heroicons/react/solid";
import type { FC } from "react";
import { useHistory } from "react-router-dom";
import { Button, Input } from "@base";
import { useCurrentUserQuery } from "@shared";
import { useSignUpFormMutation } from "./SignUpForm.mutation";

const SignUpForm: FC = () => {
  const history = useHistory();

  const { data: userData, loading: userLoading } = useCurrentUserQuery();

  const [newUserName, setNewUserName] = useState({
    first: "",
    last: "",
    showNameMsg: false,
  });

  const [newEmail, setNewEmail] = useState({
    newEmail: "",
    emailValid: true,
  });

  const [newRestaurant, setNewRestaurant] = useState({
    name: "",
    slug: "",
  });

  const [newPwrd, setNewPwrd] = useState({
    newPwrd: "",
    confirmPwrd: "",
    passwordsMatch: false,
    eightChars: true,
    upperC: true,
    lowerC: true,
    number: true,
    specialChar: true,
    message: "",
    showNoMatchMsg: false,
  });

  // const handleNewUserNameInput = (e: ChangeEvent<HTMLInputElement>) => {
  //   switch (e.target.name) {
  //     case "first":
  //       setNewUserName(prev => ({
  //         ...prev,
  //         first: e.target.value,
  //       }));
  //       break;
  //     case "last":
  //       setNewUserName(prev => ({
  //         ...prev,
  //         last: e.target.value,
  //       }));
  //       break;
  //     default:
  //       throw new Error("Incorrect property name");
  //   }
  // };

  const [signUp] = useSignUpFormMutation({
    onCompleted: () => {
      if (userData?.currentUser) {
        setNewUserName({
          first: "",
          last: "",
          showNameMsg: false,
        });

        setNewEmail({
          newEmail: "",
          emailValid: true,
        });

        setNewRestaurant({
          name: "",
          slug: "",
        });

        setNewPwrd({
          newPwrd: "",
          confirmPwrd: "",
          passwordsMatch: false,
          eightChars: true,
          upperC: true,
          lowerC: true,
          number: true,
          specialChar: true,
          message: "",
          showNoMatchMsg: false,
        });
      }

      if (!userData?.currentUser) {
        history.push(`/confirm`);
      }
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    signUp({
      variables: {
        input: {
          email: newEmail.newEmail,
          password: newPwrd.newPwrd,
          password_confirmation: newPwrd.confirmPwrd,
          first_name: newUserName.first,
          last_name: newUserName.last,
          name: newRestaurant.name,
          slug: newRestaurant.slug,
        },
      },
    });
  };

  const handleNewUserNameInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "first") {
      setNewUserName(prev => ({
        ...prev,
        first: e.target.value,
      }));
    } else if (e.target.name === "last") {
      setNewUserName(prev => ({
        ...prev,
        last: e.target.value,
      }));
    }
  };

  const handleNewRestaurantInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "name") {
      setNewRestaurant(prev => ({
        ...prev,
        name: e.target.value,
      }));
    } else if (e.target.name === "slug") {
      setNewRestaurant(prev => ({
        ...prev,
        slug: e.target.value,
      }));
    }
  };

  const verifyName = () => {
    if (newUserName.first.length && newUserName.last.length) {
      setNewUserName(prev => ({
        ...prev,
        showNameMsg: false,
      }));
    } else {
      setNewUserName(prev => ({
        ...prev,
        showNameMsg: true,
      }));
    }
  };

  const hideNameMsg = () => {
    setNewUserName(prev => ({
      ...prev,
      showNameMsg: false,
    }));
  };

  const validateEmail = (email: string) => {
    const reg =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return reg.test(email);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    const emailValid = validateEmail(email);
    setNewEmail(prev => ({
      ...prev,
      newEmail: email,
      emailValid,
    }));
  };

  const verifyLength = (pass: string): boolean => {
    if (pass.length >= 8) {
      return true;
    }
    return false;
  };

  const verifyCriteria = (pass: string, reg: RegExp): boolean => {
    if (reg.test(pass)) {
      return true;
    }
    return false;
  };

  const ucRegEx = /(?=.*[A-ZÀÂÄÈÉÊËÎÏÔŒÙÛÜŸÇÁÉÍÓÚÑÜ])/;
  const lcRegEx = /(?=.*[a-zàâäèéêëîïôœùûüÿçáéíóúñü])/;
  const numberRegEx = /(?=.*\d)/;
  const specCharRegEx = /[-!$%^*_+|=?@#]/;

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const pwrd = e.target.value;
    const verifyEightChars = verifyLength(pwrd);
    const verifyUpperCase = verifyCriteria(pwrd, ucRegEx);
    const verifyLowerCase = verifyCriteria(pwrd, lcRegEx);
    const verifyNumber = verifyCriteria(pwrd, numberRegEx);
    const verifySpecChar = verifyCriteria(pwrd, specCharRegEx);
    setNewPwrd(prev => ({
      ...prev,
      newPwrd: pwrd,
      eightChars: verifyEightChars,
      upperC: verifyUpperCase,
      lowerC: verifyLowerCase,
      number: verifyNumber,
      specialChar: verifySpecChar,
    }));
  };

  const verifyPwrd = () => {
    if (!newPwrd.eightChars) {
      setNewPwrd(prev => ({
        ...prev,
        message: "Passwords must contain at least 8 characters",
      }));
    } else if (!newPwrd.upperC) {
      setNewPwrd(prev => ({
        ...prev,
        message: "Passwords must contain at least one uppercase letter",
      }));
    } else if (!newPwrd.lowerC) {
      setNewPwrd(prev => ({
        ...prev,
        message: "Passwords must contain at least one lowercase letter",
      }));
    } else if (!newPwrd.number) {
      setNewPwrd(prev => ({
        ...prev,
        message: "Passwords must contain at least one number",
      }));
    } else if (!newPwrd.specialChar) {
      setNewPwrd(prev => ({
        ...prev,
        message: "Passwords must contain at least one special character (e.g. $, !, @)",
      }));
    } else if (!newPwrd.newPwrd.length) {
      setNewPwrd(prev => ({
        ...prev,
        message: "Please enter a password",
      }));
    }
  };

  const clearMessage = () => {
    setNewPwrd(prev => ({
      ...prev,
      message: "",
    }));
  };

  const hideNoMatchMsg = () => {
    setNewPwrd(prev => ({
      ...prev,
      showNoMatchMsg: false,
    }));
  };

  const handleConfirmPwrd = (e: ChangeEvent<HTMLInputElement>) => {
    const confirmPwrd = e.target.value;
    if (confirmPwrd === newPwrd.newPwrd) {
      setNewPwrd(prev => ({
        ...prev,
        confirmPwrd,
        passwordsMatch: true,
      }));
    } else {
      setNewPwrd(prev => ({
        ...prev,
        confirmPwrd,
        passwordsMatch: false,
      }));
    }
  };

  const verifyMatch = () => {
    if (!newPwrd.passwordsMatch) {
      setNewPwrd(prev => ({
        ...prev,
        showNoMatchMsg: true,
      }));
    }
  };

  if (userLoading) {
    return <p>loading</p>;
  }

  return (
    <form onSubmit={handleSubmit}>
      {!userData?.currentUser && (
        <h2 className="text-2xl font-extrabold capitalize">Create new restaurant</h2>
      )}
      {!userData?.currentUser && (
        <div className="grid grid-cols-2 gap-x-2 mt-1">
          <div className="col-span-2 sm:col-span-2 md:col-span-1 lg:col-span-1">
            <Input
              value={newRestaurant.name}
              onChange={e => handleNewRestaurantInput(e)}
              onBlur={() => verifyName()}
              onFocus={() => hideNameMsg()}
              id="new-restaurant-name"
              type="text"
              name="name"
              required
              labelText="Restaurant name"
              placeholder="Restaurant name"
            />
          </div>
          <div className="col-span-2 sm:col-span-2 md:col-span-1 g:col-span-1">
            <Input
              value={newRestaurant.slug}
              onChange={e => handleNewRestaurantInput(e)}
              onBlur={() => verifyName()}
              onFocus={() => hideNameMsg()}
              id="new-restaurant-slug"
              type="text"
              name="slug"
              required
              labelText="Restaurant slug"
              placeholder="Restaurant slug"
            />
          </div>
        </div>
      )}
      <div className="grid grid-cols-2 gap-x-2 mt-1">
        <div className="col-span-2 sm:col-span-2 md:col-span-1 lg:col-span-1">
          <Input
            value={newUserName.first}
            onChange={e => handleNewUserNameInput(e)}
            onBlur={() => verifyName()}
            onFocus={() => hideNameMsg()}
            id="new-user-fn"
            name="first"
            type="text"
            required
            labelText="First name"
            placeholder="First name"
          />
        </div>
        <div className="col-span-2 sm:col-span-2 md:col-span-1 g:col-span-1">
          <Input
            value={newUserName.last}
            onChange={e => handleNewUserNameInput(e)}
            onBlur={() => verifyName()}
            onFocus={() => hideNameMsg()}
            id="new-user-ln"
            name="last"
            type="text"
            required
            labelText="Last name"
            placeholder="Last name"
          />
        </div>
      </div>
      <div
        className={
          newUserName.showNameMsg ? "block text-red-500 rounded-md bg-red-50 p-2 mb-2" : "hidden"
        }
      >
        <div className="flex">
          <div className="flex-shrink-0">
            <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-red-800">First and last name are required</p>
          </div>
        </div>
      </div>
      <Input
        onChange={e => handleEmailChange(e)}
        value={newEmail.newEmail}
        id="new-user-email"
        name="new-email"
        type="email"
        required
        labelText="Email"
        placeholder="Email"
      />
      <div
        className={
          newEmail.emailValid ? "hidden" : "block text-red-500 rounded-md bg-red-50 p-2 mb-2"
        }
      >
        <div className="flex">
          <div className="flex-shrink-0">
            <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-red-800">Invalid e-mail address</p>
          </div>
        </div>
      </div>
      <Input
        value={newPwrd.newPwrd}
        onChange={e => handlePasswordChange(e)}
        id="new-user-password"
        name="new-password"
        type="password"
        required
        labelText="Choose password"
        placeholder="Choose Password"
        onBlur={() => verifyPwrd()}
        onFocus={() => clearMessage()}
      />
      <div
        className={
          newPwrd.message.length ? "block text-red-500 rounded-md bg-red-50 p-2 mb-2" : "hidden"
        }
      >
        <div className="flex">
          <div className="flex-shrink-0">
            <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-red-800">{newPwrd.message}</p>
          </div>
        </div>
      </div>
      <Input
        value={newPwrd.confirmPwrd}
        onChange={e => handleConfirmPwrd(e)}
        onBlur={() => verifyMatch()}
        onFocus={() => hideNoMatchMsg()}
        id="confirm-user-password"
        name="confirm-password"
        type="password"
        autoComplete="current-password"
        required
        labelText="Confirm password"
        placeholder="Confirm Password"
      />
      <div
        className={
          newPwrd.showNoMatchMsg ? "block text-red-500 rounded-md bg-red-50 p-2 mb-2" : "hidden"
        }
      >
        <div className="flex">
          <div className="flex-shrink-0">
            <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-red-800">Passwords must match</p>
          </div>
        </div>
      </div>
      <Button type="submit" disabled={!newPwrd.passwordsMatch}>
        {userData?.currentUser ? "Add new user" : "Create new restaurant"}
      </Button>
    </form>
  );
};

export { SignUpForm };
