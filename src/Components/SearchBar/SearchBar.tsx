'use strict';

import React from 'react'

import {
  SearchBarAddon,
  SearchBarInput,
  SearchBarWrapper
} from './SearchBarAtoms'

import { Icon } from '@Components';
import { theme } from '@Config';

export const SearchBar:React.FC = () => {
  return (
    <label style={{ width: '100%' }}>
      <SearchBarWrapper width={1}>
        <SearchBarInput placeholder={'Find great meals...'} />
        <SearchBarAddon>
          <Icon name="search" fill={theme.palette.grayscale[5]} />
        </SearchBarAddon>
      </SearchBarWrapper>
    </label>
  )
}