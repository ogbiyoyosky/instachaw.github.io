import React from "react";
import PropTypes from "prop-types";
import { Card, Icon, Flex, Text } from "pcln-design-system";

const ActionStrip = props => {
  return (
    <Card
      boxShadowSize={props.boxShadowSize}
      bg={props.bg}
      px={3}
      py={2}
      {...props}
    >
      <Flex>
        {props.icon && (
          <Flex justify="center" mr={3} flexDirection="column">
            <Icon color={props.color} size={props.iconSize} name={props.icon} />
          </Flex>
        )}
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
          <Icon
            color={props.color}
            size={props.actionIconSize}
            name={props.actionIcon}
          />
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
  iconSize: 20,
  boxShadowSize: "md",
  actionIcon: "arrowRight",
  actionIconSize: 20,
  color: "gray",
  bg: "white"
};

export default ActionStrip;
