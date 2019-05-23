'use strict';

import * as React from 'react';

import {
  Box,
  Card,
  Flex
} from 'rebass';

import { theme } from '@Config';

import {
  StoresFeedItemDescription,
  StoresFeedItemFooter,
  StoresFeedItemLink,
  StoresFeedItemThumbnail
} from './StoresFeedItemAtoms';

const thumbnailWidth = '25%';
const contentWidth = `${100 - parseInt(thumbnailWidth)}%`;

type StoresFeedItemProps = {
  /** Description of store */
  description: string,
  /** Store id number */
  id: number,
  /** Renders <VerificationMark /> component */
  isVerified: boolean,
  /** Name of the store */
  title: string,
  /** Store service hours */
  serviceHours: string,
  /** Store service fee */
  serviceFee: string,
  /** Store thumbnail image name */
  thumbnailImageSrc: string
};

export const StoresFeedItem:React.FC<StoresFeedItemProps> = ({
  description,
  id,
  title,
  serviceHours,
  serviceFee,
  isVerified,
  thumbnailImageSrc
}) => {
  return (
    <Box data-testid={'stores-feed-item'}>
      <Card backgroundColor={'#fff'} boxShadow={theme.shadows[0]} borderRadius={theme.radius[1]}>
        <Flex margin={'0'} width={1}>
          <StoresFeedItemLink
            id={id}
            name={title}
            style={{
              width: thumbnailWidth,
              display: 'flex',
              backgroundColor: theme.palette.grayscale[4]
            }}
          >
            <StoresFeedItemThumbnail
              width={'100%'}
              src={thumbnailImageSrc}
            />
          </StoresFeedItemLink>

          <Box width={contentWidth}>
            <StoresFeedItemDescription
              storeDescription={description}
              storeTitle={
                <StoresFeedItemLink
                  id={id}
                  name={title}
                  style={{
                    textDecoration: 'none',
                    color: theme.palette.grayscale[1]
                  }}
                >{title}</StoresFeedItemLink>
              }
              storeIsVerified={isVerified}
            />

            <StoresFeedItemFooter
              storeHours={serviceHours}
              storeServiceFee={serviceFee}
            />
          </Box>
        </Flex>
      </Card>
    </Box>
  )
}