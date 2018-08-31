import React from "react";
import { connect } from "react-redux";
import reducerInjector from "../../redux/reducerInjector";
import {
  fetchStores,
  setStoresLoadingStatus
} from "../../screens/store/actions";
import { REDUCER_NAME } from "./constants";
import { fetchHome, setFetchedHomeFeedState } from "./actions";
import { homeReducer, getHomeState } from "./reducer";
import { getAppState } from "../../containers/app/reducer";
import { getStoreState } from "../../screens/store/reducer";
import { getCartState } from "../../screens/cart/reducer";
import { debounce } from "../../util/util";
import { Flex, Text, Box } from "pcln-design-system";
import LazyLoad from "react-lazyload";
import { ClipLoader } from "react-spinners";
import StoreFeed from "../../containers/storefeed";
import styled from "styled-components";

class Home extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const {
      onLoadHome,
      fetchStores,
      setFetchedHomeFeedState,
      home,
      store,
      match,
      app
    } = this.props;
    const { currentStorePage, activeStore } = store;
    if (app.url !== match.url) {
      onLoadHome(match.path);
    }

    if (!store.stores.length || !home.hasFetchedHomeFeed) {
      fetchStores({ page: currentStorePage });
      setFetchedHomeFeedState({
        hasFetchedHomeFeed: true
      });
    }
  }

  // returns the JSX that will be rendered for this component
  render() {
    const { title, html, buttons } = this.props.home;
    const { stores, storesCount, isLoadingStores } = this.props.store;
    return (
      !this.props.app.isLoading && (
        <Flex
          style={{
            minHeight: "100vh",
            marginBottom: "70px"
          }}
          my={4}
          className="transition-item"
          flexDirection="column"
          bg="lightGray"
        >
          <Flex justify="center" alignItems="center">
            <Box px={3} width={[1, 0.9, 0.7, 0.7]}>
              <Text bold color="darkGray" fontSize={4} my={3}>
                Choose a Restaurant.
              </Text>
              <Box>
                <Box mb={4}>
                  <StoreFeed
                    stores={stores}
                    storesCount={storesCount}
                    isLoading={this.props.store.isLoadingStores}
                    onFetchNextStores={() => {
                      this.props.setStoresLoadingStatus({
                        isLoadingStores: true
                      });
                      this.props.fetchStores({ page: currentStorePage });
                    }}
                  />
                </Box>
              </Box>
            </Box>
          </Flex>
        </Flex>
      )
    );
  }

  static fetchData(store, { path }) {
    return store.dispatch(fetchHome(path));
  }

  static getReducer() {
    return { key: REDUCER_NAME, reducer: homeReducer };
  }
}

// maps the redux store state to the props related to the data from the store
const mapStateToProps = state => {
  return {
    home: getHomeState(state).toJS(),
    app: getAppState(state).toJS(),
    cart: getCartState(state).toJS(),
    store: getStoreState(state).toJS()
  };
};

// specifies the behaviour, which callback prop dispatches which action
const mapDispatchToProps = dispatch => {
  return {
    onLoadHome: data => dispatch(fetchHome(data)),
    fetchStores: data => dispatch(fetchStores(data)),
    setStoresLoadingStatus: data => dispatch(setStoresLoadingStatus(data)),
    setFetchedHomeFeedState: data => dispatch(setFetchedHomeFeedState(data))
  };
};

const withReducer = reducerInjector(REDUCER_NAME, homeReducer)(Home);
export default connect(mapStateToProps, mapDispatchToProps)(withReducer);
