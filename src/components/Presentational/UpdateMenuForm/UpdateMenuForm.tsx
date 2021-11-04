import { Button, Input } from "@base";
import React, { FormEvent, useState, ChangeEvent } from "react";
import type { FC } from "react";
import { MENUS_QUERY } from "@shared";
import type { MenusData, Menu } from "@shared";
import { XIcon } from "@heroicons/react/solid";
import { useGlobalContext } from "src/contexts";
import { isNameValid, isBasicNameValid, isNameOnlyNumbers, isNameInputValid } from "@utility";
import { useUpdateMenuMutation } from "./UpdateMenu.mutation";

interface Props {
  onCompleted?: (state: boolean) => void;
  selectedMenu?: Menu;
}

const UpdateMenuForm: FC<Props> = ({ onCompleted, selectedMenu }) => {
  const { restaurantSlug } = useGlobalContext();
  const [input, setInput] = useState(selectedMenu);
  const [isInputDirty, setIsInputDirty] = useState(false);

  const [updateMenu, { loading }] = useUpdateMenuMutation({
    onCompleted: () => onCompleted?.(false),
    update(cache, { data: updatedMenuData }) {
      const { menus: currentMenus } = cache.readQuery({
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
          menus: [
            ...currentMenus.map(menu =>
              menu.id === updatedMenuData?.updateMenu.id ? updatedMenuData?.updateMenu : menu
            ),
          ],
        },
      });
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input) {
      updateMenu({
        variables: {
          input,
        },
        optimisticResponse: {
          __typename: "Mutation",
          updateMenu: {
            ...input,
          },
        },
      });
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsInputDirty(false);
    setInput(prevState => {
      if (prevState) return { ...prevState, name: e.target.value };
      return undefined;
    });
  };

  const inputError = () => {
    if (input?.name) {
      if (!isInputDirty) return null;
      if (!isNameValid(input?.name)) return <span>Name is required</span>;
      if (!isBasicNameValid(input?.name)) return <span>Name not valid</span>;
      if (isNameOnlyNumbers(input?.name)) return <span>Name cannot only contain numbers</span>;
    }
    return null;
  };

  const isInputChanged = input?.name !== selectedMenu?.name;
  const isFormValid = input?.name && isNameInputValid(input.name) && isInputChanged;

  return (
    <div>
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-semibold text-gray-800 tracking-wider uppercase mr-4">
          Change Menu name
        </h3>
        <Button onClick={() => onCompleted?.(false)} size="S" colour="accent">
          <XIcon className="w-5 h-5" />
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="w-full">
        <Input
          onBlur={() => {
            setIsInputDirty(true);
          }}
          errors={[inputError()]}
          labelText="Menu name:"
          onChange={handleChange}
          value={input?.name}
          type="text"
          name="menu-name"
          id="menu-name"
          required
        />
        <div className="mt-3">
          <Button disabled={!isFormValid} loading={loading} isFullwidth size="XXL" type="submit">
            Update
          </Button>
        </div>
      </form>
    </div>
  );
};

export { UpdateMenuForm };
