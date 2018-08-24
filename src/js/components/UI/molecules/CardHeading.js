import React from "react";
import PropTypes from "prop-types";
import { Icon, Flex, Link as UILink, Text } from "pcln-design-system";

const CardHeading = props => {
  return (
    <Flex>
      <Text style={{ flex: 2 }} fontSize={2} mb={2} bold>
        {props.title}
      </Text>
      <Flex onClick={props.onToggleClick} style={{ marginTop: "-8px" }}>
        <Flex flexDirection="column" justify="center">
          <UILink>
            <Text mr={1} color="blue" fontSize={1}>
              {props.isMinimized ? props.expandLabel : props.shrinkLabel}
            </Text>
          </UILink>
        </Flex>

        <Flex flexDirection="column" justify="center">
          <Icon
            size={14}
            name="chevronDownThick"
            style={{
              transform: props.isMinimized ? "rotate(0)" : "rotate(180deg)",
              transition: "transform 0.3s ease-in-out"
            }}
            color="blue"
          />
        </Flex>
      </Flex>
    </Flex>
  );
};

CardHeading.propTypes = {
  title: PropTypes.string,
  isMinimized: PropTypes.bool,
  onToggleClick: PropTypes.func,
  expandLabel: PropTypes.string,
  shrinkLabel: PropTypes.string
};

CardHeading.defaultProps = {
  isMinimized: false,
  expandLabel: "More Methods",
  shrinkLabel: "Less Methods"
};

export default CardHeading;
