import React, { createContext, useReducer, useContext, useState } from "react";
import { cartReducer } from "./Reducer";

export const cartContext = createContext();

const Context = ({ children }) => {
  const [cartState, dispatch] = useReducer(cartReducer, []);

  return (
    <cartContext.Provider value={{ cartState, dispatch }}>
      {children}
    </cartContext.Provider>
  );
};

export default Context;
