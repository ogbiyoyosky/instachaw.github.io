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

const TimeCard = props => {
    return (
      <Card bg="lightGray">
        <Flex pt={2} pb={3} px={3}>
          <Text fontSize={2} mb={2} bold>
            Time
          </Text>
          <Box>
            <Box mb={2}>
              <ActionStrip icon="clock" message="As soon as possible" />
            </Box>
          </Box>
        </Flex>
      </Card>
    );
  };
  
export default TimeCard;
