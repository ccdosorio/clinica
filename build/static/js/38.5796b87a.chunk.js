(this["webpackJsonpapp-ingreso-nd"]=this["webpackJsonpapp-ingreso-nd"]||[]).push([[38],{1702:function(e,a,t){"use strict";t.r(a);var r=t(25),n=t.n(r),i=t(42),o=t(505),s=t(0),l=t.n(s),c=t(47),u=t(161),p=t(558),m=t(30),f=t(522),d=t.n(f),g=t(51),v=t.n(g),b=t(97);a.default=function(e){var a=Object(s.useState)([]),t=Object(o.a)(a,2),r=t[0],f=t[1],g=Object(s.useState)(null),h=Object(o.a)(g,2),y=h[0],E=h[1],N=Object(s.useState)((new Date).getMonth()+1),x=Object(o.a)(N,2),C=x[0],k=x[1],P=Object(s.useState)((new Date).getFullYear()),L=Object(o.a)(P,2),O=L[0],w=L[1],j=Object(s.useState)(0),S=Object(o.a)(j,2),D=S[0],_=S[1],R=Object(s.useState)(10),A=Object(o.a)(R,2),B=A[0],T=A[1],I=Object(s.useState)(0),H=Object(o.a)(I,2),V=H[0],z=H[1],M=function(){var e=Object(i.a)(n.a.mark((function e(){var a,t;return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a={month:C,year:O,no_pagina:D,paginas:B},e.next=3,b.a.post("consulta/report/month",a);case 3:0===(t=e.sent).length&&E(!1),t.length>0&&z(t[0].cantidad),f(t);case 7:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),q=function(){var e=Object(i.a)(n.a.mark((function e(a){return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:k(a.target.value);case 1:case"end":return e.stop()}}),e)})));return function(a){return e.apply(this,arguments)}}(),G=function(){var e=Object(i.a)(n.a.mark((function e(a){return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:w(a.target.value);case 1:case"end":return e.stop()}}),e)})));return function(a){return e.apply(this,arguments)}}(),F=function(){var e=Object(i.a)(n.a.mark((function e(a){return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a.preventDefault(),E(!0),e.next=4,M();case 4:case"end":return e.stop()}}),e)})));return function(a){return e.apply(this,arguments)}}(),J=function(){var a=Object(i.a)(n.a.mark((function a(t){return n.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:e.history.push("/consultation/".concat(t,"/detail"));case 1:case"end":return a.stop()}}),a)})));return function(e){return a.apply(this,arguments)}}(),K=function(){var e=Object(i.a)(n.a.mark((function e(a){var t,r,i;return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=parseInt(a.target.value),T(t),r={month:C,year:O,no_pagina:D,paginas:t},e.next=5,b.a.post("consulta/report/month",r);case 5:i=e.sent,f(i),_(D);case 8:case"end":return e.stop()}}),e)})));return function(a){return e.apply(this,arguments)}}(),W=function(){var e=Object(i.a)(n.a.mark((function e(a){var t,r,i;return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=a.selected*B,r={month:C,year:O,no_pagina:t,paginas:B},e.next=4,b.a.post("consulta/report/month",r);case 4:i=e.sent,f(i),_(t);case 7:case"end":return e.stop()}}),e)})));return function(a){return e.apply(this,arguments)}}();return l.a.createElement("div",null,l.a.createElement(c.a,{routeSegments:[{name:"Inicio",path:"/home"},{name:"Reporte mensual"}]}),l.a.createElement("div",{className:"row g-3"},l.a.createElement("div",{className:"col-2"},l.a.createElement("select",{id:"month",className:"form-control",name:"month",defaultValue:C,onChange:q},l.a.createElement("option",{value:0},"Selecciona el mes"),l.a.createElement("option",{value:1},"Enero"),l.a.createElement("option",{value:2},"Febrero"),l.a.createElement("option",{value:3},"Marzo"),l.a.createElement("option",{value:4},"Abril"),l.a.createElement("option",{value:5},"Mayo"),l.a.createElement("option",{value:6},"Junio"),l.a.createElement("option",{value:7},"Julio"),l.a.createElement("option",{value:8},"Agosto"),l.a.createElement("option",{value:9},"Septiembre"),l.a.createElement("option",{value:10},"Octubre"),l.a.createElement("option",{value:11},"Noviembre"),l.a.createElement("option",{value:12},"Diciembre"))),l.a.createElement("div",{className:"col-2"},l.a.createElement("input",{type:"text",className:"form-control",id:"year",placeholder:"Ingresa el a\xf1o",name:"year",defaultValue:O,onChange:G})),l.a.createElement("div",{className:"col-auto"},l.a.createElement("button",{type:"submit",className:"btn btn-primary mb-3",onClick:F},"Buscar"))),r.length>0?l.a.createElement(l.a.Fragment,null,l.a.createElement(u.a,{elevation:6,className:"w-100"},l.a.createElement("div",{className:"row px-4 mt-3"},l.a.createElement("div",{className:"col-sm-12 col-md-6 mb-2"},l.a.createElement("div",{className:"d-flex align-items-center"},l.a.createElement("span",{className:"mr-1"},"Mostrar"),l.a.createElement("div",{className:"mr-1"},l.a.createElement("select",{className:"form-control",onChange:K,value:B},l.a.createElement("option",{value:10},"10"),l.a.createElement("option",{value:25},"25"),l.a.createElement("option",{value:50},"50"),l.a.createElement("option",{value:100},"100"))),l.a.createElement("span",null,"registros"))),l.a.createElement("div",{className:"col-sm-12 col-md-6 mb-2"},l.a.createElement("div",{className:"d-flex align-items-center"},l.a.createElement("span",{className:"mr-1 text-muted"},l.a.createElement("b",null,"N\xfamero de consultas: ",V))))),l.a.createElement(p.a,{style:{minWidth:750}},l.a.createElement("thead",null,l.a.createElement("tr",null,l.a.createElement("th",{className:"pl-sm-24"},"#"),l.a.createElement("th",{className:"px-0"},"Empleado"),l.a.createElement("th",{className:"px-0"},"C\xf3digo Emp."),l.a.createElement("th",{className:"px-0"},"Departamento"),l.a.createElement("th",{className:"px-0"},"C\xf3digo Dep."),l.a.createElement("th",{className:"px-0"},"M\xe9dico"),l.a.createElement("th",{className:"px-0"},"Fecha Consulta"),l.a.createElement("th",{className:"px-0"},"G\xe9nero"),l.a.createElement("th",{className:"px-0"},"Estado"),l.a.createElement("th",{className:"px-0"},"Ver"))),l.a.createElement("tbody",null,r.map((function(e){return l.a.createElement("tr",{key:e.id},l.a.createElement("td",{className:"pl-sm-24 capitalize",align:"left"},e.id),l.a.createElement("td",{className:"pl-0 capitalize",align:"left"},e.empleado),l.a.createElement("td",{className:"pl-0 capitalize",align:"left"},e.codigo),l.a.createElement("td",{className:"pl-0 capitalize",align:"left"},e.Depto),l.a.createElement("td",{className:"pl-0 capitalize",align:"left"},e.codigoDepto),l.a.createElement("td",{className:"pl-0 capitalize",align:"left"},e.medico),l.a.createElement("td",{className:"pl-0 capitalize",align:"left"},v()(e.fecha).format("LL")),l.a.createElement("td",{className:"pl-0 capitalize"},l.a.createElement("small",{className:Object(m.a)({"badge rounded-pill text-white px-8 py-2":!0,"bg-primary":"M"===e.genero,"bg-warning":"F"===e.genero})},e.genero)),l.a.createElement("td",{className:"pl-0 capitalize"},l.a.createElement("small",{className:Object(m.a)({"badge rounded-pill text-white px-8 py-2":!0,"bg-success":"Activo"===e.estado,"bg-danger":"Inactivo"===e.estado})},e.estado)),l.a.createElement("td",{className:"pl-0"},l.a.createElement("div",{className:"d-flex"},l.a.createElement("i",{className:"i-Arrow-Right mr-4 font-weight-900 text-primary cursor-pointer",onClick:function(){return J(e.id)}}))))})))),l.a.createElement("div",{className:"px-3 pb-3 mt-3 d-flex flex-row justify-content-end"},l.a.createElement(d.a,{previousLabel:"Anterior",nextLabel:"Siguiente",breakLabel:"...",breakClassName:"break-me",pageCount:Math.ceil(V/B),marginPagesDisplayed:2,pageRangeDisplayed:5,onPageChange:W,containerClassName:"pagination",subContainerClassName:"pages pagination",activeClassName:"active"})))):y?l.a.createElement(c.c,null):!1===y?l.a.createElement("p",{className:"text-muted"},l.a.createElement("b",null,"No se encontraron registros")):void 0)}},505:function(e,a,t){"use strict";t.d(a,"a",(function(){return n}));var r=t(53);function n(e,a){return function(e){if(Array.isArray(e))return e}(e)||function(e,a){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e)){var t=[],r=!0,n=!1,i=void 0;try{for(var o,s=e[Symbol.iterator]();!(r=(o=s.next()).done)&&(t.push(o.value),!a||t.length!==a);r=!0);}catch(l){n=!0,i=l}finally{try{r||null==s.return||s.return()}finally{if(n)throw i}}return t}}(e,a)||Object(r.a)(e,a)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},522:function(e,a,t){(function(r){var n;e.exports=(n=t(0),function(e){var a={};function t(r){if(a[r])return a[r].exports;var n=a[r]={i:r,l:!1,exports:{}};return e[r].call(n.exports,n,n.exports,t),n.l=!0,n.exports}return t.m=e,t.c=a,t.d=function(e,a,r){t.o(e,a)||Object.defineProperty(e,a,{enumerable:!0,get:r})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,a){if(1&a&&(e=t(e)),8&a)return e;if(4&a&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(t.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&a&&"string"!=typeof e)for(var n in e)t.d(r,n,function(a){return e[a]}.bind(null,n));return r},t.n=function(e){var a=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(a,"a",a),a},t.o=function(e,a){return Object.prototype.hasOwnProperty.call(e,a)},t.p="",t(t.s=4)}([function(e,a,t){e.exports=t(2)()},function(e,a){e.exports=n},function(e,a,t){"use strict";var r=t(3);function n(){}function i(){}i.resetWarningCache=n,e.exports=function(){function e(e,a,t,n,i,o){if(o!==r){var s=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw s.name="Invariant Violation",s}}function a(){return e}e.isRequired=e;var t={array:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:a,element:e,elementType:e,instanceOf:a,node:e,objectOf:a,oneOf:a,oneOfType:a,shape:a,exact:a,checkPropTypes:i,resetWarningCache:n};return t.PropTypes=t,t}},function(e,a,t){"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},function(e,t,r){"use strict";r.r(t);var n=r(1),i=r.n(n),o=r(0),s=r.n(o);function l(){return(l=Object.assign||function(e){for(var a=1;a<arguments.length;a++){var t=arguments[a];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])}return e}).apply(this,arguments)}var c=function(e){var a=e.pageClassName,t=e.pageLinkClassName,r=e.page,n=e.selected,o=e.activeClassName,s=e.activeLinkClassName,c=e.getEventListener,u=e.pageSelectedHandler,p=e.href,m=e.extraAriaContext,f=e.ariaLabel||"Page "+r+(m?" "+m:""),d=null;return n&&(d="page",f=e.ariaLabel||"Page "+r+" is your current page",a=void 0!==a?a+" "+o:o,void 0!==t?void 0!==s&&(t=t+" "+s):t=s),i.a.createElement("li",{className:a},i.a.createElement("a",l({role:"button",className:t,href:p,tabIndex:"0","aria-label":f,"aria-current":d,onKeyPress:u},c(u)),r))};c.propTypes={pageSelectedHandler:s.a.func.isRequired,selected:s.a.bool.isRequired,pageClassName:s.a.string,pageLinkClassName:s.a.string,activeClassName:s.a.string,activeLinkClassName:s.a.string,extraAriaContext:s.a.string,href:s.a.string,ariaLabel:s.a.string,page:s.a.number.isRequired,getEventListener:s.a.func.isRequired};var u=c;function p(){return(p=Object.assign||function(e){for(var a=1;a<arguments.length;a++){var t=arguments[a];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])}return e}).apply(this,arguments)}!function(){var e="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.default:void 0;if(e){var r=void 0!==t?t:a;if(r)if("function"!=typeof r){for(var n in r)if(Object.prototype.hasOwnProperty.call(r,n)){var i=void 0;try{i=r[n]}catch(e){continue}e.register(i,n,"/home/adele/workspace/react-paginate/react_components/PageView.js")}}else e.register(r,"module.exports","/home/adele/workspace/react-paginate/react_components/PageView.js")}}();var m=function(e){var a=e.breakLabel,t=e.breakClassName,r=e.breakLinkClassName,n=e.breakHandler,o=e.getEventListener,s=t||"break";return i.a.createElement("li",{className:s},i.a.createElement("a",p({className:r,role:"button",tabIndex:"0",onKeyPress:n},o(n)),a))};m.propTypes={breakLabel:s.a.oneOfType([s.a.string,s.a.node]),breakClassName:s.a.string,breakLinkClassName:s.a.string,breakHandler:s.a.func.isRequired,getEventListener:s.a.func.isRequired};var f=m;function d(e){return(d="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function g(){return(g=Object.assign||function(e){for(var a=1;a<arguments.length;a++){var t=arguments[a];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])}return e}).apply(this,arguments)}function v(e,a){for(var t=0;t<a.length;t++){var r=a[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function b(e,a){return(b=Object.setPrototypeOf||function(e,a){return e.__proto__=a,e})(e,a)}function h(e,a){return!a||"object"!==d(a)&&"function"!=typeof a?y(e):a}function y(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function E(e){return(E=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function N(e,a,t){return a in e?Object.defineProperty(e,a,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[a]=t,e}!function(){var e="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.default:void 0;if(e){var r=void 0!==t?t:a;if(r)if("function"!=typeof r){for(var n in r)if(Object.prototype.hasOwnProperty.call(r,n)){var i=void 0;try{i=r[n]}catch(e){continue}e.register(i,n,"/home/adele/workspace/react-paginate/react_components/BreakView.js")}}else e.register(r,"module.exports","/home/adele/workspace/react-paginate/react_components/BreakView.js")}}();var x=function(e){!function(e,a){if("function"!=typeof a&&null!==a)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(a&&a.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),a&&b(e,a)}(n,e);var a,t,r=function(e){var a=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var t,r=E(e);if(a){var n=E(this).constructor;t=Reflect.construct(r,arguments,n)}else t=r.apply(this,arguments);return h(this,t)}}(n);function n(e){var a,t;return function(e,a){if(!(e instanceof a))throw new TypeError("Cannot call a class as a function")}(this,n),N(y(a=r.call(this,e)),"handlePreviousPage",(function(e){var t=a.state.selected;e.preventDefault?e.preventDefault():e.returnValue=!1,t>0&&a.handlePageSelected(t-1,e)})),N(y(a),"handleNextPage",(function(e){var t=a.state.selected,r=a.props.pageCount;e.preventDefault?e.preventDefault():e.returnValue=!1,t<r-1&&a.handlePageSelected(t+1,e)})),N(y(a),"handlePageSelected",(function(e,t){t.preventDefault?t.preventDefault():t.returnValue=!1,a.state.selected!==e&&(a.setState({selected:e}),a.callCallback(e))})),N(y(a),"getEventListener",(function(e){return N({},a.props.eventListener,e)})),N(y(a),"handleBreakClick",(function(e,t){t.preventDefault?t.preventDefault():t.returnValue=!1;var r=a.state.selected;a.handlePageSelected(r<e?a.getForwardJump():a.getBackwardJump(),t)})),N(y(a),"callCallback",(function(e){void 0!==a.props.onPageChange&&"function"==typeof a.props.onPageChange&&a.props.onPageChange({selected:e})})),N(y(a),"pagination",(function(){var e=[],t=a.props,r=t.pageRangeDisplayed,n=t.pageCount,o=t.marginPagesDisplayed,s=t.breakLabel,l=t.breakClassName,c=t.breakLinkClassName,u=a.state.selected;if(n<=r)for(var p=0;p<n;p++)e.push(a.getPageElement(p));else{var m,d,g,v=r/2,b=r-v;u>n-r/2?v=r-(b=n-u):u<r/2&&(b=r-(v=u));var h=function(e){return a.getPageElement(e)};for(m=0;m<n;m++)(d=m+1)<=o||d>n-o||m>=u-v&&m<=u+b?e.push(h(m)):s&&e[e.length-1]!==g&&(g=i.a.createElement(f,{key:m,breakLabel:s,breakClassName:l,breakLinkClassName:c,breakHandler:a.handleBreakClick.bind(null,m),getEventListener:a.getEventListener}),e.push(g))}return e})),t=e.initialPage?e.initialPage:e.forcePage?e.forcePage:0,a.state={selected:t},a}return a=n,(t=[{key:"componentDidMount",value:function(){var e=this.props,a=e.initialPage,t=e.disableInitialCallback,r=e.extraAriaContext;void 0===a||t||this.callCallback(a),r&&console.warn("DEPRECATED (react-paginate): The extraAriaContext prop is deprecated. You should now use the ariaLabelBuilder instead.")}},{key:"componentDidUpdate",value:function(e){void 0!==this.props.forcePage&&this.props.forcePage!==e.forcePage&&this.setState({selected:this.props.forcePage})}},{key:"getForwardJump",value:function(){var e=this.state.selected,a=this.props,t=a.pageCount,r=e+a.pageRangeDisplayed;return r>=t?t-1:r}},{key:"getBackwardJump",value:function(){var e=this.state.selected-this.props.pageRangeDisplayed;return e<0?0:e}},{key:"hrefBuilder",value:function(e){var a=this.props,t=a.hrefBuilder,r=a.pageCount;if(t&&e!==this.state.selected&&e>=0&&e<r)return t(e+1)}},{key:"ariaLabelBuilder",value:function(e){var a=e===this.state.selected;if(this.props.ariaLabelBuilder&&e>=0&&e<this.props.pageCount){var t=this.props.ariaLabelBuilder(e+1,a);return this.props.extraAriaContext&&!a&&(t=t+" "+this.props.extraAriaContext),t}}},{key:"getPageElement",value:function(e){var a=this.state.selected,t=this.props,r=t.pageClassName,n=t.pageLinkClassName,o=t.activeClassName,s=t.activeLinkClassName,l=t.extraAriaContext;return i.a.createElement(u,{key:e,pageSelectedHandler:this.handlePageSelected.bind(null,e),selected:a===e,pageClassName:r,pageLinkClassName:n,activeClassName:o,activeLinkClassName:s,extraAriaContext:l,href:this.hrefBuilder(e),ariaLabel:this.ariaLabelBuilder(e),page:e+1,getEventListener:this.getEventListener})}},{key:"render",value:function(){var e=this.props,a=e.disabledClassName,t=e.pageCount,r=e.containerClassName,n=e.previousLabel,o=e.previousClassName,s=e.previousLinkClassName,l=e.previousAriaLabel,c=e.nextLabel,u=e.nextClassName,p=e.nextLinkClassName,m=e.nextAriaLabel,f=this.state.selected,d=o+(0===f?" ".concat(a):""),v=u+(f===t-1?" ".concat(a):""),b=0===f?"true":"false",h=f===t-1?"true":"false";return i.a.createElement("ul",{className:r},i.a.createElement("li",{className:d},i.a.createElement("a",g({className:s,href:this.hrefBuilder(f-1),tabIndex:"0",role:"button",onKeyPress:this.handlePreviousPage,"aria-disabled":b,"aria-label":l},this.getEventListener(this.handlePreviousPage)),n)),this.pagination(),i.a.createElement("li",{className:v},i.a.createElement("a",g({className:p,href:this.hrefBuilder(f+1),tabIndex:"0",role:"button",onKeyPress:this.handleNextPage,"aria-disabled":h,"aria-label":m},this.getEventListener(this.handleNextPage)),c)))}}])&&v(a.prototype,t),n}(n.Component);N(x,"propTypes",{pageCount:s.a.number.isRequired,pageRangeDisplayed:s.a.number.isRequired,marginPagesDisplayed:s.a.number.isRequired,previousLabel:s.a.node,previousAriaLabel:s.a.string,nextLabel:s.a.node,nextAriaLabel:s.a.string,breakLabel:s.a.oneOfType([s.a.string,s.a.node]),hrefBuilder:s.a.func,onPageChange:s.a.func,initialPage:s.a.number,forcePage:s.a.number,disableInitialCallback:s.a.bool,containerClassName:s.a.string,pageClassName:s.a.string,pageLinkClassName:s.a.string,activeClassName:s.a.string,activeLinkClassName:s.a.string,previousClassName:s.a.string,nextClassName:s.a.string,previousLinkClassName:s.a.string,nextLinkClassName:s.a.string,disabledClassName:s.a.string,breakClassName:s.a.string,breakLinkClassName:s.a.string,extraAriaContext:s.a.string,ariaLabelBuilder:s.a.func,eventListener:s.a.string}),N(x,"defaultProps",{pageCount:10,pageRangeDisplayed:2,marginPagesDisplayed:3,activeClassName:"selected",previousLabel:"Previous",previousClassName:"previous",previousAriaLabel:"Previous page",nextLabel:"Next",nextClassName:"next",nextAriaLabel:"Next page",breakLabel:"...",disabledClassName:"disabled",disableInitialCallback:!1,eventListener:"onClick"}),function(){var e="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.default:void 0;if(e){var r=void 0!==t?t:a;if(r)if("function"!=typeof r){for(var n in r)if(Object.prototype.hasOwnProperty.call(r,n)){var i=void 0;try{i=r[n]}catch(e){continue}e.register(i,n,"/home/adele/workspace/react-paginate/react_components/PaginationBoxView.js")}}else e.register(r,"module.exports","/home/adele/workspace/react-paginate/react_components/PaginationBoxView.js")}}(),t.default=x,function(){var e="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.default:void 0;if(e){var r=void 0!==t?t:a;if(r)if("function"!=typeof r){for(var n in r)if(Object.prototype.hasOwnProperty.call(r,n)){var i=void 0;try{i=r[n]}catch(e){continue}e.register(i,n,"/home/adele/workspace/react-paginate/react_components/index.js")}}else e.register(r,"module.exports","/home/adele/workspace/react-paginate/react_components/index.js")}}()}]))}).call(this,t(26))},558:function(e,a,t){"use strict";var r=t(2),n=t(5),i=t(13),o=t.n(i),s=t(0),l=t.n(s),c=t(21),u=["bsPrefix","className","striped","bordered","borderless","hover","size","variant","responsive"],p=l.a.forwardRef((function(e,a){var t=e.bsPrefix,i=e.className,s=e.striped,p=e.bordered,m=e.borderless,f=e.hover,d=e.size,g=e.variant,v=e.responsive,b=Object(n.a)(e,u),h=Object(c.a)(t,"table"),y=o()(i,h,g&&h+"-"+g,d&&h+"-"+d,s&&h+"-striped",p&&h+"-bordered",m&&h+"-borderless",f&&h+"-hover"),E=l.a.createElement("table",Object(r.a)({},b,{className:y,ref:a}));if(v){var N=h+"-responsive";return"string"===typeof v&&(N=N+"-"+v),l.a.createElement("div",{className:N},E)}return E}));a.a=p}}]);
//# sourceMappingURL=38.5796b87a.chunk.js.map