import React from "react";
import { connect } from "react-redux";
import { withRouter, Link as RouterLink } from "react-router-dom";
import reducerInjector from "../../redux/reducerInjector";
import { REDUCER_NAME } from "./constants";
import { setDockItemActive, setFooterVisibility } from "./actions";
import { footerReducer, getFooterState } from "./reducer";
import { getCartState } from "../../screens/cart/reducer";
import DockItems from "../../../../service/dock-items.json";
import { toTitleCase } from "../../util/util";
import {
  Flex,
  Box,
  Link,
  BlockLink,
  Badge,
  OutlineButton,
  Text,
  Icon
} from "pcln-design-system";
import styled from "styled-components";

const Dock = styled(Flex)`
  position: fixed;
  width: 100%;
  bottom: 0;
  zindex: 999;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
`;

const DockIcon = styled(Icon)`
  :hover {
    color: black;
  }
`;

const DockItem = props => {
  return (
    <RouterLink
      style={{ textDecoration: "none" }}
      key={props.index}
      to={props.path}
    >
      <Flex justify="center" align="center">
        <Flex
          align="center"
          flexDirection="column"
          justifyContent="center"
          py={3}
        >
          <Flex
            style={{
              position: "relative"
            }}
          >
            <DockIcon
              name={props.icon}
              size={32}
              color={props.isActiveDockItem ? "black" : "gray"}
            />
            {props.badgeData !== null && (
              <Badge
                bg={props.badgeBG}
                style={{
                  height: "20px",
                  width: "20px",
                  textIndent: "-1px",
                  lineHeight: "13px",
                  right: "-15px",
                  position: "absolute"
                }}
              >
                {props.badgeData}
              </Badge>
            )}
          </Flex>

          <Text color={props.isActiveDockItem ? "black" : "gray"} fontSize={1}>
            {toTitleCase(props.name)}
          </Text>
        </Flex>
      </Flex>
    </RouterLink>
  );
};

DockItem.defaultProps = {
  badgeData: null
};

class Footer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.props.history.listen(() => {
      this.props.onSetDockItemActive({
        path: location.pathname
      });
      this.props.setFooterVisibility({
        isFooterVisible: true
      });
    });
  }

  componentDidMount() {
    const { onSetDockItemActive } = this.props;
    // set active dock link
    onSetDockItemActive({
      path: location.pathname
    });
  }

  render() {
    return (
      <Dock
        bg="white"
        px={3}
        style={{
          transform: !this.props.footer.isFooterVisible
            ? "translateY(90px)"
            : "translateY(0)",
          display: !this.props.footer.isFooterVisible ? "none" : "inherit",
          transition: "transform 0.3s ease-in"
        }}
      >
        {DockItems.map((item, index) => {
          return (
            <Box width={1 / 3} key={index}>
              {item.hasOwnProperty("alternates") &&
              this.props.footer.activeDockItem.indexOf(item.path) !== -1
                ? this.renderItemWithAlternates(item)
                : this.renderItem(item, index)}
            </Box>
          );
        })}
      </Dock>
    );
  }

  renderItemWithAlternates(item) {
    return this.props.footer.activeDockItem !== item.path
      ? item.alternates.map((alternate, altIndex) => {
          return (
            this.props.footer.activeDockItem === alternate.path && (
              <DockItem
                key={altIndex}
                index={altIndex}
                name={alternate.name}
                path={alternate.path}
                isActiveDockItem={true}
                icon={alternate.icon}
              />
            )
          );
        })
      : this.renderItem(item);
  }

  renderItem(item, index) {
    let badgeData = item.name === "cart" ? this.props.cart.items.length : null;
    return (
      <DockItem
        index={index}
        path={item.path}
        name={item.name}
        icon={item.icon}
        badgeData={badgeData}
        badgeBG={this.props.cart.items.length > 0 ? "red" : "gray"}
        isActiveDockItem={this.props.footer.activeDockItem === item.path}
      />
    );
  }
}

const mapStateToProps = state => {
  const footer = getFooterState(state).toJS();
  const cart = getCartState(state).toJS();

  return {
    footer,
    cart
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSetDockItemActive: data => dispatch(setDockItemActive(data)),
    setFooterVisibility: data => dispatch(setFooterVisibility(data))
  };
};

const withReducer = reducerInjector(REDUCER_NAME, footerReducer)(Footer);

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(withReducer)
);
