webpackJsonp([1],{"./js/components/UI/ecosystems/BaseFundingModal.js":function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=n("../node_modules/react/index.js"),l=a(o),r=n("../node_modules/prop-types/index.js"),u=a(r),i=n("../node_modules/pcln-design-system/dist/index.js"),s=n("./js/components/UI/atoms/index.js"),d=n("./js/components/UI/atoms/StyledModal.js"),c=n("./js/components/UI/molecules/index.js"),m=n("./js/components/UI/organisms/index.js"),f=n("./js/util/util.js"),p=function(e){return l.default.createElement(i.Flex,{p:2,flexDirection:"column",justify:"center",alignItems:"center",style:{height:"100%"}},l.default.createElement(s.CloseButton,{onClick:function(t){return e.onClose(t)}}),l.default.createElement(i.Flex,{justify:"center",alignItems:"center"},e.isAttemptingFunding?l.default.createElement(c.FundingConfirmationDisplay,null):l.default.createElement(m.BaseFundingForm,{paymentButtonText:"Pay Securely with "+("naira"===e.fundingMethod?"Paystack":"Steemconnect"),onFundingSubmit:function(t){return e.onFundingSubmit(t)},fundingMethod:e.fundingMethod,fundingMethodDisplayName:(0,f.toTitleCase)(e.fundingMethod),onSetFundingAmount:function(t){return e.onSetFundingAmount(t)},onSetFundingMethod:function(t){return e.onSetFundingMethod(t)},value:e.fundingAmount,isFundingInputFocused:e.isFundingModalOpen})))},g=function(e){return e.isFullscreenModal?l.default.createElement(d.StyledFullscreenModal,{pose:e.isFundingModalOpen?"fullscreen":"idle",style:{display:e.isFundingModalOpen?"block":"none"}},l.default.createElement(p,e)):l.default.createElement(s.StyledModal,{pose:e.isFundingModalOpen?"fullscreen":"idle",style:{display:e.isFundingModalOpen?"block":"none"}},l.default.createElement(p,e))};g.propTypes={isFundingModalOpen:u.default.bool,isFullscreenModal:u.default.bool},g.defaultProps={isFundingModalOpen:!1,isFullscreenModal:!1},t.default=g},"./js/components/UI/ecosystems/CartModal.js":function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=n("../node_modules/react/index.js"),l=a(o),r=n("../node_modules/prop-types/index.js"),u=a(r),i=n("../node_modules/pcln-design-system/dist/index.js"),s=n("./js/components/UI/atoms/index.js"),d=n("./js/containers/feed/index.js"),c=a(d),m=function(e){return l.default.createElement(s.StyledModal,{pose:e.isCartModalOpen?"fullscreen":"idle",style:{display:e.isCartModalOpen?"block":"none"}},l.default.createElement(i.Flex,{alignItems:"center",justify:"center"},l.default.createElement(i.Flex,{p:2,flexDirection:"column",width:[1,.9,.7,.7]},l.default.createElement(i.Flex,{mb:2},l.default.createElement(i.Text,{fontSize:3,bold:!0,style:{flex:.999}},e.cartItems.length-1+" More",e.cartItems.length-1==1?" Treat":" Treats"),l.default.createElement(i.IconButton,{size:32,color:"#999",borderColor:"transparent",name:"close",onClick:function(t){return e.onSetCartModalStatus(!1)}})),l.default.createElement(i.Flex,{flexDirection:"column"},l.default.createElement(c.default,{items:e.cartItems,highlightSelectedItem:!1})))))};m.propTypes={isCartModalOpen:u.default.bool,cartItems:u.default.array},m.defaultProps={isCartModalOpen:!1,cartItems:[]},t.default=m},"./js/components/UI/ecosystems/CheckoutInfo.js":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},o=n("../node_modules/react/index.js"),l=function(e){return e&&e.__esModule?e:{default:e}}(o),r=n("./js/components/UI/organisms/index.js"),u=n("../node_modules/pcln-design-system/dist/index.js"),i=function(e){return l.default.createElement(u.Flex,a({flexDirection:"column"},e),l.default.createElement(u.Text,{fontSize:2,mb:3,bold:!0},"Complete Checkout"),l.default.createElement(u.Box,{mb:3},l.default.createElement(r.AddressInputCard,e)),e.isUserAuthenticated?l.default.createElement(u.Box,null,l.default.createElement(u.Box,{mb:3},l.default.createElement(r.PaymentCard,e)),l.default.createElement(u.Box,{mb:3},l.default.createElement(r.PaymentModeCard,e))):l.default.createElement(u.Box,{mb:3},l.default.createElement(r.AuthCard,e)))};t.default=i},"./js/components/UI/ecosystems/PaystackFundingModal.js":function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=n("../node_modules/react/index.js"),l=a(o),r=n("../node_modules/prop-types/index.js"),u=a(r),i=n("../node_modules/pcln-design-system/dist/index.js"),s=n("./js/components/UI/atoms/index.js"),d=n("./js/components/UI/atoms/StyledModal.js"),c=n("./js/components/UI/organisms/index.js"),m=n("./js/util/util.js"),f=function(e){return l.default.createElement(i.Flex,{p:2,flexDirection:"column",justify:"center",alignItems:"center",style:{height:"100%"}},l.default.createElement(s.CloseButton,{onClick:function(t){return e.onClose(t)}}),l.default.createElement(i.Flex,{justify:"center",alignItems:"center"},l.default.createElement(c.BaseFundingForm,{onFundingSubmit:function(t){return e.onFundingSubmit(t)},fundingMethod:e.fundingMethod,fundingMethodDisplayName:(0,m.toTitleCase)(e.fundingMethod),paymentButtonText:"Pay securely with Paystack",onSetFundingAmount:function(t){return e.onSetFundingAmount(t)},onSetFundingMethod:function(t){return e.onSetFundingMethod(t)},value:e.fundingAmount,isFundingInputFocused:e.isFundingModalOpen,isAttemptingFunding:e.isAttemptingFunding})))},p=function(e){return e.isFullscreenModal?l.default.createElement(d.StyledFullscreenModal,{pose:e.isFundingModalOpen?"fullscreen":"idle",style:{display:e.isFundingModalOpen?"block":"none"}},l.default.createElement(f,e)):l.default.createElement(s.StyledModal,{pose:e.isFundingModalOpen?"fullscreen":"idle",style:{display:e.isFundingModalOpen?"block":"none"}},l.default.createElement(f,e))};p.propTypes={isFundingModalOpen:u.default.bool,isFullscreenModal:u.default.bool},p.defaultProps={isFundingModalOpen:!1,isFullscreenModal:!1},t.default=p},"./js/components/UI/ecosystems/Summary.js":function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},l=n("../node_modules/react/index.js"),r=a(l),u=n("../node_modules/prop-types/index.js"),i=a(u),s=n("../node_modules/pcln-design-system/dist/index.js"),d=n("./js/components/UI/molecules/index.js"),c=n("./js/util/util.js"),m=function(e){return r.default.createElement(s.Flex,o({flexDirection:"column"},e),r.default.createElement(d.CardHeading,{title:"Summary",onToggleClick:e.onSummaryToggleClick,isMinimized:e.isMinimized,expandLabel:"More Details",shrinkLabel:"Less Details"}),r.default.createElement(s.Flex,{flexDirection:"column",style:{height:e.isMinimized?0:"60px",overflowY:"hidden",transition:"height 0.3s ease-in-out"}},r.default.createElement(s.Flex,{mb:2},r.default.createElement(s.Text,{fontSize:1,regular:!0},"Subtotal"),r.default.createElement(s.Text,{color:"gray",ml:"auto",fontSize:1,regular:!0},e.subtotal)),r.default.createElement(s.Flex,{mb:3},r.default.createElement(s.Text,{fontSize:1,regular:!0},"VAT"),r.default.createElement(s.Text,{color:"gray",ml:"auto",fontSize:1,regular:!0},e.vat))),r.default.createElement(s.Flex,null,r.default.createElement(s.Text,{color:"gray",fontSize:1,bold:!0},"Total"),r.default.createElement(s.Text,{ml:"auto",fontSize:1,bold:!0},"naira"===e.paymentMethod&&"N",(0,c.roundToDecimalPlaces)(e.total),"naira"!==e.paymentMethod&&" "+e.paymentMethod)))};m.propTypes={isMinimized:i.default.bool,onSummaryToggleClick:i.default.func},m.defaultProps={isMinimized:!0},t.default=m},"./js/components/UI/ecosystems/index.js":function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.Summary=t.BaseFundingModal=t.CheckoutInfo=t.CartModal=void 0;var o=n("./js/components/UI/ecosystems/CartModal.js"),l=a(o),r=n("./js/components/UI/ecosystems/CheckoutInfo.js"),u=a(r),i=n("./js/components/UI/ecosystems/PaystackFundingModal.js"),s=(a(i),n("./js/components/UI/ecosystems/BaseFundingModal.js")),d=a(s),c=n("./js/components/UI/ecosystems/Summary.js"),m=a(c);t.CartModal=l.default,t.CheckoutInfo=u.default,t.BaseFundingModal=d.default,t.Summary=m.default},"./js/components/UI/organisms/AddressInputCard.js":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n("../node_modules/react/index.js"),o=function(e){return e&&e.__esModule?e:{default:e}}(a),l=n("../node_modules/pcln-design-system/dist/index.js"),r=n("./js/components/UI/atoms/index.js"),u=n("./js/components/UI/molecules/index.js"),i=function(e){return o.default.createElement(l.Card,{bg:"lightGray"},o.default.createElement(l.Box,{pt:2,pb:3,px:3},o.default.createElement(l.Flex,null,o.default.createElement(l.Flex,{style:{flex:4}},o.default.createElement(l.Text,{fontSize:2,bold:!0},"Add an Address"))),o.default.createElement(l.Flex,{mb:2},o.default.createElement(l.Text,{color:"gray",fontSize:0},"A correct address means faster delivery.")),o.default.createElement(l.Box,null,void 0!==e.userAddresses&&e.userAddresses.length>0?o.default.createElement(u.AutocompleteAddressInput,e):o.default.createElement(r.Input,{id:"address",style:{background:"#fff"},onFocus:function(e){return e.target.select()},autoFocus:!0,autocomplete:"on",placeholder:"Example: Room 2, Cali Villa, Alaska",value:e.currentDeliveryAddress,onChange:function(t){e.onSetDeliveryAddress(t.target.value)}}))))};t.default=i},"./js/components/UI/organisms/AuthCard.js":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n("../node_modules/react/index.js"),o=function(e){return e&&e.__esModule?e:{default:e}}(a),l=n("../node_modules/pcln-design-system/dist/index.js"),r=n("./js/components/UI/atoms/index.js"),u=(n("./js/components/UI/molecules/index.js"),function(e){return o.default.createElement(l.Card,{bg:"white",py:5},o.default.createElement(l.Flex,{flexDirection:"column"},o.default.createElement(l.Flex,{justify:"center",alignItems:"center"},o.default.createElement(l.Heading,{fontSize:2,bold:!0},"Login or Register to finish this.")),o.default.createElement(l.Flex,{py:2,justify:"center",alignItems:"center"},o.default.createElement(r.OutlineButton,{onClick:function(t){return e.history.push("/login")}},"Login to your account"))))});t.default=u},"./js/components/UI/organisms/BaseFundingForm.js":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n("../node_modules/react/index.js"),o=function(e){return e&&e.__esModule?e:{default:e}}(a),l=n("../node_modules/pcln-design-system/dist/index.js"),r=n("../node_modules/react-spinners/index.js"),u=n("./js/components/UI/atoms/index.js"),i=function(e){return o.default.createElement(l.Box,{width:[.8,.6,.5]},o.default.createElement("form",{method:"get",onSubmit:function(t){t.preventDefault(),e.onFundingSubmit(t)}},o.default.createElement(l.Flex,{flexDirection:"column",justify:"center",alignItems:"center"},o.default.createElement(l.Text,{fontSize:4,mb:3,style:{textAlign:"center"}},"Fund ",o.default.createElement("strong",null,e.fundingMethodDisplayName)," ",o.default.createElement("em",null,"Without Stress"),"."),o.default.createElement(l.Box,{mb:3},o.default.createElement(u.Label,{mb:1,fontSize:0},"Amount"),o.default.createElement(u.Input,{onChange:function(t){e.onSetFundingAmount({fundingAmount:Number(t.target.value)})},value:e.value,type:"number",id:"amount",min:0,step:"any",onFocus:function(e){return e.target.select()},autoFocus:e.isFundingInputFocused,style:{background:"#fff"}})),o.default.createElement(l.Box,{mb:3},o.default.createElement(l.Button,{disabled:e.isAttemptingFunding,type:"submit",fullWidth:!0,mb:1},e.isAttemptingFunding?o.default.createElement(r.SyncLoader,{color:"#f1f1f1",size:10,loading:!0}):o.default.createElement(l.Text,null,e.paymentButtonText)),e.isAttemptingFunding&&o.default.createElement(l.Text,{color:"gray",fontSize:0},"Going to PayStack's secure payment portal within 10s...")),"naira"!==e.fundingMethod&&o.default.createElement(l.Box,null,"STEEM"===e.fundingMethod?o.default.createElement(l.OutlineButton,{type:"button",onClick:function(t){return e.onSetFundingMethod({fundingMethod:"SBD"})},fullWidth:!0},"I'd rather add SBD"):o.default.createElement(l.OutlineButton,{type:"button",onClick:function(t){t.preventDefault(),e.onSetFundingMethod({fundingMethod:"STEEM"})},fullWidth:!0},"I'd rather add STEEM")))))};i.defaultProps={paymentButtonText:"Pay Securely with SteemConnect"},t.default=i},"./js/components/UI/organisms/CartEmptyState.js":function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=n("../node_modules/react/index.js"),l=a(o),r=n("../node_modules/prop-types/index.js"),u=(a(r),n("../node_modules/pcln-design-system/dist/index.js")),i=n("./js/components/UI/atoms/index.js"),s=function(e){return l.default.createElement(u.Flex,{px:3,flexDirection:"column",justify:"center",style:{height:"80%",position:"absolute",width:"100%"}},l.default.createElement(u.Flex,{flexDirection:"column",justify:"center",alignItems:"center",style:{textAlign:"center"}},l.default.createElement(u.Text,{fontSize:4,mb:3,bold:!0},"Please fill me."),l.default.createElement(u.Text,{mb:3},"Add tons of delightful treats to your cart below."),l.default.createElement(u.Flex,{justify:"center",alignItems:"center"},l.default.createElement(i.OutlineButton,{onClick:function(t){return e.onShowTreatsButtonClick(t)}},"See treats for your cart"))))};t.default=s},"./js/components/UI/organisms/PaymentCard.js":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n("../node_modules/react/index.js"),o=function(e){return e&&e.__esModule?e:{default:e}}(a),l=n("../node_modules/pcln-design-system/dist/index.js"),r=n("./js/components/UI/molecules/index.js"),u=n("./js/util/util.js"),i=function(e){var t=(0,u.roundToDecimalPlaces)(e.getWalletBalance("STEEM"),3),n=(0,u.roundToDecimalPlaces)(e.getWalletBalance("SBD"),3),a=(0,u.roundToDecimalPlaces)(e.getWalletBalance("naira"),3),i=e.rates.STEEM,s=e.rates.SBD,d=a>0,c=t>0,m=n>0;return o.default.createElement(l.Card,{bg:"lightGray"},o.default.createElement(l.Flex,{flexDirection:"column",pt:2,pb:3,px:3},o.default.createElement(r.CardHeading,{title:"Change Pay Method",onToggleClick:e.onPaymentToggleClick,isMinimized:e.isPaymentMinimized}),o.default.createElement(l.Box,{style:{height:e.isPaymentMinimized?"45px":"110px",overflowY:"hidden",transition:"height 0.3s ease-in-out"}},o.default.createElement(r.PaymentChoice,{choice:"naira",isActivePaymentMethod:"naira"===e.activePaymentMethod,message:"Pay N"+(0,u.roundToDecimalPlaces)(e.amount,3)+" Cash",onSetActivePaymentMethod:function(t){return e.onSetActivePaymentMethod("naira")}}),o.default.createElement(l.Text,{fontSize:0,color:"gray",mb:1,align:"center"},"or"),o.default.createElement(r.PaymentChoice,{choice:"STEEM",isActivePaymentMethod:"STEEM"===e.activePaymentMethod||"SBD"===e.activePaymentMethod,message:"Pay "+(0,u.roundToDecimalPlaces)(e.amount/i,3)+" STEEM or "+(0,u.roundToDecimalPlaces)(e.amount/s,3)+" SBD",onSetActivePaymentMethod:function(t){return e.onSetActivePaymentMethod("STEEM")}})),(c||m)&&o.default.createElement(l.Text,{color:"gray",fontSize:0,mb:1},o.default.createElement("b",null,c&&t+" STEEM "),c&&m&&"& ",o.default.createElement("b",null,m&&n+" SBD "),"available in wallet"),d&&o.default.createElement(l.Text,{color:"gray",fontSize:0},"You have ",o.default.createElement("b",null,d&&"NGN "+a," "),"available.")))};t.default=i},"./js/components/UI/organisms/PaymentModeCard.js":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n("../node_modules/react/index.js"),o=function(e){return e&&e.__esModule?e:{default:e}}(a),l=n("../node_modules/pcln-design-system/dist/index.js"),r=n("./js/components/UI/molecules/index.js"),u=n("./js/components/UI/atoms/index.js"),i=function(e){return o.default.createElement(l.Card,{bg:"lightGray"},o.default.createElement(l.Box,{pt:2,pb:3,px:3},o.default.createElement(r.CardHeading,{title:"Mode of Payment",onToggleClick:e.onPaymentModeToggleClick,isMinimized:e.isPaymentModeMinimized}),o.default.createElement(l.Box,{style:{height:e.isPaymentModeMinimized?"23px":"46px",overflow:"hidden",transition:"height 0.3s ease-in-out"}},o.default.createElement(u.Label,{regular:!0,fontSize:2},o.default.createElement(l.Flex,null,o.default.createElement(u.Radio,{value:"on-demand",id:"on-demand",name:"payment-mode",onChange:function(t){return e.onSetActivePaymentMode(t.target.value)},checked:"on-demand"===e.activePaymentMode}),o.default.createElement(l.Text,{ml:2},"Pay immediately (on demand)"))),o.default.createElement(u.Label,{htmlFor:"on-delivery",regular:!0,fontSize:2},o.default.createElement(l.Flex,null,o.default.createElement(u.Radio,{value:"on-delivery",id:"on-delivery",name:"payment-mode",onChange:function(t){return e.onSetActivePaymentMode(t.target.value)},checked:"on-delivery"===e.activePaymentMode}),o.default.createElement(l.Text,{ml:2},"Pay later (on delivery)")))),o.default.createElement(l.Flex,null)))};t.default=i},"./js/components/UI/organisms/index.js":function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.BaseFundingForm=t.PaymentModeCard=t.PaymentCard=t.CartEmptyState=t.AddressInputCard=t.AuthCard=void 0;var o=n("./js/components/UI/organisms/AddressInputCard.js"),l=a(o),r=n("./js/components/UI/organisms/AuthCard.js"),u=a(r),i=n("./js/components/UI/organisms/CartEmptyState.js"),s=a(i),d=n("./js/components/UI/organisms/PaymentCard.js"),c=a(d),m=n("./js/components/UI/organisms/PaymentModeCard.js"),f=a(m),p=n("./js/components/UI/organisms/BaseFundingForm.js"),g=a(p);t.AuthCard=u.default,t.AddressInputCard=l.default,t.CartEmptyState=s.default,t.PaymentCard=c.default,t.PaymentModeCard=f.default,t.BaseFundingForm=g.default},"./js/screens/account/index.js":function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function l(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function r(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},i=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),s=n("../node_modules/react/index.js"),d=a(s),c=n("../node_modules/react-redux/es/index.js"),m=n("../node_modules/react-router/es/index.js"),f=n("./js/redux/reducerInjector.js"),p=a(f),g=n("../node_modules/react-router-dom/es/index.js"),y=n("./js/screens/account/constants.js"),h=n("./js/screens/account/actions.js"),x=n("./js/screens/account/reducer.js"),j=(n("./js/containers/app/reducer.js"),n("./js/containers/app/actions.js")),E=n("./js/screens/account/reducer.js"),M=n("../node_modules/pcln-design-system/dist/index.js"),F=n("./js/containers/feed/index.js"),b=(a(F),n("./js/components/UI/molecules/index.js")),S=n("./js/components/UI/ecosystems/index.js"),v=n("./js/services/AccountService/index.js"),T=a(v),C=n("./js/util/util.js"),I=[{id:1,title:"Delighted to see you!",body:"Hi, we are delighted to serve you.\n      Make a selection of your favorite meals and we'll hand them over within 15 minutes.",isUnread:!0}],_=function(e){return d.default.createElement(M.Flex,{flexDirection:"column",width:"100%"},d.default.createElement(M.Flex,{flexDirection:"column",width:"100%",py:3,px:4,style:{display:e.account.isFundingModalOpen?"none":"block"}},d.default.createElement(M.Flex,{alignItems:"center",justify:"center"},d.default.createElement(M.Box,{width:[1,.9,.7,.7]},d.default.createElement(M.Heading.h3,{mb:2,bold:!0},"My Account."),d.default.createElement(M.Flex,{justify:"center",alignItems:"center"},d.default.createElement(M.Flex,null,d.default.createElement(M.Flex,{flexDirection:"column",mb:1,mr:4},d.default.createElement(M.Text,{align:"center",fontSize:4,color:"blue"},(0,C.roundToDecimalPlaces)(e.getWalletBalance("STEEM"),3)),d.default.createElement(M.Text,{style:{textAlign:"center"},color:"gray",fontSize:1},"STEEM")),d.default.createElement(M.Flex,{flexDirection:"column",mb:1,mr:4},d.default.createElement(M.Text,{align:"center",fontSize:4,color:"blue"},(0,C.roundToDecimalPlaces)(e.getWalletBalance("SBD"),3)),d.default.createElement(M.Text,{style:{textAlign:"center"},color:"gray",fontSize:1},"SBD")),d.default.createElement(M.Flex,{flexDirection:"column",mb:1,mr:4},d.default.createElement(M.Text,{align:"center",fontSize:4,color:"green"},(0,C.roundToDecimalPlaces)(e.getWalletBalance("naira"),3)),d.default.createElement(M.Text,{style:{textAlign:"center"},color:"gray",fontSize:1},"Naira")),d.default.createElement(M.Flex,{flexDirection:"column",mb:1},d.default.createElement(M.Text,{align:"center",fontSize:4,color:"gray"},e.account.orders.length),d.default.createElement(M.Text,{style:{textAlign:"center"},color:"gray",fontSize:1},"Orders")))),d.default.createElement(M.Flex,{flexDirection:"column",mt:2,mb:3},d.default.createElement(M.Text,{mb:3},d.default.createElement(M.Flex,{justify:"center"},d.default.createElement(M.Text,null,"Running low on "),d.default.createElement(M.Text,{color:"blue",bold:!0},"STEEM"),d.default.createElement(M.Text,null,"?"))),d.default.createElement(M.Button,{onClick:function(t){e.setFundingMethod({fundingMethod:"naira"}),e.setFundingModalStatus({isFundingModalOpen:!0})},mb:2},"Add cash (NGN) easily"),d.default.createElement(M.OutlineButton,{onClick:function(t){e.setFundingMethod({fundingMethod:"naira"===e.account.fundingMethod?"SBD":e.account.fundingMethod}),e.setFundingModalStatus({isFundingModalOpen:!0})}},"Add SBD/STEEM painlessly"))))),e.account.isFundingModalOpen&&d.default.createElement(S.BaseFundingModal,{fundingAmount:e.account.fundingAmount,fundingMethod:e.account.fundingMethod,isAttemptingFunding:e.account.isAttemptingFunding,isFundingModalOpen:e.account.isFundingModalOpen,isFullscreenModal:!0,onFundingSubmit:function(t){return e.onFundingSubmit(t)},onSetFundingAmount:function(t){return e.setFundingAmount(t)},onSetFundingMethod:function(t){e.setFundingAmount({fundingAmount:(void 0).getPaymentAmount(fundingMethod)}),e.setFundingMethod(t)},onClose:function(t){e.setFundingModalStatus({isFundingModalOpen:!1}),e.setFundingAttemptingStatus({isAttemptingFunding:!1}),e.clearPaymentInterval}}))},P=function(){return d.default.createElement(M.Flex,{width:1,alignItems:"center",justify:"center"},d.default.createElement(M.Box,{width:[1,.9,.7]},d.default.createElement(M.Box,{py:3,px:4},d.default.createElement(M.Heading.h3,{bold:!0,mb:4},"Just In."),d.default.createElement(b.NotificationFeed,{notifications:I}))))},O=function(e){return d.default.createElement(M.Flex,{width:1,alignItems:"center",justify:"center"},d.default.createElement(M.Box,{width:[1,.9,.7]},d.default.createElement(M.Box,{mb:3,py:3,px:4},d.default.createElement(M.Heading.h3,{mb:2,bold:!0},"Active Orders."),d.default.createElement(b.OrdersFeed,{onCancelOrder:e.onCancelOrder,orders:e.account.orders.length>0&&e.account.orders.filter(function(e){return null==e.deleted_at}),isOrderCancellable:!0})),d.default.createElement(M.Box,{py:1,px:4},d.default.createElement(M.Heading.h5,{mb:2,bold:!0},"Cancelled Orders."),d.default.createElement(b.OrdersFeed,{onCancelOrder:e.onCancelOrder,orders:e.account.orders.length>0&&e.account.orders.filter(function(e){return null!==e.deleted_at}),isOrderCancellable:!1}))))},A=[{name:"account",label:"Account",path:"/account",component:function(e){return d.default.createElement(_,e)}},{name:"notifications",label:"Notifications",path:"/account/notifications",component:function(e){return d.default.createElement(P,e)}},{name:"orders",label:"Orders",path:"/account/orders",component:function(e){return d.default.createElement(O,e)}}],B=function(e,t){return A.filter(function(t){return t.path===e})[0].component(t)},k=function(e){function t(e){o(this,t);var n=l(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.state={isModalOpen:!1,paymentStatusInterval:null},n.onFundingSubmit=n.onFundingSubmit.bind(n),n.onCancelOrder=n.onCancelOrder.bind(n),n.paymentStatusInterval="",n}return r(t,e),i(t,[{key:"componentDidMount",value:function(){var e=this.props,t=(e.onLoadAccount,e.match),n=(e.app,e.account,e.setTitle),a=e.history;e.fetchTransactionsCount;(0,e.fetchOrders)();var o=t.url.split("/"),l=(0,C.toTitleCase)(o[o.length-1]);n({title:l}),a.listen(function(e){var t=e.pathname.split("/"),a=(0,C.toTitleCase)(t[t.length-1]);n({title:a})})}},{key:"componentWillUnmount",value:function(){this.onPaymentSubmit=null,this.onCancelOrder=null,this.state.paymentStatusInterval&&(this.state.paymentStatusInterval=clearInterval(this.state.paymentStatusInterval))}},{key:"render",value:function(){var e=this;return d.default.createElement(M.Flex,{mt:4,mb:5,flexDirection:"column"},d.default.createElement(M.Flex,{bg:"darkGray",flexDirection:"column",style:{minHeight:"27vh"},align:"center",justify:"center"},d.default.createElement(M.Heading.h4,{color:"lightGray"},"Hello, ",this.props.account.user.username,".")),d.default.createElement(M.Flex,{justify:"center",alignItems:"center"},d.default.createElement(M.Flex,{p:2,flexDirection:"row",width:[1,.9,.7,.7]},d.default.createElement(b.TabBar,{activeTabPath:this.props.match.url,bg:"lightGray",tabItems:A}))),d.default.createElement(M.Flex,null,d.default.createElement(m.Route,{path:this.props.match.path+"/:tab?",render:function(t){return B(e.props.match.url,u({},e.props,{onFundingSubmit:e.onFundingSubmit,onCancelOrder:e.onCancelOrder,clearPaymentInterval:e.clearPaymentInterval,payWithPayStack:e.payWithPayStack}))}})))}},{key:"onFundingSubmit",value:function(e){var t=this;e.preventDefault();var n=this.props,a=n.account,o=n.fetchTransactionToken,l=n.setFundingAttemptingStatus,r=n.setTransactionsCount,u=n.fetchTransactionsCount,i=n.setUser,s=n.setFundingModalStatus;a.fundingMethod,T.default.processFundingRequest({account:a,handleFetchTransactionToken:o,handleSetFundingAttemptingStatus:function(e){return l(e)},handleSetTransactionsCount:function(e){return r(e)},handleFetchTransactionsCount:function(e,t){return u(e,t)},handlesSetUser:function(e){return i(e)},handleSetFundingModalStatus:function(e){return s(e)},handleSetupPaymentStatusInterval:function(e){t.state.paymentStatusInterval=setInterval(function(){e()},1e4)},handleTeardownPaymentStatusInterval:function(){return t.clearPaymentInterval()}})}},{key:"clearPaymentInterval",value:function(){this.state.paymentStatusInterval&&(this.state.paymentStatusInterval=clearInterval(this.state.paymentStatusInterval))}},{key:"onCancelOrder",value:function(e){this.props.cancelOrder({orderID:e})}}],[{key:"fetchData",value:function(e,t){var n=t.path;return e.dispatch(fetchProfile(n))}},{key:"getReducer",value:function(){return{key:y.REDUCER_NAME,reducer:x.accountReducer}}}]),t}(d.default.PureComponent),D=function(e){var t=(0,E.getAccountState)(e).toJS();return{account:t,getWalletBalance:function(e){return t.user.wallets.filter(function(t){return t.title==e})[0].balance}}},w=function(e){return{setTitle:function(t){e((0,j.setMeta)(t)),e((0,j.setTitle)(t.title))},onLoadAccount:function(t){return e((0,h.fetchAccount)("/account"))},fetchOrders:function(t){return e((0,h.fetchOrders)())},fetchTransactionsCount:function(t,n){return e((0,h.fetchTransactionsCount)(t,n))},fetchTransactionToken:function(t){return e((0,h.fetchTransactionToken)(t))},cancelOrder:function(t){return e((0,h.cancelOrder)(t))},setFundingAmount:function(t){return e((0,h.setFundingAmount)(t))},setFundingAttemptingStatus:function(t){return e((0,h.setFundingAttemptingStatus)(t))},setFundingModalStatus:function(t){return e((0,h.setFundingModalStatus)(t))},setFundingMethod:function(t){return e((0,h.setFundingMethod)(t))},setTransactionsCount:function(t){return e((0,h.setTransactionsCount)(t))},setUser:function(t){return e((0,h.setUser)(t))}}},U=(0,p.default)(y.REDUCER_NAME,x.accountReducer)(k);t.default=(0,g.withRouter)((0,c.connect)(D,w)(U))},"./js/services/AccountService/index.js":function(e,t,n){"use strict";function a(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var l=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},r=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),u=n("./js/util/util.js"),i="https://instachaw.com"===window.location.origin?"https://api.instachaw.com":"http://localhost:3333",s=function(){function e(){o(this,e)}return r(e,null,[{key:"processFundingRequest",value:function(e){var t=e.account,n=(e.onFetchTransactionToken,e.handleFetchTransactionToken),o=e.handleSetFundingAttemptingStatus,r=e.handleSetTransactionsCount,s=e.handleFetchTransactionsCount,d=e.handlesSetUser,c=e.handleSetFundingModalStatus,m=e.handleSetupPaymentStatusInterval,f=e.handleTeardownPaymentStatusInterval,p=t.fundingMethod,g=t.user,y=(t.transactionsCount,t.fundingAmount),h="https://steemconnect.com/sign/transfer?",x=y+" "+p;"naira"===p&&(h=i+"/initializeTransaction",x=y);var j=window.open("");return n(function(e,t){var n="Add "+y+" "+p+" to the account of "+g.username,E="amt="+y+"&wlt="+p+"&uid="+g.id+"&type=topup&memo="+n+"&tkn="+e,M=i+"/processTransaction?"+E,F="to=instachaw&amount="+x+"&memo="+n+"&redirect_uri="+M;"naira"===p&&(F="?ref="+(0,u.generateTransactionRef)()+"&"+E+"&email="+g.email),j.location=encodeURI((""+h+F).trim()),o({isAttemptingFunding:!0}),r({transactionsCount:t});var b=t;return setTimeout(function(){var e=0;console.log(y),m(function(){e+=1,e>9&&f(),s({userID:g.id},function(e){if(Number(b)<Number(e)){var t=g.wallets.filter(function(e){return e.title!==p}),n=g.wallets.filter(function(e){return e.title===p})[0];n.balance=n.balance+y,t=[].concat(a(t),[n]),localStorage.setItem("user",JSON.stringify(l({},g,{wallets:t}))),d({user:l({},g,{wallets:t})}),c({isFundingModalOpen:!1}),o({isAttemptingFunding:!1}),f()}})})},3e3)})}}]),e}();t.default=s}});