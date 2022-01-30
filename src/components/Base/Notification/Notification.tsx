import type { FC } from "react";
import React from "react";
import { CheckCircleIcon } from "@heroicons/react/outline";
import { XIcon } from "@heroicons/react/solid";
import toast from "react-hot-toast";

interface Props {
  header: string;
  subHeader?: string;
}

const Notification: FC<Props> = ({ header, subHeader }) => {
  return (
    <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
      <div className="p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <CheckCircleIcon className="h-6 w-6 text-green-400" aria-hidden="true" />
          </div>
          <div className="ml-3 w-0 flex-1 pt-0.5">
            <p className="text-sm font-medium text-gray-900">{header}</p>
            <p className="mt-1 text-sm text-gray-500">{subHeader}</p>
          </div>
          <div className="ml-4 flex flex-shrink-0">
            <button
              onClick={() => toast.remove()}
              className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <span className="sr-only">Close</span>
              <XIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Notification };
