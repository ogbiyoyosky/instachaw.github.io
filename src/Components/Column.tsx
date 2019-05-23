import * as React from 'react';
import styled from 'styled-components';
import { Flex } from 'rebass';

import { computeColumnWidth } from '@Utilities';

type ColumnProps = {
  /** Width of column at small breakpoints */
  sm?: number,
  /** Column width at medium breakpoints */
  md?: number,
  /** Column width at large breakpoints */
  lg?: number,
  /** Column width at extra large breakpoints */
  xl?: number,
  /** Width of gutter */
  gutterWidth?: string | number,
  /** CSS styling */
  style?: React.CSSProperties
};

export const Column:React.FC<ColumnProps> = (props) => {
  const { sm, md, lg, xl, gutterWidth, children, style } = props;

  const Col = styled(Flex)`
    padding-left: ${gutterWidth};
    padding-right: ${gutterWidth};
    width: 100%;
    flex-direction: column;

    @media (max-width: 576px) {
      ${sm && computeColumnWidth(sm)};
    }

    @media (max-width: 768px) {
      ${md && computeColumnWidth(md)};
    }

    @media (max-width: 992px) {
      ${lg && computeColumnWidth(lg)};
    }

    @media only screen and (max-width: 1200px) {
      ${xl && computeColumnWidth(xl)};
    }
  `;

  return <Col style={style}>{children}</Col>
}

Column.defaultProps = {
  gutterWidth: '16px'
}