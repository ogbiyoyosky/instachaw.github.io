import React from "react";
import PropTypes from "prop-types";
import { Flex, Icon, Input } from "pcln-design-system";
import Styled from "styled-components";

const SearchBarWrapper = Styled(Flex)`
    position: relative;
`;

const SearchBarInput = Styled(Input)``;

const SearchBarAddon = Styled(Flex)`
    height: 50px;
    position: absolute;
    right: 0;
`;

const SearchBarIcon = Styled(Icon)``;

const SearchBar = ({ isSearchBarFocused, onSearchBarChange, ...props }) => {
  return (
    <SearchBarWrapper>
      <SearchBarInput
        {...props}
        onChange={e => onSearchBarChange(e.target.value)}
        placeholder="Search..."
      />
      <SearchBarAddon
        flexDirection="column"
        justify="center"
        align="center"
        width={[0.15, 0.1, 0.08]}
      >
        <SearchBarIcon name="search" color="gray" size="14" />
      </SearchBarAddon>
    </SearchBarWrapper>
  );
};

SearchBar.propTypes = {
  isSearchBarFocused: PropTypes.bool
};

SearchBar.displayName = "SearchBar";

SearchBar.defaultProps = {
  isSearchBarFocused: false
};

export default SearchBar;
