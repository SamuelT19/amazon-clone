import React, { createContext, useContext, useReducer } from "react";

const initializerArg = {
  basket: [],
  user: null,
};
export const ACTIONS = {
  ADD_TO_BASKET: "add-to-basket",
  SET_BASKET: "set-basket",
  SET_USER: "set-user",
  EMPTY_BASKET: "empty-basket"
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD_TO_BASKET:
      return { ...state, basket: [...state.basket, action.item] };

    case ACTIONS.SET_BASKET:
      return { ...state, basket: action.basket };
    case ACTIONS.SET_USER:
      return {
        ...state,
        user: action.userRes,
      };
    case ACTIONS.EMPTY_BASKET:
      return {
        ...state,
        basket: []
      }
    default:
      return state;
  }
}
const reducerContext = createContext();

export const contextData = () => useContext(reducerContext);

function DataProvider({ children }) {
  return (
    <reducerContext.Provider value={useReducer(reducer, initializerArg)}>
      {children}
    </reducerContext.Provider>
  );
}

export default DataProvider;
