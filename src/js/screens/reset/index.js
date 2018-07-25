import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import reducerInjector from "../../redux/reducerInjector";
import { withRouter, Link } from "react-router-dom";

import { getAppState } from "../../containers/app/reducer";
import { setHeaderVisibility } from "../../containers/header/actions";
import { setFooterVisibility } from "../../containers/footer/actions";

import { fetchReset, attemptPasswordReset } from "./actions";
import { REDUCER_NAME } from "./constants";
import { resetReducer, getResetState } from "./reducer";

import {
  Card,
  Heading,
  Flex,
  Icon,
  Input,
  Label,
  InputField,
  Text,
  Link as UILink,
  Box,
  Button,
  BlockLink,
  OutlineButton,
  IconButton
} from "pcln-design-system";
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
      uid: ""
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
      <Box
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
          justify="center"
          style={{
            width: "100%",
            transform: "translateY(-50%)",
            top: "50%",
            position: "absolute",
            display: !this.props.reset.isResetStatusModalOpen ? "block" : "none"
          }}
        >
          <form
            method="get"
            onSubmit={e => {
              e.preventDefault();
              this.handleResetSubmit();
            }}
          >
            <Flex flexDirection="column" justify="center" alignItems="center">
              <Text
                fontSize={4}
                mb={3}
                style={{
                  textAlign: "center"
                }}
                bold
              >
                Reset Password Instantly
              </Text>

              <Box mb={3}>
                <Label mb={1} fontSize={0}>
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

              <Box>
                <Button fullWidth>Reset My Password</Button>
              </Box>
              {typeof this.props.reset.recoveryNotice != "undefined" &&
                this.props.reset.recoveryNotice.length > 0 && (
                  <Box mt={2}>
                    <Text fontSize={1} color="red">
                      {this.props.reset.recoveryNotice}
                    </Text>
                  </Box>
                )}
            </Flex>
          </form>
        </Flex>
      </Box>
    );
  }

  openMailHost() {
    let recoveryEmail = this.props.reset.recoveryEmail;
    let mailHost = recoveryEmail.split("@")[1];
    window.open(`https://${mailHost}`);
  }

  handleResetSubmit() {
    const { uid } = this.state;

    this.props.attemptPasswordReset({
      uid
    });
  }

  navigateToLocation(location) {
    this.props.history.push(location);
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
    setHeaderVisibility: data => dispatch(setHeaderVisibility(data)),
    setFooterVisibility: data => dispatch(setFooterVisibility(data))
  };
};

const withReducer = reducerInjector(REDUCER_NAME, resetReducer)(Reset);

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(withReducer)
);
