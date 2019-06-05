import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { Box, Heading } from 'rebass';
import Head from 'next/head'

import {
	StoreMerchantBrief,
	StoreMerchantBriefWrapper,
	StoreMerchantBriefSkeleton,
	StoreMerchandiseFeed,
} from '@Components';
import { theme } from '@Config';
import { IStorePage, IStore } from '@Interfaces';
import { StoreActions } from '@Store/Store/actions';
import {
	getStore,
	getStoreProducts,
	getStoreProductsCount,
	getStoreProductsPageIndex,
	getIsFetchingStoreProducts
} from '@Store/Store/selectors';

import { extractIdFromSlug, formatServiceHour } from '@Utilities';

export class StoreProductsPage extends React.Component<IStorePage.IProps, IStorePage.IState> {
	id:number;
	handleNextStoreMerchandiseFetch:any = null;

	constructor (props:IStorePage.IProps) {
		super(props);

		this.id = 0;
		this.handleNextStoreMerchandiseFetch = this.handleNextStoreMerchandiseFetchImpl.bind(this);
	}

	componentDidMount() {
		const { slug } = this.props.router.query;
		this.id = extractIdFromSlug(slug);

		this.props.getStore(this.id).then(() => this.props.fetchStoreProducts(this.id))
	}

	handleNextStoreMerchandiseFetchImpl() {
		const { fetchStoreProducts, getStoreProductsPageIndex } = this.props
		
		fetchStoreProducts(this.id, getStoreProductsPageIndex(this.id))
	}

	componentWillUnmount() {
		this.handleNextStoreMerchandiseFetch = null
	}

	public render(): JSX.Element {
		const { getStoreState, getProducts, isFetchingStoreProducts, getStoreProductsCount } = this.props

		const activeStore = getStoreState(this.id);
		const storeProducts = getProducts(this.id);
		const storeIsReady = typeof activeStore === 'object';

		let brief = <StoreMerchantBriefSkeleton />;

		if (storeIsReady) {
			const storeOpenFrom = `${formatServiceHour(activeStore.open_at)} AM - ${formatServiceHour(activeStore.close_at)} PM`
			brief = <StoreMerchantBrief title={activeStore.name} serviceFee={activeStore.service_fee} brandSrc={`/static/img/${activeStore.brand}`} storeOpenFrom={storeOpenFrom} />			
		}

		return (<>
				<Head>
					{ storeIsReady ? <title>Deliveries from {activeStore.name} on Instachaw</title>: <title>Fastest Deliveries on Instachaw</title>}
				</Head>
				<StoreMerchantBriefWrapper>{brief}</StoreMerchantBriefWrapper>
				<Box px={0} pb={5}>
					<Heading mb={2} color={theme.palette.grayscale[1]}>Make your choices.</Heading>
					{storeIsReady && <StoreMerchandiseFeed storeTitle={activeStore.name} storeId={activeStore.id} storeProducts={storeProducts} canLoadStoreProducts={storeProducts.length < getStoreProductsCount(this.id)} isFetchingStoreProducts={isFetchingStoreProducts} handleNextStoreMerchandiseFetch={this.handleNextStoreMerchandiseFetch} />}
				</Box>
			</>);
	}
}

const mapStateToProps = (state: IStore) => {
  return {
		getStoreState: (id:number) => getStore(id)(state),
		getProducts: (storeId:number) => getStoreProducts(storeId)(state),
		getStoreProductsCount: (storeId:number) => getStoreProductsCount(storeId)(state),
		getStoreProductsPageIndex: (storeId:number) => getStoreProductsPageIndex(storeId)(state),
		isFetchingStoreProducts: getIsFetchingStoreProducts(state),
  }
};

const mapDispatchToProps = (dispatch: Dispatch) => (
	{
		Map: bindActionCreators(StoreActions.Map, dispatch),
		fetchStoreProducts: bindActionCreators(StoreActions.fetchStoreProducts, dispatch),
		getStore: bindActionCreators(StoreActions.getStore, dispatch)
	}
);

export default connect(mapStateToProps, mapDispatchToProps)(StoreProductsPage);