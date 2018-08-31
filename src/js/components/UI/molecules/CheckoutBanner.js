import React from "react";
import PropTypes from "prop-types";
import { Box, Icon, Flex, Text } from "pcln-design-system";

const CheckoutBanner = props => {
  return (
    <Flex
      flexDirection="column"
      style={{
        position: "fixed",
        bottom: props.bottom,
        zIndex: props.isVisible ? 30 : -30,
        transform: props.isVisible ? "translateX(0)" : "translateX(-120%)",
        transition: "transform 0.5s ease-in"
      }}
      width={1}
    >
      <Flex
        bg="green"
        px={3}
        py={3}
        width={1}
        style={{ opacity: 0.9, position: "relative" }}
        onClick={e => props.onClick(e)}
      >
        <Flex flexDirection="column" alignItems="center" justify="center">
          <Text color="white" fontSize={2} align="center">
            Take me to the next step (2/3)
          </Text>
        </Flex>

        <Flex
          style={{
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            right: "16px",
            width: "40px",
            border: "1px solid white"
          }}
          flexDirection="column"
          alignItems="center"
          justify="center"
          py={2}
        >
          <Flex alignItems="center" justify="center">
            <Icon name="arrowRight" color="white" />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

CheckoutBanner.propTypes = {
  isVisible: PropTypes.bool
};

CheckoutBanner.defaultProps = {
  isVisible: false,
  bottom: "80px"
};

export default CheckoutBanner;
