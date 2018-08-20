import React from "react";
import PropTypes from "prop-types";
import { Flex, Text } from "pcln-design-system";
import { ClipLoader } from "react-spinners";
import { StyledFullscreenModal } from "../../UI/atoms/StyledModal";

const LoadingDisplay = props => {
  return (
    props.isLoading && (
      <StyledFullscreenModal>
        <Flex
          flexDirection="column"
          width={1}
          alignItems="center"
          justify="center"
          style={{
            height: "100%"
          }}
        >
          <Flex alignItems="center" justify="center">
            <Flex flexDirection="column">
              <Flex mb={1} justify="center">
                <ClipLoader loading={true} color="#999" width={230} />
              </Flex>
              <Flex width={1} justify="center">
                <Text color={"gray"} fontSize={1}>
                  Loading...
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </StyledFullscreenModal>
    )
  );
};

LoadingDisplay.propTypes = {
  isLoading: PropTypes.bool
};

LoadingDisplay.defaultProps = {
  isLoading: true
};

export default LoadingDisplay;
