import React from "react";
import {
  AddressInputCard,
  PaymentCard,
  PaymentModeCard,
  AuthCard
} from "../../UI/organisms";

import { Flex, Text, Box } from "pcln-design-system";

const CheckoutInfo = props => {
  return (
    <Flex flexDirection="column" {...props}>
      <Text fontSize={2} mb={3} bold>
        Complete Checkout
      </Text>
      <Box mb={3}>
        <AddressInputCard {...props} />
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
