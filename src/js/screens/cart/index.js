import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Autocomplete from "react-autocomplete";
import { withRouter, Link } from "react-router-dom";

import reducerInjector from "../../redux/reducerInjector";
import { REDUCER_NAME } from "./constants";
import { fetchCart, clearCart, setCartModalStatus } from "./actions";
import { cartReducer, getCartState } from "./reducer";
import { setHeaderVisibility } from "../../containers/header/actions";
import { setFooterVisibility } from "../../containers/footer/actions";
import { getAppState } from "../../containers/app/reducer";
import { getAccountState } from "../../screens/account/reducer";
import { getCheckoutState } from "../../screens/checkout/reducer";
import {
  setPaymentMethod,
  setDeliveryAddress
} from "../../screens/checkout/actions";
import { roundToDecimalPlaces } from "../../util/util";
import {
  Card,
  Heading,
  Flex,
  Icon,
  Input,
  InputField,
  Text,
  BlockLink,
  Link as UILink,
  OutlineButton,
  Box,
  GreenButton,
  IconButton
} from "pcln-design-system";
import Feed from "../../containers/feed";
import styled from "styled-components";
import posed from "react-pose";
import { tween } from "popmotion";

const items = [
  {
    id: 1,
    title: "Cheese Hamburger",
    price: "$2.99",
    description: "Cheese Hamburgers are delectable",
    photo: "hamburger.jpg"
  }
];

const ActionStripContainer = styled(Card)``;

const LocationCard = props => {
  return (
    <Card bg="lightGray">
      <Box pt={2} pb={3} px={3}>
        <Flex>
          <Flex style={{ flex: 4 }}>
            <Text fontSize={2} bold>
              Add an Address
            </Text>
          </Flex>
          <Flex>
            <Icon color="gray" mt={1} size={14} name="chevronDown" />
          </Flex>
        </Flex>
        <Flex mb={2}>
          <Text color="gray" fontSize={0}>
            A correct address means faster delivery.
          </Text>
        </Flex>

        <Box>
          <Autocomplete
            style={{
              background: "white",
              width: "100%"
            }}
            value={props.currentDeliveryAddress}
            onChange={e => {
              props.onSetDeliveryAddress(e.target.value);
            }}
            getItemValue={address => address.body}
            items={props.userAddresses}
            renderItem={(address, isHighlighted) => {
              return (
                <Card
                  borderColor="white"
                  key={address.id}
                  style={{
                    background: isHighlighted ? "#007aff" : "white",
                    color: isHighlighted ? "white" : "inherit",
                    borderBottom: address.id != 2 ? "1px solid #ececec" : null
                  }}
                  px={2}
                  pt={2}
                >
                  {address.body}
                </Card>
              );
            }}
            inputProps={{
              onFocus: e => e.target.select()
            }}
            renderInput={props => (
              <input
                id="location"
                style={{
                  height: "40px",
                  display: "block",
                  width: "100%",
                  padding: "0 10px",
                  fontSize: "90%",
                  border: "1px solid #efefef"
                }}
                placeholder="Example: Room 2, Cali Villa, Alaska"
                {...props}
              />
            )}
            menuStyle={{
              borderRadius: "3px",
              boxShadow: "0 2px 12px rgba(0, 0, 0, 0.1)",
              background: "rgba(255, 255, 255, 1)",
              padding: "5px 0 10px",
              width: "100%",
              top: "40px",
              left: 0,
              fontSize: "85%",
              position: "absolute",
              zIndex: 999,
              overflow: "auto"
            }}
            wrapperStyle={{
              display: "block",
              position: "relative",
              zIndex: 9999,
              width: "100%"
            }}
            onSelect={val => props.onSetDeliveryAddress(val)}
          />
        </Box>
      </Box>
    </Card>
  );
};

