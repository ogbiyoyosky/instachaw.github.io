import React from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import LazyLoad from "react-lazyload";
import { SyncLoader, ClipLoader } from "react-spinners";
import Skeleton from "react-loading-skeleton";
import {
  Flex,
  Text,
  Button,
  Box,
  Link as UILink,
  Heading,
  Card,
  Icon,
  Image,
  IconButton
} from "pcln-design-system";
import { OutlineButton, TransparentButton } from "../../components/UI/atoms";
import { REDUCER_NAME } from "./constants";
import { getAppState } from "../../containers/app/reducer";
import { getStoreState } from "../../screens/store/reducer";
import { getCartState } from "../../screens/cart/reducer";
import {
  addCartItem,
  removeCartItem,
  incrementCartItemQty,
  decrementCartItemQty
} from "../../screens/cart/actions";
import { getCartItemFromFeed, roundToDecimalPlaces } from "../../util/util";

const FeedItemCard = props => {
  return (
    <Box>
      <Card
        width={1}
        mb={props.verticalSpacing}
        px={2}
        py={1}
        style={{ borderRadius: "4px" }}
        boxShadowSize="md"
        borderColor="white"
        bg={
          getCartItemFromFeed(props.item, props.cartItems) &&
          props.highlightSelectedItem
            ? "lightYellow"
            : "white"
        }
      >
        <Flex>
          <FeedItemThumbnail item={props.item} />

          <FeedItemArticle
            item={props.item}
            isOptionsOpen={id => props.isOptionsOpen(id)}
            onPricesOptionsExpansion={id => props.onPricesOptionsExpansion(id)}
            priceInSTEEM={props.getSTEEMEquivalent(props.item.price)}
            priceInSBD={props.getSBDEquivalent(props.item.price)}
          />

          {props.showControls && (
            <FeedItemControls
              cartItems={props.cartItems}
              item={props.item}
              onDecrementCartItemQty={props.onDecrementCartItemQty}
              onAddCartItem={props.onAddCartItem}
              onIncrementCartItemQty={props.onIncrementCartItemQty}
              onRemoveCartItem={props.onRemoveCartItem}
            />
          )}
        </Flex>
      </Card>
    </Box>
  );
};

const FeedItemThumbnail = props => {
  const THUMB_URL = `https://res.cloudinary.com/instachaw/image/upload/c_fill,w_150,h_100/v1534208541/store-${props
    .item.store_id}`;
  return (
    <Box width={1 / 4} mr={3}>
      <Link to={"/treat/" + props.item.id}>
        <Box>
          <LazyLoad
            height={300}
            placeholder={
              <Flex flexDirection="column" justify="center" alignItems="center">
                <ClipLoader width={12} loading={true} color="#c3c3c3" />
              </Flex>
            }
          >
            <Image
              style={{ borderRadius: "4px" }}
              src={`${THUMB_URL}/${props.item.photo}`}
            />
          </LazyLoad>
        </Box>
      </Link>
    </Box>
  );
};

const FeedItemArticle = props => {
  return (
    <Box>
      <Flex>
        <Link
          to={"/treat/" + props.item.id}
          style={{
            textDecoration: "none"
          }}
        >
          <Heading color="gray" fontSize={2}>
            {props.item.title}
          </Heading>
        </Link>
      </Flex>
      <Flex mb={2}>
        <Text bold color="green" mr={1} fontSize={1}>
          N{props.item.price}
        </Text>
        <UILink
          p={0}
          onClick={e => props.onPricesOptionsExpansion(props.item.id)}
        >
          <Flex>
            <Text fontSize={1} mr={1}>
              {!props.isOptionsOpen(props.item.id) ? "More" : "Less"}
            </Text>
            <Flex flexDirection="column" alignItems="center" justify="center">
              <Icon
                size={12}
                name="chevronDown"
                style={{
                  transition: "transform 0.5s ease",
                  transform: !props.isOptionsOpen(props.item.id)
                    ? `rotate(0deg)`
                    : `rotate(180deg)`
                }}
              />
            </Flex>
          </Flex>
        </UILink>
      </Flex>
      <Flex
        flexDirection="column"
        style={{
          height: !props.isOptionsOpen(props.item.id) ? 0 : "35px",
          overflowY: "hidden"
        }}
      >
        <Text color="blue" mb={1} fontSize={0}>
          <b>{!isNaN(props.priceInSTEEM) && props.priceInSTEEM}</b> STEEM
        </Text>
        <Text color="gray" fontSize={0}>
          <b>{!isNaN(props.priceInSBD) && props.priceInSBD}</b> SBD
        </Text>
      </Flex>
    </Box>
  );
};

