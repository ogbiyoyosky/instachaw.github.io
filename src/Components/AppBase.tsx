import * as React from 'react';
import { Box } from "rebass";
import styled from 'styled-components';
import { palette } from "styled-tools";

import { DockerBar, Navbar } from '@Components';
import { Consumer } from '@Containers/ContextProvider';

export const AppBaseElement = styled(Box)`
  font-family: Montserrat, 'Helvetica Neue', Helvetica, Arial, sans-serif;
  background: ${palette('grayscale', 6)};
  height: 100%;
`;

export const AppBase:React.FC<{}> = (props) => {
  const { children } = props;

  return (
    <AppBaseElement>
      <Consumer>
      {({ state, update }) => (
        <React.Fragment>
            <Navbar
              isMenuOpen={state.isMenuOpen || false}
              onMenuToggleClick={() => {
                update({
                  key: 'isMenuOpen',
                  value: !state.isMenuOpen
                })
              }}
            />
            {children}
            <DockerBar />
        </React.Fragment>
      )}
      </Consumer>
    </AppBaseElement>
  )
}