const ActionStrip = props => {
  return (
    <ActionStripContainer
      boxShadowSize="md"
      bg={props.bg}
      px={3}
      py={2}
      {...props}
    >
      <Flex>
        <Flex justify="center" mr={3} flexDirection="column">
          <Icon color={props.color} size={20} name={props.icon} />
        </Flex>
        <Flex
          style={{
            flex: 5
          }}
        >
          <Text fontSize={1} color={props.color}>
            {props.message}
          </Text>
        </Flex>
        <Flex justify="center" flexDirection="column">
          <Icon color={props.color} size={20} name={props.actionIcon} />
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
        <Text fontSize={2} mb={2} bold>
          Change Payment Method
        </Text>
        <Box>
          <Box mb={1}>
            <label>
              <ActionStrip
                bg={props.activePaymentMethod === "STEEM" ? "blue" : "white"}
                icon={
                  props.activePaymentMethod === "STEEM" ? "check" : "creditCard"
                }
                color={props.activePaymentMethod !== "STEEM" ? "blue" : "white"}
                message="Pay with STEEM"
                onClick={e => props.onSetActivePaymentMethod("STEEM")}
              />
              <input
                type="radio"
                name="payment-method"
                value="STEEM"
                style={{ display: "none" }}
              />
            </label>
          </Box>
          <Text fontSize={0} color="gray" mb={1} align="center">
            or
          </Text>
          <label>
            <ActionStrip
              bg={props.activePaymentMethod === "cash" ? "blue" : "white"}
              icon={
                props.activePaymentMethod === "cash" ? "check" : "creditCard"
              }
              color={props.activePaymentMethod !== "cash" ? "blue" : "white"}
              onClick={e => props.onSetActivePaymentMethod("cash")}
              message="Pay with Cash"
            />
            <input
              type="radio"
              name="payment-method"
              value="cash"
              style={{ display: "none" }}
            />
          </label>
        </Box>
      </Box>
    </Card>
  );
};

