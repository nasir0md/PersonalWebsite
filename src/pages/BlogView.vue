<template>
    <div>
        <md-toolbar>
            <md-button class="md-icon-button" @click="toggleLeftSidenav">
                <md-icon>menu</md-icon>
            </md-button>
            <h2 class="md-title">{{ pageTitle }}</h2>
            <a class='back-home-nav' href='/blog'>Home</a>
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
                    Welcome to my blog! I try to post about topics in computer
                    science that interest me which is primarily data science
                    related topics. I hope that this blog can serve as an
                    educational resource for others.
                </p>

                <p>
                    Use the below navigational structure or the side bar to 
                    navigate the website. Sometimes blog posts are split up 
                    into 'series' which will have multiple parts to the post. 
                </p>
                <blog-list-view style='border: 4px solid #3f51b5' prepend-path='blog' :posts-tree='postsTree' :depth='0'></blog-list-view>
            </div>
            <div v-else class='full-div'>
                <single-blog-view :disp-post='dispPost'></single-blog-view>
            </div>
        </div>
        <footer-view></footer-view>
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
    .subscribe-section {
      margin-top: 40px;
    }
    h3,
    h4 {
      text-align: center;
    }
</style>

<script>
    import BlogListView from '../components/BlogListView' 
    import SingleBlogView from '../components/SingleBlogView'
    import FooterView from '../components/FooterView'
    export default {
        components: {
            BlogListView,
            SingleBlogView,
            FooterView
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
                        'title': 'hmm',
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
                // This is the subscribe blacklist to prevent posts from having
                // the subscribe button at the bottom of the page where it is not
                // appropriate.
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
                    'machine_learning/neural_networks/introduction': {
                        title: 'Neural Networks | Introduction',
                        desc: 'Introduction to a machine learning crash course.'
                    },
                    'machine_learning/neural_networks/1_neuron_theory': {
                        title: 'Neural Networks | Neural Network Theory',
                        desc: 'A high level overview of the theory behind neural networks from a largely mathematical perspective'
                    },
                    'machine_learning/neural_networks/2_training_neural_networks': {
                        title: 'Neural Networks | Neural Network Theory',
                        desc: 'Diving into some of the math behind training neural networks'
                    },
                    'machine_learning/neural_networks/3_backpropagation': {
                        title: 'Neural Networks | Backpropagation',
                        desc: 'Going into the math behind backpropagation'
                    },
                    'machine_learning/neural_networks/4_loss_functions': {
                        title: 'Neural Networks | Loss Functions',
                        desc: 'Using loss functions in neural networks'
                    },
                    'machine_learning/neural_networks/5_regularization': {
                        title: 'Neural Networks | Regularization',
                        desc: 'Regularization in neural networks'
                    },
                    'machine_learning/neural_networks/6_optimization_in_practice': {
                        title: 'Neural Networks | Optimization',
                        desc: 'Optimization in practice in neural networks'
                    },
                    'machine_learning/neural_networks/7_theory_epilogue': {
                        title: 'Neural Networks | Epilogue',
                        desc: 'The conclusion to the section on neural network theory'
                    },
                    'machine_learning/neural_networks/sources': {
                        title: 'Neural Networks | Sources',
                        desc: 'Sources used to make this neural network tutorial'
                    }

                },
                postPaths: [
                    'machine_learning/configuring_theano_on_ubuntu_with_gpu',
                    'machine_learning/workshop_1/getting_setup',

                    'machine_learning/neural_networks/introduction',
                    'machine_learning/neural_networks/1_neuron_theory',
                    'machine_learning/neural_networks/2_training_neural_networks',
                    'machine_learning/neural_networks/3_backpropagation',
                    'machine_learning/neural_networks/4_loss_functions',
                    'machine_learning/neural_networks/5_regularization',
                    'machine_learning/neural_networks/6_optimization_in_practice',
                    'machine_learning/neural_networks/7_theory_epilogue',
                    'machine_learning/neural_networks/sources'
                ]
            }
        }
    }
</script>
