import { ApiConstants } from '@Constants'

const fetchStores = () => {
  return fetch(ApiConstants.STORES_FEED_ENDPOINT, {
    method: 'GET',
    headers: {}
  })
}

export default {
  fetchStores
}