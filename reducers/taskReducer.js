const reducer = (state, action) => {
  if (action.type === "SET_DATA") {
    console.log(action.payload);
    return { ...state, tasks: action.payload };
  }
  if (action.type === "SET_EDIT_TASK") {
    return { ...state, editTask: action.payload };
  }
  if (action.type === "CHANGE_EDIT_TASK") {
    const { name, value } = action.payload;

    return { ...state, editTask: { ...state.editTask, [name]: value } };
  }
  if (action.type === "DELETE_EDIT_TASK") {
    return { ...state, editTask: null };
  }
  return { ...state };
};

export default reducer;
