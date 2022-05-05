import {
  CheckCircleIcon,
  ExclamationIcon,
  InformationCircleIcon,
  XCircleIcon,
} from "@heroicons/react/solid";
import type { FC } from "react";
import { backgroundStyles, baseStyles, textStyles } from "./styles";

enum Styles {
  info = "info",
  success = "success",
  warning = "warning",
  error = "error",
}

export type StyleTypes = keyof typeof Styles;

interface Props {
  type: StyleTypes;
}

const warning = <ExclamationIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />;

const success = <CheckCircleIcon className="h-5 w-5 text-green-400" aria-hidden="true" />;

const info = <InformationCircleIcon className="h-5 w-5 text-blue-400" aria-hidden="true" />;

const error = <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />;

const svgs = {
  warning,
  success,
  info,
  error,
};

const Alert: FC<Props> = ({ type = "info", children }) => {
  return (
    <div className={`border-l-4 ${baseStyles[type]} ${backgroundStyles[type]} bg-yellow-50 p-4`}>
      <div className="flex">
        <div className="flex-shrink-0">{svgs[type]}</div>
        <div className={`ml-3 text-sm ${textStyles[type]}`}>{children}</div>
      </div>
    </div>
  );
};

export { Alert };
