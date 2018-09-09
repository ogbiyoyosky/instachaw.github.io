import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { fromJS } from "immutable";

import reducerInjector from "../../redux/reducerInjector";
// import Nav from "../../components/nav/nav";
import {
  fetchHeader,
  setNavItemActive,
  setMenuOpenState,
  setAccountMenuOpenState,
  setHeaderVisibility
} from "./actions";
import { REDUCER_NAME } from "./constants";
import { getAppState } from "../app/reducer";
import { addAppNotification, deleteAppNotification } from "../app/actions";
import { getCartState } from "../../screens/cart/reducer";
import { getLoginState } from "../../screens/login/reducer";
import { getAccountState } from "../../screens/account/reducer";
import { setLoginStatus, attemptLogout } from "../../screens/login/actions";
import { headerReducer, getHeaderState } from "./reducer";
import { Link as RouterLink } from "react-router-dom";
import {
  Flex,
  Box,
  Link,
  Badge,
  BlockLink,
  Icon,
  IconButton,
  Button,
  Text
} from "pcln-design-system";
import HamburgerMenu from "../../components/navigation/hamburgerMenu";
import { BrandLogo, TransparentButton } from "../../components/UI/atoms";
import Styled from "styled-components";
import posed from "react-pose";
import { tween } from "popmotion";

const NeutralButton = Styled(TransparentButton)`
  background: transparent;
  color: #fff;
  border: 1px solid #fff;

  :focus, :visited, :active {
    color: #fff;
    border: 1px solid #fff;
  }
`;

const MenuToggle = props => (
  <Flex width={0.15} pl={1} align="center">
    <TransparentButton onClick={props.handleClick}>
      <HamburgerMenu
        isOpen={props.isMenuOpen}
        width={18}
        height={15}
        strokeWidth={1}
        rotate={0}
        color="white"
        borderRadius={0}
        animationDuration={0.5}
      />
    </TransparentButton>
  </Flex>
);

const Brand = props => (
  <Flex width={1} alignItems="center" justify="center" py={1}>
    <Flex justify="center" flexDirection="column">
      <Flex alignItems="center" justify="center">
        <BrandLogo {...props} />
      </Flex>
    </Flex>
  </Flex>
);

const Message = props => (
  <Flex width={1} py={1} {...props}>
    <Flex justify="center" width={1} flexDirection="column">
      <Flex alignItems="center" justify="center">
        <Icon name="information" pr={2} size={26} />
        <Flex flexDirection="column" justify="center" alignItems="center">
          <Text>{props.text}</Text>
        </Flex>
      </Flex>
    </Flex>
  </Flex>
);

const LoginButton = props => (
  <Flex
    width={1 / 4}
    flexDirection="column"
    alignItems="center"
    justify="center"
    pr={3}
  >
    <NeutralButton py={1} onClick={e => props.onClick(e)}>
      <Flex width={1} px={2} alignItems="center" justify="center">
        <Text fontSize={1}>Login</Text>
      </Flex>
    </NeutralButton>
  </Flex>
);

const UserButton = props => (
  <Flex
    flexDirection="column"
    justify="center"
    alignItems="center"
    mr={3}
    py={1}
  >
    <Link
      onClick={e => {
        e.preventDefault();
        props.onClick();
      }}
      style={{ textDecoration: "none" }}
    >
      <Flex flexDirection="column" width={1} alignItems="center">
        <TransparentButton py={0} px={0}>
          <Flex>
            <Icon name="user" size={28} />
            <Flex flexDirection="column" alignItems="center" justify="center">
              <Icon name="chevronDown" size={14} />
            </Flex>
          </Flex>
        </TransparentButton>
      </Flex>
    </Link>
  </Flex>
);

