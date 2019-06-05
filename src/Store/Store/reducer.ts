'use strict';

import { ActionTypes } from '@Constants';
import { IAction, IStorePage } from '@Interfaces';

/**
 * INITIAL_STATE
*/
const INITIAL_STATE: IStorePage.IStateProps = {
	/** Displays a loading indicator for store products */
	isFetchingStoreProducts: false,
	/** Displays a loading indicator for stores */
	isFetchingStores: false,
	/** Displays a loading indicator for a single store */
	isLoadingStore: false,
	/** A collection of stores */
	stores: [],
	// Associative map that holds the products count for each store.
	storesProductsCountMap: {},
	// Holds the current products page index for each store.
	storesProductsPageIndexMap: {},
};

type IMapPayload = IStorePage.Actions.IMapPayload;

/**
 * REDUCER
*/
export const StoreReducer = (state = INITIAL_STATE, action: IAction<IMapPayload>) => {
	switch (action.type) {
		case ActionTypes.Store.SetReducer:
			return {
				...state,
				...action.payload
			};

		case ActionTypes.Store.ResetReducer:
			return INITIAL_STATE;

		default:
			return state;
	}
};
