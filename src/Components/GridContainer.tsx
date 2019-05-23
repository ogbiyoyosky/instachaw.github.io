import * as React from 'react';
import styled from 'styled-components';
import { Box } from 'rebass';

type GridContainerProps = {
  /** Width of the adjoining gutter space. */
  gutterWidth?: string,
  /** CSS styles. */
  style?: React.CSSProperties
};

export const GridContainer:React.FC<GridContainerProps> = (props) => {
  const {
    gutterWidth,
    children,
    style
  } = props;

  const GridContainerElement = styled(Box)`
    margin-left: auto;
    margin-right: auto;
    padding-left: ${gutterWidth};
    padding-right: ${gutterWidth};
  `;

  return (
    <GridContainerElement style={style}>
      {children}
    </GridContainerElement>
  )
}

GridContainer.defaultProps = {
  gutterWidth: '16px'
}