const CloseButton = props => (
  <Flex
    flexDirection="column"
    justify="center"
    alignItems="center"
    mr={3}
    py={1}
  >
    <Link
      onClick={e => {
        e.preventDefault();
        props.onClick();
      }}
      style={{ textDecoration: "none" }}
    >
      <Flex
        flexDirection="column"
        width={1}
        alignItems="center"
        bg="blue"
        p={1}
        style={{
          borderRadius: "100%"
        }}
      >
        <TransparentButton py={0} px={0}>
          <Flex>
            <Icon name="close" size={24} />
            <Flex flexDirection="column" alignItems="center" justify="center" />
          </Flex>
        </TransparentButton>
      </Flex>
    </Link>
  </Flex>
);

const Modal = posed.div({
  fullscreen: {
    scale: 1,
    transition: "tween"
  },
  idle: {
    scale: 0,
    transition: "tween"
  }
});
const StyledModal = Styled(Modal)`
  background: rgb(255, 255, 255);
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  z-index: 99999;
  border-radius: 4px;
  display: flex;
`;

class Header extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleMenuToggle = this.handleMenuToggle.bind(this);
    this.handleAccountMenuClose = this.handleAccountMenuClose.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.navigateToLocation = this.navigateToLocation.bind(this);
  }

  componentDidMount() {
    const {
      history,
      loginData,
      onLoadHeader,
      onSetNavItemActive,
      onSetMenuOpenState,
      onSetAccountMenuOpenState,
      setLoginStatus,
      setHeaderVisibility
    } = this.props;

    // set initial navigation item
    onSetNavItemActive({
      href: location.pathname
    });

    setLoginStatus({
      isLoggedIn: localStorage.getItem("user") ? true : false
    });

    history.listen((location, action) => {
      this.props.onSetMenuOpenState({
        isMenuOpen: false
      });
      this.props.setHeaderVisibility({
        isHeaderVisible: true
      });
      this.props.onSetAccountMenuOpenState({
        isAccountMenuOpen: false
      });
    });
  }

  handleMenuToggle(e) {
    this.props.onSetMenuOpenState({
      isMenuOpen: !this.props.header.isMenuOpen
    });
  }

  render() {
    const {
      app,
      account,
      header,
      title,
      loginData,
      onSetNavItemActive
    } = this.props;

    const { appNotifications } = app;

    return (
      <Flex>
        <StyledModal
          pose={header.isAccountMenuOpen ? "fullscreen" : "idle"}
          style={{
            display: !header.isAccountMenuOpen ? "none" : "block"
          }}
        >
          <Flex justify="center" alignItems="center" style={{ height: "100%" }}>
            <Flex
              flexDirection="column"
              justify="center"
              alignItems="center"
              width={1}
              style={{ height: "100%" }}
            >
              <Flex justify="center" alignItems="center">
                <Flex
                  p={2}
                  flexDirection="column"
                  justify="center"
                  alignItems="center"
                  style={{
                    height: "80%",
                    borderRadius: "4px"
                  }}
                  width={0.7}
                >
                  <IconButton
                    size={40}
                    style={{
                      position: "absolute",
                      top: "20px",
                      right: "20px"
                    }}
                    color="#999"
                    borderColor="transparent"
                    name="close"
                    onClick={e => this.handleAccountMenuClose()}
                  />

                  <Box mb={4}>
                    <Box mb={3}>
                      <BlockLink
                        onClick={e => {
                          e.preventDefault();
                          this.navigateToLocation("/account");
                        }}
                      >
                        <Text align="center" fontSize={4}>
                          View Account
                        </Text>
                      </BlockLink>
                    </Box>
                    <Box mb={3}>
                      <BlockLink
                        onClick={e => {
                          e.preventDefault();
                          this.navigateToLocation("/account/orders");
                        }}
                      >
                        <Text align="center" fontSize={4}>
                          See Orders
                        </Text>
                      </BlockLink>
                    </Box>
                  </Box>
                  <Box>
                    <BlockLink
                      onClick={e => {
                        e.preventDefault();
                        this.handleLogout();
                        this.navigateToLocation("/");
                      }}
                    >
                      <Text align="center" fontSize={4}>
                        Logout
                      </Text>
                    </BlockLink>
                  </Box>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </StyledModal>

        <Flex
          bg="red"
          style={{
            transform: !this.props.header.isHeaderVisible
              ? "translateY(-90px)"
              : "translateY(0)",
            transition: "transform 0.5s ease-in",
            display: !this.props.header.isHeaderVisible ? "none" : "inherit",
            position: "fixed",
            width: "100%",
            zIndex: 100
          }}
        >
          <Flex width={1} justify="center" alignItems="center">
            <Flex width={[1, 0.9, 0.7, 0.7]}>
              <MenuToggle
                isMenuOpen={header.isMenuOpen}
                handleClick={this.handleMenuToggle}
              />
              <Brand onClick={e => this.props.history.push("/")} />
              {location.pathname !== "/login" ? (
                !loginData.isLoggedIn ? (
                  <LoginButton
                    onClick={e => this.props.history.push("/login")}
                  />
                ) : (
                  <UserButton
                    onClick={e =>
                      this.props.onSetAccountMenuOpenState({
                        isAccountMenuOpen: true
                      })}
                    username={account.user.username || ""}
                  />
                )
              ) : null}
            </Flex>
          </Flex>
        </Flex>

        <Flex
          flexDirection="column"
          style={{
            opacity: appNotifications.length === 0 ? 0 : 1,
            transform:
              appNotifications.length === 0
                ? "translateY(-90px)"
                : "translateY(0)",
            transition: `transform 1.5s ease-in, opacity 1.5s ease-in`,
            position: "fixed",
            width: "100%",
            zIndex: 100
          }}
        >
          {appNotifications.length > 0 &&
            appNotifications.map((appNotification, i) => (
              <Flex bg="darkBlue" key={Math.random()} py={1}>
                <Flex width={1} justify="center" alignItems="center">
                  <Flex pl={3} width={[1, 0.9, 0.7, 0.7]}>
                    <Message text={appNotification.message} color="white" />
                    <CloseButton
                      onClick={e => {
                        this.props.deleteAppNotification({
                          message: appNotification.message
                        });
                      }}
                    />
                  </Flex>
                </Flex>
              </Flex>
            ))}
        </Flex>
      </Flex>
    );
  }

  handleLogout() {
    this.props.attemptLogout();
    this.navigateToLocation("/");
  }

  handleAccountMenuClose() {
    this.props.onSetAccountMenuOpenState({
      isAccountMenuOpen: false
    });
  }

  navigateToLocation(location) {
    this.props.history.push(location);
  }

  static fetchData(store, { path }) {
    return store.dispatch(fetchHeader(path));
  }

  static getReducer() {
    return { key: REDUCER_NAME, reducer: headerReducer };
  }
}

