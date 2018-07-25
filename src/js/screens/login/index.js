import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { SyncLoader } from "react-spinners";
import { withRouter, Link } from "react-router-dom";

import reducerInjector from "../../redux/reducerInjector";

import { getAppState } from "../../containers/app/reducer";
import { setHeaderVisibility } from "../../containers/header/actions";
import { setFooterVisibility } from "../../containers/footer/actions";

import { fetchLogin, attemptLogin } from "./actions";
import { REDUCER_NAME } from "./constants";
import { loginReducer, getLoginState } from "./reducer";

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

class Login extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      uid: "minnie.sins",
      password: "hando",
      loginNotice: ""
    };
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.navigateToLocation = this.navigateToLocation.bind(this);
  }

  componentDidMount() {
    const {
      setHeaderVisibility,
      setFooterVisibility,
      onLoadLogin,
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

    onLoadLogin(match.path);
  }

  render() {
    return (
      <Flex
        px={3}
        flexDirection="column"
        justify="center"
        style={{
          height: "80%",
          position: "absolute",
          width: "100%"
        }}
      >
        <form method="get" onSubmit={this.handleLoginSubmit}>
          <Flex flexDirection="column" justify="center" alignItems="center">
            <Text
              fontSize={4}
              mb={4}
              style={{
                textAlign: "center"
              }}
            >
              Login to <strong>Delight</strong>
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
                required
                id="username"
                autoFocus
              />
            </Box>

            <Box mb={3}>
              <Flex>
                <Label
                  style={{
                    flex: 1
                  }}
                  mb={1}
                  fontSize={0}
                >
                  Password
                </Label>
                <Flex flexDirection="flex-end">
                  <UILink
                    onClick={e => {
                      e.preventDefault();
                      this.navigateToLocation("/resetPassword");
                    }}
                    mb={1}
                    style={{
                      flex: 3
                    }}
                  >
                    <Text fontSize={0}>Forgot Password?</Text>
                  </UILink>
                </Flex>
              </Flex>
              <Input
                onChange={e =>
                  this.setState({
                    password: e.target.value
                  })}
                value={this.state.password}
                type="password"
                id="password"
                required
              />
            </Box>

            {this.state.loginNotice.length > 0 && (
              <Box>
                <Text color="red">{this.state.loginNotice}</Text>
              </Box>
            )}

            <Box>
              <Button
                disabled={
                  this.props.login.isAttemptingLogin || !this.isValidForm()
                }
                fullWidth
              >
                {!this.props.login.isAttemptingLogin ? (
                  <Text>Login</Text>
                ) : (
                  <SyncLoader color={"#f1f1f1"} size={10} loading={true} />
                )}
              </Button>
              <Text my={3} align="center">
                or
              </Text>
              <BlockLink
                style={{
                  textAlign: "center"
                }}
                color="gray"
                onClick={e => this.navigateToLocation("/register")}
              >
                <Text
                  color="gray"
                  style={{
                    textDecoration: "underline"
                  }}
                >
                  Create an account
                </Text>
              </BlockLink>
            </Box>
          </Flex>
        </form>
      </Flex>
    );
  }

  handleLoginSubmit(e) {
    e.preventDefault();
    const { uid, password } = this.state;

    this.props.attemptLogin(
      {
        uid,
        password
      },
      response => {
        console.log(response[0].message);
        // response.user == undefined
        //   ? this.setState({
        //       loginNotice: response.message
        //     })
        //   : this.navigateToLocation("/");
      }
    );
  }

  navigateToLocation(location) {
    this.props.history.push(location);
  }

  isValidForm() {
    return this.state.uid.length && this.state.password.length;
  }
}

const mapStateToProps = state => {
  return {
    login: getLoginState(state).toJS()
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLoadLogin: data => dispatch(fetchLogin(data)),
    attemptLogin: (data, cb) => dispatch(attemptLogin(data, cb)),
    setHeaderVisibility: data => dispatch(setHeaderVisibility(data)),
    setFooterVisibility: data => dispatch(setFooterVisibility(data))
  };
};

const withReducer = reducerInjector(REDUCER_NAME, loginReducer)(Login);
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(withReducer)
);
