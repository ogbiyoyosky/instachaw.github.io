'use strict';

import * as React from 'react';

import { Box } from 'rebass';

import { StoreDisplayItemCard } from '@Components/StoreDisplayItem';
import {
  getStoreItemPath,
  getStoreItemQs
} from '@Utilities'
import {
  StoresFeedItemDescription,
  StoresFeedItemFooter,
} from './StoresFeedItemAtoms';

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
    <Box data-testid={'stores-feed-item'} mb={1}>
      <StoreDisplayItemCard
        alias={getStoreItemPath(id, title)}
        href={getStoreItemQs(id)}
        headingProps={{ pl: 1 }}
        thumbnailSrc={thumbnailImageSrc}
        title={title}
      >
        <StoresFeedItemDescription
          storeDescription={description}
          storeIsVerified={isVerified}
        />
        <StoresFeedItemFooter
          storeHours={serviceHours}
          storeServiceFee={serviceFee}
        />
      </StoreDisplayItemCard>
    </Box>
  )
}