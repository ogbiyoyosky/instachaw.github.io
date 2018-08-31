import React from "react";
import { tween } from "popmotion";
import styled from "styled-components";
import posed from "react-pose";

const Modal = posed.div({
  fullscreen: {
    scale: 1,
    transition: "tween"
  },
  idle: {
    scale: 0,
    transition: "tween"
  }
});

export const StyledModal = styled(Modal)`
  background: #f5f5f5;
  width: 100%;
  height: 100vh;
  border-radius: 4px;
`;

export const StyledFullscreenModal = styled(Modal)`
  position: fixed;
  top: 0;
  left: 0;
  background: #fff;
  width: 100%;
  height: 100vh;
  z-index: 5000;
  border-radius: 4px;
  display: flex;
`;

export default StyledModal;
