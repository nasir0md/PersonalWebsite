webpackJsonp([1,0],[function(t,e,n){"use strict";function s(t){return t&&t.__esModule?t:{default:t}}var a=n(2),o=s(a),i=n(32),r=s(i),l=n(31),c=s(l),d=n(16),u=s(d),f=n(30),p=s(f),v=n(17),h=(s(v),n(22)),_=s(h),m=n(21),g=s(m),b=n(20),w=s(b);o.default.use(r.default),o.default.use(c.default),o.default.use(u.default),o.default.use(p.default),o.default.prototype.convertLocToStr=function(t){return t.replace(/_/g," ")};var C=new r.default({hashbang:!1,root:"/",mode:"history",saveScrollPosition:!0,canReuse:!1,transitionOnLoad:!0,routes:[{path:"/",component:_.default},{path:"/blog",component:g.default},{path:"/blog/*",component:g.default},{path:"/404",component:w.default},{path:"*",redirect:"/"}]});new o.default({el:"#app",router:C,template:"<router-view></router-view>"}),window.router=C},function(t,e,n){var s,a;n(11),s=n(3);var o=n(25);a=s=s||{},"object"!=typeof s.default&&"function"!=typeof s.default||(a=s=s.default),"function"==typeof a&&(a=a.options),a.render=o.render,a.staticRenderFns=o.staticRenderFns,t.exports=s},,function(t,e,n){"use strict";function s(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var a=n(1),o=s(a);e.default={name:"blog-list-view",components:{BlogListView:o.default},created:function(){this.itemPad=15*this.depth,this.computedDepth=Number(this.depth)+1,this.makeLink=this.postsTree.length>0&&0==this.postsTree[0].content.length},data:function(){return{itemPad:0,computedDepth:0,makeLink:!1}},props:["postsTree","depth","prependPath"]}},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={methods:{loadListData:function(t,e){var n=this;this.$http.get(t).then(function(t){for(var s=t.data,a=s.split("|"),o=[],i=0;i<a.length;++i){var r=a[i];if(""!=r){var l=r.split("\n");if(!(l.length<4)){for(var c=l[0],d=l[1],u=l[2],f=[],p=3;p<l.length;++p){var v=l[p];v=v.substr(1),""!=v&&f.push(v)}o.push({title:c,subtitle:d,datetxt:u,points:f})}}}n.allListData.push({title:e,listId:e.toLowerCase(),listData:o})},function(t){console.log("error")})}},created:function(){for(var t=0;t<this.loadDataTargets.length;++t){var e=this.loadDataTargets[t];this.loadListData("/static/text/"+e.loc,e.title)}},data:function(){return{loadDataTargets:[{title:"Work",loc:"work.txt"},{title:"Big Projects",loc:"projects.txt"},{title:"Education",loc:"education.txt"}],allListData:[]}}}},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={created:function(){},updated:function(){Prism.highlightAll()},props:["dispPost"]}},function(t,e){"use strict"},function(t,e,n){"use strict";function s(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var a=n(1),o=s(a),i=n(19),r=s(i);e.default={components:{BlogListView:o.default,SingleBlogView:r.default},methods:{toggleLeftSidenav:function(){this.$refs.leftSidenav.toggle()},parsePostArg:function(t,e){return t=t.replace(/(\r\n|\n|\r)/gm,""),t=t.slice(e.length+1,t.length)},parsePostText:function(t,e){t=t.replace("\n","");var n=t.split("|"),s=this.parsePostArg(n[0],"TITLE"),a=this.parsePostArg(n[1],"NEXT"),o=this.parsePostArg(n[2],"PREV"),i=this.parsePostArg(n[3],"DATE"),r=this.parsePostArg(n[4],"META"),l=e.split(".")[0],c=l.split("/");c=c.slice(3,c.length-1),c[0]="blog";var d=c.join("/");this.pageTitle=s;var u=n[5].replace("\n","");this.dispPost={title:s,postDate:i,content:u,next:a,prev:o,metaDesc:r,parentPath:d}},createMainView:function(){this.showMainContent=!0},createBlogView:function(t){this.showMainContent=!1,t=t.splice(1,t.length).join("/");var e="/static/text/posts/"+t+".txt",n=this;this.$http.get(e).then(function(t){var s=t.data;n.parsePostText(s,e)},function(t){console.log("server error")})},insertPost:function(t,e){if(0!=t.length){var n=t[0];t.shift();for(var s=!1,a=0;a<e.length;++a)e[a].name==n&&(s=!0,this.insertPost(t,e[a].content));if(!s){var o={name:n,content:[]};e.push(o),this.insertPost(t,o.content)}}},loadPosts:function(){for(var t=0;t<this.postPaths.length;++t){var e=this.postPaths[t],n=e.split("/");this.insertPost(n,this.postsTree)}},isUrlValidPost:function(t){var e=!1,n=t.slice(1,t.length);n=n.join("/");for(var s=0;s<this.postPaths.length;++s)if(this.postPaths[s]==n){e=!0;break}return e}},created:function(){var t=window.location.href,e=document.createElement("a");e.href=t;var n=e.pathname.substr(1),s=n.split("/");if(0==s.length||"blog"!=s[0])return void this.$router.go("/404");if(this.loadPosts(),1==s.length)this.createMainView();else{if(!this.isUrlValidPost(s))return console.log("trying to go to the error page"),void this.$router.push({path:"/404"});this.createBlogView(s)}},data:function(){return{showMainContent:!0,postsTree:[],dispPost:{title:"",postDate:"",content:"",next:"",prev:"",metaDesc:"",parentPath:""},pageTitle:"Blog Home",postPaths:["modern_web/modern_web_introduction","modern_web/first_steps","machine_learning/configuring_theano_on_ubuntu_with_gpu"]}}}},function(t,e,n){"use strict";function s(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var a=n(18),o=s(a);e.default={components:{ProjectsView:o.default},head:{title:{inner:"Home"},meta:[{name:"description",content:"Andrew Szot's portfolio page",id:"desc"}]}}},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},,function(t,e,n){var s,a;n(15);var o=n(29);a=s=s||{},"object"!=typeof s.default&&"function"!=typeof s.default||(a=s=s.default),"function"==typeof a&&(a=a.options),a.render=o.render,a.staticRenderFns=o.staticRenderFns,t.exports=s},function(t,e,n){var s,a;n(9),s=n(4);var o=n(23);a=s=s||{},"object"!=typeof s.default&&"function"!=typeof s.default||(a=s=s.default),"function"==typeof a&&(a=a.options),a.render=o.render,a.staticRenderFns=o.staticRenderFns,t.exports=s},function(t,e,n){var s,a;n(10),s=n(5);var o=n(24);a=s=s||{},"object"!=typeof s.default&&"function"!=typeof s.default||(a=s=s.default),"function"==typeof a&&(a=a.options),a.render=o.render,a.staticRenderFns=o.staticRenderFns,t.exports=s},function(t,e,n){var s,a;n(12),s=n(6);var o=n(26);a=s=s||{},"object"!=typeof s.default&&"function"!=typeof s.default||(a=s=s.default),"function"==typeof a&&(a=a.options),a.render=o.render,a.staticRenderFns=o.staticRenderFns,t.exports=s},function(t,e,n){var s,a;n(14),s=n(7);var o=n(28);a=s=s||{},"object"!=typeof s.default&&"function"!=typeof s.default||(a=s=s.default),"function"==typeof a&&(a=a.options),a.render=o.render,a.staticRenderFns=o.staticRenderFns,t.exports=s},function(t,e,n){var s,a;n(13),s=n(8);var o=n(27);a=s=s||{},"object"!=typeof s.default&&"function"!=typeof s.default||(a=s=s.default),"function"==typeof a&&(a=a.options),a.render=o.render,a.staticRenderFns=o.staticRenderFns,t.exports=s},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"projects-view",attrs:{id:"portfolio"}},t._l(t.allListData,function(e){return n("section",{staticClass:"container sub-content-section text-center",attrs:{id:e.listId}},[n("div",{staticClass:"row"},[n("h2",[t._v(t._s(e.title))])]),t._v(" "),t._l(e.listData,function(e){return n("div",{staticClass:"row"},[n("div",{staticClass:"col-md-2"}),t._v(" "),n("div",{staticClass:"col-md-8 project-list"},[n("h3",[t._v(t._s(e.title))]),t._v(" "),n("hr"),t._v(" "),n("span",[t._v(t._s(e.subtitle))]),t._v(" "),n("br"),t._v(" "),n("i",{staticClass:"date-spn"},[t._v(t._s(e.datetxt))]),t._v(" "),n("ul",t._l(e.points,function(e){return n("li",[t._v("\n                        "+t._s(e)+"\n                    ")])}))]),t._v(" "),n("div",{staticClass:"col-md-2"})])})],2)}))},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"full-div single-blog-view"},[n("div",{staticClass:"header-section"},[n("h1",[t._v(t._s(t.dispPost.title))]),t._v(" "),n("span",{staticClass:"date-span"},[t._v(t._s(t.dispPost.postDate)+", Andrew Szot")])]),t._v(" "),n("div",{staticClass:"post-content",domProps:{innerHTML:t._s(t.dispPost.content)}}),t._v(" "),n("hr"),t._v(" "),n("div",{staticClass:"link-holder-nav"},[n("div",{staticClass:"link-holder",staticStyle:{"text-align":"left"}},[""!=t.dispPost.prev?n("a",{staticClass:"btn btn-default btn-norm btn-lg",attrs:{href:"/"+t.dispPost.parentPath+"/"+t.dispPost.prev}},[t._v("< "+t._s(t.convertLocToStr(t.dispPost.prev)))]):t._e()]),t._v(" "),n("div",{staticClass:"link-holder",staticStyle:{"text-align":"right"}},[""!=t.dispPost.next?n("a",{staticClass:"btn btn-default btn-norm btn-lg",attrs:{tag:"md-button",href:"/"+t.dispPost.parentPath+"/"+t.dispPost.next}},[t._v(t._s(t.convertLocToStr(t.dispPost.next))+" >")]):t._e()])]),t._v(" "),t._m(0),t._v(" "),n("footer",[t._v("\n        © Copyright Andrew Szot 2017\n    ")])])},staticRenderFns:[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"subscribe-section"},[n("p",[t._v("Be notified when I post a new blog entry.")]),t._v(" "),n("a",{staticClass:"btn btn-default btn-norm btn-lg",attrs:{href:"http://eepurl.com/czkQGf"}},[t._v("Subscribe")])])}]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("md-list",t._l(t.postsTree,function(e){return n("md-list-item",{staticClass:"md-primary flashy",style:{paddingLeft:t.computedDepth+"px"},attrs:{href:t.makeLink?"/"+t.prependPath+"/"+e.name:null}},[n("span",{class:t.makeLink?"leaf":null},[t._v("\n            "+t._s(t.convertLocToStr(e.name))+"\n        ")]),t._v(" "),0!=e.content.length?n("md-list-expand",[n("blog-list-view",{attrs:{"prepend-path":t.prependPath+"/"+e.name,"posts-tree":e.content,depth:t.computedDepth}})],1):t._e()],1)}))},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"not-found-view"},[n("h1",[t._v("404: Page Not Found"),t._v(" "),n("div",{staticClass:"nav-back-area"},[n("router-link",{staticClass:"btn btn-default btn-norm btn-lg",attrs:{to:"blog"}},[t._v("To Blog Home")])],1)])])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"page-top","data-spy":"scroll","data-target":".navbar-fixed-top"}},[t._m(0),t._v(" "),t._m(1),t._v(" "),t._m(2),t._v(" "),t._m(3),t._v(" "),t._m(4),t._v(" "),n("projects-view"),t._v(" "),t._m(5)],1)},staticRenderFns:[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("nav",{staticClass:"navbar navbar-custom navbar-fixed-top",attrs:{role:"navigation"}},[n("div",{staticClass:"container"},[n("div",{staticClass:"collapse navbar-collapse navbar-right navbar-main-collapse"},[n("ul",{staticClass:"nav navbar-nav"},[n("li",{staticClass:"hidden"},[n("a",{attrs:{href:"#page-top"}})]),t._v(" "),n("li",[n("a",{staticClass:"page-scroll",attrs:{href:"#about"}},[t._v("About")])]),t._v(" "),n("li",[n("a",{staticClass:"page-scroll",attrs:{href:"#blog"}},[t._v("Blog")])]),t._v(" "),n("li",[n("a",{staticClass:"page-scroll",attrs:{href:"#contact"}},[t._v("Contact")])]),t._v(" "),n("li",[n("a",{staticClass:"page-scroll",attrs:{href:"#portfolio"}},[t._v("Portfolio")])])])])])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("header",{staticClass:"intro"},[n("div",{staticClass:"intro-body"},[n("div",{staticClass:"container"},[n("div",{staticClass:"row"},[n("div",{staticClass:"col-md-8 col-md-offset-2"},[n("h1",{staticClass:"brand-heading"},[t._v("Andrew Szot")]),t._v(" "),n("p",{staticClass:"intro-text"},[t._v("\n                            Machine Learning, Full Stack Development\n                        ")]),t._v(" "),n("a",{staticClass:"btn btn-circle page-scroll",attrs:{href:"#about"}},[n("i",{staticClass:"fa fa-angle-double-down animated"})])])])])])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("section",{staticClass:"container content-section text-center",attrs:{id:"about"}},[n("div",{staticClass:"row"},[n("div",{staticClass:"col-lg-8 col-lg-offset-2"},[n("h2",[t._v("About Me")]),t._v(" "),n("p",[t._v("\n                    I am a versatile and motivated software engineer well versed with full stack solutions and applications of machine learning. I have extensive experience developing backend web platforms using modern frameworks and building frontend applications for web and mobile. I also have a passion for applications of machine learning and data science and continue to further learn in the field through implementation and study.  \n                ")]),t._v(" "),n("p",[t._v("\n                    I currently study CS at USC, however, pursue the majority of my interest outside of the class through independent projects, study, and work experience. \n                ")]),t._v(" "),n("p",[t._v("\n                    Scroll down to learn more about me.\n                ")])])])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("section",{staticClass:"content-section text-center",attrs:{id:"blog"}},[n("div",{staticClass:"download-section"},[n("div",{staticClass:"container"},[n("div",{staticClass:"col-lg-8 col-lg-offset-2"},[n("h2",[t._v("My Blog")]),t._v(" "),n("p",[t._v("A technical blog on primarily machine learning and web development. Learning how to be a software engineer is a lot. I hope to document my progress and what I have learned here.")]),t._v(" "),n("p",[t._v("I hope others find the information and tutorials I post to be helpful.")]),t._v(" "),n("a",{staticClass:"btn btn-default btn-lg",attrs:{href:"/blog"}},[t._v("Visit Blog")])])])])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("section",{staticClass:"container content-section text-center",attrs:{id:"contact"}},[n("div",{staticClass:"row"},[n("div",{staticClass:"col-lg-8 col-lg-offset-2"},[n("h2",[t._v("Contact Me")]),t._v(" "),n("p",[t._v("Reach out to me on social media or send me a email.")]),t._v(" "),n("p",[n("a",{attrs:{href:"mailto:feedback@startbootstrap.com"}},[t._v("me@andrewszot.com")])]),t._v(" "),n("ul",{staticClass:"list-inline banner-social-buttons"},[n("li",[n("a",{staticClass:"btn btn-default btn-lg",attrs:{href:"https://www.linkedin.com/in/andrew-szot-89451a126"}},[n("i",{staticClass:"fa fa-linkedin fa-fw"}),t._v(" "),n("span",{staticClass:"network-name"},[t._v("LinkedIn")])])]),t._v(" "),n("li",[n("a",{staticClass:"btn btn-default btn-lg",attrs:{href:"https://github.com/ASzot"}},[n("i",{staticClass:"fa fa-github fa-fw"}),t._v(" "),n("span",{staticClass:"network-name"},[t._v("Github")])])])])])])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("footer",[n("div",{staticClass:"container text-center"},[n("p",[t._v("Copyright © Andrew Szot, 2017")])])])}]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("md-toolbar",[n("md-button",{staticClass:"md-icon-button",on:{click:t.toggleLeftSidenav}},[n("md-icon",[t._v("menu")])],1),t._v(" "),n("h2",{staticClass:"md-title"},[t._v(t._s(t.pageTitle))]),t._v(" "),n("a",{staticClass:"back-home-nav",attrs:{href:"/"}},[t._v("Home")])],1),t._v(" "),n("md-sidenav",{ref:"leftSidenav",staticClass:"md-left"},[n("md-toolbar",{staticClass:"md-large"},[n("div",{staticClass:"md-toolbar-container"},[n("a",{staticClass:"back-home-nav blog-home-nav md-title",attrs:{href:"/blog"}},[t._v("Blog Content")])])]),t._v(" "),n("blog-list-view",{attrs:{"prepend-path":"blog","posts-tree":t.postsTree,depth:0}})],1),t._v(" "),n("div",{staticClass:"main-content"},[t.showMainContent?n("div",[n("p",[t._v("\n                Welcome to my blog! By this point I have been learning to be a software developer for some time. Along the way\n                I have learned countless lessons. However, I learned many of these lessons at the price of painstakingly trying \n                for hours on end. Learning software development does not have to be this difficult. I hope that this blog will \n                serve as a source of lessons that I wish were there for me. The overarching focus of this blog is implementation\n                and actually getting code working. I am by no means an expert but hope that others will find the lessons that \n                I have learned to be useful. \n            ")]),t._v(" "),n("p",[t._v("\n                I am primarily interested in machine learning and hope to devote most of this blog to the topic. However, much of time \n                is also devoted to web and mobile development to actually implement my ideas. Once again the technologies I discuss \n                are by no means the absolute correct answer but instead a contribution to the wealth of internet teaching resources. \n            ")]),t._v(" "),n("p",[t._v("\n                Use the below navigational structure or the side bar to navigate the website. Sometimes blog posts are split up into 'series' which \n                will have multiple parts to the tutorial. \n            ")]),t._v(" "),n("blog-list-view",{staticStyle:{border:"4px solid #3f51b5"},attrs:{"prepend-path":"blog","posts-tree":t.postsTree,depth:0}})],1):n("div",{staticClass:"full-div"},[n("single-blog-view",{attrs:{"disp-post":t.dispPost}})],1)])],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("router-view")],1)},staticRenderFns:[]}}]);
//# sourceMappingURL=app.168f78b6bab7bd2a808e.js.map