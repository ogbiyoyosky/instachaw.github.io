import React from "react";
import PropTypes from "prop-types";
import { Card, Icon, Flex, Heading, Text } from "pcln-design-system";

const NotificationFeed = props => {
  return props.notifications.map((notification, i) => (
    <Flex key={i} mb={3}>
      <Icon
        mr={4}
        name="notification"
        color={notification.isUnread ? "black" : "gray"}
        size={32}
      />

      <Flex flexDirection="column">
        <Heading.h4
          color={notification.isUnread ? "black" : "gray"}
          bold={notification.isUnread}
        >
          {notification.title}
        </Heading.h4>

        <Text.p color={notification.isUnread ? "black" : "gray"}>
          {notification.body}
        </Text.p>
      </Flex>
    </Flex>
  ));
};

NotificationFeed.defaultName = "NotificationFeed";

NotificationFeed.defaultProps = {
  notifications: []
};

NotificationFeed.propTypes = {
  notifications: PropTypes.array
};

export default NotificationFeed;
