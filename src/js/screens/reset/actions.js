import {
  isLoading,
  setMeta,
  setTitle,
  setUrl
} from "../../containers/app/actions";
import { getPageData } from "../../../../service/service";
import {
  SET_RESET,
  SET_RESET_MODAL_STATUS,
  SET_RESET_ATTEMPTING_STATUS,
  SET_RECOVERY_EMAIL,
  SET_RECOVERY_NOTICE
} from "./constants";
import { sendRequest } from "../../services/ApiService";

const HOST_URL =
  window.location.origin === "https://instachaw.com"
    ? "https://api.instachaw.com"
    : "http://localhost:3333";

export const attemptPasswordReset = data => {
  const endpoint = `api/v1/auth/forgotPassword`;
  return dispatch => {
    dispatch(
      setResetAttemptingStatus({
        isAttemptingReset: true
      })
    );
    sendRequest({
      endpoint: `${HOST_URL}/${endpoint}`,
      method: "POST",
      payload: JSON.stringify(data)
    })
      .then(response => {
        if (typeof response !== "undefined") {
          if (typeof response.messages !== "undefined") {
            dispatch(
              setRecoveryNotice({
                notice: response.messages[0].message
              })
            );
            setTimeout(() => {
              dispatch(
                setResetAttemptingStatus({
                  isAttemptingReset: false
                })
              );
            }, 1000);
          }

          if (typeof response.data !== "undefined") {
            dispatch(
              setRecoveryEmail({
                email: response.data.user[0].email
              })
            );

            dispatch(
              setResetModalStatus({
                isResetStatusModalOpen: true
              })
            );
          }
        } else {
          setTimeout(() => {
            dispatch(
              setResetAttemptingStatus({
                isAttemptingReset: false
              })
            );
          }, 1000);
        }
      })
      .catch(e => console.log(e));
  };
};

export const attemptPasswordUpdate = (data, token) => {
  const endpoint = `api/v1/auth/updatePassword/?tkn=${token}`;
  return dispatch => {
    dispatch(
      setResetAttemptingStatus({
        isAttemptingReset: true
      })
    );
    sendRequest({
      endpoint: `${HOST_URL}/${endpoint}`,
      method: "POST",
      payload: JSON.stringify(data)
    })
      .then(response => {
        if (typeof response !== "undefined") {
          if (typeof response.messages !== "undefined") {
            dispatch(
              setRecoveryNotice({
                notice: response.messages[0].message
              })
            );
            setTimeout(() => {
              dispatch(
                setResetAttemptingStatus({
                  isAttemptingReset: false
                })
              );
            }, 1000);
          }

          if (typeof response.data !== "undefined") {
            dispatch(
              setResetModalStatus({
                isResetStatusModalOpen: true
              })
            );
          }
        } else {
          setTimeout(() => {
            dispatch(
              setResetAttemptingStatus({
                isAttemptingReset: false
              })
            );
          }, 1000);
        }
      })
      .catch(e => console.log(e));
  };
};

export const fetchReset = data => {
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
        dispatch(loadReset(response));
      })
      .catch(error => {
        console.error(error);
        throw error;
      });
  };
};

const loadReset = data => {
  return {
    type: SET_RESET,
    data
  };
};

const setResetModalStatus = data => {
  return {
    type: SET_RESET_MODAL_STATUS,
    data
  };
};

const setResetAttemptingStatus = data => {
  return {
    type: SET_RESET_ATTEMPTING_STATUS,
    data
  };
};

const setRecoveryEmail = data => {
  return {
    type: SET_RECOVERY_EMAIL,
    data
  };
};

const setRecoveryNotice = data => {
  return {
    type: SET_RECOVERY_NOTICE,
    data
  };
};
