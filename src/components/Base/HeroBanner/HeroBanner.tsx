import React from "react";
import type { FC } from "react";
import { useRestaurantContext } from "src/contexts";

const HeroBanner: FC = () => {
  const { themeColour } = useRestaurantContext();
  return (
    <div className="w-full">
      <div className="relative w-full">
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gray-100 w-full" />
        <div className=" w-full mx-auto">
          <div className="relative  sm:overflow-hidden">
            <div className="absolute inset-0">
              <img
                className="h-full w-full object-cover"
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80"
                alt="People working on laptops"
              />
              <div className={`absolute inset-0 bg-${themeColour}-200 mix-blend-multiply`} />
            </div>
            <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
              <h1 className="text-center text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                <span className="block text-white">Oliver and Bonacini</span>
                <span className="block text-white">Bayview Village</span>
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { HeroBanner };
