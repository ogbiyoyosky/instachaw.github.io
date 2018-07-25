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
  SET_RECOVERY_EMAIL,
  SET_RECOVERY_NOTICE
} from "./constants";
import { sendRequest } from "../../services/ApiService";

export const attemptPasswordReset = data => {
  return dispatch => {
    sendRequest({
      endpoint: "http://localhost:3333/api/v1/auth/forgotPassword",
      method: "POST",
      payload: JSON.stringify(data)
    })
      .then(response => {
        if (typeof response.messages !== "undefined") {
          dispatch(
            setRecoveryNotice({
              notice: response.messages[0].message
            })
          );
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
