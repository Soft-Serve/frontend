import type { FC, ReactNode } from "react";
import React, { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/solid";
import { buildStyles } from "./styles";

interface Props {
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
    <div className="flex flex-col">
      <Listbox value={value} onChange={onChange}>
        {({ open }) => (
          <>
            <Listbox.Label className="sr-only">
              {label || value ? value?.name : defaultValue}
            </Listbox.Label>
            {label && (
              <Listbox.Label className=" text-sm font-medium text-gray-700 mb-2">
                {label} {required && <span className="text-red-600">*</span>}
              </Listbox.Label>
            )}

            <div className="relative">
              <div
                className={`inline-flex shadow-sm rounded-md divide-x divide-${themeColour}-${themeTint}`}
              >
                <div
                  className={`relative z-0 inline-flex shadow-sm rounded-md divide-x divide-${themeColour}-${themeTint}`}
                >
                  <Listbox.Button
                    className={`relative inline-flex items-center bg-white border-2 py-2 pl-3 pr-4  border-${themeColour}-${themeTint} rounded-l-md shadow-sm text-${themeColour}-${themeTint} focus:outline-none`}
                  >
                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                    <p className="ml-2.5 text-sm font-medium">
                      {value ? value?.name : defaultValue}
                    </p>
                  </Listbox.Button>
                  <Listbox.Button
                    className={`relative inline-flex items-center bg-${themeColour}-${themeTint} p-2 rounded-l-none rounded-r-md text-sm font-medium text-${themeColour}-${themeTint} hover:bg-${themeColour}-${
                      themeTint + 100
                    } focus:outline-none focus:z-10`}
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
                  className="origin-top-right absolute z-10 right-0 mt-2 w-72 rounded-md shadow-lg overflow-hidden bg-white divide-y divide-gray-200 ring-1 ring-black ring-opacity-5 focus:outline-none"
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
                            <p className={selected ? "font-semibold" : "font-normal"}>
                              {option.name}
                            </p>
                            {selected ? (
                              <span
                                className={
                                  active ? "text-white" : `text-${themeColour}-${themeTint}`
                                }
                              >
                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
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
          className="mt-2 text-sm text-white font-bold p-2 text-center bg-red-600 rounded-md"
          id="email-error"
        >
          {renderErrorMessages()}
        </div>
      )}
    </div>
  );
};

export { Dropdown };
