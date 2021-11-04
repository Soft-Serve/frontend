import { SIZE_MAP } from "./styles";

type Buttons = "button" | "submit" | "reset" | undefined;

type Sizes = keyof typeof SIZE_MAP;

export type { Buttons, Sizes };
