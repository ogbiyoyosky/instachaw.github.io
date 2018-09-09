import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { SyncLoader } from "react-spinners";
import reducerInjector from "../../redux/reducerInjector";
import { withRouter, Link } from "react-router-dom";

import { getAppState } from "../../containers/app/reducer";
import { setHeaderVisibility } from "../../containers/header/actions";
import { setFooterVisibility } from "../../containers/footer/actions";

import {
  fetchReset,
  attemptPasswordReset,
  attemptPasswordUpdate
} from "./actions";
import { REDUCER_NAME } from "./constants";
import { resetReducer, getResetState } from "./reducer";

import {
  Card,
  Heading,
  Flex,
  Icon,
  InputField,
  Text,
  Link as UILink,
  Box,
  BlockLink
} from "pcln-design-system";
import { Button, Input, Label } from "../../components/UI/atoms";
import { BrandLogo } from "../../components/UI/atoms";
import styled from "styled-components";
import posed from "react-pose";
import { tween } from "popmotion";

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
const StyledModal = styled(Modal)`
  background: #f5f5f5;
  width: 100%;
  height: 100vh;
  border-radius: 4px;
  display: flex;
`;

class Reset extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      uid: "",
      password: ""
    };
    this.handleResetSubmit = this.handleResetSubmit.bind(this);
    this.navigateToLocation = this.navigateToLocation.bind(this);
  }

  componentDidMount() {
    const {
      setHeaderVisibility,
      setFooterVisibility,
      onLoadReset,
      match
    } = this.props;

    setTimeout(() => {
      setHeaderVisibility({
        isHeaderVisible: false
      });
      setFooterVisibility({
        isFooterVisible: false
      });
    }, 200);

    onLoadReset(match.path);
  }

  render() {
    return (
      <Flex
        style={{
          height: "100%"
        }}
      >
        <StyledModal
          pose={this.props.reset.isResetStatusModalOpen ? "fullscreen" : "idle"}
          style={{
            display: !this.props.reset.isResetStatusModalOpen ? "none" : "block"
          }}
        >
          <Flex
            p={3}
            flexDirection="column"
            justify="center"
            alignItems="center"
            style={{
              height: "100%"
            }}
          >
            {!this.props.match.params.token ? (
              <Box>
                <Box mb={2}>
                  <Text align="center" fontSize={3} bold>
                    Password Reset Link Sent.
                  </Text>

                  <Text.p align="center" fontSize={3}>
                    We've sent a password reset link to your email.
                  </Text.p>
                </Box>

                <Flex justify="center" mb={3}>
                  <Button onClick={e => this.openMailHost()}>
                    See it in your inbox
                  </Button>
                </Flex>
              </Box>
            ) : (
              <Box>
                <Box mb={2}>
                  <Text align="center" fontSize={3} bold>
                    Password succesfully reset.
                  </Text>

                  <Text.p align="center" fontSize={3}>
                    Your password was successfully updated.
                  </Text.p>
                </Box>

                <Flex justify="center" mb={3}>
                  <Button onClick={e => this.navigateToLocation("/login")}>
                    Login now
                  </Button>
                </Flex>
              </Box>
            )}

            <Flex justify="center">
              <UILink onClick={e => this.props.history.push("/login")}>
                <Flex>
                  <Icon
                    name="chevronLeft"
                    style={{
                      marginTop: "4px"
                    }}
                    size={12}
                    mr={1}
                  />
                  <Text
                    fontSize={1}
                    style={{
                      textDecoration: "underline"
                    }}
                  >
                    Return back to login
                  </Text>
                </Flex>
              </UILink>
            </Flex>
          </Flex>
        </StyledModal>

        <Flex
          px={3}
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translateY(-50%) translateX(-50%)",
            display: !this.props.reset.isResetStatusModalOpen ? "block" : "none"
          }}
          width={[1, 0.9, 0.7]}
        >
          {!this.props.match.params.token ? (
            <form
              method="get"
              onSubmit={e => {
                e.preventDefault();
                this.handleResetSubmit();
              }}
            >
              <Flex flexDirection="column" justify="center" alignItems="center">
                <Flex mb={3} alignItems="center" justify="center">
                  <BrandLogo
                    height="45px"
                    color="red"
                    onClick={e => this.navigateToLocation("/")}
                  />
                </Flex>

                <Box mb={this.props.reset.recoveryNotice.length > 0 ? 1 : 3}>
                  <Label
                    mb={1}
                    fontSize={0}
                    style={{
                      textTransform: "uppercase"
                    }}
                  >
                    Email or Username
                  </Label>
                  <Input
                    onChange={e =>
                      this.setState({
                        uid: e.target.value
                      })}
                    value={this.state.uid}
                    id="username"
                    autoFocus
                  />
                </Box>

                {typeof this.props.reset.recoveryNotice != "undefined" &&
                  this.props.reset.recoveryNotice.length > 0 && (
                    <Box mb={2}>
                      <Text fontSize={1} align="right" color="red">
                        {this.props.reset.recoveryNotice}
                      </Text>
                    </Box>
                  )}

                <Box>
                  <Button
                    disabled={
                      this.props.reset.isAttemptingReset || !this.isValidForm()
                    }
                    fullWidth
                  >
                    {!this.props.reset.isAttemptingReset ? (
                      <Text>Reset My Password</Text>
                    ) : (
                      <SyncLoader color={"#f1f1f1"} size={10} loading={true} />
                    )}
                  </Button>
                </Box>
              </Flex>
            </form>
          ) : (
            <form
              method="get"
              onSubmit={e => {
                e.preventDefault();
                this.handleResetSubmit();
              }}
            >
              <Flex flexDirection="column" justify="center" alignItems="center">
                <Flex mb={3} alignItems="center" justify="center">
                  <BrandLogo
                    height="45px"
                    color="red"
                    onClick={e => this.props.history.push("/")}
                  />
                </Flex>

                <Box mb={this.props.reset.recoveryNotice.length > 0 ? 1 : 3}>
                  <Label
                    mb={1}
                    fontSize={0}
                    style={{
                      textTransform: "uppercase"
                    }}
                  >
                    New password
                  </Label>
                  <Input
                    onChange={e =>
                      this.setState({
                        password: e.target.value
                      })}
                    value={this.state.password}
                    id="password"
                    autoFocus
                  />
                </Box>

                {typeof this.props.reset.recoveryNotice != "undefined" &&
                  this.props.reset.recoveryNotice.length > 0 && (
                    <Box mb={2}>
                      <Text fontSize={1} align="right" color="red">
                        {this.props.reset.recoveryNotice}
                      </Text>
                    </Box>
                  )}

                <Box>
                  <Button
                    disabled={
                      this.props.reset.isAttemptingReset || !this.isValidForm()
                    }
                    fullWidth
                  >
                    {!this.props.reset.isAttemptingReset ? (
                      <Text>Update My New Password</Text>
                    ) : (
                      <SyncLoader color={"#f1f1f1"} size={10} loading={true} />
                    )}
                  </Button>
                </Box>
              </Flex>
            </form>
          )}
        </Flex>
      </Flex>
    );
  }

  openMailHost() {
    let recoveryEmail = this.props.reset.recoveryEmail;
    let mailHost = recoveryEmail.split("@")[1];
    window.open(`https://${mailHost}`);
  }

  handleResetSubmit() {
    const self = this;

    if (!this.props.match.params.token) {
      this.props.attemptPasswordReset({
        uid: this.state.uid
      });
    } else {
      this.props.attemptPasswordUpdate(
        {
          password: this.state.password,
          password_confirmation: this.state.password
        },
        this.props.match.params.token
      );
    }
  }

  navigateToLocation(location) {
    this.props.history.push(location);
  }

  isValidForm() {
    return this.state.uid.length > 1 || this.state.password.length > 1;
  }
}

const mapStateToProps = state => {
  return {
    reset: getResetState(state).toJS()
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLoadReset: data => dispatch(fetchReset(data)),
    attemptPasswordReset: data => dispatch(attemptPasswordReset(data)),
    attemptPasswordUpdate: (data, token) =>
      dispatch(attemptPasswordUpdate(data, token)),
    setHeaderVisibility: data => dispatch(setHeaderVisibility(data)),
    setFooterVisibility: data => dispatch(setFooterVisibility(data))
  };
};

const withReducer = reducerInjector(REDUCER_NAME, resetReducer)(Reset);

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(withReducer)
);