// maps the redux store state to the props related to the data from the store
const mapStateToProps = state => {
  const header = getHeaderState(state).toJS();
  const { title } = getAppState(state).toJS();
  const cart = getCartState(state).toJS();
  const app = getAppState(state).toJS();
  const account = getAccountState(state).toJS();
  const loginData = getLoginState(state).toJS();
  return {
    header,
    title,
    cart,
    app,
    account,
    loginData
  };
};

// specifies the behaviour, which callback prop dispatches which action
const mapDispatchToProps = dispatch => {
  return {
    attemptLogout: data => dispatch(attemptLogout()),
    onSetNavItemActive: data => dispatch(setNavItemActive(data)),
    onSetMenuOpenState: data => dispatch(setMenuOpenState(data)),
    onSetAccountMenuOpenState: data => dispatch(setAccountMenuOpenState(data)),
    addAppNotification: data => dispatch(addAppNotification(data)),
    deleteAppNotification: data => dispatch(deleteAppNotification(data)),
    setHeaderVisibility: data => dispatch(setHeaderVisibility(data)),
    setLoginStatus: data => dispatch(setLoginStatus(data))
  };
};

// inject a new reducer for this component
let withReducer = reducerInjector(REDUCER_NAME, headerReducer)(Header);

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(withReducer)
);
