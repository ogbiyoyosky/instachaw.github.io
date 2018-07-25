import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import reducerInjector from "../../redux/reducerInjector";
import { setActiveTreat, setTreatTitle, onLoadTreat } from "./actions";
import { REDUCER_NAME } from "./constants";
import {
  addCartItem,
  removeCartItem,
  incrementCartItemQty,
  decrementCartItemQty
} from "../cart/actions";
import { getAppState } from "../../containers/app/reducer";
import { getCartState } from "../cart/reducer";
import { treatReducer, getTreatState } from "./reducer";
import {
  Flex,
  Image,
  Text,
  RedButton,
  GreenButton,
  OutlineButton,
  IconButton,
  Box
} from "pcln-design-system";
import { getCartItemFromFeed } from "../../util/util";

class Treat extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let {
      treats,
      match,
      app,
      setActiveTreat,
      onLoadTreat,
      setTitle
    } = this.props;
    let id = match.params.id;

    if (app.url === match.url) {
      onLoadTreat(match.path);
    }

    setActiveTreat({
      id,
      ...treats
    });
  }

  render() {
    this.props.activeTreat === {} && <div>Loading....</div>;
    return (
      <Flex flexDirection="column">
        <Flex style={{ height: "40vh" }} mb={4} bg="lightGray">
          <Image
            style={{ borderRadius: "4px" }}
            src={`${window.location.origin}/img/${this.props.activeTreat
              .photo}`}
          />
        </Flex>
        <Flex justify="center" alignItems="center">
          <Box width={[1, 0.9, 0.7, 0.7]}>
            <Flex flexDirection="column" px={3}>
              <Flex alignItems="center" flexDirection="column">
                <Text align="center" bold fontSize={3}>
                  {this.props.activeTreat.title}
                </Text>
                <p style={{ textAlign: "center", color: "#666" }}>
                  {this.props.activeTreat.description}
                </p>
              </Flex>
              {!getCartItemFromFeed(
                this.props.activeTreat,
                this.props.cart.items
              ) ? (
                <RedButton
                  onClick={e => this.props.addCartItem(this.props.activeTreat)}
                >
                  Add to Cart
                </RedButton>
              ) : (
                <Flex flexDirection="column">
                  <Flex mb={2}>
                    <Flex>
                      {getCartItemFromFeed(
                        this.props.activeTreat,
                        this.props.cart.items
                      ).qty !== 1 ? (
                        <IconButton
                          size={24}
                          color="#999"
                          p={3}
                          borderColor="#999"
                          name="minus"
                          onClick={e =>
                            this.props.decrementCartItemQty(
                              this.props.activeTreat
                            )}
                          mb={1}
                        />
                      ) : (
                        <IconButton
                          size={24}
                          color="#999"
                          p={3}
                          borderColor="#999"
                          name="close"
                          onClick={e =>
                            this.props.removeCartItem(this.props.activeTreat)}
                          mb={1}
                        />
                      )}
                    </Flex>

                    <Flex width={0.9} flexDirection="column">
                      <Text color="gray" align="center" fontSize={1}>
                        {
                          getCartItemFromFeed(
                            this.props.activeTreat,
                            this.props.cart.items
                          ).qty
                        }
                        &nbsp;
                        {getCartItemFromFeed(
                          this.props.activeTreat,
                          this.props.cart.items
                        ).qty == 1
                          ? "Treat"
                          : "Treats"}{" "}
                        added
                      </Text>
                    </Flex>

                    <Flex alignItems="right" justifyContent="right">
                      <IconButton
                        size={24}
                        color="#999"
                        p={3}
                        borderColor="#999"
                        name="plus"
                        onClick={e =>
                          this.props.incrementCartItemQty(
                            this.props.activeTreat
                          )}
                        mb={1}
                      />
                    </Flex>
                  </Flex>

                  <GreenButton
                    onClick={e =>
                      this.props.addCartItem(this.props.activeTreat)}
                  >
                    Proceed To Checkout
                  </GreenButton>
                </Flex>
              )}
            </Flex>
          </Box>
        </Flex>
      </Flex>
    );
  }

  static getReducer() {
    return { key: REDUCER_NAME, reducer: treatReducer };
  }
}

const mapStateToProps = state => {
  return {
    app: getAppState(state).toJS(),
    treats: getTreatState(state).toJS(),
    cart: getCartState(state).toJS(),
    activeTreat: getTreatState(state).toJS().activeTreat
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLoadTreat: data => dispatch(onLoadTreat(data)),
    setTitle: data => dispatch(setTreatTitle(data)),
    setActiveTreat: data => dispatch(setActiveTreat(data)),
    addCartItem: data => dispatch(addCartItem(data)),
    removeCartItem: data => dispatch(removeCartItem(data)),
    incrementCartItemQty: data => dispatch(incrementCartItemQty(data)),
    decrementCartItemQty: data => dispatch(decrementCartItemQty(data))
  };
};

const withReducer = reducerInjector(REDUCER_NAME, treatReducer)(Treat);

export default connect(mapStateToProps, mapDispatchToProps)(withReducer);