const FeedItemControls = props => {
  const isActiveCartItem = getCartItemFromFeed(props.item, props.cartItems);
  return (
    <Box ml="auto">
      <Flex flexDirection="column">
        <TransparentButton
          py={0}
          style={{
            display: isActiveCartItem ? "block" : "none",
            animation: isActiveCartItem && "fadeInUp 0.5s ease"
          }}
          onClick={e => props.onIncrementCartItemQty(props.item)}
          ariaLabelledBy="#addItemButtonText"
        >
          <span
            style={{
              display: "none",
              height: 0,
              overflow: "hidden"
            }}
            id="addItemButtonText"
          >
            Add item button
          </span>
          <Icon size={28} color="#999" name="circlePlus" mb={1} />
        </TransparentButton>
        <Text
          color="gray"
          fontSize={0}
          bold
          style={{
            display: isActiveCartItem ? "block" : "none",
            animation: isActiveCartItem && "fadeInUp 0.5s ease",
            textAlign: "center"
          }}
        >
          {isActiveCartItem && isActiveCartItem.qty}
        </Text>

        <TransparentButton
          py={0}
          style={{
            display:
              isActiveCartItem && isActiveCartItem.qty !== 1 ? "block" : "none",
            animation:
              isActiveCartItem &&
              isActiveCartItem.qty !== 1 &&
              "fadeInUp 0.5s ease",
            transition: "0.4s opacity ease"
          }}
          onClick={e => props.onDecrementCartItemQty(props.item)}
          ariaLabelledBy="#decreaseQuantityButtonText"
        >
          <span
            style={{
              display: "none",
              height: 0,
              overflow: "hidden"
            }}
            id="decreaseQuantityButtonText"
          >
            Decrease quantity button
          </span>

          <Icon size={24} color="#999" name="circleMinus" mt={1} />
        </TransparentButton>

        <TransparentButton
          py={0}
          onClick={e => props.onRemoveCartItem(props.item)}
          style={{
            display:
              isActiveCartItem && isActiveCartItem.qty === 1 ? "block" : "none",
            animation:
              isActiveCartItem &&
              isActiveCartItem.qty === 1 &&
              "fadeInUp 0.5s ease",
            transition: "0.4s opacity ease"
          }}
          ariaLabelledBy="#removeItemButtonText"
        >
          <span
            style={{
              display: "none",
              height: 0,
              overflow: "hidden"
            }}
            id="removeItemButtonText"
          >
            Remove item button
          </span>

          <Icon
            size={30}
            color="#999"
            style={{ transform: "rotate(45deg)" }}
            name="circlePlus"
            mt={1}
          />
        </TransparentButton>
      </Flex>
      <Flex
        flexDirection="column"
        alignItems="center"
        justify="center"
        style={{
          height: "100%"
        }}
        style={{
          display: !isActiveCartItem ? "block" : "none",
          animation: !isActiveCartItem && "fadeInUp 0.5s ease"
        }}
      >
        <TransparentButton
          onClick={e => props.onAddCartItem(props.item)}
          ariaLabelledBy="#incrementText"
        >
          <span
            style={{
              display: "none",
              height: 0,
              overflow: "hidden"
            }}
            id="incrementText"
          >
            Increase quantity button
          </span>
          <Icon size={32} color="#999" name="circlePlus" />
        </TransparentButton>
      </Flex>
    </Box>
  );
};

