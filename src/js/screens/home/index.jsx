import React from "react";
import { connect } from "react-redux";
import reducerInjector from "../../redux/reducerInjector";
import {
  fetchTreats,
  setTreatsLoadingStatus
} from "../../screens/treat/actions";
import { REDUCER_NAME } from "./constants";
import {
  fetchHome,
  toggleSearchFocus,
  attemptSearchQuery,
  setSearch,
  setSearchResultsLoadingState
} from "./actions";
import { homeReducer, getHomeState } from "./reducer";
import { getAppState } from "../../containers/app/reducer";
import { getTreatState } from "../../screens/treat/reducer";
import { debounce } from "lodash";
import {
  Flex,
  Text,
  Box,
  Icon,
  IconButton,
  InputField,
  Heading,
  Input,
  Label
} from "pcln-design-system";
import { SearchBar } from "../../components/UI/molecules";
import Feed from "../../containers/feed";
import styled from "styled-components";

const Overlay = styled("div")`
  position: absolute;
  top: 0;
  height: 120%;
  width: 100%;
  z-index: 999999;
  background: #fff;
`;

const SearchFeed = props => {
  return (
    <Flex
      px={3}
      py={4}
      style={{
        position: "relative",
        zIndex: 1000,
        overflowY: "hidden"
      }}
      flexDirection="column"
    >
      <Flex justify="center" alignItems="center">
        <Box width={[1, 0.9, 0.7]}>
          <Flex style={{ width: "100%" }}>
            <Heading.h2 fontSize={4} bold style={{ flex: 0.999 }}>
              Find Tasty Treats.
            </Heading.h2>

            <Flex style={{ height: "40px" }}>
              <IconButton
                size={32}
                style={{ marginTop: "-5px" }}
                color="#ccc"
                borderColor="transparent"
                name="close"
                onClick={props.onCloseButtonClick}
              />
            </Flex>
          </Flex>

          <Box>
            <SearchBar
              id="search"
              isSearchBarFocused={true}
              onSearchBarChange={query => props.onSearchBarChange(query)}
              style={{
                background: "#fff"
              }}
              value={props.searchValue}
              mb={3}
              autoFocus
            />
          </Box>
          {!props.isLoadingSearchResults ? (
            <Flex flexDirection="column">
              <Heading.h3 mb={3} fontSize={2}>
                Results ({props.searchResults.length} found)
              </Heading.h3>
              <Feed items={props.searchResults} />
            </Flex>
          ) : (
            <Flex px={3} flexDirection="column" justify="center">
              <Flex flexDirection="column" justify="center" alignItems="center">
                <Text align="center" color="gray" fontSize={2} mb={3} bold>
                  Loading Search Results...
                </Text>
              </Flex>
            </Flex>
          )}
        </Box>
      </Flex>
    </Flex>
  );
};

class Home extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleSearchStateChange = this.handleSearchStateChange.bind(this);
    this.runSearchQuery = debounce(this.runSearchQuery.bind(this), 700);
    this.onSearchBarChange = this.onSearchBarChange.bind(this);
    this.state = {
      search: ""
    };
  }

  componentDidMount() {
    const { onLoadHome, fetchTreats, treat, match, app } = this.props;
    const { currentTreatPage, activeTreat } = treat;
    if (app.url !== match.url) {
      onLoadHome(match.path);
    }

    fetchTreats({ page: currentTreatPage, activeTreat });
  }

  // returns the JSX that will be rendered for this component
  render() {
    const {
      title,
      html,
      buttons,
      searchResults,
      isSearchFocused,
      isLoadingSearchResults
    } = this.props.home;
    const {
      treats,
      treatsCount,
      currentTreatPage,
      isLoadingTreats
    } = this.props.treat;
    return (
      <Flex
        style={{ minHeight: "100vh" }}
        my={4}
        className="transition-item"
        flexDirection="column"
        bg="lightGray"
      >
        {isSearchFocused && (
          <Overlay>
            <SearchFeed
              onCloseButtonClick={e =>
                this.props.onToggleSearchFocus({
                  isSearchFocused: !isSearchFocused
                })}
              onSearchBarChange={this.onSearchBarChange}
              isLoadingSearchResults={isLoadingSearchResults}
              searchResults={searchResults}
              searchValue={this.props.home.search}
            />
          </Overlay>
        )}
        <Flex justify="center" alignItems="center">
          <Box mt={3} px={3} width={[1, 0.9, 0.7, 0.7]}>
            <SearchBar
              id="search"
              isSearchBarFocused={this.props.home.isSearchFocused}
              onSearchBarChange={query => this.onSearchBarChange(query)}
              style={{
                background: "#fcfcfc"
              }}
              value={this.props.home.search}
              onFocus={this.handleSearchStateChange}
            />
          </Box>
        </Flex>
        <Flex justify="center" alignItems="center">
          <Box px={3} width={[1, 0.9, 0.7, 0.7]}>
            <Text bold color="darkGray" fontSize={4} my={3}>
              My Tastes
            </Text>
            <Box>
              <Feed
                items={treats}
                itemsCount={treatsCount}
                isLoading={isLoadingTreats}
                onFetchNextItems={() => {
                  this.props.setTreatsLoadingStatus({
                    isLoadingTreats: true
                  });
                  this.props.fetchTreats({ page: currentTreatPage });
                }}
              />
            </Box>
          </Box>
        </Flex>
        }
      </Flex>
    );
  }

  handleSearchStateChange() {
    this.props.onToggleSearchFocus({
      isSearchFocused: true
    });
  }

  onSearchBarChange(query) {
    if (!this.props.home.isLoadingSearchResults) {
      this.props.setSearchResultsLoadingState({
        isLoadingSearchResults: true
      });
    }

    this.props.setSearch({
      search: query
    });

    this.runSearchQuery(query);
  }

  runSearchQuery(query) {
    let search = query.trim();
    if (search.length > 1) {
      this.props.attemptSearchQuery({
        search
      });
    } else {
      this.props.setSearchResultsLoadingState({
        isLoadingSearchResults: false
      });
    }
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
    treat: getTreatState(state).toJS()
  };
};

// specifies the behaviour, which callback prop dispatches which action
const mapDispatchToProps = dispatch => {
  return {
    onLoadHome: data => dispatch(fetchHome(data)),
    onToggleSearchFocus: data => dispatch(toggleSearchFocus(data)),
    fetchTreats: data => dispatch(fetchTreats(data)),
    setTreatsLoadingStatus: data => dispatch(setTreatsLoadingStatus(data)),
    attemptSearchQuery: data => dispatch(attemptSearchQuery(data)),
    setSearch: data => dispatch(setSearch(data)),
    setSearchResultsLoadingState: data =>
      dispatch(setSearchResultsLoadingState(data))
  };
};

const withReducer = reducerInjector(REDUCER_NAME, homeReducer)(Home);
export default connect(mapStateToProps, mapDispatchToProps)(withReducer);
