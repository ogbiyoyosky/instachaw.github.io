import * as React from 'react';

import { ThemeProvider } from 'styled-components';
import { theme } from "../../src/Config";
import { AppBase } from '@Components';

export const RootComponent:React.FC = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <AppBase>{children}</AppBase>
    </ThemeProvider>
  )
}