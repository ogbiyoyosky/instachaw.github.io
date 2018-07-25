import React from "react";
import PropTypes from "prop-types";
import { Flex, Icon, Input, Text } from "pcln-design-system";
import { Link } from "react-router-dom";

import Styled from "styled-components";

const TabBarWrapper = Styled(Flex)`
    width: 100%;
`;

const Tab = Styled(Flex)`
    border: 1px solid #efefef;
    flex: 1;
    height: 40px;
    align-items: center;
    justify-content: center;
`;

const TabBarLink = Styled(Link)`
    width: 100%;
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    text-decoration: none;
`;

const TabBar = ({ tabItems, activeTabPath, ...props }) => {
  return (
    <TabBarWrapper {...props}>
      {tabItems.length &&
        tabItems.map((tabItem, i) => (
          <Tab
            width={1 / tabItems.length}
            flexDirection="column"
            alignItems="center"
            key={i}
            bg={activeTabPath === tabItem.path ? "white" : null}
          >
            <TabBarLink to={tabItem.path}>
              <Text
                fontSize={1}
                color={activeTabPath === tabItem.path ? "black" : "gray"}
              >
                {tabItem.label}
              </Text>
            </TabBarLink>
          </Tab>
        ))}
    </TabBarWrapper>
  );
};

TabBar.propTypes = {
  tabItems: PropTypes.array
};

TabBar.displayName = "TabBar";

TabBar.defaultProps = {
  tabItems: []
};

export default TabBar;
