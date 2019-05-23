import { Box } from 'rebass';
import styled from 'styled-components';
import { palette } from 'styled-tools';

const grayscale = [
  "#221a1a",
  "#5b4a4b",
  "#918383",
  "#ab9da0",
  "#b8b4ad",
  "#e0dedf",  
  "#faf7f8",
]

const primary = [
  "#801c45",
  "#9c223d",
  "#cf2d4e",
  "#ee353b",
  "#ff6666",
  "#ffbfc0",
  "#fff2f3",
]

const blue = ['#003452', '#0a4f80', '#2d6da8', '#5c8dff', '#7281cc', '#a3abff', '#ebecff']
const green = ['#275901', '#2d800f', '#4f9900', '#32db5d', '#00eb95', '#acf2d6', '#ebfff0']

const fontSizes = [
  '8px',
  '12px',
  '14px',
  '16px',
  '18px',
  '24px',
  '32px',
  '48px',
]

const space = [
  '8px',
  '16px',
  '24px',
  '32px',
  '48px',
  '64px',
]

const radius = [
  '4px',
  '8px',
  '16px',
  '32px',
]

const Card = styled(Box)`
  background: #fff;
  width: 100%;
  border-radius: ${radius[1]};
  box-shadow: 0px 15px 35px 0px ${palette('shadow', 5)};  
`;

const Heading = styled(Box)`
  font-weight: bold;
  padding: 8px 0;

  &:first-child {
    margin-top: 0;
  }
  h1& {
    font-size: ${fontSizes[fontSizes.length - 1]};
    line-height: 72px;
  }
  h2& {
    font-size: ${fontSizes[fontSizes.length - 2]};
    line-height: 48px;
  }
  h3& {
    font-size: ${fontSizes[fontSizes.length - 3]};
    line-height: 36px;
  }
  h4& {
    font-size: ${fontSizes[fontSizes.length - 4]};
    line-height: 24px;
  }
  h5& {
    font-size: ${fontSizes[fontSizes.length - 5]};
    line-height: 24px;
  }
  h6& {
    font-size: ${fontSizes[fontSizes.length - 6]};
    line-height: 21px;
  }
`;

export const Input = styled(Box)`
  display: block;
  width: 100%;
  padding: 0 ${space[1]};
  font-size: 12px;
  height: 45px;
  border-radius: ${radius[0]};
  &[type="checkbox"],
  &[type="radio"] {
    display: inline-block;
    width: auto;
    height: auto;
    padding: 0;
  }
  &::placeholder {
    color: currentcolor;
    opacity: 0.5;
  }
  textarea & {
    padding: 0.5em;
    height: auto;
  }
`;

export const Paragraph = styled(Box)`
  font-size: ${fontSizes[2]};
  color: ${grayscale[1]};
  line-height: 21px;

  &:not(:last-child) {
    margin-bottom: 1rem;
  }
`;

export const shadows = [
  `0px 15px 35px 0px ${grayscale[5]}`
]

export const theme = {
  palette: {
    grayscale,
    primary,
    blue,
    green
  },

  fontSizes,
  radius,
  space: space,
  shadows,

  Card,
  Heading,
  Input,
  Paragraph
}