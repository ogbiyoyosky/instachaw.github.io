import React from "react";
import { Box, Icon, Card, Link, Flex, Text } from "pcln-design-system";
import { Input } from "../../UI/atoms";
import { AutocompleteAddressInput } from "../../UI/molecules";

const AddressInputCard = props => {
  return (
    <Card bg="lightGray">
      <Box pt={2} pb={3} px={3}>
        <Flex>
          <Flex style={{ flex: 4 }}>
            <Text fontSize={2} bold>
              {props.cardTitle}
            </Text>
          </Flex>
          {props.isAddressEditable && (
            <Flex onClick={props.onSummaryToggleClick}>
              <Flex flexDirection="column" justify="center">
                <Icon mr={1} size={12} name="modeEdit" color="blue" />
              </Flex>

              <Flex flexDirection="column" justify="center">
                <Link
                  onClick={e => {
                    e.preventDefault();
                    props.onSetAddressInputDisabled(false);
                  }}
                  mr={1}
                  color="blue"
                  fontSize={0}
                >
                  <Text fontSize={0}>Change Address</Text>
                </Link>
              </Flex>
            </Flex>
          )}
        </Flex>

        {props.hasHint && (
          <Flex mb={2}>
            <Text color="gray" fontSize={0}>
              A correct address means faster delivery.
            </Text>
          </Flex>
        )}

        {props.userAddresses && props.userAddresses.length > 0 ? (
          <Box>
            <AutocompleteAddressInput {...props} />
          </Box>
        ) : (
          <Box>
            <Input
              id="address"
              style={{
                background: "#fff"
              }}
              onFocus={e => e.target.select()}
              autoFocus={true}
              autocomplete="on"
              placeholder="Example: Room 2, Cali Villa, Alaska"
              value={props.address}
              onChange={e => {
                props.onSetAddress(e.target.value);
              }}
              style={{
                backgroundColor: props.isAddressInputDisabled ? "#eee" : "#fff",
                color: "#999"
              }}
              disabled={props.isAddressInputDisabled}
              onBlur={e => props.onSetAddressInputDisabled(true)}
            />
          </Box>
        )}
      </Box>
    </Card>
  );
};

AddressInputCard.defaultProps = {
  hasHint: true,
  isAddressEditable: true,
  cardTitle: "Add an address"
};

export default AddressInputCard;
