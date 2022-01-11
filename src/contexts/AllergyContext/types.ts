enum ActionTypes {
  ADD = "add",
  REMOVE = "remove",
}

interface Allergy {
  __typename: string;
  id: number;
  name: string;
}

interface Action {
  type: ActionTypes;
  payload: Allergy;
}

type Dispatch = (action: Action) => void;

export type { Action, Allergy, Dispatch };
export { ActionTypes };
