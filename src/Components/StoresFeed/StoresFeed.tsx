import * as React from 'react';

import { Box, Heading } from 'rebass';
import {
  Col,
  Row,
  Grid
} from '@Components';
import { theme } from '@Config';
import { IStorePage } from '@Interfaces/Pages/Store';

import { StoresFeedItem } from './StoresFeedItem';
import { StoresFeedItemSkeleton } from './StoresFeedItemAtoms';
import { formatServiceHour } from '@Utilities';

type StoresFeedProps = {
  /** Displays stores loading animation */
  isFetchingStores?: boolean,
  /** Array list of stores */
  stores: IStorePage.IStoreData[]
};

const defaultProps = {
  isFetchingStores: false,
  stores: []
}

/** Pool of characters corresponding to one store item within listings */
const RANGE_POOL = '12345';

export const StoresFeed:React.FC<StoresFeedProps> = ({ stores, isFetchingStores }) => {
  return (
    <Box padding={`${theme.space[0]} 0`}>
      <Grid>
        <Row>
          <Col>
            <Heading
              margin={`${theme.space[1]} 0`}
              color={theme.palette.grayscale[2]}
              data-testid={'stores-screen-title'}
            >
              Quick & Delightful.
            </Heading>
            {isFetchingStores && 
              <Box>
                {Array.from(RANGE_POOL).map((poolPick:string) => (
                  <Box key={poolPick} marginBottom={theme.space[1]}>
                    <StoresFeedItemSkeleton />
                  </Box>
                ))}
              </Box>
            }

            {(stores.length > 0 && !isFetchingStores) && (
            <>
              {stores.map(({
                brand,
                description,
                id,
                name,
                service_fee,
                open_at,
                close_at,
                verified_at
              }:IStorePage.IStoreData) => 
                <Box key={id} marginBottom={theme.space[0]}>
                  <StoresFeedItem
                    description={description}
                    id={id}
                    thumbnailImageSrc={`/static/img/${brand}`}
                    title={name}
                    serviceHours={`${formatServiceHour(open_at)} am - ${formatServiceHour(close_at)} pm`}
                    serviceFee={`N${service_fee}`}
                    isVerified={verified_at !== null}
                  />
                </Box>
                )}
              </>
            )}
          </Col>
        </Row>
      </Grid>
    </Box>
  )
}

StoresFeed.defaultProps = defaultProps;