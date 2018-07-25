import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import reducerInjector from "../../redux/reducerInjector";
import { withRouter, Link } from "react-router-dom";

import { getAppState } from "../../containers/app/reducer";
import { setHeaderVisibility } from "../../containers/header/actions";
import { setFooterVisibility } from "../../containers/footer/actions";

import { fetchRegister, attemptRegistration } from "./actions";
import { REDUCER_NAME } from "./constants";
import { registerReducer } from "./reducer";

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

class Register extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      username: "",
      password: "",
      phone: ""
    };
    this.handleRegistrationSubmit = this.handleRegistrationSubmit.bind(this);
    this.navigateToLocation = this.navigateToLocation.bind(this);
  }

  componentDidMount() {
    const {
      setHeaderVisibility,
      setFooterVisibility,
      onLoadRegister,
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

    onLoadRegister(match.path);
  }

  render() {
    return (
      <Flex
        px={3}
        py={3}
        flexDirection="column"
        justify="center"
        style={{
          position: "absolute",
          width: "100%"
        }}
      >
        <form method="get" onSubmit={this.handleRegistrationSubmit}>
          <Flex flexDirection="column" justify="center" alignItems="center">
            <Heading.h2
              fontSize={4}
              mb={3}
              regular
              style={{
                textAlign: "center"
              }}
            >
              Create an account
            </Heading.h2>

            <Box mb={3}>
              <Label mb={1} fontSize={0}>
                Email <sup style={{ color: "red" }}>*</sup>
              </Label>
              <Input
                onChange={e =>
                  this.setState({
                    email: e.target.value
                  })}
                value={this.state.email}
                id="email"
                autoFocus
              />
            </Box>

            <Box mb={3}>
              <Label mb={1} fontSize={0}>
                Phone <sup style={{ color: "red" }}>*</sup>
              </Label>
              <Input
                onChange={e =>
                  this.setState({
                    phone: e.target.value
                  })}
                value={this.state.phone}
                id="phone"
                type="number"
              />
            </Box>

            <Box mb={3}>
              <Label mb={1} fontSize={0}>
                Username <sup style={{ color: "red" }}>*</sup>
              </Label>
              <Input
                onChange={e =>
                  this.setState({
                    username: e.target.value
                  })}
                value={this.state.username}
                id="username"
              />
            </Box>

            <Box mb={3}>
              <Label mb={1} fontSize={0}>
                Password <sup style={{ color: "red" }}>*</sup>
              </Label>
              <Input
                onChange={e =>
                  this.setState({
                    password: e.target.value
                  })}
                value={this.state.password}
                type="password"
                id="password"
              />
            </Box>

            <Box>
              <Button type="submit" fullWidth>
                Register
              </Button>
              <Text my={1} align="center">
                or
              </Text>
              <BlockLink
                style={{
                  textAlign: "center"
                }}
                color="gray"
                onClick={e => this.navigateToLocation("/login")}
              >
                <Text
                  color="gray"
                  style={{
                    textDecoration: "underline"
                  }}
                >
                  Login
                </Text>
              </BlockLink>
            </Box>
          </Flex>
        </form>
      </Flex>
    );
  }

  handleRegistrationSubmit(e) {
    e.preventDefault();
    const { username, email, password, phone } = this.state;

    this.props.attemptRegistration({
      username,
      email,
      password,
      phone
    });

    this.navigateToLocation("/");
  }

  navigateToLocation(location) {
    this.props.history.push(location);
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    onLoadRegister: data => dispatch(fetchRegister(data)),
    attemptRegistration: data => dispatch(attemptRegistration(data)),
    setHeaderVisibility: data => dispatch(setHeaderVisibility(data)),
    setFooterVisibility: data => dispatch(setFooterVisibility(data))
  };
};

const withReducer = reducerInjector(REDUCER_NAME, registerReducer)(Register);
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(withReducer)
);
