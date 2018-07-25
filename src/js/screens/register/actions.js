import {
  isLoading,
  setMeta,
  setTitle,
  setUrl
} from "../../containers/app/actions";
import { getPageData } from "../../../../service/service";
import { SET_REGISTER } from "./constants";
import { SET_USER } from "../../containers/app/constants";
import { setLoginStatus } from "../../screens/login/actions";
import { sendRequest } from "../../services/ApiService";

export const attemptRegistration = data => {
  return dispatch => {
    sendRequest({
      endpoint: "http://localhost:3333/api/v1/users",
      method: "POST",
      payload: JSON.stringify(data)
    })
      .then(response => {
        if (typeof response !== "undefined" && typeof response !== null) {
          const { user, token } = response;
          let userData = {
            ...user,
            token
          };

          localStorage.setItem("user", JSON.stringify(userData));

          dispatch({
            type: SET_USER,
            data: {
              user: userData
            }
          });

          dispatch(
            setLoginStatus({
              isLoggedIn: true
            })
          );
        }
      })
      .catch(e => console.log(e));
  };
};

export const fetchRegister = data => {
  return dispatch => {
    dispatch(isLoading(true));

    return getPageData(data)
      .then(response => {
        dispatch(setMeta(response.meta));
        dispatch(setUrl(response.url));
        dispatch(setTitle(response.title));
        return response;
      })
      .then(response => {
        dispatch(isLoading(false));
        dispatch(loadRegister(response));
      })
      .catch(error => {
        console.error(error);
        throw error;
      });
  };
};

const loadRegister = data => {
  return {
    type: SET_REGISTER,
    data
  };
};
