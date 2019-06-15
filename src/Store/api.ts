import { Dispatch } from 'redux';
import StoreEndpoints from './Store/endpoints';

/**
 * Resolves or rejects a Promise for an issued response status code.
 * 
 * @param {Object} response
 * @return {Object<Promise>}
 */
function checkStatus (response: { status:number }) {
  if (response.status >= 200 && response.status < 401) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(response);
  }
}

/**
 * Handles request errors.
 * 
 * @param {Dispatch} dispatch - Dispatch callback function
 * @param {Object} error      - Error object.
 * 
 * @return {Object<Promise>}
 */
function errorHandler (dispatch:Dispatch, error:any) {
  console.log('Sorry, we had an error.', error);
}

/**
 * Parses the response body to a JSON object.
 * 
 * @param {Object} response
 * @return {Object}
 */
function toJSON(response: { json: () => any }) {
  return response.json();
}

export default {
  checkStatus,
  errorHandler,
  toJSON,
  ...StoreEndpoints
}