import React from "react";
import { connect } from "react-redux";
import { Switch, Route } from "react-router";
import reducerInjector from "../../redux/reducerInjector";
import { withRouter } from "react-router-dom";
import { REDUCER_NAME } from "./constants";
import {
  fetchAccount,
  fetchOrders,
  setTransactionsCount,
  fetchTransactionsCount,
  fetchTransactionToken,
  cancelOrder,
  setUser,
  setFundingModalStatus,
  setFundingAmount,
  setFundingMethod,
  setFundingAttemptingStatus
} from "./actions";
import { accountReducer } from "./reducer";
import { getAppState } from "../../containers/app/reducer";
import { setMeta, setTitle } from "../../containers/app/actions";
import { getAccountState } from "../../screens/account/reducer";
import {
  Flex,
  Text,
  BlockLink,
  OutlineButton,
  Box,
  Label,
  Input,
  Button,
  Heading,
  GreenButton,
  IconButton,
  Icon
} from "pcln-design-system";
import Feed from "../../containers/feed";
import {
  Tab,
  NotificationFeed,
  OrdersFeed,
  TabBar
} from "../../components/UI/molecules";
import { BaseFundingModal } from "../../components/UI/ecosystems";

import AccountService from "../../services/AccountService";
import {
  toTitleCase,
  roundToDecimalPlaces,
  generateTransactionRef
} from "../../util/util";

const notifications = [
  {
    id: 1,
    title: "Delighted to see you!",
    body: `Hi, we are delighted to serve you.
      Make a selection of your favorite meals and we'll hand them over within 15 minutes.`,
    isUnread: true
  }
  // {
  //   id: 2,
  //   title: "You just got a coupon",
  //   body: "We love you and we're rewarding you with a free coupon.",
  //   isUnread: false
  // }
];

const AccountTabComponent = props => {
  return (
    <Flex flexDirection="column" width="100%">
      <Flex
        flexDirection="column"
        width="100%"
        py={3}
        px={4}
        style={{
          display: props.account.isFundingModalOpen ? "none" : "block"
        }}
      >
        <Flex alignItems="center" justify="center">
          <Box width={[1, 0.9, 0.7, 0.7]}>
            <Heading.h3 mb={2} bold>
              My Account.
            </Heading.h3>

            <Flex justify="center" alignItems="center">
              <Flex>
                <Flex flexDirection="column" mb={1} mr={4}>
                  <Text align="center" fontSize={4} color="blue">
                    {roundToDecimalPlaces(props.getWalletBalance("STEEM"), 3)}
                  </Text>
                  <Text
                    style={{ textAlign: "center" }}
                    color="gray"
                    fontSize={1}
                  >
                    STEEM
                  </Text>
                </Flex>

                <Flex flexDirection="column" mb={1} mr={4}>
                  <Text align="center" fontSize={4} color="blue">
                    {roundToDecimalPlaces(props.getWalletBalance("SBD"), 3)}
                  </Text>
                  <Text
                    style={{ textAlign: "center" }}
                    color="gray"
                    fontSize={1}
                  >
                    SBD
                  </Text>
                </Flex>

                <Flex flexDirection="column" mb={1} mr={4}>
                  <Text align="center" fontSize={4} color="green">
                    {roundToDecimalPlaces(props.getWalletBalance("naira"), 3)}
                  </Text>
                  <Text
                    style={{ textAlign: "center" }}
                    color="gray"
                    fontSize={1}
                  >
                    Naira
                  </Text>
                </Flex>

                <Flex flexDirection="column" mb={1}>
                  <Text align="center" fontSize={4} color="gray">
                    {props.account.orders.length}
                  </Text>
                  <Text
                    style={{ textAlign: "center" }}
                    color="gray"
                    fontSize={1}
                  >
                    Orders
                  </Text>
                </Flex>
              </Flex>
            </Flex>

            <Flex flexDirection="column" mt={2} mb={3}>
              <Text mb={3}>
                <Flex justify="center">
                  <Text>Running low on&nbsp;</Text>
                  <Text color="blue" bold>
                    STEEM
                  </Text>
                  <Text>?</Text>
                </Flex>
              </Text>
              <Button
                onClick={e => {
                  props.setFundingMethod({
                    fundingMethod: "naira"
                  });
                  props.setFundingModalStatus({
                    isFundingModalOpen: true
                  });
                }}
                mb={2}
              >
                Add cash (NGN) easily
              </Button>

              <OutlineButton
                onClick={e => {
                  props.setFundingMethod({
                    fundingMethod:
                      props.account.fundingMethod === "naira"
                        ? "SBD"
                        : props.account.fundingMethod
                  });
                  props.setFundingModalStatus({
                    isFundingModalOpen: true
                  });
                }}
              >
                Add SBD/STEEM painlessly
              </OutlineButton>
            </Flex>
          </Box>
        </Flex>
      </Flex>

      {props.account.isFundingModalOpen && (
        <BaseFundingModal
          fundingAmount={props.account.fundingAmount}
          fundingMethod={props.account.fundingMethod}
          isAttemptingFunding={props.account.isAttemptingFunding}
          isFundingModalOpen={props.account.isFundingModalOpen}
          isFullscreenModal={true}
          onFundingSubmit={e => props.onFundingSubmit(e)}
          onSetFundingAmount={data => props.setFundingAmount(data)}
          onSetFundingMethod={data => {
            props.setFundingAmount({
              fundingAmount: this.getPaymentAmount(fundingMethod)
            });
            props.setFundingMethod(data);
          }}
          onClose={e => {
            props.setFundingModalStatus({
              isFundingModalOpen: false
            });

            props.setFundingAttemptingStatus({
              isAttemptingFunding: false
            });
            props.clearPaymentInterval;
          }}
        />
      )}
    </Flex>
  );
};

