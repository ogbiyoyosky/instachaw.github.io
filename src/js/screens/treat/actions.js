import {
  TREATS_ENDPOINT,
  SET_ACTIVE_TREAT,
  SET_TITLE,
  SET_TREAT_PAGE,
  SET_TREATS,
  SET_CURRENT_TREATS_PAGE,
  SET_TREATS_COUNT,
  SET_TREATS_LOADING_STATUS,
  SET_TREAT
} from "./constants";

import {
  isLoading,
  setMeta,
  setTitle,
  setUrl
} from "../../containers/app/actions";

import { getTreatsData, getPageData } from "../../../../service/service";
import { sendRequest } from "../../services/ApiService";

const HOST_URL =
  window.location.origin === "https://instachaw.com"
    ? "https://api.instachaw.com"
    : "http://localhost:3333";

const fetchTreats = data => {
  let endpoint = TREATS_ENDPOINT;

  setTreatsLoadingStatus({
    isLoadingTreats: true
  });

  return dispatch => {
    let endpointSuffix = data.id ? data.id : `?page=${data.page}`;
    let endpoint = `api/v1/items/${endpointSuffix}`;
    sendRequest({
      endpoint: `${HOST_URL}/${endpoint}`,
      method: "GET"
    })
      .then(response => {
        if (typeof response !== "undefined" && typeof response !== null) {
          if (data.id) {
            dispatch(setTreat(response));
            dispatch(setTreatTitle(response.title));
            dispatch({
              type: SET_ACTIVE_TREAT,
              data: {
                treat: response
              }
            });
          } else {
            dispatch(
              setTreats(
                data.activeTreat
                  ? response.items.filter(
                      item => item.id !== data.activeTreat.id
                    )
                  : response.items
              )
            );
            dispatch(
              setTreatsCount({
                treatsCount: response.itemsCount
              })
            );
            dispatch(
              setCurrentTreatsPage({
                currentTreatPage: data.page + 1
              })
            );
          }
          dispatch(
            setTreatsLoadingStatus({
              isLoadingTreats: false
            })
          );
        }
      })
      .catch(e => console.log(e));
  };
};

const setActiveTreat = (data, endpoint = TREATS_ENDPOINT) => {
  return dispatch => {
    let id = parseInt(data.id, 10);
    let treat = data.treats.filter(treat => treat.id === id)[0];
    dispatch(setTreatTitle("Treat"));

    if (!treat) {
      dispatch(fetchTreats({ id }));
    } else {
      dispatch(setTreatTitle(treat.title));
      dispatch({
        type: SET_ACTIVE_TREAT,
        data: {
          treat
        }
      });
    }
  };
};

const setCurrentTreatsPage = data => {
  return {
    type: SET_CURRENT_TREATS_PAGE,
    data
  };
};

const setTreatsCount = data => {
  return {
    type: SET_TREATS_COUNT,
    data
  };
};

const setTreatsLoadingStatus = data => {
  return {
    type: SET_TREATS_LOADING_STATUS,
    data
  };
};

const setTreat = data => {
  return {
    type: SET_TREAT,
    data
  };
};

const setTreats = data => {
  return {
    type: SET_TREATS,
    data
  };
};

const setTreatTitle = title => {
  return dispatch => {
    dispatch(
      setMeta({
        title
      })
    );
    dispatch(setTitle(title));
  };
};

const loadTreat = data => {
  return {
    type: SET_TREAT_PAGE,
    data
  };
};

const onLoadTreat = data => {
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
        dispatch(loadTreat(response));
      })
      .catch(error => {
        console.error(error);
        throw error;
      });
  };
};

export {
  fetchTreats,
  setTreatTitle,
  setTreats,
  setTreatsLoadingStatus,
  onLoadTreat,
  setActiveTreat
};
