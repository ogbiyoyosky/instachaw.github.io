'use strict';

import * as React from 'react';

import Link from 'next/link';
import {
  Box,
  Card,
  Flex,
  Heading,
  Text
} from 'rebass';

import { theme } from '@Config';
import { Badge, VerificationMark, Stencil } from '@Components';
import { getStoreItemPath } from '@Utilities';

const { space } = theme;

type StoresFeedItemThumbnailProps = {
  /** Item thumbnail source file path */
  src?: string,
  /** Thumbnail width */
  width?: string
};

type StoresFeedItemLinkProps = {
  style?: React.CSSProperties,
  id: number,
  name: string
};

export const StoresFeedItemLink:React.FC<StoresFeedItemLinkProps> = ({ children, style, id, name }) => {
  return (
    <Link href={getStoreItemPath(id, name)}>
      <a style={{ display: 'flex', ...style }}>{children}</a>
    </Link>
  )
}

export const StoresFeedItemThumbnail:React.FC<StoresFeedItemThumbnailProps> = ({ src, width }) => {
  let storesFeedThumbnailStyles:React.CSSProperties = {
    width,
    position: 'relative',
    minHeight: '82px',
    zIndex: 10
  }

  if (src) {
    storesFeedThumbnailStyles = {
      ...storesFeedThumbnailStyles,
      backgroundImage: `url("${src}")`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',  
    }
  }

  return (
    <div
      style={storesFeedThumbnailStyles}
    />
  )
}

type StoresFeedItemDescriptionProps = {
  /** Store name */
  storeTitle: React.ReactNode,
  /** Description for store */
  storeDescription: string,
  /** Renders <VerificationMark /> component */
  storeIsVerified?: boolean,
}

export const StoresFeedItemDescription:React.FC<StoresFeedItemDescriptionProps> = ({
  storeDescription,
  storeTitle,
  storeIsVerified,
}) => (
  <Box width={1} style={{ padding: `0 ${space[1]} ${space[1]} ${space[1]}` }}>
    <Flex alignItems={'center'}>
      <Heading
        fontSize={3}
        flex={1}
        color={theme.palette.grayscale[1]}
        mb={space[0]}
      >
        {storeTitle}
      </Heading>
      { storeIsVerified && <VerificationMark /> }
    </Flex>

    <Text
      fontSize={theme.fontSizes[1]}
      lineHeight={space[1]}
      color={theme.palette.grayscale[2]}
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
    width={'97%'}
    padding={`0 ${space[0]} 0 ${space[2]}`}
    bg={theme.palette.grayscale[6]}
    justifyContent={'space-between'}
    alignItems={'center'}
  >
    <Text
      fontSize={theme.fontSizes[0]}
      fontWeight={600}
      color={theme.palette.grayscale[3]}
    >
      <b style={{ color: theme.palette.grayscale[1] }}>{storeServiceFee}</b> per delivery
    </Text>
    <Badge
      icon={'timer'}
      text={storeHours}
    />
  </Flex>
)

export const StoresFeedItemSkeleton:React.FC = ({}) => (
  <Box data-testid={'stores-feed-item'}>
    <Card>
      <Flex margin={0} width={'100%'}>
        <Stencil
          width={'30%'}
          style={{
            marginTop: '8px',
            height: '82px'
          }}
        />
        <Flex width={'70%'} flexDirection={'column'} alignItems={'center'} padding={`12px`}>
          <Flex
            alignItems={'center'}
            width={'100%'}
            justifyContent={'space-between'}
            marginBottom={space[0]}
          >
            <Stencil width={'45%'} />
            <Stencil width={'24px'} height={'24px'} radius={'100%'} />
          </Flex>
          <Box width={'100%'}>
            <Stencil height={'14px'} width={'70%'} />
            <Stencil height={'14px'} width={'30%'} />
          </Box>
        </Flex>
      </Flex>
    </Card>
  </Box>
)