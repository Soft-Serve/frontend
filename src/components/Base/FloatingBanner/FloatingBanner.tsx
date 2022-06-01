import React, { ReactNode, useState } from "react";
import type { FC } from "react";
import { SpeakerphoneIcon, XIcon } from "@heroicons/react/solid";
import { Button, ThemeFonts } from "@base";

interface Props {
  themeColour: string;
  themeFont: ThemeFonts;
  themeTint: number;
  children: ReactNode;
}

const FloatingBanner: FC<Props> = ({ themeColour, themeFont, themeTint, children }) => {
  const [isVisible, setIsVisible] = useState(true);
  if (isVisible)
    return (
      <div className="fixed inset-x-0 bottom-0 z-50 pb-2 sm:pb-5">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div
            className={`rounded-lg bg-${themeColour}-${
              themeTint === 900 ? themeTint : themeTint + 100
            } p-2 shadow-lg sm:p-3`}
          >
            <div className="flex flex-wrap items-center justify-between">
              <div className={`flex w-0 flex-1 items-center font-${themeFont} text-white`}>
                <span
                  className={`flex rounded-lg bg-${themeColour}-${
                    themeTint === 900 ? themeTint : themeTint + 100
                  } mr-2 p-2`}
                >
                  <SpeakerphoneIcon className="h-6 w-6 text-white" aria-hidden="true" />
                </span>
                {children}
              </div>
              <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-2">
                <Button
                  colour="naked"
                  onClick={() => setIsVisible(false)}
                  themeTint={themeTint}
                  themeColour={themeColour}
                >
                  <span className="sr-only">Dismiss</span>
                  <XIcon
                    className={`h-6 w-6 text-${themeColour}-${themeTint}`}
                    aria-hidden="true"
                  />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  return null;
};

export { FloatingBanner };
