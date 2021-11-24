const reducer = (state, action) => {
  if (action.type === "SET_DATA") {
    console.log(action.payload);
    return { ...state, data: action.payload };
  }
  return { ...state };
};

export default reducer;