const TimeCard = props => {
  return (
    <Card bg="lightGray">
      <Box pt={2} pb={3} px={3}>
        <Text fontSize={2} mb={2} bold>
          Time
        </Text>
        <Box>
          <Box mb={2}>
            <ActionStrip icon="clock" message="As soon as possible" />
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

const CheckoutInfo = props => {
  return (
    <Flex flexDirection="column" {...props}>
      <Text fontSize={2} mb={3} bold>
        Complete Checkout
      </Text>
      <Box mb={3}>
        <LocationCard {...props} />
      </Box>

      <Box mb={3}>
        <PaymentCard {...props} />
      </Box>

      {/* <Box mb={3}>
        <TimeCard {...props} />
      </Box> */}
    </Flex>
  );
};

const Summary = props => {
  return (
    <Flex flexDirection="column" {...props}>
      <Flex mb={3}>
        <Text style={{ flex: 4 }} fontSize={3} bold>
          Summary
        </Text>

        <Flex onClick={props.onSummaryToggleClick}>
          <Flex flexDirection="column" justify="center">
            <Text mr={1} color="blue" fontSize={1}>
              {props.isMinimized ? "See Details" : "Hide Details"}
            </Text>
          </Flex>

          <Flex flexDirection="column" justify="center">
            <Icon
              size={14}
              name="chevronDownThick"
              style={{
                transform: props.isMinimized ? "rotate(0)" : "rotate(180deg)",
                transition: "transform 0.3s ease-in-out"
              }}
              color="blue"
            />
          </Flex>
        </Flex>
      </Flex>

      <Flex
        flexDirection="column"
        style={{
          height: props.isMinimized ? 0 : "60px",
          overflowY: "hidden",
          transition: "height 0.3s ease-in-out"
        }}
      >
        <Flex mb={2}>
          <Text fontSize={1} regular>
            Subtotal
          </Text>
          <Text color="gray" ml="auto" fontSize={1} regular>
            {props.subtotal}
          </Text>
        </Flex>

        <Flex mb={3}>
          <Text fontSize={1} regular>
            VAT
          </Text>
          <Text color="gray" ml="auto" fontSize={1} regular>
            {props.vat}
          </Text>
        </Flex>
      </Flex>

      <Flex>
        <Text color="gray" fontSize={1} bold>
          Total
        </Text>
        <Text ml="auto" fontSize={1} bold>
          N{roundToDecimalPlaces(props.total)}
        </Text>
      </Flex>
    </Flex>
  );
};

Summary.propTypes = {
  isMinimized: PropTypes.bool,
  onSummaryToggleClick: PropTypes.func
};

Summary.defaultProps = {
  isMinimized: true
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
  min-height: 80vh;
  border-radius: 4px;
`;

class Cart extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      isSummaryMinimized: true,
      paymentMethod: "STEEM"
    };
    this.setActivePaymentMethod = this.setActivePaymentMethod.bind(this);
    this.setCurrentDeliveryAddress = this.setCurrentDeliveryAddress.bind(this);
  }

  componentDidMount() {
    const {
      setHeaderVisibility,
      setFooterVisibility,
      onLoadCart,
      match,
      app
    } = this.props;

    setTimeout(() => {
      setHeaderVisibility({
        isHeaderVisible: false
      });
      setFooterVisibility({
        isFooterVisible: false
      });
    }, 200);

    if (app.url !== match.url) {
      onLoadCart(match.path);
    }
  }

  render() {
    const subtotal = roundToDecimalPlaces(
      this.props.cart.items.reduce(
        (total, item) =>
          total + parseFloat(item.price) * parseInt(item.qty, 10),
        0
      )
    );
    const vat = roundToDecimalPlaces(
      this.props.cart.items.reduce(
        (total, item) => total + parseFloat(item.vat) * parseInt(item.qty, 10),
        0
      )
    );
    const total = roundToDecimalPlaces(
      parseFloat(subtotal, 10) + parseFloat(vat, 10)
    );
    return this.props.cart.items.length ? (
      <Flex mt={3} px={3} flexDirection="column">
        <StyledModal
          pose={this.props.cart.isCartModalOpen ? "fullscreen" : "idle"}
          style={{
            display: !this.props.cart.isCartModalOpen ? "none" : "block"
          }}
        >
          <Flex alignItems="center" justify="center">
            <Flex p={2} flexDirection="column" width={[1, 0.9, 0.7, 0.7]}>
              <Flex mb={2}>
                <Text fontSize={3} bold style={{ flex: 0.999 }}>
                  {`${this.props.cart.items.length - 1} More`}
                  {this.props.cart.items.length - 1 === 1 ? "Treat" : "Treats"}
                </Text>

                <IconButton
                  size={32}
                  color="#999"
                  borderColor="transparent"
                  name="close"
                  onClick={e => this.props.setCartModalStatus(false)}
                />
              </Flex>

              <Flex flexDirection="column">
                <Feed
                  items={this.props.cart.items.filter(
                    (item, index) => index !== 0
                  )}
                  highlightSelectedItem={false}
                />
              </Flex>
            </Flex>
          </Flex>
        </StyledModal>
        <Flex alignItems="center" justify="center">
          <Flex
            style={{
              display: this.props.cart.isCartModalOpen ? "none" : "block"
            }}
            width={[1, 0.9, 0.7, 0.7]}
          >
            <Flex mb={3}>
              <Flex style={{ flex: 2 }}>
                <Text fontSize={3} mr={2} bold>
                  My Order
                </Text>
                <Text regular color="gray" mt={2} fontSize={0}>
                  ( {this.props.cart.items.length}{" "}
                  {this.props.cart.items.length == 1 ? "Item" : "Items"} )
                </Text>
              </Flex>
              <Flex alignItems="flex-end" mt={2}>
                <UILink
                  onClick={e =>
                    confirm("Take this action?") && this.props.clearCart()}
                >
                  <Text fontSize={0}>Clear Order</Text>
                </UILink>
              </Flex>
            </Flex>

            <Feed items={[this.props.cart.items[0]]} />
            {this.props.cart.items.length > 1 && (
              <Flex mb={3}>
                <OutlineButton
                  py={2}
                  onClick={e => this.props.setCartModalStatus(true)}
                  fullWidth
                >
                  See {this.props.cart.items.length - 1} more &nbsp;
                  {this.props.cart.items.length == 2 ? "treat" : "treats"}.
                </OutlineButton>
              </Flex>
            )}
            <CheckoutInfo
              onSetDeliveryAddress={this.setCurrentDeliveryAddress}
              currentDeliveryAddress={this.props.checkout.deliveryAddress}
              onSetActivePaymentMethod={this.setActivePaymentMethod}
              activePaymentMethod={this.props.checkout.paymentMethod}
              userAddresses={this.props.account.user.addresses}
            />
            <Summary
              onSummaryToggleClick={e =>
                this.setState({
                  isSummaryMinimized: !this.state.isSummaryMinimized
                })}
              isMinimized={this.state.isSummaryMinimized}
              total={total}
              subtotal={subtotal}
              vat={vat}
              mb={4}
            />
            <GreenButton
              onClick={e => this.props.history.push("/checkout")}
              mb={4}
              fullWidth
            >
              Complete Checkout
            </GreenButton>
          </Flex>
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

  setCurrentDeliveryAddress(address) {
    this.props.setDeliveryAddress({
      deliveryAddress: address
    });
  }

  setActivePaymentMethod(method) {
    this.props.setPaymentMethod({
      paymentMethod: method
    });
  }

  static fetchData(store, { path }) {
    return store.dispatch(fetchCart(path));
  }

  static getReducer() {
    return { key: REDUCER_NAME, reducer: cartReducer };
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
    setHeaderVisibility: data => dispatch(setHeaderVisibility(data)),
    setFooterVisibility: data => dispatch(setFooterVisibility(data)),
    onLoadCart: data => dispatch(fetchCart(data)),
    setCartModalStatus: data => dispatch(setCartModalStatus(data)),
    setPaymentMethod: data => dispatch(setPaymentMethod(data)),
    setDeliveryAddress: data => dispatch(setDeliveryAddress(data)),
    clearCart: data => dispatch(clearCart())
  };
};

const withReducer = reducerInjector(REDUCER_NAME, cartReducer)(Cart);

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(withReducer)
);
