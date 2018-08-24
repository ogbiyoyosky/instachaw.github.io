import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  Flex,
  Link as UILink,
  Text,
  Button,
  Box,
  BlockLink
} from "pcln-design-system";

const Overlay = styled("div")`
  position: fixed;
  top: 30px;
  left: 0;
  background: rgba(255, 255, 255, 1);
  height: calc(100% - 34px);
  width: 100%;
  bottom: 0;
  z-index: 50;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${props => props.theme.colors.gray};
`;

const menuItems = [
  {
    title: "My Account",
    path: "/account"
  },
  {
    title: "Notifications",
    path: "/account/notifications"
  },
  {
    title: "Orders",
    path: "/account/orders"
  },
  {
    title: "Cart",
    path: "/cart"
  }
];

const Menu = props => (
  <Overlay>
    <Flex justify="center" alignItems="center">
      <Box width={[1, 0.9, 0.7, 0.7]}>
        <Flex flexDirection="column" px={3}>
          <Flex>
            <Text
              style={{ flex: 3 }}
              color="gray"
              bold
              mt={3}
              mb={3}
              fontSize={2}
            >
              Menu
            </Text>
            <Flex mt={3}>
              <UILink
                onClick={e => {
                  e.preventDefault();
                  props.onMenuClose();
                }}
                style={{ flex: 1 }}
              >
                Close Menu
              </UILink>
            </Flex>
          </Flex>
          {menuItems.map((menuItem, i) => (
            <Flex flexDirection="column" key={i} mb={2}>
              <StyledLink to={menuItem.path}>
                <Flex
                  bg="lightGray"
                  flexDirection="column"
                  p={3}
                  alignItems="center"
                  justify="center"
                >
                  <Text bold mb={2}>
                    {menuItem.title}
                  </Text>
                </Flex>
              </StyledLink>
            </Flex>
          ))}
        </Flex>
      </Box>
    </Flex>
  </Overlay>
);

export default Menu;
