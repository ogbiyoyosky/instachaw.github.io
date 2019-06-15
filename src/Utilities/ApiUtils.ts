'use strict';
const fetch = require('isomorphic-fetch');

const { NEXT_PUBLIC_API_URL } = process.env;

type callApiArgs = {
  /** Endpoint to call */
  endpoint: string,
  /** Available HTTP request methods */
  method?: "GET"|"POST"|"PUT"|"DELETE",
  /** Additional request headers */
  headers?: object
}

/**
 * Makes a parameterized API request.
 * 
 * @param {string} endpoint - Endpoint for the request.
 * @param {string} method - HTTP method for the request. "GET", "POST", "PUT", "DELETE".
 * 
 * @returns {string}
 */
export function callApi ({
  endpoint,
  method = 'GET',
  headers = {}
}: callApiArgs) {
  return fetch(`${NEXT_PUBLIC_API_URL}/${endpoint}`, {
    method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      ...headers
    }
  })
}