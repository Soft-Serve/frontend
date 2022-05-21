import React from "react";
import { FC, Dispatch, Fragment, SetStateAction } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/solid";
import { MultiSelectButton } from "./MultiSelectButton";

interface Props {
  options: Array<any>;
  values: Array<any>;
  onChange: Dispatch<SetStateAction<any[]>>;
  label: string;
}

const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(" ");
};

const MultiSelect: FC<Props> = ({ values, onChange, label, options }) => {
  return (
    <Listbox value={values} onChange={onChange} multiple>
      {({ open }) => (
        <>
          <Listbox.Label className="block text-sm font-medium text-gray-700">{label}</Listbox.Label>
          <div className="relative mt-1">
            <MultiSelectButton> {values.map(value => value.name).join(", ")}</MultiSelectButton>
            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {options.map(value => (
                  <Listbox.Option
                    key={value.id}
                    className={({ active }) =>
                      classNames(
                        active ? "bg-indigo-600 text-white" : "text-gray-900",
                        "relative cursor-default select-none py-2 pl-3 pr-9"
                      )
                    }
                    value={value}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={classNames(
                            selected ? "font-semibold" : "font-normal",
                            "block truncate"
                          )}
                        >
                          {value.name}
                        </span>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? "text-white" : "text-indigo-600",
                              "absolute inset-y-0 right-0 flex items-center pr-4"
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
};

export { MultiSelect };
