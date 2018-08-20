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
import { setUser } from "../../screens/account/actions";
import { sendRequest } from "../../services/ApiService";

export const attemptLogin = (data, cb) => {
  return dispatch => {
    dispatch(
      setLoginAttemptingStatus({
        isAttemptingLogin: true
      })
    );

    return sendRequest({
      endpoint: "http://localhost:3333/api/v1/auth",
      method: "POST",
      payload: JSON.stringify(data)
    })
      .then(response => {
        if (typeof response !== "undefined" && typeof response !== null) {
          if (typeof response.user !== "undefined") {
            const { user, token } = response;
            let userData = {
              ...user,
              token
            };

            localStorage.setItem("user", JSON.stringify(userData));

            dispatch(
              setUser({
                user: userData
              })
            );

            dispatch(
              setLoginStatus({
                isLoggedIn: true
              })
            );

            dispatch(
              setLoginAttemptingStatus({
                isAttemptingLogin: false
              })
            );
          } else {
            setTimeout(() => {
              dispatch(
                setLoginAttemptingStatus({
                  isAttemptingLogin: false
                })
              );
            }, 1000);
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
    dispatch(
      setLoginStatus({
        isLoggedIn: false
      })
    );

    dispatch(
      setUser({
        user: null
      })
    );

    localStorage.removeItem("user");
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
