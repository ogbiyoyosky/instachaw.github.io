import React from "react";
import PropTypes from "prop-types";
import { IconButton } from "pcln-design-system";

const CloseButton = props => {
  return (
    <IconButton
      size={36}
      style={{
        position: "absolute",
        top: "10px",
        right: "10px"
      }}
      color="#999"
      borderColor="transparent"
      name="close"
      onClick={e => props.onClick(e)}
    />
  );
};

CloseButton.propTypes = {
  onClick: PropTypes.func
};

export default CloseButton;
