webpackJsonp([1,0],[function(t,e,n){"use strict";function a(t){return t&&t.__esModule?t:{default:t}}var o=n(4),r=a(o),s=n(49),i=a(s),l=n(48),c=a(l),u=n(21),d=a(u),h=n(47),p=a(h),_=n(22),v=(a(_),n(33)),f=a(v),m=n(30),g=a(m),w=n(29),b=a(w),k=n(32),P=a(k),C=n(31),y=a(C);r.default.use(i.default),r.default.use(c.default),r.default.use(d.default),r.default.use(p.default),r.default.prototype.convertLocToStr=function(t){return t.replace(/_/g," ")};var x=new i.default({hashbang:!1,root:"/",mode:"history",saveScrollPosition:!0,canReuse:!1,transitionOnLoad:!0,routes:[{path:"/",component:f.default},{path:"/blog",component:g.default},{path:"/blog/*",component:g.default},{path:"/404",component:b.default},{path:"/console/login",component:P.default},{path:"/console",component:y.default},{path:"*",redirect:"/"}]});new r.default({el:"#app",router:x,template:"<router-view></router-view>"}),window.router=x},,function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n="https://www.andrewszot.com:3001",a=n+"/sessions/create";e.default={api_endpoint:n,user:{authenticated:!1},login:function(t,e,n,o){var r=this;t.$http.post(a,e).then(function(e){var a=e.body;localStorage.setItem("id_token",a.id_token),localStorage.setItem("access_token",a.access_token),r.user.authenticated=!0,n&&t.$router.push({path:n})}).catch(function(t){o()})},logout:function(){localStorage.removeItem("id_token"),localStorage.removeItem("access_token"),this.user.athenticated=!1},checkAuth:function(){var t=localStorage.getItem("id_token");t?this.user.authenticated=!0:this.user.authenticated=!1},getAuthHeader:function(){return{Authorization:"Bearer "+localStorage.getItem("access_token")}}}},function(t,e,n){n(13);var a=n(1)(n(5),n(34),null,null);t.exports=a.exports},,function(t,e,n){"use strict";function a(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var o=n(3),r=a(o);e.default={name:"blog-list-view",components:{BlogListView:r.default},created:function(){this.itemPad=15*this.depth,this.computedDepth=Number(this.depth)+1;for(var t=0;t<this.postsTree.length;++t)this.makeLink.push(this.postsTree.length>0&&0==this.postsTree[t].content.length)},data:function(){return{itemPad:0,computedDepth:0,makeLink:[],currentMakeLinkIndex:0}},props:["postsTree","depth","prependPath"]}},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={methods:{loadListData:function(t){var e=this;this.$http.get(t).then(function(t){for(var n=t.data,a=n.split("|"),o=[],r=0;r<a.length;++r){var s=a[r];if(""!=s){var i=s.split("\n");if(!(i.length<4)){for(var l=i[0],c=i[1],u=i[2],d=[],h=3;h<i.length;++h){var p=i[h];p=p.substr(1),""!=p&&d.push(p)}o.push({title:l,subtitle:c,datetxt:u,points:d})}}}e.allListData.push({listData:o})},function(t){console.log("error")})}},created:function(){this.loadListData("/static/text/"+this.loadDataTargetLoc)},data:function(){return{allListData:[]}},props:["loadDataTargetLoc"]}},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={created:function(){},updated:function(){Prism.highlightAll(),MathJax.Hub.Queue(["Typeset",MathJax.Hub])},props:["dispPost"]}},function(t,e){"use strict"},function(t,e,n){"use strict";function a(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var o=n(3),r=a(o),s=n(28),i=a(s),l=n(26),c=a(l);e.default={components:{BlogListView:r.default,SingleBlogView:i.default,FooterView:c.default},methods:{toggleLeftSidenav:function(){this.$refs.leftSidenav.toggle()},parsePostArg:function(t,e){return t=t.replace(/(\r\n|\n|\r)/gm,""),t=t.slice(e.length+1,t.length)},parsePostText:function(t,e){t=t.replace("\n","");var n=t.split("|"),a=this.parsePostArg(n[0],"TITLE"),o=this.parsePostArg(n[1],"NEXT"),r=this.parsePostArg(n[2],"PREV"),s=this.parsePostArg(n[3],"DATE"),i=this.parsePostArg(n[4],"META"),l=e.split(".")[0],c=l.split("/");c=c.slice(3,c.length-1),c[0]="blog";var u=c.join("/");this.pageTitle=a;for(var d=n[5].replace("\n",""),h=!0,p=0;p<this.subBlacklist.length;++p)if(e.includes(this.subBlacklist[p])){h=!1;break}this.dispPost={title:a,postDate:s,content:d,next:o,showSubscribe:h,prev:r,metaDesc:i,parentPath:u};setTimeout(function(){Prism.highlightAll(),MathJax.Hub.Queue(["Typeset",MathJax.Hub])},2e3)},createMainView:function(){this.showMainContent=!0},createBlogView:function(t){this.showMainContent=!1,t=t.splice(1,t.length).join("/");var e="/static/text/posts/"+t+".txt",n=this;this.$http.get(e).then(function(t){var a=t.data;n.parsePostText(a,e)},function(t){console.log("server error")})},insertPost:function(t,e){if(0!=t.length){var n=t[0];t.shift();for(var a=!1,o=0;o<e.length;++o)e[o].name==n&&(a=!0,this.insertPost(t,e[o].content));if(!a){var r={name:n,content:[]};e.push(r),this.insertPost(t,r.content)}}},loadPosts:function(){for(var t=0;t<this.postPaths.length;++t){var e=this.postPaths[t],n=e.split("/");this.insertPost(n,this.postsTree)}},isUrlValidPost:function(t){var e=!1,n=t.slice(1,t.length);n=n.join("/");for(var a=0;a<this.postPaths.length;++a)if(this.postPaths[a]==n){e=!0;break}return e},getPathURL:function(){var t=window.location.href,e=document.createElement("a");e.href=t;var n=e.pathname.substr(1);return n},getURLInfo:function(){var t=this.getPathURL(),e=t.split("/");if(1==e.length&&"blog"==e[0])return{title:"Blog Home",desc:"The home of Andrew Szot's blog. Full of useful resources on machine learning, web development and more"};e.shift();var n=e.join("/");console.log("searching for "+n);for(var a in this.postPathMetaDescs)if(a==n)return this.postPathMetaDescs[a];return{title:"hmm",desc:"Invalid"}}},created:function(){var t=this.getPathURL(),e=t.split("/");if(0==e.length||"blog"!=e[0])return void this.$router.go("/404");if(this.loadPosts(),1==e.length)this.createMainView();else{if(!this.isUrlValidPost(e))return console.log("trying to go to the error page"),void this.$router.push({path:"/404"});this.createBlogView(e)}},head:{title:function(){var t=this.getURLInfo().title;return{inner:t,separator:" ",complement:""}},meta:function(){var t=this.getURLInfo().desc;return[{name:"description",content:t}]}},data:function(){return{showMainContent:!0,postsTree:[],subBlacklist:["workshop_1"],dispPost:{title:"",postDate:"",content:"",showSubscribe:!0,next:"",prev:"",metaDesc:"",parentPath:""},pageTitle:"Blog Home",postPathMetaDescs:{"modern_web/modern_web_introduction":{title:"Modern Web Introduction",desc:"A introduction to setting up a development environment to work with the modern web."},"machine_learning/configuring_theano_on_ubuntu_with_gpu":{title:"Configuring Theano on Ubuntu with GPU",desc:"How to correctly configure Theano on Ubuntu using an NIVIDA GPU."},"machine_learning/workshop_1/getting_setup":{title:"Workshop 1 | Getting Setup",desc:"How to setup a machine learning environment."},"machine_learning/neural_networks/introduction":{title:"Neural Networks | Introduction",desc:"Introduction to a machine learning crash course."},"machine_learning/neural_networks/1_neuron_theory":{title:"Neural Networks | Neural Network Theory",desc:"A high level overview of the theory behind neural networks from a largely mathematical perspective"},"machine_learning/neural_networks/2_training_neural_networks":{title:"Neural Networks | Neural Network Theory",desc:"Diving into some of the math behind training neural networks"},"machine_learning/neural_networks/3_backpropagation":{title:"Neural Networks | Backpropagation",desc:"Going into the math behind backpropagation"},"machine_learning/neural_networks/4_loss_functions":{title:"Neural Networks | Loss Functions",desc:"Using loss functions in neural networks"},"machine_learning/neural_networks/5_regularization":{title:"Neural Networks | Regularization",desc:"Regularization in neural networks"},"machine_learning/neural_networks/6_optimization_in_practice":{title:"Neural Networks | Optimization",desc:"Optimization in practice in neural networks"},"machine_learning/neural_networks/7_theory_epilogue":{title:"Neural Networks | Epilogue",desc:"The conclusion to the section on neural network theory"},"machine_learning/neural_networks/sources":{title:"Neural Networks | Sources",desc:"Sources used to make this neural network tutorial"},"machine_learning/convolutional_neural_networks/introduction":{title:"CNN | Introduction",desc:"Introduction to convolutional neural networks (CNNs)"},"machine_learning/convolutional_neural_networks/1_motivation":{title:"CNN | Motivation",desc:"Motivation behind convolutional neural networks (CNNs)"},"machine_learning/convolutional_neural_networks/2_convolution_layers":{title:"CNN | Convolution Layers",desc:"The details behind what the convolution layer does in a convolutional neural network (CNN)"},"machine_learning/convolutional_neural_networks/3_pooling_layers":{title:"CNN | Pooling Layers",desc:"The details behind what the pooling layer does in a convolutional neural network"},"machine_learning/convolutional_neural_networks/4_applications":{title:"CNN | Applications",desc:"The applications of convolutional neural networks"},"machine_learning/convolutional_neural_networks/sources":{title:"CNN | Sources",desc:"The sources used for the convolutional neural network tutorial"},"machine_learning/recurrent_neural_networks":{title:"RNN",desc:"A tutorial on recurrent neural networks from the ground up"},"machine_learning/style_transfer":{title:"Style Transfer",desc:"A tutorial on what style transfer is and how it can be used."},"machine_learning/variational_autoencoders":{title:"Variational Autoencoders",desc:"A tutorial on how Variational Autoencoders (VAEs) work along wtih a practical code sample on how to implement and use them."},"machine_learning/principle_component_analysis":{title:"Principle Component Analysis",desc:"An explanation of the theory behind PCA along with an implementation of PCA using NumPy"},"web/setting_up_vue":{title:"Setting up Vue.js",desc:"A basic tutorial for getting a project up and running in Vue.js a long with some common gotchas."}},postPaths:["machine_learning/configuring_theano_on_ubuntu_with_gpu","machine_learning/workshop_1/getting_setup","machine_learning/neural_networks/introduction","machine_learning/neural_networks/1_neuron_theory","machine_learning/neural_networks/2_training_neural_networks","machine_learning/neural_networks/3_backpropagation","machine_learning/neural_networks/4_loss_functions","machine_learning/neural_networks/5_regularization","machine_learning/neural_networks/6_optimization_in_practice","machine_learning/neural_networks/7_theory_epilogue","machine_learning/neural_networks/sources","machine_learning/convolutional_neural_networks/introduction","machine_learning/convolutional_neural_networks/1_motivation","machine_learning/convolutional_neural_networks/2_convolution_layers","machine_learning/convolutional_neural_networks/3_pooling_layers","machine_learning/convolutional_neural_networks/4_applications","machine_learning/convolutional_neural_networks/sources","machine_learning/recurrent_neural_networks","machine_learning/style_transfer","machine_learning/variational_autoencoders","machine_learning/principle_component_analysis","web/setting_up_vue"]}}}},function(t,e,n){"use strict";function a(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var o=n(2),r=a(o);e.default={mounted:function(){this.fetchData(),setInterval(function(){this.fetchData()}.bind(this),5e3)},methods:{fetchData:function(){var t=this;this.error="Loading data",this.$http.get(r.default.api_endpoint+"/api/protected/dash",{headers:r.default.getAuthHeader()}).then(function(e){var n=e.body;t.error="",t.dashData.machine.endpoints=n.endpoints},function(e){console.log(e),t.error="Could not fetch dashboard data"}).catch(function(e){console.log(e),t.error="Could not fetch dashboard data"})}},data:function(){return{error:"",dashData:{machine:{endpoints:[]}}}},route:{canActivate:function(){return r.default.user.authenticated}}}},function(t,e,n){"use strict";function a(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var o=n(2),r=a(o);e.default={data:function(){return{credentials:{username:"",password:""},error:""}},methods:{submit:function(){var t={username:this.credentials.username,password:this.credentials.password},e=this;r.default.login(this,t,"/console",function(){e.error="Login failed"})}}}},function(t,e,n){"use strict";function a(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var o=n(27),r=a(o),s=n(23),i=a(s),l=n(24),c=a(l),u=n(25),d=a(u);e.default={components:{ProjectsView:r.default,AboutView:i.default,BlogInfoView:c.default,ContactView:d.default},head:{title:{inner:"Andrew Szot's Portfolio",separator:" ",complement:""},meta:[{name:"description",content:"Andrew Szot's portfolio page",id:"desc"}]}}},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},,function(t,e,n){n(15);var a=n(1)(null,n(38),null,null);t.exports=a.exports},function(t,e,n){var a=n(1)(null,n(37),null,null);t.exports=a.exports},function(t,e,n){var a=n(1)(null,n(46),null,null);t.exports=a.exports},function(t,e,n){var a=n(1)(null,n(35),null,null);t.exports=a.exports},function(t,e,n){n(17);var a=n(1)(null,n(40),null,null);t.exports=a.exports},function(t,e,n){n(16);var a=n(1)(n(6),n(39),null,null);t.exports=a.exports},function(t,e,n){n(18);var a=n(1)(n(7),n(41),null,null);t.exports=a.exports},function(t,e,n){n(14);var a=n(1)(n(8),n(36),null,null);t.exports=a.exports},function(t,e,n){n(19);var a=n(1)(n(9),n(42),null,null);t.exports=a.exports},function(t,e,n){var a=n(1)(n(10),n(43),null,null);t.exports=a.exports},function(t,e,n){var a=n(1)(n(11),n(44),null,null);t.exports=a.exports},function(t,e,n){n(20);var a=n(1)(n(12),n(45),null,null);t.exports=a.exports},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("md-list",t._l(t.postsTree,function(e,a){return n("md-list-item",{staticClass:"md-primary flashy",style:{paddingLeft:t.computedDepth+"px"},attrs:{href:t.makeLink?"/"+t.prependPath+"/"+e.name:null}},[n("span",{class:t.makeLink[a]?"leaf":null},[t._v("\n            "+t._s(t.convertLocToStr(e.name))+"\n        ")]),t._v(" "),0!=e.content.length?n("md-list-expand",[n("blog-list-view",{attrs:{"prepend-path":t.prependPath+"/"+e.name,"posts-tree":e.content,depth:t.computedDepth}})],1):t._e()],1)}))},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;t._self._c||e;return t._m(0)},staticRenderFns:[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("p",[t._v("Reach out to me on social media or send me a email.")]),t._v(" "),n("p",[n("a",{attrs:{href:"mailto:feedback@startbootstrap.com"}},[t._v("me@andrewszot.com")])]),t._v(" "),n("ul",{staticClass:"list-inline banner-social-buttons"},[n("li",[n("a",{staticClass:"btn btn-default btn-lg",attrs:{href:"https://www.linkedin.com/in/andrew-szot/"}},[n("i",{staticClass:"fa fa-linkedin fa-fw"}),t._v(" "),n("span",{staticClass:"network-name"},[t._v("LinkedIn")])])]),t._v(" "),n("li",[n("a",{staticClass:"btn btn-default btn-lg",attrs:{href:"https://github.com/ASzot"}},[n("i",{staticClass:"fa fa-github fa-fw"}),t._v(" "),n("span",{staticClass:"network-name"},[t._v("Github")])])])])])}]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"not-found-view"},[n("h1",[t._v("404: Page Not Found")]),t._v(" "),n("div",{staticClass:"nav-back-area"},[n("router-link",{staticClass:"btn btn-default btn-norm btn-lg",attrs:{to:"blog"}},[t._v("To Blog Home")])],1)])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;t._self._c||e;return t._m(0)},staticRenderFns:[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("h2",{staticClass:"major"},[t._v("About")]),t._v(" "),n("p",[t._v("\n      I am a versatile and motivated software engineer well versed with full\n      stack solutions and applications of machine learning. I am most\n      passionate about data science and related fields. I am a fast and\n      motivated learner. \n    ")]),t._v(" "),n("p",[t._v("\n      I currently study Computer Science and Mathematics at USC, however,\n      pursue the majority of my interest outside of the class through\n      independent projects, study, and work experience.  \n    ")]),t._v(" "),n("p",[t._v("\n      Please check out my "),n("a",{attrs:{href:"/blog"}},[t._v("blog")]),t._v(" for an idea of what I am\n      interested in.\n    ")])])}]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("router-view")],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"projects-view",attrs:{id:"portfolio"}},t._l(t.allListData,function(e){return n("section",t._l(e.listData,function(e){return n("div",{staticClass:"row"},[n("div",{staticClass:"col-md-2"}),t._v(" "),n("div",{staticClass:"col-md-8 project-list"},[n("h3",[t._v(t._s(e.title))]),t._v(" "),n("hr"),t._v(" "),n("span",[t._v(t._s(e.subtitle))]),t._v(" "),n("br"),t._v(" "),n("i",{staticClass:"date-spn"},[t._v(t._s(e.datetxt))]),t._v(" "),n("ul",t._l(e.points,function(e){return n("li",{domProps:{innerHTML:t._s(e)}})}))]),t._v(" "),n("div",{staticClass:"col-md-2"})])}))}))},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;t._self._c||e;return t._m(0)},staticRenderFns:[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"footer-view"},[n("footer",[n("span",[t._v("© Copyright Andrew Szot 2017")]),t._v(" "),n("br"),t._v(" "),n("a",{attrs:{href:"/"}},[t._v("To Landing Page")])])])}]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"full-div single-blog-view"},[n("div",{staticClass:"header-section"},[n("h1",[t._v(t._s(t.dispPost.title))]),t._v(" "),n("span",{staticClass:"date-span"},[t._v(t._s(t.dispPost.postDate)+", Andrew Szot")])]),t._v(" "),n("div",{staticClass:"post-content",attrs:{id:"post-content-id"},domProps:{innerHTML:t._s(t.dispPost.content)}}),t._v(" "),n("hr"),t._v(" "),n("div",{staticClass:"link-holder-nav"},[n("div",{staticClass:"link-holder",staticStyle:{"text-align":"left"}},[""!=t.dispPost.prev?n("a",{staticClass:"btn btn-default btn-norm btn-lg",attrs:{href:"/"+t.dispPost.parentPath+"/"+t.dispPost.prev}},[t._v("< "+t._s(t.convertLocToStr(t.dispPost.prev)))]):t._e()]),t._v(" "),n("div",{staticClass:"link-holder",staticStyle:{"text-align":"right"}},[""!=t.dispPost.next?n("a",{staticClass:"btn btn-default btn-norm btn-lg",attrs:{tag:"md-button",href:"/"+t.dispPost.parentPath+"/"+t.dispPost.next}},[t._v(t._s(t.convertLocToStr(t.dispPost.next))+" >")]):t._e()])]),t._v(" "),t.dispPost.showSubscribe?n("div",{staticClass:"subscribe-section"},[n("p",{staticStyle:{"margin-bottom":"5px"}},[t._v("Be notified when I post a new blog entry.")]),t._v(" "),n("a",{staticClass:"btn btn-default btn-norm",staticStyle:{"font-size":"1.4em"},attrs:{href:"http://eepurl.com/czkQGf"}},[t._v("Subscribe")])]):t._e()])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("md-toolbar",[n("md-button",{staticClass:"md-icon-button",on:{click:t.toggleLeftSidenav}},[n("md-icon",[t._v("menu")])],1),t._v(" "),n("h2",{staticClass:"md-title"},[t._v(t._s(t.pageTitle))]),t._v(" "),n("a",{staticClass:"back-home-nav",attrs:{href:"/blog"}},[t._v("Home")])],1),t._v(" "),n("md-sidenav",{ref:"leftSidenav",staticClass:"md-left"},[n("md-toolbar",{staticClass:"md-large"},[n("div",{staticClass:"md-toolbar-container"},[n("a",{staticClass:"back-home-nav blog-home-nav md-title",attrs:{href:"/blog"}},[t._v("Blog Content")])])]),t._v(" "),n("blog-list-view",{attrs:{"prepend-path":"blog","posts-tree":t.postsTree,depth:0}})],1),t._v(" "),n("div",{staticClass:"main-content"},[t.showMainContent?n("div",[n("p",[t._v("\n                Welcome to my blog! I try to post about topics in computer\n                science that interest me which is primarily data science\n                related topics. I hope that this blog can serve as an\n                educational resource for others.\n            ")]),t._v(" "),n("p",[t._v("\n                Use the below navigational structure or the side bar to \n                navigate the website. Sometimes blog posts are split up \n                into 'series' which will have multiple parts to the post. \n            ")]),t._v(" "),n("blog-list-view",{staticStyle:{border:"4px solid #3f51b5"},attrs:{"prepend-path":"blog","posts-tree":t.postsTree,depth:0}})],1):n("div",{staticClass:"full-div"},[n("single-blog-view",{attrs:{"disp-post":t.dispPost}})],1)]),t._v(" "),n("footer-view")],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return""==t.error?n("div",{staticStyle:{color:"white"}},[n("h3",[t._v("Server Info")]),t._v(" "),t._l(t.dashData.machine.endpoints,function(e){return n("p",[t._v(t._s(e.name)+": "+t._s(e.url))])})],2):n("div",[n("span",[t._v(t._s(t.error))])])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"col-sm-4 col-sm-offset-4"},[n("h2",[t._v("Log In")]),t._v(" "),t.error?n("div",{staticClass:"alert alert-danger"},[n("p",[t._v(t._s(t.error))])]):t._e(),t._v(" "),n("div",{staticClass:"form-group"},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.credentials.username,expression:"credentials.username"}],staticClass:"form-control",attrs:{type:"text",placeholder:"Enter your username"},domProps:{value:t.credentials.username},on:{input:function(e){e.target.composing||(t.credentials.username=e.target.value)}}})]),t._v(" "),n("div",{staticClass:"form-group"},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.credentials.password,expression:"credentials.password"}],staticClass:"form-control",attrs:{type:"password",placeholder:"Enter your password"},domProps:{value:t.credentials.password},on:{input:function(e){e.target.composing||(t.credentials.password=e.target.value)}}})]),t._v(" "),n("button",{staticClass:"btn btn-primary",on:{click:function(e){t.submit()}}},[t._v("Access")])])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("div",{attrs:{id:"wrapper"}},[n("link",{attrs:{rel:"stylesheet",href:"/static/css/main.css"}}),t._v(" "),t._m(0),t._v(" "),n("div",{attrs:{id:"main"}},[n("article",{attrs:{id:"blog-info"}},[n("blog-info-view")],1),t._v(" "),n("article",{attrs:{id:"work"}},[n("h2",{staticClass:"major"},[t._v("Work")]),t._v(" "),n("projects-view",{attrs:{"load-data-target-loc":"work.txt"}})],1),t._v(" "),n("article",{attrs:{id:"projects"}},[n("h2",{staticClass:"major"},[t._v("Projects")]),t._v(" "),n("projects-view",{attrs:{"load-data-target-loc":"projects.txt"}})],1),t._v(" "),n("article",{attrs:{id:"about"}},[n("about-view")],1),t._v(" "),n("article",{attrs:{id:"contact"}},[n("h2",{staticClass:"major"},[t._v("Contact")]),t._v(" "),n("contact-view")],1)]),t._v(" "),t._m(1)]),t._v(" "),n("div",{attrs:{id:"bg"}})])},staticRenderFns:[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("header",{attrs:{id:"header"}},[n("div",{staticClass:"content"},[n("div",{staticClass:"inner"},[n("h1",[t._v("Andrew Szot")]),t._v(" "),n("p",[t._v("\n              Machine Learning. Full Stack Development\n            ")])])]),t._v(" "),n("nav",[n("ul",[n("li",[n("a",{attrs:{href:"#about"}},[t._v("About")])]),t._v(" "),n("li",[n("a",{attrs:{href:"#blog-info"}},[t._v("Blog")])]),t._v(" "),n("li",[n("a",{attrs:{href:"#work"}},[t._v("Work")])]),t._v(" "),n("li",[n("a",{attrs:{href:"#projects"}},[t._v("Projects")])]),t._v(" "),n("li",[n("a",{attrs:{href:"#contact"}},[t._v("Contact")])])])])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("footer",{attrs:{id:"footer"}},[n("p",{staticClass:"copyright"},[t._v("© Andrew Szot. Design Inspired By: "),n("a",{attrs:{href:"https://html5up.net"}},[t._v("HTML5 UP")]),t._v(".")])])}]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;t._self._c||e;return t._m(0)},staticRenderFns:[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("h2",{staticClass:"major"},[t._v("Blog")]),t._v(" "),n("p",[t._v("\n    A technical blog on primarily machine learning and web development. Blog\n    posts are mostly tutorials or lessons. \n  ")]),t._v(" "),n("p",[t._v("\n    I hope others can find the information useful.\n  ")]),t._v(" "),n("a",{staticClass:"btn btn-default btn-lg",attrs:{href:"/blog"}},[t._v("Visit Blog")])])}]}},,,,function(t,e){}]);
//# sourceMappingURL=app.3a6fe1347e30c49a528c.js.map