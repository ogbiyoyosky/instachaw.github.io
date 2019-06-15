'use strict';

import * as React from 'react';

import {
  Button,
  Flex
} from 'rebass';

import { theme } from '@Config';
import { Icon } from '@Components';

type StoreMerchantProductControlsProps = {};

export const StoreMerchantProductControls:React.FC<StoreMerchantProductControlsProps> = () => {
  return (
    <Flex
      mt={0}
      flexDirection={'column'}
      alignItems={'center'}
      justifyContent={'center'}
    >
      <Button variant={'transparentXs'}>
        <Icon
          size={theme.space[3]}
          fill={theme.palette.grayscale[3]}
          name={'circlePlus'}
        />
      </Button>
    </Flex>
  )
}