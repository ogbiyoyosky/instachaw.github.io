'use strict';

import * as React from 'react';

import {
  Box,
  Flex
} from 'rebass';

import { Stencil } from '@Components';
import { StoreDisplayItemSkeleton } from '@Components/StoreDisplayItem/StoreDisplayItemAtoms';
import { theme } from '@Config';

const { space } = theme;

export const StoreMerchantBriefSkeleton:React.FC = ({}) => (
  <Box data-testid={'stores-merchant-brief-skeleton'}>
    <Flex flexDirection={'column'} alignItems={'center'} py={1}>
      <Stencil
        width={space[5]}
        style={{
          margin: `${space[1]} 0`,
          height: space[5]
        }}
      />
      <Stencil width={'50%'} />
      <Stencil width={'32%'} height={'10px'} />
      <Box width={'58%'} mt={1}> <Stencil width={'100%'} height={'10px'} /></Box>
    </Flex>
  </Box>
)

export const StoreProductItemSkeleton:React.FC = () => (
  <Box data-testid={'store-product-item-skeleton'}>
    <StoreDisplayItemSkeleton
      skeletonAddonMarkup={
        <Stencil height={'14px'} width={'20%'} />
      }
    />
  </Box>
)