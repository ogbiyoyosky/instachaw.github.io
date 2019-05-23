import * as React from 'react';
import styled from 'styled-components';
import { Flex } from 'rebass';

type RowProps = {
  /** Gutter width for component */
  rowGutter?: string,
  /** CSS styling */
  style?: React.CSSProperties
};

export const Row:React.FC<RowProps> = (props) => {
  const RowElement = styled(Flex)`
    margin-left: -${props.rowGutter};
    margin-right: -${props.rowGutter};
    flex-wrap: wrap;
  `;

  return <RowElement style={props.style}>{props.children}</RowElement>
}

Row.defaultProps = {
  rowGutter: '16px'
}