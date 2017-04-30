<template>
    <div>
        <md-toolbar>
            <md-button class="md-icon-button" @click="toggleLeftSidenav">
                <md-icon>menu</md-icon>
            </md-button>
            <h2 class="md-title">{{ pageTitle }}</h2>
            <a class='back-home-nav' href='/'>Home</a>
        </md-toolbar>

        <md-sidenav class="md-left" ref="leftSidenav">
            <md-toolbar class="md-large">
                <div class="md-toolbar-container">
                    <a href='/blog' class="back-home-nav blog-home-nav md-title">Blog Content</a>
                </div>
            </md-toolbar>

            <blog-list-view prepend-path='blog' :posts-tree='postsTree' :depth='0'></blog-list-view>
        </md-sidenav>
                    
        <div class="main-content">
            <div v-if='showMainContent'>
                <p>
                    Welcome to my blog! By this point I have been learning to be a software developer for some time. Along the way
                    I have learned countless lessons. However, I learned many of these lessons at the price of painstakingly trying 
                    for hours on end. Learning software development does not have to be this difficult. I hope that this blog will 
                    serve as a source of lessons that I wish were there for me. The overarching focus of this blog is implementation
                    and actually getting code working. I am by no means an expert but hope that others will find the lessons that 
                    I have learned to be useful and hopefully avoid some of the pitfalls that I fell into. 
                </p>
                <p>
                    I am primarily interested in machine learning and hope to devote most of this blog to the topic. However, much of time 
                    is also devoted to web and mobile development to actually implement my ideas. Once again the technologies I discuss 
                    are by no means the absolute correct answer but instead a contribution to the wealth of internet teaching resources. 
                </p>
                <p>
                    Use the below navigational structure or the side bar to navigate the website. Sometimes blog posts are split up into 'series' which 
                    will have multiple parts to the tutorial. 
                </p>
                <blog-list-view style='border: 4px solid #3f51b5' prepend-path='blog' :posts-tree='postsTree' :depth='0'></blog-list-view>
            </div>
            <div v-else class='full-div'>
                <single-blog-view :disp-post='dispPost'></single-blog-view>
            </div>
        </div>
</template>
<style lang='scss'>
    .blog-home-nav {
        font-size: 2.2em !important;
        margin-top: 20px !important;
    }
    .full-div {
        width: 100%;
        height: 100%;
    }
    .back-home-nav {
        text-align: right;
        right: 30px;
        color: white !important;
        position: absolute;
        font-size: 1.5em;
    }
