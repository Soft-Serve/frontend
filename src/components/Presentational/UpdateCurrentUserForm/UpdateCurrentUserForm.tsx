import React, { useState, FormEvent } from "react";
import type { FC, ChangeEvent } from "react";
import { Button, Input } from "@base";

import { CURRENT_USER_QUERY } from "@shared";
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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setState(prevState => ({ ...prevState, [name]: value }));
  };

  const [updateCurrentUser] = useUpdateCurrentUser({
    update(cache, { data: updatedCurrentUserData }) {
      cache.writeQuery({
        query: CURRENT_USER_QUERY,
        data: {
          currentUser: { ...updatedCurrentUserData?.updatedUser },
        },
      });
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateCurrentUser({
      variables: {
        input: {
          first_name: state.firstName,
          last_name: state.lastName,
          email: state.email,
          __typename: "Mutation",
          id,
        },
      },
      optimisticResponse: {
        __typename: "Mutation",
        updatedUser: {
          first_name: state.firstName,
          last_name: state.lastName,
          email: state.email,
          __typename: "Mutation",
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
                value={state.firstName}
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
                value={state.lastName}
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
          <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <Button size="XL" type="submit">
              Update
            </Button>
          </div>
        )}
      </div>
    </form>
  );
};

export { UpdateCurrentUserForm };
