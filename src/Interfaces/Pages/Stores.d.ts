import { Props } from 'react';
import { IStoreData } from '@Interfaces/Redux/Store';

declare module IStoresPage {
	export interface IOwnProps extends Props<{}> {
		router: any
	}

  export interface IState { }
	
	export interface IStateProps {
		/** Displays a loading indicator for stores */
		isFetchingStores: boolean,
		/** A collection of stores */
    stores: IStoreData[],
		// Associative map that holds the products count for each store.
		storesProductsCountMap?: object,
		// Holds the current products page index for each store.
		storesProductsPageIndexMap?: object,
	}
	
	export interface IDispatchProps {
		Map(payload: Actions.IMapPayload): Actions.IMapResponse;
		fetchStores(): any,
 	}
    
	export type IProps = IOwnProps & IStateProps & IDispatchProps;

    module Actions {
		export interface IMapPayload { }
		
		export interface IMapResponse { }

		export interface IStoresResponse { }
		export interface IStoreResponse { }
	}

	export type IStoresData = {
		stores: IStoreData[],
		storesCount: number
	}
}