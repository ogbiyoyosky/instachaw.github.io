import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { SyncLoader } from "react-spinners";
import { withRouter, Link } from "react-router-dom";
import reducerInjector from "../../redux/reducerInjector";

import { REDUCER_NAME } from "./constants";
import {
  attemptOrderPlacement,
  fetchCheckout,
  setCheckoutStatusModalVisibility,
  setDeliveryAddress,
  setPaymentMethod,
  setPaymentMode
} from "./actions";
import { checkoutReducer, getCheckoutState } from "./reducer";
import { getAppState } from "../../containers/app/reducer";
import { setHeaderVisibility } from "../../containers/header/actions";
import { setFooterVisibility } from "../../containers/footer/actions";
import { getCartState } from "../../screens/cart/reducer";
import { setUser } from "../../screens/account/actions";
import { getAccountState } from "../../screens/account/reducer";
import { clearCart } from "../../screens/cart/actions";
import {
  Card,
  Heading,
  Flex,
  Icon,
  Input,
  InputField,
  Text,
  Button,
  BlockLink,
  Link as UILink,
  Label,
  Box,
  GreenButton,
  IconButton
} from "pcln-design-system";
import { OutlineButton, Radio } from "../../components/UI/atoms";
import Feed from "../../containers/feed";
import styled from "styled-components";
import posed from "react-pose";
import { tween } from "popmotion";
import { roundToDecimalPlaces } from "../../util/util";

const ActionStripContainer = styled(Card)``;

const LocationCard = props => {
  return (
    <Card borderWidth={1} bg="white">
      <Box pt={2} pb={3} px={3}>
        <Flex mb={1}>
          <Flex style={{ flex: 4 }}>
            <Text fontSize={1} bold>
              Address
            </Text>
          </Flex>
          <Flex onClick={props.onSummaryToggleClick}>
            <Flex flexDirection="column" justify="center">
              <Icon mr={1} size={12} name="modeEdit" color="blue" />
            </Flex>

            <Flex flexDirection="column" justify="center">
              <UILink
                onClick={e => {
                  e.preventDefault();
                  props.onSetLocationInputDisabled(false);
                }}
                mr={1}
                color="blue"
                fontSize={0}
              >
                <Text fontSize={0}>Change Address</Text>
              </UILink>
            </Flex>
          </Flex>
        </Flex>
        <Flex>
          <Input
            id="location"
            value={props.location}
            style={{
              backgroundColor: props.isLocationInputDisabled ? "#eee" : "#fff",
              color: "#999"
            }}
            onFocus={e => e.target.select()}
            onChange={e => props.onLocationChange(e.target.value)}
            onBlur={e => props.onSetLocationInputDisabled(true)}
            color="lightGray"
            disabled={props.isLocationInputDisabled}
          />
        </Flex>
      </Box>
    </Card>
  );
};

LocationCard.propTypes = {
  location: PropTypes.string,
  isLocationInputDisabled: PropTypes.bool
};

LocationCard.defaultProps = {
  isLocationInputDisabled: false
};

const ActionStrip = props => {
  return (
    <ActionStripContainer
      boxShadowSize="md"
      bg={props.bg}
      px={1}
      py={2}
      {...props}
    >
      <Flex flexDirection="column">
        <Flex justify="center">
          <Icon color={props.color} size={20} name={props.icon} />
        </Flex>
        <Flex justify="center">
          <Text fontSize={0} color={props.color}>
            {props.message}
          </Text>
        </Flex>
      </Flex>
    </ActionStripContainer>
  );
};

ActionStrip.propTypes = {
  actionIcon: PropTypes.string,
  color: PropTypes.string
};

ActionStrip.defaultProps = {
  actionIcon: "arrowRight",
  color: "gray",
  bg: "white"
};

