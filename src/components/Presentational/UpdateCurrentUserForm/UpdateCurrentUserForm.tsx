import React, { useState, FormEvent } from "react";
import type { FC, ChangeEvent } from "react";
import { Button, Input, Notification } from "@base";
import toast from "react-hot-toast";

import { CURRENT_USER_QUERY } from "@shared";
import { useViewport } from "@hooks";
import { isNameOnlyNumbers, isNameValid } from "@utility";
import { useUpdateCurrentUser } from "./UpdateCurrentUser.mutation";
import { Box } from "@interface";

interface Props {
  firstName: string;
  lastName: string;
  email: string;
  id: number;
  themeColour: string;
  themeTint: number;
}

type StateMap = {
  [key: string]: string;
};

const UpdateCurrentUserForm: FC<Props> = ({
  firstName,
  lastName,
  email,
  id,
  themeTint,
  themeColour,
}) => {
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
      <Box>
        <div className="grid grid-cols-6 gap-6">
          <div className="col-span-6 sm:col-span-3">
            <Input
              themeColour={themeColour}
              themeTint={themeTint}
              labelText="First name"
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
            <Input
              themeColour={themeColour}
              themeTint={themeTint}
              labelText="Last name"
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
            <Input
              disabled
              themeColour={themeColour}
              themeTint={themeTint}
              labelText="Email"
              readOnly
              value={state.email}
              type="text"
              name="email"
              id="email"
              autoComplete="email"
            />
          </div>
        </div>
        {isCurrentUserUpdated() && (
          <div className="bg-white px-4 py-3 text-right sm:px-6">
            <Button
              themeColour={themeColour}
              themeTint={themeTint}
              isFullwidth={isTablet}
              disabled={!isFormValid}
              size="XL"
              type="submit"
            >
              Update
            </Button>
          </div>
        )}
      </Box>
    </form>
  );
};

export { UpdateCurrentUserForm };
