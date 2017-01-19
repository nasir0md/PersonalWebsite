<template>
    <md-list>
        <md-list-item class='md-primary flashy'  v-for='postNode in postsTree' :style="{ paddingLeft: computedDepth + 'px' }">
            <span>{{ postNode.name }}</span>
            <md-list-expand v-if='postNode.content.length != 0'>
                <blog-list-view :posts-tree='postNode.content' :depth='computedDepth'></blog-list-view>
            </md-list-expand>
        </md-list-item>
    </md-list>
</template>
<style>
    .flashy {
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
            this.computedDepth = this.depth + 1;
        },
        data() {
            return {
                itemPad: 0,
                computedDepth: 0
            }
        },
        props: [
            'postsTree',
            'depth'
        ]
    }
</script>