</style>
<script>
    import BlogListView from '../components/BlogListView' 
    import SingleBlogView from '../components/SingleBlogView'
    export default {
        components: {
            BlogListView,
            SingleBlogView
        },
        methods: {
            toggleLeftSidenav: function toggleLeftSidenav() {
                this.$refs.leftSidenav.toggle();
            },
            parsePostArg: function parsePostArg(line, key) {
                // Add one because there is also the colon.
                line = line.replace(/(\r\n|\n|\r)/gm, '');
                line = line.slice(key.length + 1, line.length);
                return line;
            },
            parsePostText: function parsePostText(textData, filename) {
                textData = textData.replace('\n', '');
                var textParts = textData.split('|');

                var title = this.parsePostArg(textParts[0], 'TITLE');
                var next = this.parsePostArg(textParts[1], 'NEXT');
                var prev = this.parsePostArg(textParts[2], 'PREV');
                var dateTxt = this.parsePostArg(textParts[3], 'DATE');
                var meta = this.parsePostArg(textParts[4], 'META');

                var filenameNoExt = filename.split('.')[0];
                var filenameParts = filenameNoExt.split('/');
                filenameParts = filenameParts.slice(3, filenameParts.length - 1);
                filenameParts[0] = 'blog';
                var parentPath = filenameParts.join('/');

                this.pageTitle = title;

                var content = textParts[5].replace('\n', '');

                var showSubscribe = true;
                for (var i = 0; i < this.subBlacklist.length; ++i) {
                    if (filename.includes(this.subBlacklist[i])) {
                        showSubscribe = false;
                        break;
                    }
                }

                this.dispPost = {
                    title: title,
                    postDate: dateTxt,
                    content: content,
                    next: next,
                    showSubscribe: showSubscribe,
                    prev: prev,
                    metaDesc: meta,
                    parentPath: parentPath
                }
                setTimeout(function () {
                    Prism.highlightAll();
                    MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
                }, 2000);
            },
            createMainView: function createMainView() {
                this.showMainContent = true; 
            },
            createBlogView: function createBlogView(path) {
                this.showMainContent = false;
                path = path.splice(1, path.length).join('/');

                var filename = '/static/text/posts/' + path + '.txt';
                var _this = this;
                this.$http.get(filename).then((response) => {
                    var textData = response.data;
                    _this.parsePostText(textData, filename);
                }, (response) => {
                    console.log('server error');
                });
            },
            insertPost: function insertPost(postPathSplit, curPostsTreeNode) {
                if (postPathSplit.length == 0) {
                    return;
                }

                var curVal = postPathSplit[0];
                postPathSplit.shift();

                var found = false;
                for (var i = 0; i < curPostsTreeNode.length; ++i) {
                    if (curPostsTreeNode[i].name == curVal) {
                        found = true;
                        this.insertPost(postPathSplit, curPostsTreeNode[i].content);
                    }
                }

                if (!found) {
                    var addNode = {
                        'name': curVal,
                        'content': []
                    };
                    curPostsTreeNode.push(addNode);

                    this.insertPost(postPathSplit, addNode.content)
                }
            },
            loadPosts: function loadPosts() {
                for (var i = 0; i < this.postPaths.length; ++i) {
                    var postPath = this.postPaths[i];
                    var splitPostPath = postPath.split('/');
                    
                    this.insertPost(splitPostPath, this.postsTree);
                }
            },
            isUrlValidPost: function isUrlValidPost(splitPath) {
                var found = false;
                var testPath = splitPath.slice(1, splitPath.length);
                testPath = testPath.join('/');
                for (var i = 0; i < this.postPaths.length; ++i) {
                    if (this.postPaths[i] == testPath) {
                        found = true;
                        break;
                    }
                }

                return found;
            },
            getPathURL: function getPathURL() {
                var curURL = window.location.href;
                var a = document.createElement('a');
                a.href = curURL;

                // There will be a leading '/' character
                var pathname = a.pathname.substr(1);
                return pathname;
            },
            getURLInfo: function getURLInfo() {
                var pathname = this.getPathURL(); 
                var splitPath = pathname.split('/');

                if (splitPath.length == 1 && splitPath[0] == 'blog') {
                    return {
                        'title': 'Blog Home',
                        'desc': "The home of Andrew Szot's blog. Full of useful resources on machine learning, web development and more"
                    };
                }
                else {
                    splitPath.shift();
                    var joinedPath = splitPath.join('/');
                    console.log('searching for ' + joinedPath);
                    for (var pathKey in this.postPathMetaDescs) {
                        if (pathKey == joinedPath) {
                            return this.postPathMetaDescs[pathKey];
                        }
                    }
                    
                    return {
                        'title': 'Invalid',
                        'desc': 'Invalid'
                    };
                }
            }
        },
        created: function created() {
            var pathname = this.getPathURL();

            var splitPath = pathname.split('/');
            if (splitPath.length == 0 || splitPath[0] != 'blog') {
                this.$router.go('/404');
                return;
            }

            this.loadPosts();

            if (splitPath.length == 1) {
                this.createMainView();    
            }
            else {
                if (!this.isUrlValidPost(splitPath)) {
                    console.log('trying to go to the error page');
                    this.$router.push({ path: '/404' });
                    return;
                }

                this.createBlogView(splitPath);
            }
        },
        head: {
            title: function() {
                var curTitle = this.getURLInfo().title;
                
                return {
                    inner: curTitle,
                    separator: ' ',
                    complement: ''
                }
            },
            meta: function () {
                var curDesc = this.getURLInfo().desc;

                return [
                    { name: 'description', content: curDesc }
                ];
            }
        },
        data() {
            return {
                showMainContent: true,
                postsTree: [],
                subBlacklist: [
                    'workshop_1'
                ],
                dispPost: {
                    title: '',
                    postDate: '',
                    content: '',
                    showSubscribe: true,
                    next: '',
                    prev: '',
                    metaDesc: '',
                    parentPath: ''
                },
                pageTitle: 'Blog Home',
                postPathMetaDescs: {
                    'modern_web/modern_web_introduction': { 
                        title: 'Modern Web Introduction', 
                        desc: 'A introduction to setting up a development environment to work with the modern web.' 
                    },
                    'machine_learning/configuring_theano_on_ubuntu_with_gpu': { 
                        title: 'Configuring Theano on Ubuntu with GPU',
                        desc: 'How to correctly configure Theano on Ubuntu using an NIVIDA GPU.' 
                    },
                    'machine_learning/workshop_1/getting_setup': { 
                        title: 'Workshop 1 | Getting Setup',
                        desc: 'How to setup a machine learning environment.'
                    },
                    'machine_learning/crash_course/introduction': {
                        title: 'Workshop 1 | Introduction',
                        desc: 'Introduction to a machine learning crash course.'
                    },
                    'machine_learning/crash_course/1_neuron_theory': {
                        title: 'Workshop 1 | Neural Network Theory',
                        desc: 'A high level overview of the theory behind neural networks from a largely mathematical perspective'
                    }
                },
                postPaths: [
                    'modern_web/modern_web_introduction', 
                    'machine_learning/configuring_theano_on_ubuntu_with_gpu',
                    'machine_learning/workshop_1/getting_setup',

                    'machine_learning/crash_course/introduction',
                    'machine_learning/crash_course/1_neuron_theory',
                    'machine_learning/crash_course/2_training_neural_networks',
                    'machine_learning/crash_course/3_backpropagation'
                ]
            }
        }
    }
</script>
