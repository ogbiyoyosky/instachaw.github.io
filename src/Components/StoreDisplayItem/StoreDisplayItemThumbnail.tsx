'use strict';

import * as React from 'react';

import { theme } from '@Config';

const { radius } = theme;

type StoreDisplayItemThumbnailProps = {
  /** Item thumbnail source file path */
  src?: string,
  /** Thumbnail width */
  width?: string
};

export const StoreDisplayItemThumbnail:React.FC<StoreDisplayItemThumbnailProps> = ({ src, width }) => {
  let storesFeedThumbnailStyles:React.CSSProperties = {
    width,
    position: 'relative',
    minHeight: '82px',
    borderTopLeftRadius: radius[1],
    borderBottomLeftRadius: radius[1],
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

  return <div style={storesFeedThumbnailStyles} />
}
