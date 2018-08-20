import React from "react";
import Styled from "styled-components";
import { Button } from "pcln-design-system";

const TransparentButton = Styled(Button)`
background: transparent;  

:hover, :focus {
  background: transparent;
}
`;

export default TransparentButton;
