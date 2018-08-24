import styled from "styled-components";
import PropTypes from "prop-types";
import { color } from "styled-system";
import Button from "./Button";
import theme from "../theme";

const OutlineButton = styled(Button)`
  background-color: transparent;
  border-width: 2px;
  border-style: solid;
  color: ${props => props.theme.colors.red};
  border-color: ${props => props.theme.colors.red};

  &:hover {
    color: ${props => (props.disabled ? null : props.theme.colors.darkRed)};
    border-color: ${props =>
      props.disabled ? null : props.theme.colors.darkRed};
    background-color: transparent;
  }
`;

OutlineButton.defaultProps = {
  theme: theme
};

OutlineButton.displayName = "OutlineButton";

export default OutlineButton;
