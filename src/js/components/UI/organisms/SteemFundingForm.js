import React from "react";
import {
  Box,
  Button,
  OutlineButton,
  Flex,
  Input,
  Text
} from "pcln-design-system";

import { Label } from "../../UI/atoms";

const SteemFundingForm = props => {
  return (
    <Box width={[0.8, 0.6, 0.5]}>
      <form
        method="get"
        onSubmit={e => {
          e.preventDefault();
          props.onFundingSubmit(e);
        }}
      >
        <Flex flexDirection="column" justify="center" alignItems="center">
          <Text
            fontSize={4}
            mb={3}
            style={{
              textAlign: "center"
            }}
          >
            Fund <strong>{props.fundingMethod}</strong> <em>Without Stress</em>.
          </Text>

          <Box mb={3}>
            <Label mb={1} fontSize={0}>
              Amount
            </Label>
            <Input
              onChange={e => {
                props.onSetFundingAmount({
                  fundingAmount: Number(e.target.value)
                });
              }}
              value={props.value}
              type="number"
              id="amount"
              min={0}
              step="any"
              onFocus={e => e.target.select()}
              autoFocus={props.isFundingInputFocused}
              style={{
                background: "#fff"
              }}
            />
          </Box>

          <Box mb={3}>
            <Button type="submit" fullWidth>
              Pay Securely with SteemConnect
            </Button>
          </Box>
          <Box>
            {props.fundingMethod === "STEEM" ? (
              <OutlineButton
                type="button"
                onClick={e =>
                  props.onSetFundingMethod({
                    fundingMethod: "SBD"
                  })}
                fullWidth
              >
                I'd rather add SBD
              </OutlineButton>
            ) : (
              <OutlineButton
                type="button"
                onClick={e => {
                  e.preventDefault();
                  props.onSetFundingMethod({
                    fundingMethod: "STEEM"
                  });
                }}
                fullWidth
              >
                I'd rather add STEEM
              </OutlineButton>
            )}
          </Box>
        </Flex>
      </form>
    </Box>
  );
};

export default SteemFundingForm;