class Feed extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onAddCartItem = this.onAddCartItem.bind(this);
    this.onRemoveCartItem = this.onRemoveCartItem.bind(this);
    this.onIncrementCartItemQty = this.onIncrementCartItemQty.bind(this);
    this.onDecrementCartItemQty = this.onDecrementCartItemQty.bind(this);
    this.renderItems = this.renderItems.bind(this);
    this.getSTEEMEquivalent = this.getSTEEMEquivalent.bind(this);
    this.getSBDEquivalent = this.getSBDEquivalent.bind(this);
    this.handlePricesOptionsExpansion = this.handlePricesOptionsExpansion.bind(
      this
    );

    this.state = {
      itemsExpanded: []
    };
  }

  componentDidUpdate() {
    // console.log(this.props.items);
  }

  componentWillUnmount() {
    this.onAddCartItem = null;
    this.onRemoveCartItem = null;
    this.onIncrementCartItemQty = null;
    this.onDecrementCartItemQty = null;
    this.renderItems = null;
    this.getSTEEMEquivalent = null;
    this.getSBDEquivalent = null;
    this.handlePricesOptionsExpansion = null;
  }

  renderItems() {
    return (
      <Box>
        {this.props.items.map(
          (item, index) =>
            typeof item === "object" && (
              <FeedItemCard
                key={index}
                item={item}
                storeID={this.props.store.activeStore.id}
                isOptionsOpen={id => {
                  return this.state.itemsExpanded.includes(id);
                }}
                onPricesOptionsExpansion={id => {
                  return this.handlePricesOptionsExpansion(id);
                }}
                isLoading={this.props.isLoading}
                getSTEEMEquivalent={this.getSTEEMEquivalent}
                getSBDEquivalent={this.getSBDEquivalent}
                cartItems={this.props.cart.items}
                highlightSelectedItem={this.props.highlightSelectedItem}
                verticalSpacing={this.props.verticalSpacing}
                onDecrementCartItemQty={this.onDecrementCartItemQty}
                onAddCartItem={this.onAddCartItem}
                onIncrementCartItemQty={this.onIncrementCartItemQty}
                onRemoveCartItem={this.onRemoveCartItem}
                showControls={this.props.showControls}
              />
            )
        )}

        {this.props.isLoading &&
          Array.from("12345").map((num, i) => {
            return (
              <Flex key={i} mb={3}>
                <Flex
                  style={{
                    height: "50px"
                  }}
                  mr={3}
                  ml={2}
                >
                  <Skeleton width={70} />
                </Flex>

                <Flex style={{ flex: 3 }}>
                  <Flex style={{ flex: 3 }} flexDirection="column">
                    <Box>
                      <Box mb={1}>
                        <Skeleton width="80%" />
                      </Box>
                      <Box style={{ height: "10px" }}>
                        <Skeleton width="50%" />
                      </Box>
                    </Box>
                  </Flex>

                  <Flex>
                    <Box style={{ height: "25px" }} mr={2}>
                      <Skeleton width={35} />
                    </Box>
                  </Flex>
                </Flex>
              </Flex>
            );
          })}
      </Box>
    );
  }

  render() {
    return (
      <Flex width={1} flexDirection="column">
        <InfiniteScroll
          dataLength={this.props.items.length} //This is important field to render the next data
          next={this.props.onFetchNextItems}
          style={{
            height: "inherit !important",
            overflow: "hidden !important"
          }}
          hasMore={this.props.items.length < this.props.itemsCount}
          loader={
            <Flex justify="center" alignItems="center">
              <SyncLoader color={"#a1a1a1"} size={8} loading={true} />
            </Flex>
          }
        >
          {this.renderItems()}
        </InfiniteScroll>
      </Flex>
    );
  }

  handlePricesOptionsExpansion(id) {
    if (!this.state.itemsExpanded.includes(id)) {
      this.setState({
        itemsExpanded: [...this.state.itemsExpanded, id]
      });
    } else {
      this.setState({
        itemsExpanded: this.state.itemsExpanded.filter(itemID => itemID !== id)
      });
    }
  }

  getSTEEMEquivalent(naira) {
    const STEEM_PRICE = this.props.app.rates["STEEM"];

    return roundToDecimalPlaces(naira / STEEM_PRICE, 3);
  }

  getSBDEquivalent(naira) {
    const SBD_PRICE = this.props.app.rates["SBD"];

    return roundToDecimalPlaces(naira / SBD_PRICE, 3);
  }

  onAddCartItem(item) {
    this.props.addCartItem(item);
  }

  onRemoveCartItem(item) {
    this.props.removeCartItem(item);
  }

  onIncrementCartItemQty(item) {
    this.props.incrementCartItemQty(item);
  }

  onDecrementCartItemQty(item) {
    this.props.decrementCartItemQty(item);
  }
}

Feed.propTypes = {
  items: PropTypes.array,
  highlightSelectedItem: PropTypes.bool,
  onFetchNextItems: PropTypes.func,
  isLoading: PropTypes.bool,
  showControls: PropTypes.bool,
  useMiniFeedCard: PropTypes.bool
};

Feed.defaultProps = {
  items: [],
  itemsCount: 0,
  isLoading: false,
  onFetchNextItems: () => {},
  verticalSpacing: 3,
  highlightSelectedItem: true,
  showControls: true,
  useMiniFeedCard: false
};

const mapStateToProps = state => {
  return {
    cart: getCartState(state).toJS(),
    store: getStoreState(state).toJS(),
    app: getAppState(state).toJS()
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addCartItem: item => dispatch(addCartItem(item)),
    removeCartItem: item => dispatch(removeCartItem(item)),
    incrementCartItemQty: item => dispatch(incrementCartItemQty(item)),
    decrementCartItemQty: item => dispatch(decrementCartItemQty(item))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Feed));
