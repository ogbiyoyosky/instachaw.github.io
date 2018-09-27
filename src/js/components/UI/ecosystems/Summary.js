import React from "react";
import PropTypes from "prop-types";
import {
  Box,
  Card,
  Icon,
  Flex,
  Link as UILink,
  Text
} from "pcln-design-system";
import { CardHeading } from "../../UI/molecules";
import { roundToDecimalPlaces } from "../../../util/util";

const Summary = props => {
  return (
    <Flex flexDirection="column" {...props}>
      <CardHeading
        title="Summary"
        onToggleClick={props.onSummaryToggleClick}
        isMinimized={props.isMinimized}
        expandLabel="More Details"
        shrinkLabel="Less Details"
      />
      <Flex
        flexDirection="column"
        style={{
          height: props.isMinimized ? 0 : "80px",
          overflowY: "hidden",
          transition: "height 0.3s ease-in-out"
        }}
      >
        <Flex mb={2}>
          <Text fontSize={1} regular>
            Subtotal
          </Text>
          <Text color="gray" ml="auto" fontSize={1} regular>
            {props.subtotal}
          </Text>
        </Flex>

        <Flex mb={2}>
          <Text fontSize={1} regular>
            VAT
          </Text>
          <Text color="gray" ml="auto" fontSize={1} regular>
            {props.vat}
          </Text>
        </Flex>
        <Flex mb={3}>
          <Text fontSize={1} regular>
            Service fee
          </Text>
          <Text color="gray" ml="auto" fontSize={1} regular>
            {props.charge}
          </Text>
        </Flex>
      </Flex>

      <Flex>
        <Text color="gray" fontSize={1} bold>
          Total
        </Text>
        <Text ml="auto" fontSize={1} bold>
          {props.paymentMethod === "naira" && "N"}
          {roundToDecimalPlaces(props.total)}
          {props.paymentMethod !== "naira" && ` ${props.paymentMethod}`}
        </Text>
      </Flex>
    </Flex>
  );
};

Summary.propTypes = {
  isMinimized: PropTypes.bool,
  onSummaryToggleClick: PropTypes.func
};

Summary.defaultProps = {
  isMinimized: true
};

export default Summary;
