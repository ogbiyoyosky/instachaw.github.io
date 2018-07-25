import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import Header from "../header/index";
import Footer from "../footer/index";
import Menu from "../../components/menu";
import Meta from "../../components/meta/meta";
import { ThemeProvider } from "pcln-design-system";
import { getAppState } from "../app/reducer";
import { getHeaderState } from "../header/reducer";
import { setMenuOpenState } from "../header/actions";

class Layout extends React.PureComponent {
  // returns the JSX that will be rendered for this component
  render() {
    const { children, app } = this.props;
    return (
      <ThemeProvider>
        <div
          style={{
            display: "flex",
            minHeight: "100vh",
            flexDirection: "column"
          }}
          className={(app.isLoading ? "is-loading" : "") + " layout"}
        >
          <Meta meta={app.meta} url={app.url} />
          {this.props.header.isMenuOpen && (
            <Menu
              onMenuClose={() =>
                this.props.onSetMenuOpenState({
                  isMenuOpen: false
                })}
            />
          )}
          <Header />
          <main id="main" style={{ flex: 1, minHeight: "100%" }}>
            {children}
          </main>
          <Footer />
        </div>
      </ThemeProvider>
    );
  }
}

// maps the redux store state to the props related to the data from the store
const mapStateToProps = state => {
  return {
    app: getAppState(state).toJS(),
    header: getHeaderState(state).toJS()
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSetMenuOpenState: data => dispatch(setMenuOpenState(data))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Layout));
