import React from "react";
import PropTypes from "prop-types";
import { IconButton, Flex, Text } from "pcln-design-system";
import { StyledModal } from "../../UI/atoms";
import Feed from "../../../containers/feed";

const CartModal = props => {
  return (
    <StyledModal
      pose={props.isCartModalOpen ? "fullscreen" : "idle"}
      style={{
        display: !props.isCartModalOpen ? "none" : "block"
      }}
    >
      <Flex alignItems="center" justify="center">
        <Flex p={2} flexDirection="column" width={[1, 0.9, 0.7, 0.7]}>
          <Flex mb={2}>
            <Text fontSize={3} bold style={{ flex: 0.999 }}>
              {`${props.cartItems.length - 1} More`}
              {props.cartItems.length - 1 === 1 ? " Treat" : " Treats"}
            </Text>

            <IconButton
              size={32}
              color="#999"
              borderColor="transparent"
              name="close"
              onClick={e => props.onSetCartModalStatus(false)}
            />
          </Flex>

          <Flex flexDirection="column">
            <Feed items={props.cartItems} highlightSelectedItem={false} />
          </Flex>
        </Flex>
      </Flex>
    </StyledModal>
  );
};

CartModal.propTypes = {
  isCartModalOpen: PropTypes.bool,
  cartItems: PropTypes.array
};

CartModal.defaultProps = {
  isCartModalOpen: false,
  cartItems: []
};

export default CartModal;
