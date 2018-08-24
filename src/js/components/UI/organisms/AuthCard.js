import React from "react";
import { Card, Heading, Flex } from "pcln-design-system";
import { OutlineButton } from "../../UI/atoms";
import { CardHeading } from "../../UI/molecules";

const AuthCard = props => {
  return (
    <Card bg="white" py={5}>
      <Flex flexDirection="column">
        <Flex justify="center" alignItems="center">
          <Heading fontSize={2} bold>
            Login or Register to finish this.
          </Heading>
        </Flex>

        <Flex py={2} justify="center" alignItems="center">
          <OutlineButton onClick={e => props.history.push("/login")}>
            Login to your account
          </OutlineButton>
        </Flex>
      </Flex>
    </Card>
  );
};

export default AuthCard;
