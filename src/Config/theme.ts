import { Box } from 'rebass';
import styled from 'styled-components';

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

export const shadows = [
  `0px 1px 3px 0px ${grayscale[5]}`,
  `0px 4px 6px 0px ${grayscale[5]}`,
  `0px 5px 15px 5px ${grayscale[5]}`,
  `0px 10px 24px 0px ${grayscale[5]}`,
  `0px 15px 35px 0px ${grayscale[5]}`
]

const buttonVariants = {
  base: {
    margin: '0',
    borderRadius: radius[1]
  },
  primary: {
    color: primary[primary.length - 1],
    backgroundColor: primary[3],
  },
  primaryMild: {
    color: primary[0],
    backgroundColor: primary[5],
  },
  success: {
    color: green[green.length - 1],
    backgroundColor: green[3],
  },
  successMild: {
    color: green[0],
    backgroundColor: green[6],
  },
  outline: {
    boxShadow: 'inset 0 0 0 2px'
  },
  neutral: {
    color: grayscale[0],
    backgroundColor: grayscale[5],
    border: `1px solid ${grayscale[5]}`,
  },
  xs: {
    padding: `${parseInt(space[0]) / 2}px ${space[1]}`,
    fontSize: fontSizes[1]
  },
  sm: {
    padding: `${space[1]} ${space[1]}`,
    fontSize: fontSizes[2]
  },
  transparent: {
    backgroundColor: 'transparent',
  }
}

const buttons = {
  ...buttonVariants,
  primary: { ...buttonVariants.primary, ...buttonVariants.base },
  primaryXs: {
    ...buttonVariants.primary,
    ...buttonVariants.xs,
    ...buttonVariants.base
  },
  primaryMildXs: {
    ...buttonVariants.primaryMild,
    ...buttonVariants.xs,
    ...buttonVariants.base
  },
  successXs: {
    ...buttonVariants.success,
    ...buttonVariants.xs,
    ...buttonVariants.base
  },
  successMildXs: {
    ...buttonVariants.successMild,
    ...buttonVariants.xs,
    ...buttonVariants.base
  },
  outline: {
    ...buttonVariants.outline,
    ...buttonVariants.transparent,
    ...buttonVariants.base
  },
  neutral: {
    ...buttonVariants.neutral,
    ...buttonVariants.base
  },
  neutralSm: {
    ...buttonVariants.neutral,
    ...buttonVariants.sm,
    ...buttonVariants.base
  },
  transparentXs: {
    ...buttonVariants.transparent,
    ...buttonVariants.xs,
    ...buttonVariants.base
  }
}

const Card = styled(Box)`
  background: #fff;
  width: 100%;
  border-radius: ${radius[1]};
  box-shadow: ${(props:any) => props.shadowSize ? shadows[props.shadowSize] : shadows[0]}
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

export const theme = {
  palette: {
    grayscale,
    primary,
    blue,
    green
  },

  buttons,
  fontSizes,
  radius,
  space,
  shadows,

  Card,
  Heading,
  Input,
  Paragraph
}