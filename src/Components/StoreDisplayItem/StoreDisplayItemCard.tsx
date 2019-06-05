'use strict';

import * as React from 'react';
import {
  Card,
  Flex,
  Heading,
  HeadingProps
} from 'rebass';

import { theme } from '@Config';
import { Link } from '@Components';
import { StoreDisplayItemThumbnail } from '@Components/StoreDisplayItem';

const StoreDisplayItemLinkStyles:React.CSSProperties = { height: '100%' };

type StoreDisplayItemCardProps = {
  background?: string,
  contentWidth?: string,
  href: string,
  alias: string,
  headingProps?: HeadingProps,
  title: string,
  cardAddonMarkup?: JSX.Element,
  cardAddonWidth?: string,
  thumbnailSrc?: string,
  childrenContainerStyles?: React.CSSProperties,
}

export const StoreDisplayItemCard:React.FC<StoreDisplayItemCardProps> = ({
  background = '#fff',
  contentWidth = '65%',
  href,
  alias,
  headingProps,
  thumbnailSrc,
  title,
  cardAddonMarkup,
  cardAddonWidth = '15%',
  children,
  childrenContainerStyles
}) => {
  let thumbnailWidth = `${100 - parseInt(contentWidth)}%`

  if (cardAddonMarkup)
    thumbnailWidth = `${100 - parseInt(cardAddonWidth) - parseInt(contentWidth)}%`;

  return (
    <Card
      backgroundColor={background}
      boxShadow={theme.shadows[4]}
      borderRadius={theme.radius[1]}
      style={{ display: 'flex' }}
    >
      {thumbnailSrc &&
        <Flex flexDirection={'column'} width={thumbnailWidth}>
          <Link href={href} alias={alias} style={StoreDisplayItemLinkStyles}>
            <StoreDisplayItemThumbnail width={'100%'} src={thumbnailSrc} />
          </Link>
        </Flex>
      }
      <Flex style={{ flexDirection: 'column', ...childrenContainerStyles }} width={contentWidth}>
        <Heading fontSize={2} color={theme.palette.grayscale[1]} {...headingProps}>
          <Link href={href} alias={alias} style={StoreDisplayItemLinkStyles}>{title}</Link>
        </Heading>
        {children}
      </Flex>
      {cardAddonMarkup &&         
        <Flex flexDirection={'column'} width={cardAddonWidth}>{cardAddonMarkup}</Flex>
      }
    </Card>
  )
}