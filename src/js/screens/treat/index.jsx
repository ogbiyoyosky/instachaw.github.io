import React from "react";
import LazyLoad from "react-lazyload";
import Skeleton from "react-loading-skeleton";
import { connect } from "react-redux";
import { Parallax } from "react-parallax";
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
import { getStoreState } from "../store/reducer";
import { treatReducer, getTreatState } from "./reducer";
import {
  Flex,
  Image,
  Text,
  GreenButton,
  OutlineButton,
  IconButton,
  Icon,
  Box
} from "pcln-design-system";
import { TransparentButton, Button } from "../../components/UI/atoms";
import { ClipLoader } from "react-spinners";
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

    setActiveTreat({
      id,
      ...treats
    });

    if (app.url === match.url) {
      onLoadTreat(match.path);
    }
  }

  render() {
    const IMG_URL = `https://res.cloudinary.com/instachaw/image/upload/c_fit,w_800,h_500/v1534208541/store-${this
      .props.activeTreat.store_id}`;
    return this.props.treats.isLoadingTreats ? (
      <Flex flexDirection="column" mb={3} width={1}>
        <Box
          style={{
            height: "350px",
            width: "100%"
          }}
          mb={3}
        >
          <Skeleton width="100%" />
        </Box>

        <Box mb={3}>
          <Flex alignItems="center" justify="center">
            <Box style={{ height: "16px", width: "50%" }}>
              <Skeleton width={"100%"} />
            </Box>
          </Flex>
        </Box>
        <Box mb={1}>
          <Flex alignItems="center" justify="center">
            <Box mb={1} style={{ height: "13px", width: "75%" }}>
              <Skeleton width={"100%"} />
            </Box>
          </Flex>
        </Box>
        <Box mb={4}>
          <Flex alignItems="center" justify="center">
            <Box style={{ height: "13px", width: "75%" }}>
              <Skeleton width={"100%"} />
            </Box>
          </Flex>
        </Box>

        <Box>
          <Flex width={1} alignItems="center" justify="center">
            <Box style={{ height: "40px", width: "70%" }}>
              <Skeleton width={"100%"} />
            </Box>
          </Flex>
        </Box>
      </Flex>
    ) : (
      <Flex flexDirection="column" mt={"40px"}>
        <LazyLoad
          height={400}
          placeholder={
            <Flex
              style={{
                background: "#f5f5f5",
                height: "500px"
              }}
              flexDirection="column"
              justify="center"
              alignItems="center"
            >
              <ClipLoader width={150} loading={true} color="#888" />
            </Flex>
          }
        >
          {this.props.activeTreat !== {} && (
            <Parallax bgImage={`${IMG_URL}/${this.props.activeTreat.photo}`}>
              <Flex
                flexDirection="column"
                alignItems="center"
                justify="center"
                style={{
                  height: 300,
                  backgroundColor: "#888",
                  zIndex: -1,
                  position: "relative"
                }}
              >
                <Flex alignItems="center" justify="center">
                  <ClipLoader width={150} loading={true} color="#e5e5e5" />
                </Flex>
              </Flex>
            </Parallax>
          )}
        </LazyLoad>
        <Flex justify="center" mt={3} mb={6} alignItems="center">
          <Box width={[1, 0.9, 0.7, 0.7]}>
            <Flex flexDirection="column" px={3}>
              <Flex alignItems="center" flexDirection="column">
                <Text align="center" bold fontSize={3}>
                  {this.props.activeTreat.title}
                </Text>
                <p
                  dangerouslySetInnerHTML={{
                    __html: this.props.activeTreat.description
                  }}
                  style={{ textAlign: "center", color: "#666" }}
                />
              </Flex>
              {!getCartItemFromFeed(
                this.props.activeTreat,
                this.props.cart.items
              ) ? (
                <Button
                  onClick={e => this.props.addCartItem(this.props.activeTreat)}
                >
                  Add to Cart
                </Button>
              ) : (
                <Flex flexDirection="column">
                  <Flex mb={2}>
                    <Flex>
                      {getCartItemFromFeed(
                        this.props.activeTreat,
                        this.props.cart.items
                      ).qty !== 1 ? (
                        <TransparentButton
                          onClick={e =>
                            this.props.decrementCartItemQty(
                              this.props.activeTreat
                            )}
                        >
                          <Icon
                            size={24}
                            color="#999"
                            name="circleMinus"
                            mb={1}
                          />
                        </TransparentButton>
                      ) : (
                        <TransparentButton>
                          <Icon
                            size={32}
                            color="#999"
                            name="circlePlus"
                            style={{
                              transform: "rotate(45deg)"
                            }}
                            onClick={e =>
                              this.props.removeCartItem(this.props.activeTreat)}
                            mb={1}
                          />
                        </TransparentButton>
                      )}
                    </Flex>

                    <Flex
                      width={0.9}
                      flexDirection="column"
                      alignItems="center"
                      justify="center"
                    >
                      <Text color="gray" align="center" bold fontSize={2}>
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
                      <TransparentButton
                        onClick={e =>
                          this.props.incrementCartItemQty(
                            this.props.activeTreat
                          )}
                      >
                        <Icon size={34} color="#999" name="circlePlus" mb={1} />
                      </TransparentButton>
                    </Flex>
                  </Flex>

                  <GreenButton onClick={e => this.props.history.push("/cart")}>
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
    store: getStoreState(state).toJS(),
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
