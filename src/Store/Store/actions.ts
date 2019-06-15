'use strict';
import { normalize } from 'normalizr';

import { Dispatch } from 'redux';

import { ActionTypes } from "@Constants";
import { IStorePage, IStoresPage } from '@Interfaces';

import { EntityActions } from '@Store/Entity/actions';
import { storeSchema, productSchema } from '@Store/schema';
import {
	getObjectKeysCount,
	greaterOrEquals
} from '@Utilities'

/**
 * ACTIONS
*/
export const StoreActions = {
	/**
	 * Sets a new value within the reducer.
	 * 
	 * @param  {any} payload
	 * @returns {Object<Action>}
	 */
	Map : (payload:any) => ({
		payload,
		type: ActionTypes.Store.SetReducer
	}),

	/**
	 * Sets the reducer to the initial state.
	 * 
	 * @returns {Object<Action>}
	 */
	Reset : () => ({
		type: ActionTypes.Store.ResetReducer
	}),

	/**
	 * Sets the number if products available within a store.
	 * 
	 * @param  {boolean} isLoadingStore
	 * @returns {StoreAction}
	 */
	setStoreProductsCount: (state:IStoresPage.IStateProps, storeId:number, productsCount:number) => {
		return StoreActions.Map({
			storesProductsCountMap: {
				...state.storesProductsCountMap,
				[storeId]: productsCount
			}
		})
	},

	/**
	 * Increments the products page index of a store.
	 * 
	 * @param  {boolean} isLoadingStore
	 * @returns {StoreAction}
	 */
	incrementStoreProductsPageIndex: (state:IStoresPage.IStateProps, storeId:number) => {
		const { storesProductsPageIndexMap } = (state as any);
		const page = storeId in storesProductsPageIndexMap ? storesProductsPageIndexMap[storeId] : 1;

		return StoreActions.Map({
			storesProductsPageIndexMap: {
				...state.storesProductsPageIndexMap,
				[storeId]: page + 1
			}
		})
	},
	
	/**
	 * Notifies the app concerning the store loading status
	 * for a single store (not a list of stores!)
	 * 
	 * @param  {boolean} isLoadingStore
	 * @returns {StoreAction}
	 */
	toggleStoreLoadingStatus: (isLoadingStore:boolean) => {
		return StoreActions.Map({
			isLoadingStore: !isLoadingStore
		})
	},

	/**
	 * Toggles the fetching status for store products.
	 * 
	 * @param  {boolean} isFetchingStoreProducts
	 * @returns {StoreAction}
	 */
	toggleStoreProductsFetchingStatus: (isFetchingStoreProducts:boolean) => {
		return StoreActions.Map({
			isFetchingStoreProducts: !isFetchingStoreProducts
		})
	},

	/**
	 * Toggles the fetching status for stores.
	 * 
	 * @param  {boolean} isFetchingStore
	 * @returns {StoreAction}
	 */
	toggleStoresFetchingStatus: (isFetchingStores:boolean) => {
		return StoreActions.Map({
			isFetchingStores: !isFetchingStores
		})
	},

	/**
	 * Processes a HTTP request for the stores list.
	 * 
	 * @returns {Promise<Void>}
	 */
	fetchStores: () => {
		const minNumberOfStoresToLoad = 2;

		return (dispatch:Dispatch, getState:any, api:any) => {	
			const storeEntities = getState().entities.stores

			// If stores are already loaded, avoid another HTTP request.
			if (greaterOrEquals(
						minNumberOfStoresToLoad,
						getObjectKeysCount(storeEntities),
					)
				) {
				dispatch(StoreActions.toggleStoreLoadingStatus(true));
				return Promise.resolve();
			}

			dispatch(StoreActions.toggleStoresFetchingStatus(
					getState().store.isFetchingStores
				)
			);

			return api.fetchStores()
				.then(api.checkStatus)
				.then(api.toJSON)
        .then(({ stores }:IStorePage.IStoresData) => {
					const { entities } = normalize(stores, [storeSchema]);
					
					setTimeout(() => {
						dispatch(StoreActions.toggleStoresFetchingStatus(
							getState().store.isFetchingStores
						));
					}, 1000)
					dispatch(EntityActions.Map({ ...entities }))
				})
        .catch((e:any) => api.errorHandler(dispatch, e))
		}
	},

	fetchStoreProducts: (storeId:number, pageIndex:number = 1) => {
		const minNumStoreProducts:number = 5;
		const {
			toggleStoreProductsFetchingStatus,
			setStoreProductsCount,
			incrementStoreProductsPageIndex
		} = StoreActions

		return async (dispatch:Dispatch, getState:any, api:any) => {
			const storeEntities = getState().entities.store || {}
			const canMakeRequest = greaterOrEquals(
				getObjectKeysCount(storeEntities),
				minNumStoreProducts
			);

			if (!canMakeRequest) {
				dispatch(toggleStoreProductsFetchingStatus(true));
				return Promise.resolve();
			}

			dispatch(toggleStoreProductsFetchingStatus(false));

			return await api.fetchStoreProducts(storeId, pageIndex)
				.then(api.checkStatus)
				.then(api.toJSON)
        .then(({ items, itemsCount }:IStorePage.IStoreProductsData) => {
					const { entities } = normalize(items, [productSchema]);
					let updatedStore = getState().store;

					dispatch(setStoreProductsCount(updatedStore, storeId, itemsCount));
					dispatch(incrementStoreProductsPageIndex(updatedStore, storeId));

					setTimeout(() => 
						dispatch(toggleStoreProductsFetchingStatus(updatedStore.isFetchingStoreProducts)), 1000
					)

					dispatch(EntityActions.Map({
						items: {
							...getState().entities.items,
							...entities.items
						}
					}))
				})
        .catch((e:any) => api.errorHandler(dispatch, e))
		} 
	},

	/**
	 * Initiates a HTTP request for a single store.
	 * 
	 * @returns {Promise}
	 */
	getStore: (id:number) => {
		const { toggleStoreLoadingStatus } = StoreActions;

		return async (dispatch:Dispatch, getState:any, api:any):Promise<any> => {
			// If the store has already been loaded avoid another HTTP request.
			if (id in getState().entities.stores) {
				dispatch(toggleStoreLoadingStatus(true));

				// Return a Promise object for chaining.
				return Promise.resolve();			
			}

			dispatch(toggleStoreLoadingStatus(getState().store.isLoadingStore));

			return await api.loadStore(id)
				.then(api.checkStatus)
				.then(api.toJSON)
        .then((store:IStorePage.IStoreData) => {
					const { entities } = normalize(store, storeSchema);
					
					setTimeout(() => {
						dispatch(StoreActions.toggleStoreLoadingStatus(
							getState().store.isLoadingStore
						));
					}, 1000)
	
					dispatch(EntityActions.Map({ ...entities }))
				})
        .catch((e:any) => api.errorHandler(dispatch, e))
		}
	}
}