import React from "react";
import {
  AddressInputCard,
  PaymentCard,
  PaymentModeCard,
  AuthCard
} from "../../UI/organisms";

import { Flex, Text, Box, Heading } from "pcln-design-system";

const CheckoutInfo = props => {
  return (
    <Flex flexDirection="column" {...props}>
      <Heading fontSize={2} mb={1} bold>
        Complete Checkout
      </Heading>

      <Text fontSize={1} mb={3} color="gray">
        Your last step. We promise.
      </Text>
      <Box mb={3}>
        <AddressInputCard
          userAddresses={props.userAddresses}
          address={props.address}
          isAddressEditable={props.isAddressEditable}
          isAddressInputDisabled={props.isAddressInputDisabled}
          onSetAddress={props.onSetAddress}
          onSetAddressInputDisabled={isAddressInputDisabled =>
            props.onSetAddressInputDisabled(isAddressInputDisabled)}
        />
      </Box>

      {props.isUserAuthenticated ? (
        <Box>
          <Box mb={3}>
            <PaymentCard {...props} />
          </Box>

          <Box mb={3}>
            <PaymentModeCard {...props} />
          </Box>
        </Box>
      ) : (
        <Box mb={3}>
          <AuthCard {...props} />
        </Box>
      )}
    </Flex>
  );
};

export default CheckoutInfo;
