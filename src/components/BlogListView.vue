<template>
    <md-list>
        <md-list-item :href="makeLink ? '/' + prependPath + '/' + postNode.name
            : null" class='md-primary flashy'  v-for='postNode in postsTree' :style="{ paddingLeft: computedDepth + 'px' }">
            <span :class="getNextMadeLink() ? 'leaf' : null">
                {{ convertLocToStr(postNode.name) }}
            </span>
            <md-list-expand v-if='postNode.content.length != 0'>
                <blog-list-view :prepend-path="prependPath + '/' + postNode.name" :posts-tree='postNode.content' :depth='computedDepth'></blog-list-view>
            </md-list-expand>
        </md-list-item>
    </md-list>
</template>
<style lang='scss'>
    .flashy {
        .leaf {
            color: #2980b9;
        }
        a { 
            width: 100%;
            text-transform: uppercase;
        }
        span {
            text-transform: uppercase;
        }
    }
</style>
<script>
    import BlogListView from './BlogListView' 
    export default {
        name: 'blog-list-view',
        components: {
            BlogListView
        },
        methods: {
            getNextMadeLink: function() {
                return this.makeLink[this.currentMakeLinkIndex++];
            }
        },
        created: function created() {
            this.itemPad = this.depth * 15;
            this.computedDepth = Number(this.depth) + 1;
            for (var i = 0; i < this.postsTree.length; ++i) {
                this.makeLink.push(this.postsTree.length > 0 && this.postsTree[i].content.length == 0);
            }
        },
        data() {
            return {
                itemPad: 0,
                computedDepth: 0,
                makeLink: [],
                currentMakeLinkIndex: 0
            }
        },
        props: [
            'postsTree',
            'depth',
            'prependPath'
        ]
    }
</script>
