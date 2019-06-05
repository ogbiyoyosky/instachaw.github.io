import { denormalize } from 'normalizr';

import { IStore } from '@Interfaces/Redux/Store';
import { createSelector } from 'reselect';
import { getEntities } from '@Store/Entity/selectors'
import { storeSchema } from '@Store/schema'
import { getObjectKeysCount } from '@Utilities'

/**
 * Memoizes and retrieves the stores from the app state.
 */
export const getStores = createSelector([ getEntities ], (entities:any) => denormalize(
    Object.keys(entities.stores),
    [ storeSchema ],
    entities
  )
)

/**
 * Returns non-memoized store state.
 * 
 * @param {Object} state
 * @returns {Object<IStore>} 
 */
export const getStoreState = (state:IStore) => state.store;

/**
 * Memoizes and loads a store from the app state.
 */
export const getStore = (id:number) => createSelector([ getEntities ], (entities:any) => { 
  return entities.stores[id]
})

/**
 * Memoizes and retrieves the products in a store.
 */
export const getStoreProducts = (storeId:number) => createSelector([ getEntities ], (entities:any) => {
  if (!('items' in entities)) return [];

  const { items } = entities;

  return Object
          .keys(items)
          .filter((item:string) => parseInt(items[item].store_id) === storeId)
          .map((item:string) => items[item])
})

/**
 * Memoizes and retrieves the store products page index
 */
export const getStoreProductsPageIndex = (storeId:number) => createSelector([ getStoreState ], (storeState:any) => {
  const { storesProductsPageIndexMap } = storeState;
  const defaultPageIndex = 1

  if (storeId in storesProductsPageIndexMap) {
    return storesProductsPageIndexMap[storeId];
  }

  return defaultPageIndex;
});

/**
 * Memoizes and retrieves the store products count
 */
export const getStoreProductsCount = (storeId:number) => createSelector([ getStoreState ], (storeState:any) => {
  const { storesProductsCountMap } = storeState;

  if (getObjectKeysCount(storesProductsCountMap) &&
    storeId in storesProductsCountMap
  ) {
    return storesProductsCountMap[storeId];
  }

  return Infinity;
});

/**
 * Returns the non-memoized fetching indicator.
 */
export const getIsFetchingStores = (state:IStore):boolean => (state.store as any).isFetchingStores;

export const getIsFetchingStoreProducts = (state:IStore):boolean => state.store.isFetchingStoreProducts;