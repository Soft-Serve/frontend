import React, { FormEvent, useState, ChangeEvent } from "react";
import type { FC } from "react";
import toast from "react-hot-toast";
import { Button, Input, Notification } from "@base";
import { MENUS_QUERY } from "@shared";
import type { MenusData, Menu } from "@shared";
import { XIcon } from "@heroicons/react/solid";
import { isNameValid, isNameOnlyNumbers, isNameInputValid, hasBeginningWhiteSpace } from "@utility";
import { useUpdateMenuMutation } from "./UpdateMenu.mutation";

interface Props {
  onCompleted?: (state: boolean) => void;
  selectedMenu?: Menu;
  themeColour: string;
  themeTint: number;
  restaurantSlug: string;
}

const UpdateMenuForm: FC<Props> = ({
  onCompleted,
  selectedMenu,
  themeTint,
  themeColour,
  restaurantSlug,
}) => {
  const [input, setInput] = useState(selectedMenu);
  const [isInputDirty, setIsInputDirty] = useState(false);
  const onSuccess = () => toast.custom(<Notification header="Menu succesfully updated!" />);

  const [updateMenu, { loading }] = useUpdateMenuMutation({
    onCompleted: () => {
      onCompleted?.(false);
      onSuccess();
    },
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
    if (isInputDirty && !input?.name) return <span>Name is required</span>;
    if (input?.name) {
      if (!isInputDirty) return null;
      if (!isNameValid(input.name)) return <span>Name is required</span>;
      if (isNameOnlyNumbers(input.name)) return <span>Name cannot only contain numbers</span>;
      if (hasBeginningWhiteSpace(input.name)) {
        return <span>Name cannot begin with white space</span>;
      }
    }
    return null;
  };

  const isInputChanged = input?.name !== selectedMenu?.name;
  const isFormValid =
    input?.name &&
    isNameInputValid(input.name) &&
    !hasBeginningWhiteSpace(input.name) &&
    isInputChanged;

  return (
    <div>
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mr-4 font-Quicksand">
          Update Menu name
        </h3>
        <Button
          themeColour={themeColour}
          themeTint={themeTint}
          onClick={() => onCompleted?.(false)}
          size="S"
        >
          <XIcon className="w-5 h-5" />
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="w-full my-8">
        <Input
          themeColour={themeColour}
          themeTint={themeTint}
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
        <div className="mt-8">
          <Button
            themeColour={themeColour}
            themeTint={themeTint}
            disabled={!isFormValid}
            loading={loading}
            isFullwidth
            size="XXL"
            type="submit"
          >
            Update
          </Button>
        </div>
      </form>
    </div>
  );
};

export { UpdateMenuForm };
