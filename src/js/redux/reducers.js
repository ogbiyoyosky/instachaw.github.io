/**
 * Combine all reducers in this file and export the combined reducers.
 */
import { combineReducers } from "redux-immutable";

// global reducers
import { routesReducer } from "../routes/reducer";
import { appReducer } from "../containers/app/reducer";
import { headerReducer } from "../containers/header/reducer";
import { footerReducer } from "../containers/footer/reducer";
import { homeReducer } from "../screens/home/reducer";
import { welcomeReducer } from "../screens/welcome/reducer";
import { storeReducer } from "../screens/store/reducer";
import { pageReducer } from "../screens/page/reducer";
import { treatReducer } from "../screens/treat/reducer";
import { cartReducer } from "../screens/cart/reducer";
import { checkoutReducer } from "../screens/checkout/reducer";
import { accountReducer } from "../screens/account/reducer";
import { loginReducer } from "../screens/login/reducer";
import { registerReducer } from "../screens/register/reducer";
import { resetReducer } from "../screens/reset/reducer";

export default function createReducer(injectedReducers) {
  return combineReducers({
    routes: routesReducer,
    app: appReducer,
    store: storeReducer,
    treat: treatReducer,
    cart: cartReducer,
    checkout: checkoutReducer,
    account: accountReducer,
    login: loginReducer,
    register: registerReducer,
    reset: resetReducer,
    page: pageReducer,
    home: homeReducer,
    welcome: welcomeReducer,
    header: headerReducer,
    footer: footerReducer,
    ...injectedReducers
  });
}
