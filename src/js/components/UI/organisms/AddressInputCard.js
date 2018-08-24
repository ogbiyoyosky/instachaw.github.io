import React from "react";
import { Box, Card, Flex, Text } from "pcln-design-system";
import { Input } from "../../UI/atoms";
import { AutocompleteAddressInput } from "../../UI/molecules";

const AddressInputCard = props => {
  return (
    <Card bg="lightGray">
      <Box pt={2} pb={3} px={3}>
        <Flex>
          <Flex style={{ flex: 4 }}>
            <Text fontSize={2} bold>
              Add an Address
            </Text>
          </Flex>
        </Flex>
        <Flex mb={2}>
          <Text color="gray" fontSize={0}>
            A correct address means faster delivery.
          </Text>
        </Flex>

        <Box>
          {props.userAddresses !== undefined &&
          props.userAddresses.length > 0 ? (
            <AutocompleteAddressInput {...props} />
          ) : (
            <Input
              id="address"
              style={{
                background: "#fff"
              }}
              onFocus={e => e.target.select()}
              autoFocus={true}
              autocomplete="on"
              placeholder="Example: Room 2, Cali Villa, Alaska"
              value={props.currentDeliveryAddress}
              onChange={e => {
                props.onSetDeliveryAddress(e.target.value);
              }}
            />
          )}
        </Box>
      </Box>
    </Card>
  );
};

export default AddressInputCard;
