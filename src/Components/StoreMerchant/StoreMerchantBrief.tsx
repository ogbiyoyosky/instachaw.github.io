import * as React from 'react';

import { Box, Heading } from 'rebass';
import { theme } from '@Config';

const { palette: { grayscale } } = theme;

type StoreMerchantBriefProps = {};

export const StoreMerchantBrief:React.FC<StoreMerchantBriefProps> = ({ }) => {
  return (
    <Box>
      <Heading>Kilimanjaro, Choba</Heading>
    </Box>
  )
}