import { Button, Input } from "@base";
import React, { FormEvent, useState } from "react";
import type { FC } from "react";
import { MENUS_QUERY } from "@shared";
import type { MenusData } from "@shared";
import { XIcon } from "@heroicons/react/solid";
import { useRestaurantContext } from "src/contexts";
import { isNameValid, isBasicNameValid, isNameOnlyNumbers, isNameInputValid } from "@utility";
import { usePostMenuMutation } from "./PostMenu.mutation";

interface Props {
  onCompleted?: (state: boolean) => void;
  restaurantID: number;
}

const PostMenuForm: FC<Props> = ({ onCompleted, restaurantID }) => {
  const { restaurantSlug } = useRestaurantContext();
  const [isInputDirty, setIsInputDirty] = useState(false);

  const [input, setInput] = useState({
    name: "",
    __typename: "Mutation",
    id: 0,
    restaurant_id: restaurantID,
  });

  const [postMenu, { loading }] = usePostMenuMutation({
    onCompleted: () => onCompleted?.(false),
    update(cache, { data: newPostMenuData }) {
      const { menus } = cache.readQuery({
        query: MENUS_QUERY,
        variables: {
          restaurantSlug,
        },
      }) as MenusData;
      cache.writeQuery({
        query: MENUS_QUERY,
        variables: {
          restaurantSlug,
        },
        data: {
          menus: [...menus, newPostMenuData?.postMenu],
        },
      });
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    postMenu({
      variables: {
        input,
      },
      optimisticResponse: {
        __typename: "Mutation",
        postMenu: {
          ...input,
        },
      },
    });
    setInput(prevInput => ({ ...prevInput, name: "" }));
  };

  const inputError = () => {
    const { name } = input;
    if (!isInputDirty) return null;
    if (!isNameValid(name)) return <span>Name is required</span>;
    if (!isBasicNameValid(name)) return <span>Name not valid</span>;
    if (isNameOnlyNumbers(name)) return <span>Name cannot only contain numbers</span>;
    return null;
  };

  const isFormValid = isNameInputValid(input.name);

  return (
    <div>
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mr-4">
          add new menu
        </h3>
        <Button onClick={() => onCompleted?.(false)} size="S" colour="accent">
          <XIcon className="w-5 h-5" />
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="mt-4 flex flex-col w-full">
        <Input
          errors={[inputError()]}
          onBlur={() => {
            if (input.name) {
              setIsInputDirty(true);
            }
          }}
          labelText="Menu name"
          onChange={e => {
            setInput({ ...input, name: e.target.value });
          }}
          value={input.name}
          type="text"
          name="menu-name"
          id="menu-name"
          required
        />
        <div className="my-2">
          <Button disabled={!isFormValid} loading={loading} isFullwidth size="XXL" type="submit">
            Add Menu
          </Button>
        </div>
      </form>
    </div>
  );
};

export { PostMenuForm };
