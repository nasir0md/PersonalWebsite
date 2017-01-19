<template>
    <div>
        <md-toolbar>
            <md-button class="md-icon-button" @click="toggleLeftSidenav">
                <md-icon>menu</md-icon>
            </md-button>
            <h2 class="md-title">{{ pageTitle }}</h2>
        </md-toolbar>

        <md-sidenav class="md-left" ref="leftSidenav">
            <md-toolbar class="md-large">
                <div class="md-toolbar-container">
                    <h3 class="md-title">Blog Content</h3>
                </div>
            </md-toolbar>

            <blog-list-view :posts-tree='postsTree' depth='0'></blog-list-view>
        </md-sidenav>
                    
        <div class="main-content">
            <div v-if='showMainContent'>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo, rerum? 
                    Error sunt, aperiam dolores, atque expedita molestiae tenetur. 
                    Quis eveniet accusamus velit explicabo adipisci reiciendis modi eaque quas, officia excepturi.
                </p>
                <blog-list-view style='border: 4px solid #3f51b5' :posts-tree='postsTree' depth='0'></blog-list-view>
            </div>
            <div v-else class='full-div'>
                <single-blog-view :disp-post='dispPost'></single-blog-view>
            </div>
        </div>
</template>
<style lang='scss'>
    .full-div {
        width: 100%;
        height: 100%;
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
                line = line.slice(key.length + 1, line.length);
                line = line.replace('\n', '');
                return line;
            },
            parsePostText: function parsePostText(textData, filename) {
                var textParts = textData.split('|');

                var title = this.parsePostArg(textParts[0], 'TITLE');
                var next = this.parsePostArg(textParts[1], 'NEXT');
                var prev = this.parsePostArg(textParts[2], 'PREV');
                var dateTxt = this.parsePostArg(textParts[3], 'DATE');
                var meta = this.parsePostArg(textParts[4], 'META');

                var filenameNoExt = filename.split('.')[0];
                var filenameParts = filenameNoExt.split('/');
                var parentPath = filenameParts.slice(0, filenameParts.length - 1).join('/');

                this.pageTitle = title;

                var content = textParts[5].replace('\n', '');
                this.dispPost = {
                    title: title,
                    postDate: dateTxt,
                    content: content,
                    next: next,
                    prev: prev,
                    metaDesc: meta,
                    parentPath: parentPath
                }
                this.showMainContent = false;
            },
            createMainView: function createMainView() {
                console.log('creating main view');
                this.showMainContent = true; 
            },
            createBlogView: function createBlogView(path) {
                console.log('creating blog view');

                path = path.splice(1, path.length).join('/');


                var filename = '/static/text/posts/' + path + '.txt';
                var _this = this;
                console.log('going after ' + filename);
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
            }
        },
        created: function created() {
            var curURL = window.location.href;
            var a = document.createElement('a');
            a.href = curURL;

            // There will be a leading '/' character
            var pathname = a.pathname.substr(1);

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
                    this.$router.go('/404');
                    return;
                }

                this.createBlogView(splitPath);
            }
        },
        data() {
            return {
                showMainContent: true,
                postsTree: [],
                dispPost: {
                    title: '',
                    postDate: '',
                    content: '',
                    next: '',
                    prev: '',
                    metaDesc: '',
                    parentPath: ''
                },
                pageTitle: 'Blog Home',
                postPaths: [
                    'modern_web/vue',
                    'modern_web/laravel'
                ]
            }
        }
    }
</script>
