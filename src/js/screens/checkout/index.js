import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { SyncLoader } from "react-spinners";
import { Flex, Text, Box, GreenButton } from "pcln-design-system";
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
import { getStoreState } from "../../screens/store/reducer";
import { setUser } from "../../screens/account/actions";
import { getAccountState } from "../../screens/account/reducer";
import { clearCart } from "../../screens/cart/actions";
import { OutlineButton, Radio } from "../../components/UI/atoms";
import { ActionStrip } from "../../components/UI/molecules";
import {
  AddressInputCard,
  CartEmptyState,
  PaymentCard,
  PayModeCard
} from "../../components/UI/organisms";
import {
  CheckoutInfo,
  OrderSuccessModal
} from "../../components/UI/ecosystems";

import Feed from "../../containers/feed";
import { roundToDecimalPlaces } from "../../util/util";
import UserService from "../../services/UserService";
import CheckoutService from "../../services/CheckoutService";

class Checkout extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isSummaryMinimized: true,
      isPaymentMinimized: false,
      isPaymentModeMinimized: false,
      paymentMethod: "STEEM",
      paymentMode: "on-demand",
      address: "Room 3, Vanessa Suite, Alaska",
      isAddressInputDisabled: true,
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
      app,
      account,
      cart
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

    this.userService = new UserService(account.user);
    this.checkoutService = new CheckoutService(cart);
  }

  componentWillUnmount() {
    this.setActivePaymentMethod = null;
    this.setActivePaymentMode = null;
    this.handleCheckoutSubmit = null;

    this.props.setCheckoutStatusModalVisibility({
      isCheckoutStatusModalOpen: false
    });
  }

  render() {
    const {
      account,
      app,
      attemptOrdePlacement,
      cart,
      checkout,
      history,
      setCheckoutStatusModalVisibility
    } = this.props;
    const {
      deliveryAddress,
      isAttemptingCheckout,
      isCheckoutStatusModalOpen,
      paymentMethod,
      paymentMode
    } = checkout;
    const userService = new UserService(account.user);
    const checkoutService = new CheckoutService(cart);

    let conversionRate = app.rates[paymentMethod];

    // How much does this order cost?
    let total = checkoutService.calculateOrderTotal(conversionRate);
    let userBalance = userService.retrieveWalletBalance(paymentMethod);

    return cart.items.length > 0 || isCheckoutStatusModalOpen ? (
      <Flex mt={3} px={3} flexDirection="column">
        <OrderSuccessModal
          isModalOpen={isCheckoutStatusModalOpen}
          placementCode={this.state.latestPlacementCode}
          onViewActiveOrders={e => history.push("/account/orders")}
        />
        <Flex justify="center" alignItems="center">
          <Box width={[1, 0.9, 0.7, 0.7]}>
            <Flex
              style={{
                display: isCheckoutStatusModalOpen ? "none" : "block"
              }}
            >
              <form>
                <CheckoutInfo
                  rates={app.rates}
                  amount={total}
                  getWalletBalance={wallet =>
                    userService.retrieveWalletBalance(wallet)}
                  address={checkout.deliveryAddress}
                  onSetAddress={address =>
                    this.props.setDeliveryAddress({
                      deliveryAddress: address
                    })}
                  onSetAddressInputDisabled={isAddressInputDisabled => {
                    this.setState({
                      isAddressInputDisabled: isAddressInputDisabled
                    });
                  }}
                  isAddressInputDisabled={this.state.isAddressInputDisabled}
                  onSetActivePaymentMethod={this.setActivePaymentMethod}
                  onSetActivePaymentMode={this.setActivePaymentMode}
                  activePaymentMethod={checkout.paymentMethod}
                  onPaymentToggleClick={e =>
                    this.setState({
                      isPaymentMinimized: !this.state.isPaymentMinimized
                    })}
                  onPaymentModeToggleClick={e =>
                    this.setState({
                      isPaymentModeMinimized: !this.state.isPaymentModeMinimized
                    })}
                  isPaymentMinimized={this.state.isPaymentMinimized}
                  isPaymentModeMinimized={this.state.isPaymentModeMinimized}
                  activePaymentMode={checkout.paymentMode}
                  userAddresses={
                    account.user !== null ? account.user.addresses : []
                  }
                  isUserAuthenticated={account.user !== null}
                />

                <GreenButton
                  disabled={isAttemptingCheckout || !this.isValidForm()}
                  style={{
                    cursor: "pointer"
                  }}
                  mb={4}
                  onClick={this.handleCheckoutSubmit}
                  fullWidth
                >
                  {!isAttemptingCheckout ? (
                    <Text>Place Order</Text>
                  ) : (
                    <SyncLoader color={"#f1f1f1"} size={10} loading={true} />
                  )}
                </GreenButton>
              </form>
            </Flex>
          </Box>
        </Flex>
      </Flex>
    ) : (
      <CartEmptyState
        onShowTreatsButtonClick={e => {
          history.push(
            this.props.store.activeStore.id === undefined
              ? "/store/1"
              : `/store/${this.props.store.activeStore.id}`
          );
        }}
      />
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

  handleCheckoutSubmit(event) {
    let {
      account,
      app,
      attemptOrderPlacement,
      cart,
      checkout,
      setCheckoutStatusModalVisibility
    } = this.props;
    let { deliveryAddress, paymentMethod, paymentMode } = checkout;
    let conversionRate = app.rates[paymentMethod];

    // How much does this order cost?
    let total = this.checkoutService.calculateOrderTotalWithRate(
      conversionRate
    );
    let userBalance = this.userService.retrieveWalletBalance(paymentMethod);

    if (paymentMode === "on-demand" && userBalance < total) {
      return alert(
        `You need at least ${total} ${paymentMethod} in your wallet to place your order.`
      );
    }

    const items = cart.items.map(item => {
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
        item_id: item.id,
        store_id: item.store_id
      };
    });

    const data = {
      user_id: account.user.id,
      total_amount: total,
      delivery_address: deliveryAddress,
      payment_mode: paymentMode,
      rate: conversionRate,
      payment_method: paymentMethod,
      items
    };

    var self = this;
    var { setState, userService, props } = this;
    var { clearCart, setUser } = props;

    attemptOrderPlacement(data, function(order) {
      const { total_amount } = order;
      let user = props.account.user;
      let checkout = props.checkout;
      let addresses = user.addresses;
      let currentAddress = checkout.deliveryAddress;

      self.setState({
        latestPlacementCode: order.placement_code
      });

      if (paymentMode === "on-demand") {
        userService.debitAmountFromWallet(paymentMethod, total_amount, function(
          wallets
        ) {
          setUser({
            user: {
              ...user,
              wallets
            }
          });
        });
      }

      if (!userService.hasAddress(currentAddress)) {
        userService.addToAddressBook(currentAddress, function() {
          setUser({
            user: {
              ...user,
              addresses
            }
          });
        });
      }

      setCheckoutStatusModalVisibility({
        isCheckoutStatusModalOpen: true
      });

      clearCart();
    });

    event.preventDefault();
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
    account: getAccountState(state).toJS(),
    store: getStoreState(state).toJS()
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
