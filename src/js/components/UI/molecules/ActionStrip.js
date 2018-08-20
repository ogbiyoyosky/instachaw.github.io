import React from "react";
import PropTypes from "prop-types";
import { Card, Icon, Flex, Text } from "pcln-design-system";

const ActionStrip = props => {
  return (
    <Card boxShadowSize="md" bg={props.bg} px={3} py={2} {...props}>
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
    </Card>
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

export default ActionStrip;
