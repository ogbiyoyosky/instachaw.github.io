'use strict';

import * as React from 'react';
import { Box } from 'rebass';
import styled from 'styled-components';
import { palette } from 'styled-tools';
import { PageTransition } from 'next-page-transitions';
import { withRouter } from 'next/router';

import { DockerBar, Navbar } from '@Components';
import { Consumer } from '@Containers/ContextProvider';
import { findRoutePathDepth } from '@Utilities';

export const AppBaseElement = styled(Box)`
  font-family: Montserrat, 'Helvetica Neue', Helvetica, Arial, sans-serif;
  background: ${palette('grayscale', 6)};
  height: 100%;
`;

export class AppBaseComponent extends React.Component<{ router?: any }>{
  state = {
    prevPathDepth: 0
  }

  componentDidMount() {
    const { router } = this.props;

    // Store the previous route depth (based on the URI scheme)
    this.setState({
      prevPathDepth: findRoutePathDepth(router.asPath)
    })

    router.events.on('routeChangeComplete', (route:string) => {
      this.setState({
        prevPathDepth: findRoutePathDepth(route)
      })
    })
  }

  render() {
    const { children, router } = this.props;
    const transitionDirection = findRoutePathDepth(router.asPath) >= this.state.prevPathDepth ? 'left': 'right';

    return (
      <AppBaseElement>
        <Consumer>
        {({ }) => (
          <React.Fragment>
            <Navbar />
              <PageTransition
                timeout={300}
                classNames={`page-container ${transitionDirection} page-transition`}
              >
                <React.Fragment key={router.route}>{children}</React.Fragment>
              </PageTransition>
            <DockerBar />
          </React.Fragment>
        )}
        </Consumer>
      </AppBaseElement>
    )  
  }
}

export const AppBase = withRouter(AppBaseComponent);