const NotificationsTabComponent = () => (
  <Flex width={1} alignItems="center" justify="center">
    <Box width={[1, 0.9, 0.7]}>
      <Box py={3} px={4}>
        <Heading.h3 bold mb={4}>
          Just In.
        </Heading.h3>

        <NotificationFeed notifications={notifications} />
      </Box>
    </Box>
  </Flex>
);

const OrdersTabComponent = props => {
  let orders = props.account.orders.length > 0 ? props.account.orders : [];

  let activeOrders = orders.filter(
    order => order.deleted_at === null && order.confirmed_at === null
  );

  console.log(activeOrders);

  let receivedOrders = orders.filter(
    order => order.deleted_at === null && order.confirmed_at !== null
  );

  let cancelledOrders = orders.filter(
    order => order.deleted_at !== null && order.confirmed_at === null
  );

  return (
    <Flex width={1} alignItems="center" justify="center">
      <Box width={[1, 0.9, 0.7]}>
        {activeOrders.length > 0 && (
          <Box mb={3} py={3} px={4}>
            <Heading.h3 mb={2} bold>
              Orders On the Way.
            </Heading.h3>

            <OrdersFeed
              onCancelOrder={props.onCancelOrder}
              orders={activeOrders}
              isOrderCancellable={true}
            />
          </Box>
        )}

        {receivedOrders.length > 0 && (
          <Box mb={3} py={3} px={4}>
            <Heading.h4 mb={2} bold>
              Orders You Received.
            </Heading.h4>

            <OrdersFeed
              onCancelOrder={props.onCancelOrder}
              orders={receivedOrders}
              isOrderCancellable={false}
            />
          </Box>
        )}

        {cancelledOrders.length > 0 && (
          <Box py={1} px={4}>
            <Heading.h5 mb={2} bold>
              Orders You Cancelled.
            </Heading.h5>

            <OrdersFeed
              onCancelOrder={props.onCancelOrder}
              orders={cancelledOrders}
              isOrderCancellable={false}
            />
          </Box>
        )}
      </Box>
    </Flex>
  );
};

const tabItems = [
  {
    name: "account",
    label: "Account",
    path: "/account",
    component: props => <AccountTabComponent {...props} />
  },
  {
    name: "notifications",
    label: "Notifications",
    path: "/account/notifications",
    component: props => <NotificationsTabComponent {...props} />
  },
  {
    name: "orders",
    label: "Orders",
    path: "/account/orders",
    component: props => <OrdersTabComponent {...props} />
  }
];

const getTabComponent = (path, props) => {
  return tabItems.filter(tabItem => tabItem.path === path)[0].component(props);
};

