'use strict';

import * as React from 'react';

import {
  Box,
  Flex,
  Text
} from 'rebass';

import { theme } from '@Config';
import { StoreDisplayItemSkeleton } from '@Components/StoreDisplayItem/StoreDisplayItemAtoms';
import { Badge, VerificationMark, Stencil } from '@Components';

const { space, palette: {grayscale} } = theme;

type StoresFeedItemDescriptionProps = {
  /** Description for store */
  storeDescription: string,
  /** Renders <VerificationMark /> component */
  storeIsVerified?: boolean,
}

export const StoresFeedItemDescription:React.FC<StoresFeedItemDescriptionProps> = ({
  storeDescription,
  storeIsVerified,
}) => (
  <Box width={1} style={{ padding: `0 ${space[1]} ${space[1]} ${space[1]}` }}>
    <Flex alignItems={'center'}>{storeIsVerified && <VerificationMark />}</Flex>

    <Text
      fontSize={theme.fontSizes[1]}
      lineHeight={space[1]}
      color={grayscale[2]}
      paddingLeft={space[0]}
      width={'95%'}
    >
      {storeDescription}
    </Text>
  </Box>
)

type StoresFeedItemFooterProps = {
  /** Store service hours */
  storeHours: string
  /** Store service fees */
  storeServiceFee: string,
}

export const StoresFeedItemFooter:React.FC<StoresFeedItemFooterProps> = ({
  storeHours,
  storeServiceFee,
}) => (
  <Flex
    width={1}
    padding={`0 ${space[0]} 0 ${space[2]}`}
    bg={grayscale[6]}
    justifyContent={'space-between'}
    alignItems={'center'}
  >
    <Text
      fontSize={theme.fontSizes[0]}
      fontWeight={600}
      color={grayscale[3]}
    >
      <b style={{ color: grayscale[1] }}>{storeServiceFee}</b> per delivery
    </Text>
    <Badge
      icon={'timer'}
      text={storeHours}
    />
  </Flex>
)

export const StoresFeedItemSkeleton:React.FC = ({}) => (
  <Box data-testid={'stores-feed-item-skeleton'}>
    <StoreDisplayItemSkeleton
      skeletonAddonMarkup={
        <Stencil height={'14px'} width={'20%'} />
      }
      titleMarkup={
        <Stencil width={'45%'} />
      }
    />
  </Box>
)