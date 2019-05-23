'use strict';

import React from 'react'
import styled from 'styled-components'

import { getIconsPath } from '@Utilities'
import { theme } from '@Config';

type BaseProps = {
  /** SVG icon name */
  name: string,
  /** Icon size. Examples: 16, '32px' */
  size?: number|string,
  /** Renders a legacy icon */
  legacy?: boolean,
  /** Icon fill color */
  fill?: string
  theme?: object
}

const defaultProps = {
  name: 'checkLight',
  size: 24,
  legacy: false,
  fill: 'currentColor',
  theme: theme
}

const Base:React.FC<BaseProps> = ({ name, size, legacy, fill, ...props })
:(React.ReactElement<any>|null) => {
  const icon = getIconsPath({ name, legacy: legacy || false })

  if (!icon) {
    new Error(
      `No icon exists with the name: '${name}'. Please use another name.`
    )

    return null;
  }

  return (
    <svg
      {...props}
      viewBox={icon.viewBox}
      width={size}
      height={size}
      fill={fill}
    >
      <path d={icon.path} />
    </svg>
  );
}

export const Icon = styled(Base)`
  flex: none;
  ${theme.space[0]} ${theme.palette.grayscale[0]};
`

Icon.displayName = 'Icon'

Icon.defaultProps = defaultProps;