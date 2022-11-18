import { useState, useEffect } from "react";

export const breakpointsMap = {
  extraSmall: {
    min: 420,
    max: 640,
  },
  small: {
    min: 640,
    max: 768,
  },
  medium: {
    min: 768,
    max: 1024,
  },
  large: {
    min: 1024,
    max: 1280,
  },
  extraLarge: {
    min: 1280,
    max: 1536,
  },
};

type BreakPointMap = Record<BreakPoint, BreakPointData>;

type BreakPoint = keyof typeof breakpointsMap;

interface BreakPointData {
  greaterThan: boolean;
  lessThan: boolean;
}

// breakpoints based on https://tailwindcss.com/docs/screens

const breakpointLessThan = (width: number, breakpoint: BreakPoint) =>
  width < breakpointsMap[breakpoint].min;

const breakpointGreaterThan = (width: number, breakpoint: BreakPoint) =>
  width > breakpointsMap[breakpoint].max;

const getBreakpoint = (width: number, breakpoint: BreakPoint) => ({
  greaterThan: breakpointGreaterThan(width, breakpoint),
  lessThan: breakpointLessThan(width, breakpoint),
});

const useTailwindBreakpoints = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleWindowResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  const breakpoints = Object.keys(breakpointsMap).reduce((map: any, breakpoint: any) => {
    map[breakpoint] = getBreakpoint(width, breakpoint);
    return map;
  }, {});

  return { ...(breakpoints as BreakPointMap) };
};

export { useTailwindBreakpoints };
