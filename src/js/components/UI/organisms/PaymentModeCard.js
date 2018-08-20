import React from "react";
import {
  Box,
  Card,
  Icon,
  Flex,
  Link as UILink,
  Text
} from "pcln-design-system";
import { CardHeading } from "../../UI/molecules";
import { Label, Radio } from "../../UI/atoms";

const PaymentModeCard = props => {
  return (
    <Card bg="lightGray">
      <Box pt={2} pb={3} px={3}>
        <CardHeading
          title="Mode of Payment"
          onToggleClick={props.onPaymentModeToggleClick}
          isMinimized={props.isPaymentModeMinimized}
        />

        <Box
          style={{
            height: props.isPaymentModeMinimized ? "23px" : "46px",
            overflow: "hidden",
            transition: "height 0.3s ease-in-out"
          }}
        >
          <Label htmlFor="on-delivery" regular fontSize={2}>
            <Flex>
              <Radio
                value="on-delivery"
                id="on-delivery"
                name="payment-mode"
                onChange={e => props.onSetActivePaymentMode(e.target.value)}
                checked={props.activePaymentMode === "on-delivery"}
              />
              <Text ml={2}>Pay on delivery (later)</Text>
            </Flex>
          </Label>
          <Label regular fontSize={2}>
            <Flex>
              <Radio
                value="on-demand"
                id="on-demand"
                name="payment-mode"
                onChange={e => props.onSetActivePaymentMode(e.target.value)}
                checked={props.activePaymentMode === "on-demand"}
              />
              <Text ml={2}>Pay on demand (immediately)</Text>
            </Flex>
          </Label>
        </Box>
        <Flex />
      </Box>
    </Card>
  );
};

export default PaymentModeCard;