class Account extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      paymentStatusInterval: null
    };
    this.onFundingSubmit = this.onFundingSubmit.bind(this);
    this.onCancelOrder = this.onCancelOrder.bind(this);
    this.paymentStatusInterval = "";
  }

  componentDidMount() {
    const {
      onLoadAccount,
      match,
      app,
      account,
      setTitle,
      history,
      fetchTransactionsCount,
      fetchOrders
    } = this.props;

    // onLoadAccount(match.path);

    fetchOrders();

    let pathSegments = match.url.split("/");
    let title = toTitleCase(pathSegments[pathSegments.length - 1]);

    setTitle({
      title
    });

    history.listen(e => {
      let newPathSegments = e.pathname.split("/");
      let newTitle = toTitleCase(newPathSegments[newPathSegments.length - 1]);

      setTitle({
        title: newTitle
      });
    });
  }

  componentWillUnmount() {
    this.onPaymentSubmit = null;
    this.onCancelOrder = null;
    if (this.state.paymentStatusInterval) {
      this.state.paymentStatusInterval = clearInterval(
        this.state.paymentStatusInterval
      );
    }
  }

  render() {
    return (
      <Flex mt={4} mb={5} flexDirection="column">
        <Flex
          bg="darkGray"
          flexDirection="column"
          style={{
            minHeight: "27vh"
          }}
          align="center"
          justify="center"
        >
          <Heading.h4 color="lightGray">
            Hello, {this.props.account.user.username}.
          </Heading.h4>
        </Flex>

        <Flex justify="center" alignItems="center">
          <Flex p={2} flexDirection="row" width={[1, 0.9, 0.7, 0.7]}>
            <TabBar
              activeTabPath={this.props.match.url}
              bg="lightGray"
              tabItems={tabItems}
            />
          </Flex>
        </Flex>

        <Flex>
          <Route
            path={`${this.props.match.path}/:tab?`}
            render={props => {
              return getTabComponent(this.props.match.url, {
                ...this.props,
                onFundingSubmit: this.onFundingSubmit,
                onCancelOrder: this.onCancelOrder,
                clearPaymentInterval: this.clearPaymentInterval,
                payWithPayStack: this.payWithPayStack
              });
            }}
          />
        </Flex>
      </Flex>
    );
  }

  onFundingSubmit(event) {
    event.preventDefault();
    const {
      account,
      fetchTransactionToken,
      setFundingAttemptingStatus,
      setTransactionsCount,
      fetchTransactionsCount,
      setUser,
      setFundingModalStatus
    } = this.props;

    if (account.fundingMethod === "naira") {
      AccountService.processFundingRequest({
        account,

        handleFetchTransactionToken: fetchTransactionToken,

        handleSetFundingAttemptingStatus: data =>
          setFundingAttemptingStatus(data),

        handleSetTransactionsCount: data => setTransactionsCount(data),

        handleFetchTransactionsCount: (data, cb) =>
          fetchTransactionsCount(data, cb),

        handlesSetUser: data => setUser(data),

        handleSetFundingModalStatus: data => setFundingModalStatus(data),

        handleSetupPaymentStatusInterval: cb => {
          this.state.paymentStatusInterval = setInterval(() => {
            cb();
          }, 20000);
        },

        handleTeardownPaymentStatusInterval: () => this.clearPaymentInterval()
      });
    } else {
      AccountService.processFundingRequest({
        account,

        handleFetchTransactionToken: fetchTransactionToken,

        handleSetFundingAttemptingStatus: data =>
          setFundingAttemptingStatus(data),

        handleSetTransactionsCount: data => setTransactionsCount(data),

        handleFetchTransactionsCount: (data, cb) =>
          fetchTransactionsCount(data, cb),

        handlesSetUser: data => setUser(data),

        handleSetFundingModalStatus: data => setFundingModalStatus(data),

        handleSetupPaymentStatusInterval: cb => {
          this.state.paymentStatusInterval = setInterval(() => {
            cb();
          }, 10000);
        },

        handleTeardownPaymentStatusInterval: () => this.clearPaymentInterval()
      });
    }
  }

  clearPaymentInterval() {
    if (this.state.paymentStatusInterval) {
      this.state.paymentStatusInterval = clearInterval(
        this.state.paymentStatusInterval
      );
    }
  }

  onCancelOrder(orderID) {
    this.props.cancelOrder({
      orderID
    });
  }

  static fetchData(store, { path }) {
    return store.dispatch(fetchProfile(path));
  }

  static getReducer() {
    return { key: REDUCER_NAME, reducer: accountReducer };
  }
}

const mapStateToProps = state => {
  const account = getAccountState(state).toJS();
  const getWalletBalance = wallet =>
    account.user.wallets.filter(
      currentWallet => currentWallet.title == wallet
    )[0].balance;

  return {
    account,
    getWalletBalance
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setTitle: data => {
      dispatch(setMeta(data));
      dispatch(setTitle(data.title));
    },
    onLoadAccount: data => dispatch(fetchAccount("/account")),
    fetchOrders: data => dispatch(fetchOrders()),
    fetchTransactionsCount: (data, cb) =>
      dispatch(fetchTransactionsCount(data, cb)),
    fetchTransactionToken: cb => dispatch(fetchTransactionToken(cb)),
    cancelOrder: data => dispatch(cancelOrder(data)),
    setFundingAmount: data => dispatch(setFundingAmount(data)),
    setFundingAttemptingStatus: data =>
      dispatch(setFundingAttemptingStatus(data)),
    setFundingModalStatus: data => dispatch(setFundingModalStatus(data)),
    setFundingMethod: data => dispatch(setFundingMethod(data)),
    setTransactionsCount: data => dispatch(setTransactionsCount(data)),
    setUser: data => dispatch(setUser(data))
  };
};

const withReducer = reducerInjector(REDUCER_NAME, accountReducer)(Account);

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(withReducer)
);
