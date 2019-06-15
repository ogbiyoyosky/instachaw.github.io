import { Props } from 'react';
import { IStoreData } from '@Interfaces/Redux/Store';

declare module IStorePage {
	export interface IOwnProps extends Props<{}> {
		router: any
	}

    export interface IState { }
	
	export interface IStateProps {
		/** Displays a loading indicator for store products */
		isFetchingStoreProducts: boolean,
		/** Displays a loading indicator for a single store */
		isLoadingStore: boolean,
		store?: IStoreData
		/** Gets the total number of products for a store */
		getStoreProductsCount?: any,
		/** Gets the total number of pages for store products */
		getStoreProductsPageIndex?: any,
		getStoreState: any,
		getProducts?: any
	}
	
	export interface IDispatchProps {
		Map(payload: Actions.IMapPayload): Actions.IMapResponse;
		fetchStoreProducts(storeId:number, pageIndex?:number): any,
		getStore(id:number): Promise,
 	}
    
	export type IProps = IOwnProps & IStateProps & IDispatchProps;

    module Actions {
		export interface IMapPayload { }
		
		export interface IMapResponse { }

		export interface IStoresResponse { }
		export interface IStoreResponse { }
	}

	export type IStoreProductsData = {
		items: IStoreProductData[],
		itemsCount: number
	}

	export type IStoreProductData = {
		id: number,
		store_id: number,
		title: string,
		type: string,
		vat: number,
		photo: string,
		price: number,
		origin: string,
		locale: string,
		description: string,
		classification: string
	}

	export type IStoreData = {
		id: number,
		name: string,
		description: string,
		latitude: string,
		longitude: string,
		location: string,
		city: string,
		brand: string,
		service_fee: string,
		verified_at: string,
		open_at: string,
		close_at: string,
	}

	export type IStoresData = {
		stores: IStoreData[],
		storesCount: number
	}
}