const PaymentCard = props => {
  return (
    <Card bg="lightGray">
      <Box pt={2} pb={3} px={3}>
        <Flex mb={1}>
          <Flex style={{ flex: 4 }}>
            <Text fontSize={1} bold>
              Payment Method
            </Text>
          </Flex>
          <Flex onClick={props.onSummaryToggleClick}>
            <Flex flexDirection="column" justify="center">
              <Icon size={12} name="swap" color="blue" />
            </Flex>

            <Flex flexDirection="column" justify="center">
              <UILink
                onClick={e => {
                  e.preventDefault();
                  props.onSetActivePaymentMethod(
                    props.activePaymentMethod === "naira"
                      ? props.getValidWallet()
                      : "naira"
                  );
                }}
                mr={1}
                color="blue"
                fontSize={0}
              >
                <Text fontSize={0}>Switch Payment</Text>
              </UILink>
            </Flex>
          </Flex>
        </Flex>
        <Flex>
          <Flex width={0.5} mb={1}>
            <label style={{ width: "100%" }}>
              <ActionStrip
                bg={
                  props.activePaymentMethod === "STEEM" ||
                  props.activePaymentMethod === "SBD"
                    ? "blue"
                    : "white"
                }
                icon={
                  props.activePaymentMethod === "STEEM" ||
                  props.activePaymentMethod === "SBD"
                    ? "check"
                    : "creditCard"
                }
                color={
                  props.activePaymentMethod !== "STEEM" &&
                  props.activePaymentMethod !== "SBD"
                    ? "blue"
                    : "white"
                }
                message={`${props.activePaymentMethod === "STEEM" ||
                props.activePaymentMethod === "SBD"
                  ? "Paying"
                  : "Pay"} with STEEM/SBD`}
                onClick={e =>
                  props.onSetActivePaymentMethod(props.getValidWallet())}
              />
              <input
                type="radio"
                name="payment-method"
                value="STEEM"
                style={{ display: "none" }}
              />
            </label>
          </Flex>
          <Flex width={0.5} mb={1}>
            <label
              style={{
                width: "100%"
              }}
            >
              <ActionStrip
                bg={props.activePaymentMethod === "naira" ? "blue" : "white"}
                icon={
                  props.activePaymentMethod === "naira" ? "check" : "creditCard"
                }
                color={props.activePaymentMethod !== "naira" ? "blue" : "white"}
                onClick={e => props.onSetActivePaymentMethod("naira")}
                message={`${props.activePaymentMethod === "naira"
                  ? "Paying"
                  : "Pay"} with Cash`}
              />
              <input
                type="radio"
                name="payment-method"
                value="naira"
                style={{ display: "none" }}
              />
            </label>
          </Flex>
        </Flex>
      </Box>
    </Card>
  );
};

const PayModeCard = props => {
  return (
    <Card bg="lightGray">
      <Box pt={2} pb={3} px={3}>
        <Box mb={1}>
          <Flex style={{ flex: 4 }}>
            <Text fontSize={1} bold>
              Mode of Payment
            </Text>
          </Flex>
        </Box>
        <Box>
          <Label regular fontSize="13px">
            <Flex>
              <Radio
                value="on-demand"
                id="on-demand"
                name="payment-mode"
                onChange={e => {
                  if (props.activePaymentMethod === "naira") {
                    return alert(
                      `Sorry, we only accept cash for pay on delivery at the moment.`
                    );
                  }
                  props.onSetActivePaymentMode(e.target.value);
                }}
                checked={props.activePaymentMode === "on-demand"}
              />
              <Text ml={2}>Pay on demand (immediately)</Text>
            </Flex>
          </Label>
          <Label htmlFor="on-delivery" regular fontSize="13px">
            <Flex>
              <Radio
                value="on-delivery"
                id="on-delivery"
                name="payment-mode"
                onChange={e => props.onSetActivePaymentMode(e.target.value)}
                checked={props.activePaymentMode === "on-delivery"}
              />
              <Text ml={2}>Pay on delivery (later)</Text>
            </Flex>
          </Label>
        </Box>
        <Flex />
      </Box>
    </Card>
  );
};

