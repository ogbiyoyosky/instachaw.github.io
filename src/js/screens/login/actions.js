import {
  isLoading,
  setMeta,
  setTitle,
  setUrl
} from "../../containers/app/actions";
import { getPageData } from "../../../../service/service";
import {
  SET_LOGIN,
  SET_LOGIN_ATTEMPTING_STATUS,
  SET_LOGGED_IN_STATUS
} from "./constants";
import { SET_USER } from "../../screens/account/constants";
import { sendRequest } from "../../services/ApiService";

export const attemptLogin = (data, cb) => {
  return dispatch => {
    return sendRequest({
      endpoint: "http://localhost:3333/api/v1/auth",
      method: "POST",
      payload: JSON.stringify(data)
    })
      .then(response => {
        dispatch(
          setLoginAttemptingStatus({
            isAttemptingLogin: true
          })
        );

        if (typeof response !== "undefined" && typeof response !== null) {
          if (response.user && response.user.length) {
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
          } else {
            setTimeout(() => {
              dispatch(
                setLoginAttemptingStatus({
                  isAttemptingLogin: false
                })
              );
            }, 500);
          }
        } else {
          setTimeout(() => {
            dispatch(
              setLoginAttemptingStatus({
                isAttemptingLogin: false
              })
            );
          }, 1000);
        }

        return cb(response);
      })
      .catch(e => console.log(e));
  };
};

export const attemptLogout = () => {
  return dispatch => {
    localStorage.removeItem("user");

    dispatch(
      setLoginStatus({
        isLoggedIn: false
      })
    );
  };
};

export const fetchLogin = data => {
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
        dispatch(loadLogin(response));
      })
      .catch(error => {
        console.error(error);
        throw error;
      });
  };
};

export const setLoginAttemptingStatus = data => {
  return {
    type: SET_LOGIN_ATTEMPTING_STATUS,
    data
  };
};

export const setLoginStatus = data => {
  return {
    type: SET_LOGGED_IN_STATUS,
    data
  };
};

const loadLogin = data => {
  return {
    type: SET_LOGIN,
    data
  };
};
