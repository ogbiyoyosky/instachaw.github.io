import React from "react";
import PropTypes from "prop-types";
import { Box, IconButton, Flex, Text } from "pcln-design-system";
import { CloseButton, Label, OutlineButton, StyledModal } from "../../UI/atoms";
import { StyledFullscreenModal } from "../../UI/atoms/StyledModal";
import { SteemFundingForm } from "../../UI/organisms";
import { roundToDecimalPlaces } from "../../../util/util";

const SteemFundingModalChildren = props => {
  return (
    <Flex
      p={2}
      flexDirection="column"
      justify="center"
      alignItems="center"
      style={{
        height: "100%"
      }}
    >
      <CloseButton onClick={e => props.onClose(e)} />

      <Flex justify="center" alignItems="center">
        {!props.isAttemptingFunding ? (
          <SteemFundingForm
            onFundingSubmit={e => props.onFundingSubmit(e)}
            fundingMethod={props.fundingMethod}
            onSetFundingAmount={data => props.onSetFundingAmount(data)}
            onSetFundingMethod={data => props.onSetFundingMethod(data)}
            value={props.fundingAmount}
            isFundingInputFocused={props.isFundingModalOpen}
          />
        ) : (
          <Box width={[0.8, 0.6, 0.5]}>
            <Flex flexDirection="column" justify="center" alignItems="center">
              <Text
                fontSize={4}
                mb={3}
                style={{
                  textAlign: "center"
                }}
                bold
              >
                We are checking for your funds...
              </Text>

              <Text
                fontSize={2}
                mb={3}
                style={{
                  textAlign: "center"
                }}
              >
                Once your payment is seen, this dialogue will close
                automagically.
              </Text>
            </Flex>
          </Box>
        )}
      </Flex>
    </Flex>
  );
};

const SteemFundingModal = props => {
  return !props.isFullscreenModal ? (
    <StyledModal
      pose={props.isFundingModalOpen ? "fullscreen" : "idle"}
      style={{
        display: !props.isFundingModalOpen ? "none" : "block"
      }}
    >
      <SteemFundingModalChildren {...props} />
    </StyledModal>
  ) : (
    <StyledFullscreenModal
      pose={props.isFundingModalOpen ? "fullscreen" : "idle"}
      style={{
        display: !props.isFundingModalOpen ? "none" : "block"
      }}
    >
      <SteemFundingModalChildren {...props} />
    </StyledFullscreenModal>
  );
};

SteemFundingModal.propTypes = {
  isFundingModalOpen: PropTypes.bool,
  isFullscreenModal: PropTypes.bool,
  cartItems: PropTypes.array
};

SteemFundingModal.defaultProps = {
  isFundingModalOpen: false,
  isFullscreenModal: false,
  cartItems: []
};

export default SteemFundingModal;
