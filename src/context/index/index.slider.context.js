import React, { useState, createContext, useContext } from "react";

export const SliderContext = createContext();

export default function SliderProvider({ children }) {
  const initialState = {
    slideIndex: 0,
  };

  const [state, dispatch] = React.useReducer(() => slidesReducer, initialState);

  const slidesReducer = (state, event) => {
    if (event.type === "NEXT") {
      return {
        ...state,
        slideIndex: (state.slideIndex + 1) % slides.length,
      };
    }
    if (event.type === "PREV") {
      return {
        ...state,
        slideIndex:
          state.slideIndex === 0 ? slides.length - 1 : state.slideIndex - 1,
      };
    }
  };

  return (
    <SliderContext.Provider value={{ state, dispatch }}>
      {children}
    </SliderContext.Provider>
  );
}
