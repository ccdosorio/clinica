(this["webpackJsonpapp-ingreso-nd"]=this["webpackJsonpapp-ingreso-nd"]||[]).push([[33],{1678:function(e,t,a){"use strict";a.r(t);var r=a(10),n=a(12),s=a(15),o=a(16),l=a(0),m=a.n(l),i=a(528),c=a(571),u=a(28),d=a(574),p=a(24),b=function(e){Object(s.a)(a,e);var t=Object(o.a)(a);function a(){var e;Object(r.a)(this,a);for(var n=arguments.length,s=new Array(n),o=0;o<n;o++)s[o]=arguments[o];return(e=t.call.apply(t,[this].concat(s))).state={email:"",username:"",password:"",repassword:""},e.handleSubmit=function(e,t){t.setSubmitting;console.log(e)},e}return Object(n.a)(a,[{key:"render",value:function(){return m.a.createElement("div",{className:"auth-layout-wrap",style:{backgroundImage:"url(/assets/images/photo-wide-4.jpg)"}},m.a.createElement("div",{className:"auth-content"},m.a.createElement("div",{className:"card o-hidden"},m.a.createElement("div",{className:"row"},m.a.createElement("div",{className:"col-md-6 text-center ",style:{backgroundSize:"cover",backgroundImage:"url(/assets/images/photo-long-3.jpg)"}},m.a.createElement("div",{className:"pl-3 auth-right"},m.a.createElement("div",{className:"auth-logo text-center mt-4"},m.a.createElement("img",{src:"assets/images/logo.png",alt:""})),m.a.createElement("div",{className:"flex-grow-1"}),m.a.createElement("div",{className:"w-100 mb-4"},m.a.createElement(p.a,{to:"/session/signin",className:"btn btn-rounded btn-outline-primary btn-outline-email btn-block btn-icon-text"},m.a.createElement("i",{className:"i-Mail-with-At-Sign"})," Sign in with Email"),m.a.createElement(d.a,{className:"btn btn-outline-google btn-block btn-icon-text btn-rounded"},m.a.createElement("i",{className:"i-Google-Plus"})," Sign in with Google"),m.a.createElement(d.a,{className:"btn btn-outline-facebook btn-block btn-icon-text btn-rounded"},m.a.createElement("i",{className:"i-Facebook-2"})," Sign in with Facebook")),m.a.createElement("div",{className:"flex-grow-1"}))),m.a.createElement("div",{className:"col-md-6"},m.a.createElement("div",{className:"p-4"},m.a.createElement("h1",{className:"mb-3 text-18"},"Sign Up"),m.a.createElement(i.a,{initialValues:this.state,validationSchema:g,onSubmit:this.handleSubmit},(function(e){var t=e.values,a=e.errors,r=e.touched,n=e.handleChange,s=e.handleBlur,o=e.handleSubmit;e.isSubmitting;return m.a.createElement("form",{onSubmit:o},m.a.createElement("div",{className:"form-group"},m.a.createElement("label",{htmlFor:"username"},"Your name"),m.a.createElement("input",{className:"form-control form-control-rounded",name:"username",type:"text",onChange:n,onBlur:s,value:t.username}),a.username&&r.username&&m.a.createElement("div",{className:"text-danger mt-1 ml-2"},a.username)),m.a.createElement("div",{className:"form-group"},m.a.createElement("label",{htmlFor:"email"},"Email address"),m.a.createElement("input",{name:"email",className:"form-control form-control-rounded",type:"email",onChange:n,onBlur:s,value:t.email}),a.email&&r.email&&m.a.createElement("div",{className:"text-danger mt-1 ml-2"},a.email)),m.a.createElement("div",{className:"form-group"},m.a.createElement("label",{htmlFor:"password"},"Password"),m.a.createElement("input",{name:"password",className:"form-control form-control-rounded",type:"password",onChange:n,onBlur:s,value:t.password}),a.password&&r.password&&m.a.createElement("div",{className:"text-danger mt-1 ml-2"},a.password)),m.a.createElement("div",{className:"form-group"},m.a.createElement("label",{htmlFor:"repassword"},"Retype password"),m.a.createElement("input",{name:"repassword",className:"form-control form-control-rounded",type:"password",onChange:n,onBlur:s,value:t.repassword}),a.repassword&&r.repassword&&m.a.createElement("div",{className:"text-danger mt-1 ml-2"},a.repassword)),m.a.createElement("button",{className:"btn btn-primary btn-block btn-rounded mt-3",type:"submit"},"Sign Up"))}))))))))}}]),a}(l.Component),g=c.object().shape({username:c.string().required("email is required"),email:c.string().email("Invalid email").required("email is required"),password:c.string().min(8,"Password must be 8 character long").required("password is required"),repassword:c.string().required("repeat password").oneOf([c.ref("password")],"Passwords must match")});t.default=Object(u.b)((function(e){return{user:e.user}}),{})(b)},510:function(e,t){function a(){return e.exports=a=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var r in a)Object.prototype.hasOwnProperty.call(a,r)&&(e[r]=a[r])}return e},e.exports.default=e.exports,e.exports.__esModule=!0,a.apply(this,arguments)}e.exports=a,e.exports.default=e.exports,e.exports.__esModule=!0},552:function(e,t){e.exports=function(e,t){if(null==e)return{};var a,r,n={},s=Object.keys(e);for(r=0;r<s.length;r++)a=s[r],t.indexOf(a)>=0||(n[a]=e[a]);return n},e.exports.default=e.exports,e.exports.__esModule=!0},582:function(e,t){function a(t){return"function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?(e.exports=a=function(e){return typeof e},e.exports.default=e.exports,e.exports.__esModule=!0):(e.exports=a=function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e.exports.default=e.exports,e.exports.__esModule=!0),a(t)}e.exports=a,e.exports.default=e.exports,e.exports.__esModule=!0}}]);
//# sourceMappingURL=33.69fbf785.chunk.js.map