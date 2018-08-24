import React from "react";
import PropTypes from "prop-types";
import { Flex, Text } from "pcln-design-system";
import { OutlineButton } from "../../UI/atoms";

const CartEmptyState = props => {
  return (
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
          <OutlineButton onClick={e => props.onShowTreatsButtonClick(e)}>
            See treats for your cart
          </OutlineButton>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default CartEmptyState;
