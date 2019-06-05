'use strict';

import { callApi } from '@Utilities';
import { ApiConstants } from '@Constants'

const { STORES_ENDPOINT, PRODUCTS_ENDPOINT } = ApiConstants;

/** Fetches the stores collection */
const fetchStores = () => callApi({ endpoint: STORES_ENDPOINT });

/** Fetches the products in a store */
const fetchStoreProducts = (storeId:number, pageIndex:number) => {
  return callApi({ endpoint: `${PRODUCTS_ENDPOINT}?store_id=${storeId}&page=${pageIndex}` });
}

/** Loads a single store */
const loadStore = (id:number) => callApi({ endpoint: `${ApiConstants.STORES_ENDPOINT}/${id}` });

export default {
  fetchStores,
  fetchStoreProducts,
  loadStore
}