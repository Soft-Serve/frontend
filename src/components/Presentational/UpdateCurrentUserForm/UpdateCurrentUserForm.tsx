import React, { useState, FormEvent } from "react";
import type { FC, ChangeEvent } from "react";
import { Button, Input, Notification } from "@base";
import toast from "react-hot-toast";

import { CURRENT_USER_QUERY } from "@shared";
import { useViewport } from "@hooks";
import { isNameOnlyNumbers, isNameValid } from "@utility";
import { useUpdateCurrentUser } from "./UpdateCurrentUser.mutation";

interface Props {
  firstName: string;
  lastName: string;
  email: string;
  id: number;
}

type StateMap = {
  [key: string]: string;
};

const UpdateCurrentUserForm: FC<Props> = ({ firstName, lastName, email, id }) => {
  const currentUser = {
    firstName,
    lastName,
    email,
  } as StateMap;

  const [state, setState] = useState<StateMap>(currentUser);
  const [isFirstNameDirty, setIsFirstNameDirty] = useState(false);
  const [isLastNameDirty, setIsLastNameDirty] = useState(false);
  const { width } = useViewport();

  const isTablet = width < 550;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setState(prevState => ({ ...prevState, [name]: value }));
  };

  const onSuccess = () => toast.custom(<Notification header="Details succesfully updated!" />);

  const [updateCurrentUser] = useUpdateCurrentUser({
    update(cache, { data: updatedCurrentUserData }) {
      cache.writeQuery({
        query: CURRENT_USER_QUERY,
        data: {
          currentUser: { ...updatedCurrentUserData?.updatedUser },
        },
      });
    },
    onCompleted: () => onSuccess(),
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateCurrentUser({
      variables: {
        input: {
          first_name: state.firstName,
          last_name: state.lastName,
          id,
        },
      },
      optimisticResponse: {
        __typename: "Mutation",
        updatedUser: {
          first_name: state.firstName,
          last_name: state.lastName,
          id,
        },
      },
    });
  };

  const isCurrentUserUpdated = () => {
    if (Object.keys(currentUser).length === Object.keys(state).length) {
      return !Object.keys(currentUser).every(
        key => Object.prototype.hasOwnProperty.call(state, key) && state[key] === currentUser[key]
      );
    }
    return false;
  };

  const nameErrors = (name: string, isDirty: boolean) => {
    if (!isDirty) return null;
    if (!isNameValid(name)) return <span>Name is required</span>;
    if (isNameOnlyNumbers(name)) return <span>Name cannot only contain numbers</span>;
    return null;
  };

  const isFormValid =
    isNameValid(state.firstName) &&
    isNameValid(state.lastName) &&
    !isNameOnlyNumbers(state.firstName) &&
    !isNameOnlyNumbers(state.lastName);

  return (
    <form onSubmit={handleSubmit}>
      <div className="shadow overflow-hidden sm:rounded-md">
        <div className="px-4 py-5 bg-white sm:p-6">
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                First name
              </label>
              <Input
                errors={[nameErrors(state.firstName, isFirstNameDirty)]}
                onBlur={() => setIsFirstNameDirty(true)}
                value={state.firstName || ""}
                onChange={handleChange}
                type="text"
                name="firstName"
                id="firstName"
                autoComplete="given-name"
              />
            </div>

            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                Last name
              </label>
              <Input
                errors={[nameErrors(state.lastName, isLastNameDirty)]}
                onBlur={() => setIsLastNameDirty(true)}
                value={state.lastName || ""}
                onChange={handleChange}
                type="text"
                name="lastName"
                id="lastName"
                autoComplete="family-name"
              />
            </div>

            <div className="col-span-10 sm:col-span-5">
              <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <Input
                readOnly
                value={state.email}
                type="text"
                name="email"
                id="email"
                autoComplete="email"
              />
            </div>
          </div>
        </div>
        {isCurrentUserUpdated() && (
          <div className="px-4 py-3 bg-white text-right sm:px-6">
            <Button isFullwidth={isTablet} disabled={!isFormValid} size="XL" type="submit">
              Update
            </Button>
          </div>
        )}
      </div>
    </form>
  );
};

export { UpdateCurrentUserForm };
