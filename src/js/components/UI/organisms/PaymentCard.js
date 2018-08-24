import React from "react";
import {
  Box,
  Card,
  Icon,
  Flex,
  Link as UILink,
  Text
} from "pcln-design-system";
import { ActionStrip, CardHeading, PaymentChoice } from "../../UI/molecules";
import { roundToDecimalPlaces } from "../../../util/util";

const PaymentCard = props => {
  const STEEMBalance = roundToDecimalPlaces(props.getWalletBalance("STEEM"), 3);
  const SBDBalance = roundToDecimalPlaces(props.getWalletBalance("SBD"), 3);
  const nairaBalance = roundToDecimalPlaces(props.getWalletBalance("naira"), 3);
  const STEEM_RATE = props.rates["STEEM"];
  const SBD_RATE = props.rates["SBD"];
  const hasSTEEM = STEEMBalance > 0;
  const hasSBD = SBDBalance > 0;

  return (
    <Card bg="lightGray">
      <Flex flexDirection="column" pt={2} pb={3} px={3}>
        <CardHeading
          title="Change Pay Method"
          onToggleClick={props.onPaymentToggleClick}
          isMinimized={props.isPaymentMinimized}
        />
        <Box
          style={{
            height: props.isPaymentMinimized ? "45px" : "110px",
            overflowY: "hidden",
            transition: "height 0.3s ease-in-out"
          }}
        >
          <PaymentChoice
            choice="naira"
            isActivePaymentMethod={props.activePaymentMethod === "naira"}
            message={`Pay N${roundToDecimalPlaces(props.amount, 3)} Cash`}
            onSetActivePaymentMethod={e =>
              props.onSetActivePaymentMethod("naira")}
          />
          <Text fontSize={0} color="gray" mb={1} align="center">
            or
          </Text>
          <PaymentChoice
            choice="naira"
            isActivePaymentMethod={
              props.activePaymentMethod === "STEEM" ||
              props.activePaymentMethod === "SBD"
            }
            message={`Pay ${roundToDecimalPlaces(
              props.amount / STEEM_RATE,
              3
            )} STEEM or ${roundToDecimalPlaces(
              props.amount / SBD_RATE,
              3
            )} SBD`}
            onSetActivePaymentMethod={e =>
              props.onSetActivePaymentMethod("STEEM")}
          />
        </Box>

        {(hasSTEEM || hasSBD) && (
          <Text color="gray" fontSize={0}>
            <b>{hasSTEEM && `${STEEMBalance} STEEM `}</b>
            {hasSTEEM && hasSBD && `& `}
            <b>{hasSBD && `${SBDBalance} SBD `}</b>
            available in wallet
          </Text>
        )}
      </Flex>
    </Card>
  );
};

export default PaymentCard;
