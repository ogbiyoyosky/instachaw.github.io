import React from "react";
import { Switch, Route, withRouter } from "react-router";
import { Redirect } from "react-router-dom";
import { TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";

import { getRoutesState } from "./reducer";
import { fetchRoutes } from "./actions";
import ScrollToTop from "../components/navigation/scrollToTop";
import Layout from "../containers/layout/index";
import FadeTransition from "../components/transitions/fade";

import HomeScreen from "../screens/home";
import PageScreen from "../screens/page";
import CartScreen from "../screens/cart";
import CheckoutScreen from "../screens/checkout";
import TreatScreen from "../screens/treat";
import AccountScreen from "../screens/account";
import LoginScreen from "../screens/login";
import RegisterScreen from "../screens/register";
import ResetScreen from "../screens/reset";

const routeComponents = {
  Home: HomeScreen,
  Page: PageScreen,
  Cart: CartScreen,
  Checkout: CheckoutScreen,
  Treat: TreatScreen,
  Account: AccountScreen,
  Login: LoginScreen,
  Register: RegisterScreen,
  ResetPassword: ResetScreen
};

class Routes extends React.PureComponent {
  componentDidMount() {
    const { fetchData } = this.props;
    fetchData();
  }

  render() {
    const { routes } = this.props;

    return (
      <Layout>
        <ScrollToTop>
          <Route
            render={({ location, history }) => (
              <TransitionGroup>
                {/*<FadeTransition key={location.key}>*/}
                <Switch location={location}>
                  {routes.map(route => {
                    return !this.isProtectedRoute(routes, location) ? (
                      <Route
                        key={route.url}
                        exact
                        path={route.url}
                        location={location}
                        history={history}
                        component={getRouteComponent(route.name).component}
                      />
                    ) : location.pathname !== "/login" &&
                    !localStorage.getItem("user") ? (
                      <Redirect
                        to={{
                          pathname: "/login"
                        }}
                        key={route.url}
                      />
                    ) : (
                      <Route
                        key={route.url}
                        exact
                        path={route.url}
                        location={location}
                        history={history}
                        component={getRouteComponent(route.name).component}
                      />
                    );
                  })}
                </Switch>
                {/*</FadeTransition>*/}
              </TransitionGroup>
            )}
          />
          <Route
            render={props => <PageScreen {...props} path={"/page-not-found"} />}
          />
        </ScrollToTop>
      </Layout>
    );
  }

  isProtectedRoute(routes, location) {
    let protectedRoute = routes.filter(
      route => location.pathname.split("/")[1] === route.pathname.split("/")[1]
    )[0];

    return typeof protectedRoute !== "undefined"
      ? protectedRoute.protected
      : false;
  }

  static fetchData(store) {
    return store.dispatch(fetchRoutes());
  }
}

export const getRouteComponent = name => {
  let routeComponent = routeComponents[name];
  return {
    component: routeComponent,
    getReducer: routeComponent.getReducer,
    fetchData: routeComponent.fetchData
  };
};

// maps the redux store state to the props related to the data from the store
const mapStateToProps = state => {
  return getRoutesState(state).toJS();
};

// specifies the behaviour, which callback prop dispatches which action
const mapDispatchToProps = dispatch => {
  return {
    fetchData: data => dispatch(fetchRoutes(data))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Routes));
