import React, { createContext, useReducer, useContext } from "react";
import Reducer, { authDataInitialState } from "./reducers/authData";

type AppProps = { children: React.ReactChild };

type InitialStateTypes = {
  auth: { state: typeof authDataInitialState; dispatch?: any };
};

type StateType = keyof InitialStateTypes;
const initialStates: InitialStateTypes = {
  auth: { state: authDataInitialState },
};

const Context = createContext(initialStates);

export const useStateContext = (
  state: StateType
): InitialStateTypes[StateType] => useContext(Context)[state];

const Store = ({ children }: AppProps) => {
  const [authState, dispatchAuthState] = useReducer(
    Reducer,
    authDataInitialState
  );

  return (
    <Context.Provider
      value={{ auth: { state: authState, dispatch: dispatchAuthState } }}
    >
      {children}
    </Context.Provider>
  );
};

export default Store;
