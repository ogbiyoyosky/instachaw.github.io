import * as React from 'react';
import { Box, Flex, Text } from "rebass";
import { theme } from "@Config";
import { Icon } from "@Components";

const { palette: { primary } } = theme;

type DockerBarProps = {}

const defaultProps = {
  isActive: false
}

type DockerIconProps = {
  /** SVG icon name. Examples: home, airplane, user. */
  name: string,
  /** Text label */
  label: string,
  /** Renders an active state for the icon. */
  isActive?: boolean
}

const DockerIcon:React.FC<DockerIconProps> = ({
  name,
  label,
  isActive,
  ...props
}) => {
  const iconColor = isActive ? theme.palette.primary[6]: theme.palette.primary[5];

  return (
    <Flex style={{ flex: 1 }} py={1} flexDirection={'column'} justifyContent={'center'} {...props}>
      <Flex flexDirection={'column'} alignItems={'center'}>
        <Icon size={32} name={name} fill={iconColor}/>
        <Text
          color={iconColor}
          fontSize={'8px'}
          fontWeight={600}
          style={{
            textTransform: 'uppercase'
          }}
        >
          {label}
        </Text>
      </Flex>
    </Flex>
  )
}

const DockerBarContainerStyles:React.CSSProperties = {
  position: 'fixed',
  bottom: 0,
  width: '100%',
  zIndex: 600,
  background: primary[3]
}

export const DockerBar:React.FC<DockerBarProps> = () => {
  return (
    <Box style={DockerBarContainerStyles}>
      <Flex>
        <DockerIcon data-testid={'dockerbar-home-icon'} name={'home'} label={'Home'} isActive />
        <DockerIcon data-testid={'dockerbar-basket-icon'} name={'shopping-basket'} label={'Basket'} />
        <DockerIcon data-testid={'dockerbar-account-icon'} name={'profile'} label={'Account'} />
      </Flex>
    </Box>
  )
}

DockerBar.defaultProps = defaultProps;