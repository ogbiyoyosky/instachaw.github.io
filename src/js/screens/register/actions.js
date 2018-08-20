import {
  isLoading,
  setMeta,
  setTitle,
  setUrl
} from "../../containers/app/actions";
import { getPageData } from "../../../../service/service";
import { SET_REGISTER, SET_REGISTRATION_ATTEMPTING_STATUS } from "./constants";
import { setUser } from "../../screens/account/actions";
import { setLoginStatus } from "../../screens/login/actions";
import { sendRequest } from "../../services/ApiService";

const HOST_URL =
  window.location.origin === "https://instachaw.com"
    ? "https://api.instachaw.com"
    : "http://localhost:3333";

export const attemptRegistration = (data, cb) => {
  return dispatch => {
    let endpoint = `api/v1/users`;
    dispatch(
      setRegistrationAttemptingStatus({
        isAttemptingRegistration: true
      })
    );

    return sendRequest({
      endpoint: `${HOST_URL}/${endpoint}`,
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

            dispatch(
              setUser({
                user: userData
              })
            );

            localStorage.setItem("user", JSON.stringify(userData));

            dispatch(
              setLoginStatus({
                isLoggedIn: true
              })
            );

            dispatch(
              setRegistrationAttemptingStatus({
                isAttemptingRegistration: false
              })
            );
          } else {
            setTimeout(() => {
              dispatch(
                setRegistrationAttemptingStatus({
                  isAttemptingRegistration: false
                })
              );
            }, 1000);
          }
        } else {
          setTimeout(() => {
            dispatch(
              setRegistrationAttemptingStatus({
                isAttemptingRegistration: false
              })
            );
          }, 1000);
        }

        return cb(response);
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

export const setRegistrationAttemptingStatus = data => {
  return {
    type: SET_REGISTRATION_ATTEMPTING_STATUS,
    data
  };
};

const loadRegister = data => {
  return {
    type: SET_REGISTER,
    data
  };
};
