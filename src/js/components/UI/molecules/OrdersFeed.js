import React from "react";
import PropTypes from "prop-types";
import Feed from "../../../containers/feed";
import fecha from "fecha";
import { Card, Flex, Link, Heading, Text } from "pcln-design-system";

const OrdersFeed = props => {
  return (
    <Flex flexDirection="column">
      {props.orders !== undefined ? (
        props.orders.length > 0 &&
        props.orders.map((order, i) => {
          let date = fecha.parse(order.created_at, "YY-MM-DD HH:mm:ss");
          return (
            <Flex key={i} flexDirection="column" mb={3}>
              <Card p={3} bg="lightGray" flexDirection="column">
                <Flex flexDirection="row" mb={1}>
                  <Text color="gray" style={{ flex: 3 }} fontSize={0}>
                    {fecha.format(date, "h:mm a, MMM Do")}
                  </Text>
                  {props.isOrderCancellable && (
                    <Link
                      onClick={e =>
                        confirm("Really want to cancel this order?") &&
                        props.onCancelOrder(order.id)}
                    >
                      <Text fontSize={0}>Cancel order</Text>
                    </Link>
                  )}
                </Flex>

                <Flex justify="center" alignItems="center">
                  <Flex style={{ flex: 3 }}>
                    <Text fontSize={1} mr={1}>
                      Code:
                    </Text>
                    <Text bold>{order.placement_code}</Text>
                  </Flex>
                  <Flex
                    flexDirection="column"
                    justify="center"
                    alignItems="center"
                  >
                    <Text color="gray" fontSize={1}>
                      <b>{order.items.length}</b>{" "}
                      {order.items.length === 1 ? "Item" : "Items"}
                    </Text>
                  </Flex>
                </Flex>

                <Flex flexDirection="row">
                  <Flex>
                    <Text fontSize={1} color="green" bold>
                      {order.total}
                    </Text>
                  </Flex>
                </Flex>
              </Card>
              <Feed
                items={order.items}
                verticalSpacing={0}
                highlightSelectedItem={false}
                showControls={false}
                useMiniFeedCard={true}
              />
            </Flex>
          );
        })
      ) : (
        <Flex>Awww...You have no orders yet.</Flex>
      )}
    </Flex>
  );
};

OrdersFeed.defaultName = "OrdersFeed";

OrdersFeed.defaultProps = {
  orderItems: []
};

OrdersFeed.propTypes = {
  orderItems: PropTypes.array
};

export default OrdersFeed;
