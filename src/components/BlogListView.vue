<template>
    <md-list>
        <md-list-item :href="makeLink ? '/' + prependPath + '/' + postNode.name
            : null" class='md-primary flashy'  v-for='postNode in postsTree' :style="{ paddingLeft: computedDepth + 'px' }">
            <span :class="makeLink ? 'leaf' : null">
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
            color: #e74c3c;
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
        created: function created() {
            this.itemPad = this.depth * 15;
            this.computedDepth = Number(this.depth) + 1;
            this.makeLink = this.postsTree.length > 0 && this.postsTree[0].content.length == 0;
        },
        data() {
            return {
                itemPad: 0,
                computedDepth: 0,
                makeLink: false
            }
        },
        props: [
            'postsTree',
            'depth',
            'prependPath'
        ]
    }
</script>
