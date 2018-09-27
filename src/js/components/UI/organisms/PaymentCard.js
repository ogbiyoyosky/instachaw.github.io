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
  const hasNaira = nairaBalance > 0;
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
            height: props.isPaymentMinimized ? "45px" : "140px",
            overflowY: "hidden",
            transition: "height 0.3s ease-in-out"
          }}
        >
          <PaymentChoice
            choice="naira"
            isActivePaymentMethod={props.activePaymentMethod === "naira"}
            message={`Pay N${roundToDecimalPlaces(
              props.amount,
              3
            )} ${props.paymentMode === "on-demand" ? "online" : "cash"}`}
            onSetActivePaymentMethod={e =>
              props.onSetActivePaymentMethod("naira")}
          />
          <PaymentChoice
            choice="STEEM"
            isActivePaymentMethod={props.activePaymentMethod === "STEEM"}
            message={`Pay ${roundToDecimalPlaces(
              props.amount / STEEM_RATE,
              3
            )} STEEM`}
            onSetActivePaymentMethod={e =>
              props.onSetActivePaymentMethod("STEEM")}
          />
          <PaymentChoice
            choice="SBD"
            isActivePaymentMethod={props.activePaymentMethod === "SBD"}
            message={`Pay ${roundToDecimalPlaces(
              props.amount / SBD_RATE,
              3
            )} SBD`}
            onSetActivePaymentMethod={e =>
              props.onSetActivePaymentMethod("SBD")}
          />
        </Box>

        {(hasSTEEM || hasSBD) && (
          <Text color="gray" fontSize={0} mb={1}>
            <b>{hasSTEEM && `${STEEMBalance} STEEM `}</b>
            {hasSTEEM && hasSBD && `& `}
            <b>{hasSBD && `${SBDBalance} SBD `}</b>
            available in wallet
          </Text>
        )}

        {hasNaira && (
          <Text color="gray" fontSize={0}>
            You have <b>{hasNaira && `NGN ${nairaBalance}`} </b>
            available.
          </Text>
        )}
      </Flex>
    </Card>
  );
};

export default PaymentCard;