const CheckoutInfo = props => {
  return (
    <Flex flexDirection="column" {...props}>
      <Text fontSize={2} bold>
        Complete Checkout
      </Text>
      <Text fontSize={0} color="gray" mb={3}>
        Just a last look at your info
      </Text>
      <Box mb={3}>
        <LocationCard {...props} />
      </Box>

      <Box mb={3}>
        <PaymentCard {...props} />
      </Box>

      <Box mb={3}>
        <PayModeCard {...props} />
      </Box>
    </Flex>
  );
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
  width: 100%;
  height: 90vh;
  border-radius: 4px;
  display: flex;
`;

class Checkout extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isSummaryMinimized: true,
      paymentMethod: "STEEM",
      paymentMode: "on-demand",
      location: "Room 3, Vanessa Suite, Alaska",
      isLocationInputDisabled: true,
      latestPlacementCode: ""
    };
    this.setActivePaymentMethod = this.setActivePaymentMethod.bind(this);
    this.setActivePaymentMode = this.setActivePaymentMode.bind(this);
    this.handleCheckoutSubmit = this.handleCheckoutSubmit.bind(this);
  }

  componentDidMount() {
    const {
      setHeaderVisibility,
      setFooterVisibility,
      onLoadCheckout,
      match,
      app
    } = this.props;

    if (app.url !== match.url) {
      onLoadCheckout(match.path);
    }

    setTimeout(() => {
      setHeaderVisibility({
        isHeaderVisible: false
      });
      setFooterVisibility({
        isFooterVisible: false
      });
    }, 200);
  }

  componentWillUnmount() {
    this.setActivePaymentMethod = null;
    this.setActivePaymentMode = null;
    this.handleCheckoutSubmit = null;

    // this.props.clearCart();
    this.props.setCheckoutStatusModalVisibility({
      isCheckoutStatusModalOpen: false
    });
  }

  render() {
    const { cart, checkout } = this.props;
    return cart.items.length > 0 || checkout.isCheckoutStatusModalOpen ? (
      <Flex mt={3} px={3} flexDirection="column">
        <StyledModal
          pose={checkout.isCheckoutStatusModalOpen ? "fullscreen" : "idle"}
          style={{
            display: !checkout.isCheckoutStatusModalOpen ? "none" : "block"
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
            <Box mb={2}>
              <Text align="center" fontSize={3} bold>
                Order Placed Successfully.
              </Text>

              <Text.p align="center" fontSize={3}>
                You successfully placed an order with code &nbsp;
                <b>{this.state.latestPlacementCode}</b>.
              </Text.p>
            </Box>

            <Flex justify="center">
              <Button onClick={e => this.props.history.push("/account/orders")}>
                View Active Orders
              </Button>
            </Flex>
          </Flex>
        </StyledModal>

        <Flex justify="center" alignItems="center">
          <Box width={[1, 0.9, 0.7, 0.7]}>
            <Flex
              style={{
                display: checkout.isCheckoutStatusModalOpen ? "none" : "block"
              }}
            >
              <CheckoutInfo
                getValidWallet={() => this.getValidWallet()}
                location={this.props.checkout.deliveryAddress}
                onLocationChange={location =>
                  this.props.setDeliveryAddress({
                    deliveryAddress: location
                  })}
                onSetLocationInputDisabled={isLocationInputDisabled =>
                  this.setState({
                    isLocationInputDisabled
                  })}
                isLocationInputDisabled={this.state.isLocationInputDisabled}
                onSetActivePaymentMethod={this.setActivePaymentMethod}
                onSetActivePaymentMode={this.setActivePaymentMode}
                activePaymentMethod={this.props.checkout.paymentMethod}
                activePaymentMode={this.props.checkout.paymentMode}
              />
              <GreenButton
                disabled={
                  this.props.checkout.isAttemptingCheckout ||
                  !this.isValidForm()
                }
                onClick={e => this.handleCheckoutSubmit(e)}
                mb={4}
                fullWidth
              >
                {!this.props.checkout.isAttemptingCheckout ? (
                  <Text>Place Order</Text>
                ) : (
                  <SyncLoader color={"#f1f1f1"} size={10} loading={true} />
                )}
              </GreenButton>
            </Flex>
          </Box>
        </Flex>
      </Flex>
    ) : (
      <Flex
        px={3}
        flexDirection="column"
        justify="center"
        style={{
          height: "80%",
          position: "absolute",
          width: "100%"
        }}
      >
        <Flex
          flexDirection="column"
          justify="center"
          alignItems="center"
          style={{
            textAlign: "center"
          }}
        >
          <Text fontSize={4} mb={3} bold>
            Please fill me.
          </Text>
          <Text mb={3}>Add tons of delightful treats to your cart below.</Text>
          <Flex justify="center" alignItems="center">
            <OutlineButton onClick={e => this.props.history.push("/")}>
              See treats for your cart
            </OutlineButton>
          </Flex>
        </Flex>
      </Flex>
    );
  }

  isValidForm() {
    return this.props.checkout.deliveryAddress.length > 1;
  }

  setActivePaymentMode(mode) {
    this.props.setPaymentMode({
      paymentMode: mode
    });
  }

  setActivePaymentMethod(method) {
    this.props.setPaymentMethod({
      paymentMethod: method
    });
  }

  getPaymentAmount(paymentCurrency = "SBD") {
    let paymentAmount = this.getPaymentTotal();
    return paymentCurrency === "SBD"
      ? roundToDecimalPlaces(paymentAmount / this.props.app.rates["SBD"], 3)
      : roundToDecimalPlaces(paymentAmount / this.props.app.rates["STEEM"], 3);
  }

  getValidWallet() {
    return this.getWalletBalance("SBD") < this.getPaymentAmount("SBD")
      ? "STEEM"
      : "SBD";
  }

  getWallet(wallet) {
    return this.props.account.user !== null
      ? this.props.account.user.wallets.filter(
          currentWallet => currentWallet.title === wallet
        )[0]
      : null;
  }

  getWalletBalance(wallet) {
    return this.props.account.user !== null
      ? this.props.account.user.wallets.filter(
          currentWallet => currentWallet.title === wallet
        )[0].balance
      : 0;
  }

  getPaymentSubtotal() {
    return roundToDecimalPlaces(
      this.props.cart.items.reduce(
        (total, item) =>
          total + parseFloat(item.price) * parseInt(item.qty, 10),
        0
      )
    );
  }

  getPaymentVat() {
    return roundToDecimalPlaces(
      this.props.cart.items.reduce(
        (total, item) => total + parseFloat(item.vat) * parseInt(item.qty, 10),
        0
      )
    );
  }

  getPaymentTotal() {
    let vat = parseFloat(this.getPaymentVat(), 10);
    vat = isNaN(vat) ? 0 : vat;
    return roundToDecimalPlaces(parseFloat(this.getPaymentSubtotal(), 10));
  }

  handleCheckoutSubmit(event) {
    event.preventDefault();

    let total = this.getPaymentTotal();

    let rate = 1;
    let method = this.props.checkout.paymentMethod;

    if (method !== "naira") {
      switch (this.getValidWallet()) {
        case "SBD":
          rate = this.props.app.rates["SBD"];
          method = "SBD";
          break;

        case "STEEM":
          rate = this.props.app.rates["STEEM"];
          method = "STEEM";
          break;
      }
    }

    const placement_code = `${Math.random()
      .toFixed(36)
      .replace(/[^0-9]+/g, "")
      .substr(1, 3)}-${Math.random()
      .toString(36)
      .replace(/[^a-z]+/g, "")
      .substr(0, 3)
      .toUpperCase()}`;

    let data = {
      user_id: this.props.account.user.id,
      total_amount: roundToDecimalPlaces(total / rate, 3),
      placement_code,
      delivery_address: this.props.checkout.deliveryAddress,
      payment_mode: this.props.checkout.paymentMode,
      rate,
      payment_method: method,
      items: this.props.cart.items.map(item => {
        return {
          description: item.description,
          photo: item.photo,
          price: item.price,
          qty: item.qty,
          title: item.title,
          vat: item.vat,
          origin: item.origin,
          locale: item.locale,
          classification: item.classification,
          item_id: item.id
        };
      })
    };

    // return console.log({
    //   data,
    //   wallet: this.getValidWallet(),
    //   balance: this.getWalletBalance(this.getValidWallet())
    // });

    let { setCheckoutStatusModalVisibility } = this.props;
    var self = this;
    this.props.attemptOrderPlacement(data, function(order) {
      let user = self.props.account.user;
      let checkout = self.props.checkout;
      let addresses = user.addresses;
      let wallets = user.wallets;
      let currentAddress = checkout.deliveryAddress;

      self.setState({
        latestPlacementCode: order.placement_code
      });

      if (self.props.checkout.paymentMode === "on-demand") {
        let walletBalance = self.getWalletBalance(checkout.paymentMethod);

        let newWalletBalance = walletBalance - Number(order.total_amount);

        let wallet = {
          ...self.getWallet(checkout.paymentMethod),
          balance: newWalletBalance
        };

        wallets = wallets.filter(wlt => wlt.title !== wallet.title);

        wallets = [...wallets, wallet];

        localStorage.setItem(
          "user",
          JSON.stringify({
            ...user,
            wallets
          })
        );

        self.props.setUser({
          user: {
            ...user,
            wallets
          }
        });
      }

      if (addresses.length > 0) {
        if (
          addresses.filter(address => address.body === currentAddress)
            .length === 0
        ) {
          var newAddress = {
            id: addresses.reduce(
              (total, address) => Math.max(total, address.id) + 1
            ),
            body: currentAddress,
            user_id: user.id
          };

          addresses = [...addresses, newAddress];

          localStorage.setItem(
            "user",
            JSON.stringify({
              ...user,
              addresses
            })
          );

          self.props.setUser({
            user: {
              ...user,
              addresses
            }
          });
        }
      } else {
        var newAddress = {
          id: 1,
          body: currentAddress,
          user_id: user.id
        };

        addresses = [...addresses, newAddress];

        localStorage.setItem(
          "user",
          JSON.stringify({
            ...user,
            addresses
          })
        );

        self.props.setUser({
          user: {
            ...user,
            addresses
          }
        });
      }

      setCheckoutStatusModalVisibility({
        isCheckoutStatusModalOpen: true
      });

      self.props.clearCart();
    });
  }

  static fetchData(store, { path }) {
    return store.dispatch(fetchCheckout(path));
  }

  static getReducer() {
    return { key: REDUCER_NAME, reducer: checkoutReducer };
  }
}

const mapStateToProps = state => {
  return {
    app: getAppState(state).toJS(),
    cart: getCartState(state).toJS(),
    checkout: getCheckoutState(state).toJS(),
    account: getAccountState(state).toJS()
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLoadCheckout: data => dispatch(fetchCheckout(data)),
    clearCart: data => dispatch(clearCart()),
    setPaymentMethod: data => dispatch(setPaymentMethod(data)),
    setPaymentMode: data => dispatch(setPaymentMode(data)),
    setUser: data => dispatch(setUser(data)),
    setDeliveryAddress: data => dispatch(setDeliveryAddress(data)),
    setHeaderVisibility: data => dispatch(setHeaderVisibility(data)),
    setFooterVisibility: data => dispatch(setFooterVisibility(data)),
    attemptOrderPlacement: (data, callback) =>
      dispatch(attemptOrderPlacement(data, callback)),
    setCheckoutStatusModalVisibility: data =>
      dispatch(setCheckoutStatusModalVisibility(data))
  };
};

const withReducer = reducerInjector(REDUCER_NAME, checkoutReducer)(Checkout);

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(withReducer)
);
