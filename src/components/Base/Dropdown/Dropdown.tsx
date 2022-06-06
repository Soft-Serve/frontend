import type { FC, ReactNode } from "react";
import React, { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/solid";
import { buildStyles } from "./styles";

interface Props {
  showCheckmark?: boolean;
  onChange: any;
  value: any;
  data: any;
  defaultValue?: string;
  errors?: ReactNode[];
  required?: boolean;
  label?: string;
  themeColour: string;
  themeTint: number;
}
const Dropdown: FC<Props> = ({
  showCheckmark = true,
  onChange,
  value,
  data,
  defaultValue,
  errors,
  label,
  required,
  themeColour,
  themeTint,
}) => {
  const hasErrors = () => {
    if (!errors) return false;
    return errors.filter(e => !!e).length > 0;
  };

  const renderErrorMessages = () => {
    return errors?.slice(0, 2).map(error => <p key={`error-item-${error}`}>{error}</p>);
  };
  return (
    <div className="flex flex-col font-Quicksand ">
      <Listbox value={value} onChange={onChange}>
        {({ open }) => (
          <>
            <Listbox.Label className="sr-only">
              {label || value ? value?.name : defaultValue}
            </Listbox.Label>
            {label && (
              <Listbox.Label className=" mb-2 text-sm font-bold text-gray-700">
                {label} {required && <span className="text-red-600">*</span>}
              </Listbox.Label>
            )}

            <div className="relative">
              <div
                className={`inline-flex divide-x rounded-md shadow-sm divide-${themeColour}-${themeTint}`}
              >
                <div
                  className={`relative z-0 inline-flex divide-x rounded-md shadow-sm divide-${themeColour}-${themeTint}`}
                >
                  <Listbox.Button
                    className={`relative inline-flex items-center border-2 border-r-0 bg-white py-2 pl-3 pr-4  border-${themeColour}-${themeTint} rounded-l-md shadow-sm text-${themeColour}-${themeTint} focus:outline-none`}
                  >
                    {showCheckmark && <CheckIcon className="h-5 w-5" aria-hidden="true" />}
                    <p className="ml-2.5 text-sm font-bold">{value ? value?.name : defaultValue}</p>
                  </Listbox.Button>
                  <Listbox.Button
                    className={`relative inline-flex items-center bg-${themeColour}-${themeTint} rounded-l-none rounded-r-md p-2 text-sm font-medium text-${themeColour}-${themeTint} hover:bg-${themeColour}-${
                      themeTint + 100
                    } focus:z-10 focus:outline-none`}
                  >
                    <span className="sr-only"> {value ? value?.name : defaultValue}</span>
                    <ChevronDownIcon className="h-5 w-5 text-white" aria-hidden="true" />
                  </Listbox.Button>
                </div>
              </div>

              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options
                  static
                  className="absolute z-50 mt-2 w-auto divide-y divide-gray-200 overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 selection:origin-top-left focus:outline-none"
                >
                  {data?.map((option: any) => (
                    <Listbox.Option
                      key={option.id}
                      className={({ active }) => buildStyles(active, themeColour, themeTint)}
                      value={option}
                    >
                      {({ selected, active }) => (
                        <div className="flex flex-col">
                          <div className="flex justify-between">
                            <p className={selected ? "font-bold" : "font-normal"}>{option.name}</p>
                            {selected ? (
                              <span
                                className={
                                  active ? "text-white" : `text-${themeColour}-${themeTint}`
                                }
                              >
                                <CheckIcon className="ml-2 h-5 w-5" aria-hidden="true" />
                              </span>
                            ) : null}
                          </div>
                        </div>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
      {hasErrors() && (
        <div
          className="mt-2 rounded-md bg-red-600 p-2 text-center text-sm font-bold text-white"
          id="email-error"
        >
          {renderErrorMessages()}
        </div>
      )}
    </div>
  );
};

export { Dropdown };
