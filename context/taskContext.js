import React, { useContext, useReducer } from "react";
import reducer from "../reducers/taskReducer";
import axios from "axios";

const TaskContext = React.createContext();

const initialState = {
  data: [],
};

export const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setData = (data) => {
    dispatch({ type: "SET_DATA", payload: data });
  };

  return (
    <TaskContext.Provider value={{ ...state, setData }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  return useContext(TaskContext);
};
