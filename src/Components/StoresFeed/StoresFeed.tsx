import * as React from 'react';

import { Box, Heading } from 'rebass';
import { Grid } from '@Components';
import { theme } from '@Config';
import { IStorePage } from '@Interfaces/Pages/Store';

import { StoresFeedItem } from './StoresFeedItem';
import { StoresFeedItemSkeleton } from './StoresFeedItemAtoms';
import { formatServiceHour, generateRandString } from '@Utilities';
import { StoresSkeletonList, StoresList } from '@Generics';

const { space } = theme;

type StoresFeedProps = {
  /** Displays stores loading animation */
  isFetchingStores?: boolean,
  /** Array list of stores */
  stores: IStorePage.IStoreData[]
};

const renderStoresListItem = ({
  brand,
  description,
  id,
  name,
  service_fee,
  open_at,
  close_at,
  verified_at
}: IStorePage.IStoreData) => 
  <Box key={id} marginBottom={space[0]}>
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

export const StoresFeed:React.FC<StoresFeedProps> = ({
  stores = [],
  isFetchingStores = false
}) => {
  return (
    <Box padding={`${space[0]} 0`}>
      <Grid>
        <Grid.Row>
          <Grid.Col>
            <Heading
              margin={`${space[1]} 0`}
              color={theme.palette.grayscale[2]}
              data-testid={'stores-screen-title'}
            >
              Quick & Delightful.
            </Heading>
            {isFetchingStores && 
              <Box>
                <StoresSkeletonList
                  items={generateRandString(5).split('')}
                  itemRenderer={(poolPick:any, key:number) => (
                    <Box key={`${poolPick}-${key}`} marginBottom={space[1]}>
                      <StoresFeedItemSkeleton />
                    </Box>
                  )}
                />
              </Box>
            }
            
            {(stores.length > 0 && !isFetchingStores) && (
              <StoresList items={stores} itemRenderer={renderStoresListItem} />
            )}
          </Grid.Col>
        </Grid.Row>
      </Grid>
    </Box>
  )
}