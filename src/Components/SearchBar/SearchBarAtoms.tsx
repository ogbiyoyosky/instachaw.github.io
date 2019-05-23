import styled from 'styled-components';
import { Flex } from 'rebass';
import { theme } from '@Config';

const { space, radius, palette } = theme;

const searchBarHeight:string = space[3];
const searchBarPaddingHorizontal:string = space[3];
const searchBarIconSize:number = parseInt(space[2], 10);
const searchBarAddonWidth:number = searchBarIconSize + parseInt(searchBarPaddingHorizontal, 10);

export const SearchBarAddon = styled(Flex)`
    height: ${searchBarHeight};
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    width: ${searchBarAddonWidth}px;
    left: 0;
`;

export const SearchBarInput = styled('input')`
    background: #fff;
    border-color: #fff;
    height: ${searchBarHeight};
    border-radius: ${radius[2]};
    padding-left: ${searchBarAddonWidth}px;
    --webkit-appearance: none;
    outline: none;
    border-width: 0;

    :focus {
      box-shadow: 0 0 0 1px ${palette.grayscale[5]};
      background: ${palette.grayscale[6]};
      outline: none;
    }
    
    ::placeholder {
      color: ${palette.grayscale[4]};
    }  
`;

export const SearchBarWrapper = styled(Flex)`
  position: relative;
`;
