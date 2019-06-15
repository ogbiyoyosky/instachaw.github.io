'use strict'

import * as React from 'react'
import {
  Box,
  Card,
  Flex,
} from 'rebass';

import { theme } from '@Config';
import { Stencil } from '@Components';

const { space, palette } = theme;

export const StoreDisplayItemSkeleton = ({
  skeletonAddonMarkup,
  titleMarkup = <Stencil width={'60%'} />
}: {
  skeletonAddonMarkup: JSX.Element,
  titleMarkup?: JSX.Element
}) => {
  return (
    <Card>
      <Flex margin={0} width={'100%'}>
        <Stencil width={'30%'} style={{ marginTop: space[0], height: '82px' }}
        />
        <Flex width={'70%'} flexDirection={'column'} alignItems={'center'} padding={`12px`}>
          <Flex
            alignItems={'center'}
            width={'100%'}
            justifyContent={'space-between'}
            marginBottom={space[0]}
          >
            {titleMarkup}
            <Stencil width={space[2]} height={space[2]} radius={'100%'} />
          </Flex>
          <Box width={1}>{skeletonAddonMarkup && skeletonAddonMarkup}</Box>
        </Flex>
      </Flex>
    </Card>
  )
}