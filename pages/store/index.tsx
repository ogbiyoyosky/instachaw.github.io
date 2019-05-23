import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import Head from 'next/head'

import { IStorePage, IStore } from '@Interfaces';
import { StoreActions } from '@Store/Store/actions';
import { getStores } from '@Store/Store/selectors';
import { StoreMerchantBrief, StoreMerchandiseFeed } from '@Components';

export class StoreItemPage extends React.Component<IStorePage.IProps, IStorePage.IState> {
	componentDidMount() {}

	public render(): JSX.Element {    
		return (
			<>
				<Head>
					<title>Deliveries from Kilimanjaro, Choba on Instachaw</title>
				</Head>
				<StoreMerchantBrief />
				<StoreMerchandiseFeed />
			</>
		);
	}
}

const mapStateToProps = (state: IStore) => {
  return {
		stores: getStores(state)
  }
};

const mapDispatchToProps = (dispatch: Dispatch) => (
	{
		Map: bindActionCreators(StoreActions.Map, dispatch)
	}
);

export default connect(mapStateToProps, mapDispatchToProps)(StoreItemPage);