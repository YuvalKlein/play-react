(window.webpackJsonp=window.webpackJsonp||[]).push([[0],[,,,,,,,,,,function(e,t,a){e.exports={SideDrawer:"SideDrawer__SideDrawer__3wvlM",Open:"SideDrawer__Open__3xsf8",Close:"SideDrawer__Close__2S6c7",Logo:"SideDrawer__Logo__10IHv"}},,,function(e,t,a){e.exports={Toolbar:"Toolbar__Toolbar__2hkfg",Logo:"Toolbar__Logo__24rue",DesktopOnly:"Toolbar__DesktopOnly__15Sc_"}},function(e,t,a){e.exports={NavigationItem:"NavigationItem__NavigationItem__3YSjr",active:"NavigationItem__active__2GQz1"}},,,,function(e,t,a){e.exports={Content:"Layout__Content__3KSp3"}},function(e,t,a){e.exports=a.p+"static/media/logo.39bc7bcb.bmp"},function(e,t,a){e.exports={Logo:"Logo__Logo__2A07e"}},,function(e,t,a){e.exports={NavigationItems:"NavigationItems__NavigationItems__3HY9i"}},function(e,t,a){e.exports={DrawerToggle:"DrawerToggle__DrawerToggle__1eThf"}},function(e,t,a){e.exports={Backdrop:"Backdrop__Backdrop__eeZpu"}},function(e,t,a){e.exports=a(48)},,,,,function(e,t,a){},,function(e,t,a){e.exports={App:"App__App__3t9oX","App-logo":"App__App-logo__DAe5h","App-logo-spin":"App__App-logo-spin__Xlw7n","App-header":"App__App-header__UYaud","App-link":"App__App-link__3ACRH"}},,function(e){e.exports={sessionList:[{date:"12/12/18 16:00",sessionName:"TRX",instructor:"Yuval",location:"Tel Aviv",players:[{fName:"Tom",lName:"Mordehay"},{fName:"David",lName:"Cohen"}]},{date:"12/12/18 18:00",sessionName:"TRX",instructor:"Moshe",location:"Tel Aviv",players:[{fName:"Ilya",lName:"Radu"}]}]}},,,,,,,,,,,,,,function(e,t,a){"use strict";a.r(t);var n=a(0),o=a.n(n),l=a(17),r=a.n(l),c=(a(30),a(5)),i=a(6),s=a(8),m=a(7),u=a(9),p=(a(32),function(e){return o.a.createElement(o.a.Fragment,null,o.a.createElement("div",null,e.session.date),o.a.createElement("div",null,o.a.createElement("p",null,"Session name: ",e.session.sessionName),o.a.createElement("p",null,"Instructor: ",e.session.instructor),o.a.createElement("p",null,"Location: ",e.session.location),o.a.createElement("div",null,"Players: ",e.session.players.map(function(e,t){return o.a.createElement("p",{key:t},e.fName+" "+e.lName)}))),o.a.createElement("div",null,o.a.createElement("button",null,"BOOK")))}),d=a(34),_=function(e){function t(){return Object(c.a)(this,t),Object(s.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){console.log(d.sessionList);var e=d.sessionList.map(function(e,t){return o.a.createElement(p,{key:t,session:e})});return o.a.createElement("div",null,o.a.createElement("h1",null,"SessionList"),e,o.a.createElement("button",null,"+"))}}]),t}(n.Component),g=a(52),E=a(49),h=a(18),v=a.n(h),f=a(13),w=a.n(f),k=a(19),N=a.n(k),b=a(20),y=a.n(b),D=function(e){return o.a.createElement("div",{className:y.a.Logo,style:{height:e.height}},o.a.createElement("img",{src:N.a,alt:"MyBurger"}))},S=a(51),A=a(14),C=a.n(A),O=function(e){return console.log("navigationItem",e),o.a.createElement("li",{className:C.a.NavigationItem},o.a.createElement(S.a,{to:e.link,className:e.active?C.a.active:null,onClick:e.closed},e.children))},T=a(22),j=a.n(T),x=function(e){return o.a.createElement("ul",{className:j.a.NavigationItems},o.a.createElement(O,{link:"/login",closed:e.closed},"Welcome!"),o.a.createElement(O,{link:"/",closed:e.closed},"Schedule"),o.a.createElement(O,{link:"/MyClasses",closed:e.closed},"My Classes"),o.a.createElement(O,{link:"/contact",closed:e.closed},"Contact Us"),o.a.createElement(O,{link:"/",closed:e.closed},"Loguot"))},L=a(23),I=a.n(L),B=function(e){return console.log("drawerToggle",e.clicked),o.a.createElement("div",{className:I.a.DrawerToggle,onClick:e.clicked},o.a.createElement("div",null),o.a.createElement("div",null),o.a.createElement("div",null))},H=function(e){return o.a.createElement("header",{className:w.a.Toolbar},o.a.createElement(B,{clicked:e.drawerToggleClicked}),o.a.createElement(D,{height:"80%"}),o.a.createElement("nav",{className:w.a.DesktopOnly},o.a.createElement(x,null)))},M=a(10),R=a.n(M),X=a(24),Y=a.n(X),F=function(e){return e.show?o.a.createElement("div",{className:Y.a.Backdrop,onClick:e.clicked}):null},U=function(e){var t=[R.a.SideDrawer,R.a.Close];return e.open&&(t=[R.a.SideDrawer,R.a.open]),console.log("sideDrawer",e),o.a.createElement(o.a.Fragment,null,o.a.createElement(F,{show:e.open,clicked:e.closed}),o.a.createElement("div",{className:t.join(" ")},o.a.createElement(D,{height:"11%"}),o.a.createElement("nav",null,o.a.createElement(x,{closed:e.closed}))))},W=function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,o=new Array(n),l=0;l<n;l++)o[l]=arguments[l];return(a=Object(s.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(o)))).state={showSideDrawer:!1},a.sideDrawerClosedHandler=function(){a.setState({showSideDrawer:!1})},a.sideDrawerToggleHandler=function(){a.setState(function(e){return{showSideDrawer:!e.showSideDrawer}})},a}return Object(u.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return o.a.createElement(o.a.Fragment,null,o.a.createElement(H,{drawerToggleClicked:this.sideDrawerToggleHandler}),o.a.createElement(U,{open:this.state.showSideDrawer,closed:this.sideDrawerClosedHandler}),o.a.createElement("main",{className:v.a.Content},this.props.children))}}]),t}(n.Component),J=function(e){return o.a.createElement("div",null,"Contact Us")},K=function(e){return o.a.createElement("div",null,"Log in")},z=function(e){return o.a.createElement("div",null,"My Sessions")},G=function(e){function t(){return Object(c.a)(this,t),Object(s.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return o.a.createElement("div",{className:"App"},o.a.createElement(W,null,o.a.createElement(g.a,null,o.a.createElement(E.a,{path:"/login",exact:!0,component:K}),o.a.createElement(E.a,{path:"/",exact:!0,component:_}),o.a.createElement(E.a,{path:"/myclasses",exact:!0,component:z}),o.a.createElement(E.a,{path:"/contact",exact:!0,component:J}))))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(46);var P=a(50);r.a.render(o.a.createElement(P.a,null,o.a.createElement(G,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}],[[25,2,1]]]);
//# sourceMappingURL=main.5ef8c7f8.chunk.js.map