import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { AppActions } from '@Store/App/actions'

const AppComponent:React.SFC = ({ children }) => {
  return (
    <div>{children}</div>
  )
}

class AppContainer extends React.Component {
  render () {
    return (
      <AppComponent>
        {this.props.children}
      </AppComponent>      
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