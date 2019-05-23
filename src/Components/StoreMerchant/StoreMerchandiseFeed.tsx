import * as React from 'react';

import Link from 'next/link';
import { Box, Heading } from 'rebass';
import {
  Col,
  Row,
  Grid
} from '@Components';
import { theme } from '@Config';

type StoreMerchandiseFeedProps = {
  /** Displays merchandise loading animation */
  isFetchingMerchandise?: boolean,
};

export const StoreMerchandiseFeed:React.FC<StoreMerchandiseFeedProps> = ({ }) => {
  return (
    <Box padding={`${theme.space[1]} 0`}>
      <Grid>
        <Row>
          <Col>
            <Heading
              color={theme.palette.grayscale[1]}
              data-testid={'store-merchandise-screen-title'}
            >
              Finger Lickin' Good.
            </Heading>
          </Col>
        </Row>
      </Grid>
    </Box>
  )
}