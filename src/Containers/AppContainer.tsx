'use strict';

import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { AppActions } from '@Store/App/actions';
import { RootComponent } from '@Components';
import { ContextProvider } from '@Containers';

type AppContainerProps = { router:any }
type AppContainerState = {}

class AppContainer extends React.Component<AppContainerProps, AppContainerState> {
  render () {
    return (
      <ContextProvider>
        <RootComponent>{this.props.children}</RootComponent>
      </ContextProvider>
    );
  }
}

const mapStateToProps = () => {
  return {}
}
const mapDispatchToProps = ( dispatch: Dispatch ) => {
  return {
    Map: bindActionCreators(AppActions.Map, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer)