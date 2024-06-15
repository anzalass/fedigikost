export const loadUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoadUserRequest",
    });
    let parseData = null;
    const data = localStorage.getItem("user");

    if (data) {
      parseData = JSON.parse(data);
      dispatch({
        type: "LoadUserSuccess",
        payload: parseData,
      });
    } else {
      dispatch({
        type: "LoadUserFail",
        payload: "data is null",
      });
    }
  } catch (error) {
    dispatch({
      type: "LoadUserFail",
      payload: error,
    });
  }
};

// actions/user.js
export const logoutUser = () => (dispatch) => {
  dispatch({
    type: "LogoutUser",
  });
};
