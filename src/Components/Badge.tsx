import * as React from 'react';
import { Flex } from 'rebass';
import { theme } from '@Config';
import { Icon } from '@Components';

import { BadgeProps } from '@Constants/ComponentTypes'

const defaultProps = {
  color: theme.palette.green[0],
  background: theme.palette.green[6],
  icon: undefined
}

export const Badge:React.FC<BadgeProps> = ({ background, color, icon, text }) => {
  return (
    <Flex
      alignItems={'center'}
      backgroundColor={background}
      style={{
        borderRadius: theme.radius[3],
        fontWeight: 600,
        textTransform: 'uppercase'
      }}
      color={color}
      fontSize={theme.fontSizes[0]}
      margin={0}
      padding={`${parseInt(theme.space[0]) / 2}px ${theme.space[0]}`}
    >
      {icon && <Icon name={icon} size={theme.space[1]}/>}
      <span style={{ paddingLeft: theme.space[0] }}>{text}</span>
    </Flex>
  )
}

Badge.defaultProps = defaultProps;