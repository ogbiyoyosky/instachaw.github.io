'use strict';

import * as React from 'react';

import { Box, Flex, Heading, Image, Text } from 'rebass';

import { theme } from '@Config';
import { Grid } from '@Components'
import { StoreMerchantBriefProps } from '@Constants/ComponentTypes'

const {
  palette: {
    grayscale,
    green,
    primary
  },
  Card
} = theme;


export const StoreMerchantBrief = ({
  brandSrc,
  title,
  serviceFee,
  storeOpenFrom
}: StoreMerchantBriefProps) => (
  <Card my={1} px={1} py={2} data-testid={'store-merchant-brief'}>
    <Flex flexDirection={'column'} alignItems={'center'}>
      <Image alt={`Brand logo for ${title}`} width={theme.space[5]} src={brandSrc} />
      <Heading color={grayscale[1]} fontSize={3}>{title}</Heading>

      <Flex mb={1}>
        <Text fontSize={1} color={grayscale[2]} mr={0}>Open from:</Text>
        <Text fontSize={1} fontWeight={'bold'} color={green[1]}>{storeOpenFrom}</Text>
      </Flex>
      <Box>
        <Text fontSize={1} color={grayscale[2]} mr={0}>At your door in <b>less than 25 mins</b> for <b style={{ color: primary[2] }}>N{serviceFee}</b> only.</Text>
      </Box>
    </Flex>
  </Card>
)

export const StoreMerchantBriefWrapper:React.FC = ({ children }) => {
  return (
    <Grid>
      <Grid.Row>
        <Grid.Col>{children}</Grid.Col>
      </Grid.Row>
    </Grid>
  )
}