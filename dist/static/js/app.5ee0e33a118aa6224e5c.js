webpackJsonp([1,0],[function(t,e,n){"use strict";function s(t){return t&&t.__esModule?t:{default:t}}var a=n(3),r=s(a),o=n(42),i=s(o),l=n(41),c=s(l),u=n(18),d=s(u),h=n(40),p=s(h),f=n(19),v=(s(f),n(28)),_=s(v),g=n(27),m=s(g),b=n(26),w=s(b);r.default.use(i.default),r.default.use(c.default),r.default.use(d.default),r.default.use(p.default),r.default.prototype.convertLocToStr=function(t){return t.replace(/_/g," ")};var k=new i.default({hashbang:!1,root:"/",mode:"history",saveScrollPosition:!0,canReuse:!1,transitionOnLoad:!0,routes:[{path:"/",component:_.default},{path:"/blog",component:m.default},{path:"/blog/*",component:m.default},{path:"/404",component:w.default},{path:"*",redirect:"/"}]});new r.default({el:"#app",router:k,template:"<router-view></router-view>"}),window.router=k},,function(t,e,n){n(10);var s=n(1)(n(4),n(29),null,null);t.exports=s.exports},,function(t,e,n){"use strict";function s(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var a=n(2),r=s(a);e.default={name:"blog-list-view",components:{BlogListView:r.default},created:function(){this.itemPad=15*this.depth,this.computedDepth=Number(this.depth)+1;for(var t=0;t<this.postsTree.length;++t)this.makeLink.push(this.postsTree.length>0&&0==this.postsTree[t].content.length)},data:function(){return{itemPad:0,computedDepth:0,makeLink:[],currentMakeLinkIndex:0}},props:["postsTree","depth","prependPath"]}},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={methods:{loadListData:function(t){var e=this;this.$http.get(t).then(function(t){for(var n=t.data,s=n.split("|"),a=[],r=0;r<s.length;++r){var o=s[r];if(""!=o){var i=o.split("\n");if(!(i.length<4)){for(var l=i[0],c=i[1],u=i[2],d=[],h=3;h<i.length;++h){var p=i[h];p=p.substr(1),""!=p&&d.push(p)}a.push({title:l,subtitle:c,datetxt:u,points:d})}}}e.allListData.push({listData:a})},function(t){console.log("error")})}},created:function(){this.loadListData("/static/text/"+this.loadDataTargetLoc)},data:function(){return{allListData:[]}},props:["loadDataTargetLoc"]}},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={created:function(){},updated:function(){Prism.highlightAll(),MathJax.Hub.Queue(["Typeset",MathJax.Hub])},props:["dispPost"]}},function(t,e){"use strict"},function(t,e,n){"use strict";function s(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var a=n(2),r=s(a),o=n(25),i=s(o),l=n(23),c=s(l);e.default={components:{BlogListView:r.default,SingleBlogView:i.default,FooterView:c.default},methods:{toggleLeftSidenav:function(){this.$refs.leftSidenav.toggle()},parsePostArg:function(t,e){return t=t.replace(/(\r\n|\n|\r)/gm,""),t=t.slice(e.length+1,t.length)},parsePostText:function(t,e){t=t.replace("\n","");var n=t.split("|"),s=this.parsePostArg(n[0],"TITLE"),a=this.parsePostArg(n[1],"NEXT"),r=this.parsePostArg(n[2],"PREV"),o=this.parsePostArg(n[3],"DATE"),i=this.parsePostArg(n[4],"META"),l=e.split(".")[0],c=l.split("/");c=c.slice(3,c.length-1),c[0]="blog";var u=c.join("/");this.pageTitle=s;for(var d=n[5].replace("\n",""),h=!0,p=0;p<this.subBlacklist.length;++p)if(e.includes(this.subBlacklist[p])){h=!1;break}this.dispPost={title:s,postDate:o,content:d,next:a,showSubscribe:h,prev:r,metaDesc:i,parentPath:u},setTimeout(function(){Prism.highlightAll(),MathJax.Hub.Queue(["Typeset",MathJax.Hub])},2e3)},createMainView:function(){this.showMainContent=!0},createBlogView:function(t){this.showMainContent=!1,t=t.splice(1,t.length).join("/");var e="/static/text/posts/"+t+".txt",n=this;this.$http.get(e).then(function(t){var s=t.data;n.parsePostText(s,e)},function(t){console.log("server error")})},insertPost:function(t,e){if(0!=t.length){var n=t[0];t.shift();for(var s=!1,a=0;a<e.length;++a)e[a].name==n&&(s=!0,this.insertPost(t,e[a].content));if(!s){var r={name:n,content:[]};e.push(r),this.insertPost(t,r.content)}}},loadPosts:function(){for(var t=0;t<this.postPaths.length;++t){var e=this.postPaths[t],n=e.split("/");this.insertPost(n,this.postsTree)}},isUrlValidPost:function(t){var e=!1,n=t.slice(1,t.length);n=n.join("/");for(var s=0;s<this.postPaths.length;++s)if(this.postPaths[s]==n){e=!0;break}return e},getPathURL:function(){var t=window.location.href,e=document.createElement("a");e.href=t;var n=e.pathname.substr(1);return n},getURLInfo:function(){var t=this.getPathURL(),e=t.split("/");if(1==e.length&&"blog"==e[0])return{title:"Blog Home",desc:"The home of Andrew Szot's blog. Full of useful resources on machine learning, web development and more"};e.shift();var n=e.join("/");console.log("searching for "+n);for(var s in this.postPathMetaDescs)if(s==n)return this.postPathMetaDescs[s];return{title:"Invalid",desc:"Invalid"}}},created:function(){var t=this.getPathURL(),e=t.split("/");if(0==e.length||"blog"!=e[0])return void this.$router.go("/404");if(this.loadPosts(),1==e.length)this.createMainView();else{if(!this.isUrlValidPost(e))return console.log("trying to go to the error page"),void this.$router.push({path:"/404"});this.createBlogView(e)}},head:{title:function(){var t=this.getURLInfo().title;return{inner:t,separator:" ",complement:""}},meta:function(){var t=this.getURLInfo().desc;return[{name:"description",content:t}]}},data:function(){return{showMainContent:!0,postsTree:[],subBlacklist:["workshop_1"],dispPost:{title:"",postDate:"",content:"",showSubscribe:!0,next:"",prev:"",metaDesc:"",parentPath:""},pageTitle:"Blog Home",postPathMetaDescs:{"modern_web/modern_web_introduction":{title:"Modern Web Introduction",desc:"A introduction to setting up a development environment to work with the modern web."},"machine_learning/configuring_theano_on_ubuntu_with_gpu":{title:"Configuring Theano on Ubuntu with GPU",desc:"How to correctly configure Theano on Ubuntu using an NIVIDA GPU."},"machine_learning/workshop_1/getting_setup":{title:"Workshop 1 | Getting Setup",desc:"How to setup a machine learning environment."},"machine_learning/neural_networks/introduction":{title:"Neural Networks | Introduction",desc:"Introduction to a machine learning crash course."},"machine_learning/neural_networks/1_neuron_theory":{title:"Neural Networks | Neural Network Theory",desc:"A high level overview of the theory behind neural networks from a largely mathematical perspective"},"machine_learning/neural_networks/2_training_neural_networks":{title:"Neural Networks | Neural Network Theory",desc:"Diving into some of the math behind training neural networks"},"machine_learning/neural_networks/3_backpropagation":{title:"Neural Networks | Backpropagation",desc:"Going into the math behind backpropagation"},"machine_learning/neural_networks/4_loss_functions":{title:"Neural Networks | Loss Functions",desc:"Sources used to make this neural network tutorial"},"machine_learning/neural_networks/sources":{title:"Neural Networks | Sources",desc:"Sources used to make this neural network tutorial"}},postPaths:["machine_learning/configuring_theano_on_ubuntu_with_gpu","machine_learning/workshop_1/getting_setup","machine_learning/neural_networks/introduction","machine_learning/neural_networks/1_neuron_theory","machine_learning/neural_networks/2_training_neural_networks","machine_learning/neural_networks/3_backpropagation","machine_learning/neural_networks/4_loss_functions","machine_learning/neural_networks/sources"]}}}},function(t,e,n){"use strict";function s(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var a=n(24),r=s(a),o=n(20),i=s(o),l=n(21),c=s(l),u=n(22),d=s(u);e.default={components:{ProjectsView:r.default,AboutView:i.default,BlogInfoView:c.default,ContactView:d.default},head:{title:{inner:"Andrew Szot's Portfolio",separator:" ",complement:""},meta:[{name:"description",content:"Andrew Szot's portfolio page",id:"desc"}]}}},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},,function(t,e,n){n(12);var s=n(1)(null,n(33),null,null);t.exports=s.exports},function(t,e,n){var s=n(1)(null,n(32),null,null);t.exports=s.exports},function(t,e,n){var s=n(1)(null,n(39),null,null);t.exports=s.exports},function(t,e,n){var s=n(1)(null,n(30),null,null);t.exports=s.exports},function(t,e,n){n(14);var s=n(1)(null,n(35),null,null);t.exports=s.exports},function(t,e,n){n(13);var s=n(1)(n(5),n(34),null,null);t.exports=s.exports},function(t,e,n){n(15);var s=n(1)(n(6),n(36),null,null);t.exports=s.exports},function(t,e,n){n(11);var s=n(1)(n(7),n(31),null,null);t.exports=s.exports},function(t,e,n){n(16);var s=n(1)(n(8),n(37),null,null);t.exports=s.exports},function(t,e,n){n(17);var s=n(1)(n(9),n(38),null,null);t.exports=s.exports},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("md-list",t._l(t.postsTree,function(e,s){return n("md-list-item",{staticClass:"md-primary flashy",style:{paddingLeft:t.computedDepth+"px"},attrs:{href:t.makeLink?"/"+t.prependPath+"/"+e.name:null}},[n("span",{class:t.makeLink[s]?"leaf":null},[t._v("\n            "+t._s(t.convertLocToStr(e.name))+"\n        ")]),t._v(" "),0!=e.content.length?n("md-list-expand",[n("blog-list-view",{attrs:{"prepend-path":t.prependPath+"/"+e.name,"posts-tree":e.content,depth:t.computedDepth}})],1):t._e()],1)}))},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;t._self._c||e;return t._m(0)},staticRenderFns:[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("p",[t._v("Reach out to me on social media or send me a email.")]),t._v(" "),n("p",[n("a",{attrs:{href:"mailto:feedback@startbootstrap.com"}},[t._v("me@andrewszot.com")])]),t._v(" "),n("ul",{staticClass:"list-inline banner-social-buttons"},[n("li",[n("a",{staticClass:"btn btn-default btn-lg",attrs:{href:"https://www.linkedin.com/in/andrew-szot-89451a126"}},[n("i",{staticClass:"fa fa-linkedin fa-fw"}),t._v(" "),n("span",{staticClass:"network-name"},[t._v("LinkedIn")])])]),t._v(" "),n("li",[n("a",{staticClass:"btn btn-default btn-lg",attrs:{href:"https://github.com/ASzot"}},[n("i",{staticClass:"fa fa-github fa-fw"}),t._v(" "),n("span",{staticClass:"network-name"},[t._v("Github")])])])])])}]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"not-found-view"},[n("h1",[t._v("404: Page Not Found")]),t._v(" "),n("div",{staticClass:"nav-back-area"},[n("router-link",{staticClass:"btn btn-default btn-norm btn-lg",attrs:{to:"blog"}},[t._v("To Blog Home")])],1)])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;t._self._c||e;return t._m(0)},staticRenderFns:[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("h2",{staticClass:"major"},[t._v("About")]),t._v(" "),n("p",[t._v("\n      I am a versatile and motivated software engineer well versed with full\n      stack solutions and applications of machine learning. I have extensive\n      experience developing backend web platforms using modern frameworks and\n      building frontend applications for web and mobile. I also have a passion\n      for applications of machine learning and data science and continue to\n      further learn in the field through implementation and study.  \n    ")]),t._v(" "),n("p",[t._v("\n      I currently study CS at USC, however, pursue the majority of my interest\n      outside of the class through independent projects, study, and work\n      experience.  \n    ")])])}]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("router-view")],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"projects-view",attrs:{id:"portfolio"}},t._l(t.allListData,function(e){return n("section",t._l(e.listData,function(e){return n("div",{staticClass:"row"},[n("div",{staticClass:"col-md-2"}),t._v(" "),n("div",{staticClass:"col-md-8 project-list"},[n("h3",[t._v(t._s(e.title))]),t._v(" "),n("hr"),t._v(" "),n("span",[t._v(t._s(e.subtitle))]),t._v(" "),n("br"),t._v(" "),n("i",{staticClass:"date-spn"},[t._v(t._s(e.datetxt))]),t._v(" "),n("ul",t._l(e.points,function(e){return n("li",[t._v("\n                        "+t._s(e)+"\n                    ")])}))]),t._v(" "),n("div",{staticClass:"col-md-2"})])}))}))},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;t._self._c||e;return t._m(0)},staticRenderFns:[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"footer-view"},[n("footer",[n("span",[t._v("© Copyright Andrew Szot 2017")]),t._v(" "),n("br"),t._v(" "),n("a",{attrs:{href:"/"}},[t._v("To Landing Page")])])])}]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"full-div single-blog-view"},[n("div",{staticClass:"header-section"},[n("h1",[t._v(t._s(t.dispPost.title))]),t._v(" "),n("span",{staticClass:"date-span"},[t._v(t._s(t.dispPost.postDate)+", Andrew Szot")])]),t._v(" "),n("div",{staticClass:"post-content",domProps:{innerHTML:t._s(t.dispPost.content)}}),t._v(" "),n("hr"),t._v(" "),n("div",{staticClass:"link-holder-nav"},[n("div",{staticClass:"link-holder",staticStyle:{"text-align":"left"}},[""!=t.dispPost.prev?n("a",{staticClass:"btn btn-default btn-norm btn-lg",attrs:{href:"/"+t.dispPost.parentPath+"/"+t.dispPost.prev}},[t._v("< "+t._s(t.convertLocToStr(t.dispPost.prev)))]):t._e()]),t._v(" "),n("div",{staticClass:"link-holder",staticStyle:{"text-align":"right"}},[""!=t.dispPost.next?n("a",{staticClass:"btn btn-default btn-norm btn-lg",attrs:{tag:"md-button",href:"/"+t.dispPost.parentPath+"/"+t.dispPost.next}},[t._v(t._s(t.convertLocToStr(t.dispPost.next))+" >")]):t._e()])]),t._v(" "),t.dispPost.showSubscribe?n("div",{staticClass:"subscribe-section"},[n("p",{staticStyle:{"margin-bottom":"5px"}},[t._v("Be notified when I post a new blog entry.")]),t._v(" "),n("a",{staticClass:"btn btn-default btn-norm",staticStyle:{"font-size":"1.4em"},attrs:{href:"http://eepurl.com/czkQGf"}},[t._v("Subscribe")])]):t._e()])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("md-toolbar",[n("md-button",{staticClass:"md-icon-button",on:{click:t.toggleLeftSidenav}},[n("md-icon",[t._v("menu")])],1),t._v(" "),n("h2",{staticClass:"md-title"},[t._v(t._s(t.pageTitle))]),t._v(" "),n("a",{staticClass:"back-home-nav",attrs:{href:"/blog"}},[t._v("Home")])],1),t._v(" "),n("md-sidenav",{ref:"leftSidenav",staticClass:"md-left"},[n("md-toolbar",{staticClass:"md-large"},[n("div",{staticClass:"md-toolbar-container"},[n("a",{staticClass:"back-home-nav blog-home-nav md-title",attrs:{href:"/blog"}},[t._v("Blog Content")])])]),t._v(" "),n("blog-list-view",{attrs:{"prepend-path":"blog","posts-tree":t.postsTree,depth:0}})],1),t._v(" "),n("div",{staticClass:"main-content"},[t.showMainContent?n("div",[n("p",[t._v("\n                Welcome to my blog! I try to post about topics in computer\n                science that interest me which is primarily data science\n                related topics. I hope that this blog can serve as an\n                educational resource for others.\n            ")]),t._v(" "),n("p",[t._v("\n                Use the below navigational structure or the side bar to \n                navigate the website. Sometimes blog posts are split up \n                into 'series' which will have multiple parts to the post. \n            ")]),t._v(" "),n("blog-list-view",{staticStyle:{border:"4px solid #3f51b5"},attrs:{"prepend-path":"blog","posts-tree":t.postsTree,depth:0}})],1):n("div",{staticClass:"full-div"},[n("single-blog-view",{attrs:{"disp-post":t.dispPost}})],1)]),t._v(" "),n("footer-view")],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("div",{attrs:{id:"wrapper"}},[n("link",{attrs:{rel:"stylesheet",href:"/static/css/main.css"}}),t._v(" "),t._m(0),t._v(" "),n("div",{attrs:{id:"main"}},[n("article",{attrs:{id:"blog-info"}},[n("blog-info-view")],1),t._v(" "),n("article",{attrs:{id:"work"}},[n("h2",{staticClass:"major"},[t._v("Work")]),t._v(" "),n("projects-view",{attrs:{"load-data-target-loc":"work.txt"}})],1),t._v(" "),n("article",{attrs:{id:"projects"}},[n("h2",{staticClass:"major"},[t._v("Projects")]),t._v(" "),n("projects-view",{attrs:{"load-data-target-loc":"projects.txt"}})],1),t._v(" "),n("article",{attrs:{id:"about"}},[n("about-view")],1),t._v(" "),n("article",{attrs:{id:"contact"}},[n("h2",{staticClass:"major"},[t._v("Contact")]),t._v(" "),n("contact-view")],1)]),t._v(" "),t._m(1)]),t._v(" "),n("div",{attrs:{id:"bg"}})])},staticRenderFns:[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("header",{attrs:{id:"header"}},[n("div",{staticClass:"content"},[n("div",{staticClass:"inner"},[n("h1",[t._v("Andrew Szot")]),t._v(" "),n("p",[t._v("\n              Machine Learning. Full Stack Development\n            ")])])]),t._v(" "),n("nav",[n("ul",[n("li",[n("a",{attrs:{href:"#about"}},[t._v("About")])]),t._v(" "),n("li",[n("a",{attrs:{href:"#blog-info"}},[t._v("Blog")])]),t._v(" "),n("li",[n("a",{attrs:{href:"#work"}},[t._v("Work")])]),t._v(" "),n("li",[n("a",{attrs:{href:"#projects"}},[t._v("Projects")])]),t._v(" "),n("li",[n("a",{attrs:{href:"#contact"}},[t._v("Contact")])])])])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("footer",{attrs:{id:"footer"}},[n("p",{staticClass:"copyright"},[t._v("© Andrew Szot. Design Inspired By: "),n("a",{attrs:{href:"https://html5up.net"}},[t._v("HTML5 UP")]),t._v(".")])])}]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;t._self._c||e;return t._m(0)},staticRenderFns:[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("h2",{staticClass:"major"},[t._v("Blog")]),t._v(" "),n("p",[t._v("A technical blog on primarily machine learning and web development. Learning how to be a software engineer is a lot. I hope to document my progress and what I have learned here.")]),t._v(" "),n("p",[t._v("I hope others find the information and tutorials I post to be helpful.")]),t._v(" "),n("a",{staticClass:"btn btn-default btn-lg",attrs:{href:"/blog"}},[t._v("Visit Blog")])])}]}},,,,function(t,e){}]);
//# sourceMappingURL=app.5ee0e33a118aa6224e5c.js.map