import React from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { SyncLoader } from "react-spinners";
import Skeleton from "react-loading-skeleton";
import {
  Flex,
  Text,
  Button,
  Box,
  Card,
  Icon,
  Image,
  IconButton
} from "pcln-design-system";
import { REDUCER_NAME } from "./constants";
import { getCartState } from "../../screens/cart/reducer";
import {
  addCartItem,
  removeCartItem,
  incrementCartItemQty,
  decrementCartItemQty
} from "../../screens/cart/actions";
import { getCartItemFromFeed, roundToDecimalPlaces } from "../../util/util";

export const FeedItemCard = props => {
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
            priceInSTEEM={props.getSTEEMEquivalent(props.item.price)}
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

export const FeedItemThumbnail = props => {
  return (
    <Box width={1 / 4} mr={3}>
      <Link to={"/treat/" + props.item.id}>
        <Image
          style={{ borderRadius: "4px" }}
          src={`${window.location.origin}/img/${props.item.photo}`}
        />
      </Link>
    </Box>
  );
};

export const FeedItemArticle = props => {
  return (
    <Box>
      <Flex>
        <Link
          to={"/treat/" + props.item.id}
          style={{
            textDecoration: "none"
          }}
        >
          <Text color="gray" fontSize={1}>
            {props.item.title}
          </Text>
        </Link>
      </Flex>
      <Flex flexDirection="flex-end">
        <Text color="green" mr={1} fontSize={0}>
          N{props.item.price}
        </Text>
        <Text bold color="green" fontSize={0}>
          ({props.priceInSTEEM} STEEM)
        </Text>
      </Flex>
    </Box>
  );
};

export const FeedItemControls = props => {
  return (
    <Box ml="auto">
      {getCartItemFromFeed(props.item, props.cartItems) && (
        <Flex flexDirection="column">
          <IconButton
            size={20}
            color="#555"
            borderColor="gray"
            name="plus"
            onClick={e => props.onIncrementCartItemQty(props.item)}
            mb={1}
          />
          <Text color="gray" fontSize={0} bold style={{ textAlign: "center" }}>
            {getCartItemFromFeed(props.item, props.cartItems).qty}
          </Text>

          {getCartItemFromFeed(props.item, props.cartItems).qty !== 1 ? (
            <IconButton
              size={20}
              color="#555"
              borderColor="gray"
              name="minus"
              onClick={e => props.onDecrementCartItemQty(props.item)}
              mt={1}
            />
          ) : (
            <IconButton
              size={20}
              color="#999"
              p={3}
              borderColor="#999"
              name="close"
              onClick={e => props.onRemoveCartItem(props.item)}
              mt={1}
            />
          )}
        </Flex>
      )}

      {!getCartItemFromFeed(props.item, props.cartItems) && (
        <IconButton
          size={32}
          color="#555"
          borderColor="lightGray"
          name="plus"
          onClick={e => props.onAddCartItem(props.item)}
        />
      )}
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
  }

  renderItems() {
    return (
      <Box>
        {this.props.items.map((item, index) => (
          <FeedItemCard
            key={index}
            item={item}
            isLoading={this.props.isLoading}
            getSTEEMEquivalent={this.getSTEEMEquivalent}
            cartItems={this.props.cart.items}
            highlightSelectedItem={this.props.highlightSelectedItem}
            verticalSpacing={this.props.verticalSpacing}
            onDecrementCartItemQty={this.onDecrementCartItemQty}
            onAddCartItem={this.onAddCartItem}
            onIncrementCartItemQty={this.onIncrementCartItemQty}
            onRemoveCartItem={this.onRemoveCartItem}
            showControls={this.props.showControls}
          />
        ))}

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
  getSTEEMEquivalent(naira) {
    const STEEM_PRICE = 400;

    return roundToDecimalPlaces(naira / STEEM_PRICE, 3);
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
    cart: getCartState(state).toJS()
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
