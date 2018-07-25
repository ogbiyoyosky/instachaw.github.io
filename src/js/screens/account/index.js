import React from "react";
import { connect } from "react-redux";
import { Switch, Route } from "react-router";
import reducerInjector from "../../redux/reducerInjector";
import { withRouter } from "react-router-dom";
import { REDUCER_NAME } from "./constants";
import {
  fetchAccount,
  fetchOrders,
  cancelOrder,
  setPaymentModalStatus,
  setPaymentAmount
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
import styled from "styled-components";
import posed from "react-pose";
import { tween } from "popmotion";
import {
  Tab,
  NotificationFeed,
  OrdersFeed,
  TabBar
} from "../../components/UI/molecules";
import { toTitleCase } from "../../util/util";

const notifications = [
  {
    id: 1,
    title: "3 new treats added!",
    body:
      "We've added 3 brand new treats for your enjoyment. Check them out now.",
    isUnread: true
  },
  {
    id: 2,
    title: "You just got a coupon",
    body: "We love you and we're rewarding you with a free coupon.",
    isUnread: false
  }
];

const AccountTabComponent = props => (
  <Flex flexDirection="column" width="100%">
    <Flex
      flexDirection="column"
      width="100%"
      py={3}
      px={4}
      style={{
        display: props.account.isPaymentModalOpen ? "none" : "block"
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
                <Text align="center" fontSize={6} color="green">
                  {props.getWalletBalance("STEEM")}
                </Text>
                <Text style={{ textAlign: "center" }} color="gray" fontSize={1}>
                  STEEM
                </Text>
              </Flex>

              <Flex flexDirection="column" mb={4}>
                <Text align="center" fontSize={6} color="gray">
                  {props.account.orders.length}
                </Text>
                <Text style={{ textAlign: "center" }} color="gray" fontSize={1}>
                  Orders
                </Text>
              </Flex>
            </Flex>
          </Flex>

          <Flex flexDirection="column" mb={3}>
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
              onClick={e =>
                props.setPaymentModalStatus({
                  isPaymentModalOpen: true
                })}
            >
              Add STEEM painlessly
            </Button>
          </Flex>
        </Box>
      </Flex>
    </Flex>

    {props.account.isPaymentModalOpen ? (
      <StyledModal
        pose={props.account.isPaymentModalOpen ? "fullscreen" : "idle"}
        style={{
          display: !props.account.isPaymentModalOpen ? "none" : "block"
        }}
      >
        <Flex
          p={2}
          flexDirection="column"
          justify="center"
          alignItems="center"
          style={{
            height: "100%"
          }}
        >
          <IconButton
            size={36}
            style={{
              position: "absolute",
              top: "10px",
              right: "10px"
            }}
            color="#999"
            borderColor="transparent"
            name="close"
            onClick={e =>
              props.setPaymentModalStatus({
                isPaymentModalOpen: false
              })}
          />

          <Flex justify="center" alignItems="center">
            <Box width={[0.8, 0.6, 0.5]}>
              <form method="get" onSubmit={props.onPaymentSubmit}>
                <Flex
                  flexDirection="column"
                  justify="center"
                  alignItems="center"
                >
                  <Text
                    fontSize={4}
                    mb={3}
                    style={{
                      textAlign: "center"
                    }}
                  >
                    Fund <strong>STEEM</strong> <em>Without Stress</em>.
                  </Text>

                  <Box mb={3}>
                    <Label mb={1} fontSize={0}>
                      Amount
                    </Label>
                    <Input
                      onChange={e => {
                        props.setPaymentAmount({
                          paymentAmount: Number(e.target.value)
                        });
                      }}
                      value={props.account.paymentAmount}
                      type="number"
                      min="0"
                      step="any"
                      id="amount"
                      onFocus={e => e.target.select()}
                      autoFocus={props.account.isPaymentModalOpen}
                      style={{
                        background: "#fff"
                      }}
                    />
                  </Box>

                  <Box>
                    <GreenButton type="submit" fullWidth>
                      Pay Securely with SteemConnect
                    </GreenButton>
                  </Box>
                </Flex>
              </form>
            </Box>
          </Flex>
        </Flex>
      </StyledModal>
    ) : null}
  </Flex>
);

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
  return (
    <Flex width={1} alignItems="center" justify="center">
      <Box width={[1, 0.9, 0.7]}>
        <Box mb={3} py={3} px={4}>
          <Heading.h3 mb={2} bold>
            Active Orders.
          </Heading.h3>

          <OrdersFeed
            onCancelOrder={props.onCancelOrder}
            orders={props.account.orders.filter(
              order => order.deleted_at == null
            )}
            isOrderCancellable={true}
          />
        </Box>

        <Box py={1} px={4}>
          <Heading.h5 mb={2} bold>
            Cancelled Orders.
          </Heading.h5>

          <OrdersFeed
            onCancelOrder={props.onCancelOrder}
            orders={props.account.orders.filter(
              order => order.deleted_at !== null
            )}
            isOrderCancellable={false}
          />
        </Box>
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

const Modal = posed.div({
  fullscreen: {
    scale: 1,
    transition: "tween"
  },
  idle: {
    scale: 0,
    transition: "tween"
  }
});
const StyledModal = styled(Modal)`
  background: #f5f5f5;
  position: fixed;
  top: 0;
  width: 100%;
  height: 100vh;
  z-index: 999;
  border-radius: 4px;
  display: flex;
`;

class Account extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false
    };
    this.onPaymentSubmit = this.onPaymentSubmit.bind(this);
    this.onCancelOrder = this.onCancelOrder.bind(this);
  }

  componentDidMount() {
    const { onLoadAccount, match, app, setTitle, history } = this.props;

    // onLoadAccount(match.path);

    this.props.fetchOrders();

    let pathSegments = match.url.split("/");
    let title = toTitleCase(pathSegments[pathSegments.length - 1]);

    setTitle({
      title
    });

    this.props.history.listen(e => {
      let newPathSegments = e.pathname.split("/");
      let newTitle = toTitleCase(newPathSegments[newPathSegments.length - 1]);

      setTitle({
        title: newTitle
      });
    });
  }

  // componentWillUpdate() {
  //   const { setTitle, match } = this.props;

  //   let pathSegments = match.url.split("/");
  //   let title = toTitleCase(pathSegments[pathSegments.length - 1]);

  //   setTitle({
  //     title
  //   });
  // }

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
                onPaymentSubmit: this.onPaymentSubmit,
                onCancelOrder: this.onCancelOrder
              });
            }}
          />
        </Flex>
      </Flex>
    );
  }

  onPaymentSubmit(event) {
    event.preventDefault();
    const paymentQueryURL = "https://steemconnect.com/sign/transfer?";
    const paymentAddress = "instachaw";
    const amount = `${this.props.account.paymentAmount} STEEM`;
    const memo = "This is a test memo";
    const redirect_uri = "http://localhost:3333/processTransaction";
    const paymentQueryString = `to=${paymentAddress}&amount=${amount}&memo=${memo}&redirect_uri=${redirect_uri}`;

    window.open(encodeURI(`${paymentQueryURL}${paymentQueryString}`.trim()));
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
    account.wallets.filter(currentWallet => currentWallet.title == wallet)[0]
      .balance;

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
    cancelOrder: data => dispatch(cancelOrder(data)),
    setPaymentModalStatus: data => dispatch(setPaymentModalStatus(data)),
    setPaymentAmount: data => dispatch(setPaymentAmount(data))
  };
};

const withReducer = reducerInjector(REDUCER_NAME, accountReducer)(Account);

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(withReducer)
);
