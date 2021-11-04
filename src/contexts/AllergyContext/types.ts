enum ACTION_TYPES {
  ADD = "add",
  REMOVE = "remove",
}

interface Allergy {
  __typename: string;
  id: number;
  name: string;
}

interface Action {
  type: ACTION_TYPES;
  payload: Allergy;
}

type Dispatch = (action: Action) => void;

export type { Action, Allergy, Dispatch };
export { ACTION_TYPES };
