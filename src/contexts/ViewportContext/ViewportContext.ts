import { createContext } from "react";

interface ViewportContextData {
  width: number;
  height: number;
}
const ViewportContext = createContext<ViewportContextData | null>(null);

export { ViewportContext };
export type { ViewportContextData };
