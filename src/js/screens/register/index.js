import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { SyncLoader } from "react-spinners";
import reducerInjector from "../../redux/reducerInjector";
import { withRouter, Link } from "react-router-dom";

import { getAppState } from "../../containers/app/reducer";
import { setHeaderVisibility } from "../../containers/header/actions";
import { setFooterVisibility } from "../../containers/footer/actions";

import { fetchRegister, attemptRegistration } from "./actions";
import { REDUCER_NAME } from "./constants";
import { registerReducer, getRegisterState } from "./reducer";

import {
  Card,
  Heading,
  Flex,
  Text,
  Link as UILink,
  Box,
  BlockLink,
  OutlineButton,
  IconButton
} from "pcln-design-system";
import { Button, Input, Label } from "../../components/UI/atoms";
import { BrandLogo } from "../../components/UI/atoms";
import styled from "styled-components";

class Register extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      username: "",
      name: "",
      password: "",
      phone: "",
      registrationNotice: ""
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
          height: "100%",
          left: "50%",
          transform: "translateX(-50%)"
        }}
        width={[1, 0.9, 0.7]}
      >
        <form method="get" onSubmit={this.handleRegistrationSubmit}>
          <Flex flexDirection="column" justify="center" alignItems="center">
            <Flex mb={3} alignItems="center" justify="center">
              <BrandLogo height="45px" color="red" />
            </Flex>

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
                type="email"
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
                Fullname <sup style={{ color: "red" }}>*</sup>
              </Label>
              <Input
                onChange={e =>
                  this.setState({
                    name: e.target.value
                  })}
                value={this.state.name}
                id="name"
              />
              <Text fontSize={0}>Something like 'John Robert'.</Text>
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

            <Box mb={this.state.registrationNotice.length > 1 ? 1 : 3}>
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

            {this.state.registrationNotice.length > 0 && (
              <Box mb={3}>
                <Text align="right" fontSize={0} color="red">
                  {this.state.registrationNotice}
                </Text>
              </Box>
            )}

            <Box>
              <Button
                disabled={
                  this.props.register.isAttemptingRegistration ||
                  !this.isValidForm()
                }
                fullWidth
              >
                {!this.props.register.isAttemptingRegistration ? (
                  <Text>Create account instantly</Text>
                ) : (
                  <SyncLoader color={"#f1f1f1"} size={10} loading={true} />
                )}
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
                  color="blue"
                  style={{
                    textDecoration: "underline"
                  }}
                >
                  Proceed to Login
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
    const { username, name, email, password, phone } = this.state;

    this.props.attemptRegistration(
      {
        username,
        name,
        email,
        password,
        phone
      },
      response => {
        if (typeof response !== "undefined") {
          typeof response.user === "undefined"
            ? this.setState({
                registrationNotice: response[0].message
              })
            : this.navigateToLocation("/");
        }
      }
    );
  }

  navigateToLocation(location) {
    this.props.history.push(location);
  }

  isValidForm() {
    let fields = ["username", "name", "email", "password", "phone"];

    return (
      this.state[fields[0]].length &&
      this.state[fields[1]].length &&
      this.state[fields[2]].length &&
      this.state[fields[3]].length &&
      this.state[fields[4]].length
    );
  }
}

const mapStateToProps = state => {
  return {
    register: getRegisterState(state).toJS()
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLoadRegister: data => dispatch(fetchRegister(data)),
    attemptRegistration: (data, cb) => dispatch(attemptRegistration(data, cb)),
    setHeaderVisibility: data => dispatch(setHeaderVisibility(data)),
    setFooterVisibility: data => dispatch(setFooterVisibility(data))
  };
};

const withReducer = reducerInjector(REDUCER_NAME, registerReducer)(Register);
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(withReducer)
);
