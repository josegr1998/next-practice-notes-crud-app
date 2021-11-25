import React, { useContext, useReducer } from "react";
import reducer from "../reducers/taskReducer";
import axios from "axios";

const TaskContext = React.createContext();

const initialState = {
  tasks: [],
  editTask: null,
};

export const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setData = (data) => {
    dispatch({ type: "SET_DATA", payload: data });
  };

  const setEditTask = (value) => {
    dispatch({ type: "SET_EDIT_TASK", payload: value });
  };

  const changeEditTask = (name, value) => {
    dispatch({ type: "CHANGE_EDIT_TASK", payload: { name, value } });
  };

  const deleteEditTask = () => {
    dispatch({ type: "DELETE_EDIT_TASK" });
  };

  return (
    <TaskContext.Provider
      value={{ ...state, setData, setEditTask, changeEditTask, deleteEditTask }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  return useContext(TaskContext);
};
