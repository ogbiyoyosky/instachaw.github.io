import React from "react";
import PropTypes from "prop-types";
import { Flex, Icon, Input } from "pcln-design-system";
import Styled from "styled-components";

const SearchBarWrapper = Styled(Flex)`
    position: relative;
`;

const SearchBarInput = Styled(Input)`
    background: ${props => props.theme.colors.darkRed}
    border-color: ${props => props.theme.colors.darkRed}
    box-shadow: 0 0 0 1px ${props => props.theme.colors.darkRed};    

    :focus {
      border-color: ${props => props.theme.colors.darkRed};
      box-shadow: 0 0 0 2px ${props => props.theme.colors.darkRed};
    }

    ::placeholder {
      color: ${props => props.theme.colors.lightGray};
    }  
`;

const SearchBarAddon = Styled(Flex)`
    height: 50px;
    position: absolute;
    right: 0;
`;

const SearchBarIcon = Styled(Icon)``;

const SearchBar = ({
  isSearchBarFocused,
  onSearchBarChange,
  hasSearchIcon,
  ...props
}) => {
  return (
    <SearchBarWrapper>
      <SearchBarInput
        {...props}
        onChange={e => onSearchBarChange(e.target.value)}
        placeholder="Search..."
        type="search"
      />

      {hasSearchIcon && (
        <SearchBarAddon
          flexDirection="column"
          justify="center"
          align="center"
          width={[0.15, 0.1, 0.08]}
        >
          <SearchBarIcon name="search" color="white" size="14" />
        </SearchBarAddon>
      )}
    </SearchBarWrapper>
  );
};

SearchBar.propTypes = {
  isSearchBarFocused: PropTypes.bool
};

SearchBar.displayName = "SearchBar";

SearchBar.defaultProps = {
  isSearchBarFocused: false,
  hasSearchIcon: true
};

export default SearchBar;
