import * as React from 'react';
import styled from 'styled-components';
import { Flex } from 'rebass';
import { theme } from '@Config'

const {
  palette: { grayscale },
  space
} = theme;

type StencilProps = {
  /** Border radius for stencil lines */
  radius?: string,
  /** Height of stencil line */
  height?: string,
  /** Width of stencil line */
  width?: string,
  style?: React.CSSProperties
};

export const Stencil:React.FC<StencilProps> = (props) => {
  const { height, width, radius, style } = props;
  const stencilStyles = { width, height, marginBottom: `${parseInt(space[0]) / 2}px` }

  const StencilElement = styled(Flex)`
    animation: progress 1.2s ease-in-out infinite;
    background-color: ${grayscale[5]};
    background-image: linear-gradient(90deg, ${grayscale[5]}, ${grayscale[6]}, ${grayscale[5]});
    background-size: 200px 100%;
    background-repeat: no-repeat;
    border-radius: ${theme.radius[0]};
    display: inline-block;
    line-height: ${space[1]};
    height: 100%;
    width: 100%;
    border-radius: ${radius};
  `;

  return <div style={{ ...stencilStyles, ...style }}><StencilElement /></div>
}

Stencil.defaultProps = {
  radius: '16px',
  height: '16px',
  width: '100px'
}