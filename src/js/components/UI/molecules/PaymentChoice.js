import React from "react";
import PropTypes from "prop-types";
import { Box, Icon, Flex } from "pcln-design-system";
import { ActionStrip } from "../../UI/molecules";

const PaymentChoice = props => {
  return (
    <Box mb={1}>
      <label>
        <ActionStrip
          bg={
            props.isActivePaymentMethod
              ? props.activeMethodColor
              : props.methodColor
          }
          icon={
            props.isActivePaymentMethod
              ? props.activeMethodIcon
              : props.methodIcon
          }
          color={
            props.isActivePaymentMethod
              ? props.methodColor
              : props.activeMethodColor
          }
          onClick={e => props.onSetActivePaymentMethod(props.choice)}
          message={props.message}
        />
        <input
          type="radio"
          name="payment-method"
          value={props.choice}
          style={{ display: "none" }}
        />
      </label>
    </Box>
  );
};

PaymentChoice.propTypes = {
  choice: PropTypes.string,
  message: PropTypes.string,
  methodColor: PropTypes.string,
  activeMethodColor: PropTypes.string,
  activeMethodIcon: PropTypes.string,
  methodIcon: PropTypes.string,
  isActivePaymentMethod: PropTypes.bool,
  onSetActivePaymentMethod: PropTypes.func
};

PaymentChoice.defaultProps = {
  choice: "naira",
  methodColor: "white",
  activeMethodColor: "red",
  methodIcon: "creditCard",
  activeMethodIcon: "check",
  isActivePaymentMethod: false
};

export default PaymentChoice;
