import React, { Dispatch, FormEvent, Fragment, SetStateAction, useState } from "react";
import type { FC } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Button, PasswordInput } from "@base";
import { isNameValid, isPasswordSixChar, isPasswordConfirmd, isNameInputValid } from "@utility";
import { useSignUpFormMutation, USERS_QUERY } from "@shared";
import { useNavigate } from "react-router";

interface MappableObject {
  [key: string]: string;
}

interface InputState extends MappableObject {
  first_name: string;
  last_name: string;
  email: string;
  name: string;
  slug: string;
}

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  input: InputState;
}
const PasswordModal: FC<Props> = ({ open, setOpen, input }) => {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [isPasswordDirty, setIsPasswordDirty] = useState(false);
  const [isPasswordConfirmationDirty, setIsPasswordConfirmationDirty] = useState(false);

  const [signUp, { loading }] = useSignUpFormMutation({
    onCompleted: () => navigate("/confirm"),
    refetchQueries: [
      {
        query: USERS_QUERY,
        variables: {
          restaurantSlug: input.slug,
        },
      },
    ],
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signUp({
      variables: {
        input: {
          password_confirmation: passwordConfirmation,
          password,
          ...input,
        },
      },
    });
  };

  const getPasswordErrors = (passwordState: string, isDirtyState: boolean) => {
    if (!isDirtyState) return null;
    if (!isNameValid(passwordState)) return <span>Password is required</span>;
    if (!isPasswordSixChar(passwordState))
      return <span>Password must be atleast 6 characters</span>;
    return null;
  };

  const getPasswordConfirmationErrors = () => {
    if (!isPasswordConfirmationDirty) return null;
    if (!isPasswordConfirmd(password, passwordConfirmation))
      return <span>Passwords dont match</span>;
    return null;
  };

  const isFormValid = () =>
    isNameInputValid(password) &&
    isPasswordSixChar(password) &&
    isPasswordConfirmd(password, passwordConfirmation);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={setOpen}>
        <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6 sm:align-middle">
              <form noValidate onSubmit={handleSubmit}>
                <div>
                  <div className="mt-3  sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-center font-Quicksand text-lg font-bold leading-6 text-gray-900"
                    >
                      Select password
                    </Dialog.Title>
                    <div className="mt-2 w-full ">
                      <div className="my-2">
                        <PasswordInput
                          onBlur={() => setIsPasswordDirty(true)}
                          onChange={e => setPassword(e.target.value)}
                          id="password"
                          name="password"
                          value={password}
                          themeColour="red"
                          themeTint={400}
                          errors={[getPasswordErrors(password, isPasswordDirty)]}
                        />
                      </div>
                      <PasswordInput
                        onBlur={() => setIsPasswordConfirmationDirty(true)}
                        labelText="Confirm Password"
                        onChange={e => setPasswordConfirmation(e.target.value)}
                        id="password_confirmation"
                        name="password_confirmation"
                        value={passwordConfirmation}
                        themeColour="red"
                        themeTint={400}
                        errors={[
                          getPasswordErrors(passwordConfirmation, isPasswordConfirmationDirty),
                          getPasswordConfirmationErrors(),
                        ]}
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6">
                  <Button
                    loading={loading}
                    themeColour="red"
                    themeTint={400}
                    disabled={!isFormValid()}
                    css="mt-4"
                    isFullwidth
                    size="XXL"
                    type="submit"
                  >
                    Submit
                  </Button>
                </div>
              </form>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export { PasswordModal };
