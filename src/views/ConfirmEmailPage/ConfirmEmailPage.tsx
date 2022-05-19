import React from "react";
import type { FC } from "react";
import { FullLogoSVG } from "@svgs";
import { Link } from "react-router-dom";

const ConfirmEmailPage: FC = () => {
  return (
    <>
      <div className="min-h-full bg-white px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
        <div className="mx-auto max-w-max">
          <main className="sm:flex">
            <p className="text-4xl font-extrabold text-red-600 sm:text-5xl">
              <FullLogoSVG className="w-20 fill-current stroke-current text-red-400" />{" "}
            </p>
            <div className="sm:ml-6">
              <div className="sm:border-l sm:border-gray-200 sm:pl-6">
                <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
                  Email confirmation sent!
                </h1>
                <p className="mt-1 text-base text-gray-500">
                  Please check your email to confirm your SoftServe account.
                </p>
              </div>
              <div className="mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6">
                <Link
                  to="/"
                  className="inline-flex items-center rounded-md border border-transparent bg-red-400 px-4 py-2 text-lg font-medium text-white shadow-sm hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  Go back home
                </Link>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export { ConfirmEmailPage };
