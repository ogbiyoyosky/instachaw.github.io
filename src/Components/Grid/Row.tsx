'use strict';

import * as React from 'react';

import styled from 'styled-components';
import { Flex } from 'rebass';

import { theme } from '@Config';

type RowProps = {
  /** Gutter width for component */
  rowGutter?: string,
  /** CSS styling */
  style?: React.CSSProperties
};

export const Row:React.FC<RowProps> = ({
  children,
  rowGutter = theme.space[3],
  style
}) => {
  const RowElement = styled(Flex)`
    margin-left: -${rowGutter};
    margin-right: -${rowGutter};
    flex-wrap: wrap;
  `;

  return <RowElement style={style}>{children}</RowElement>
}