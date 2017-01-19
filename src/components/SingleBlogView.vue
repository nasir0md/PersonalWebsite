<template>
    <div class='full-div single-blog-view'>
        <h1>{{ dispPost.title }}</h1>
        <span>{{ dispPost.postDate }}</span>
        <div>
            {{ dispPost.content }}</span>
        </div>
        <div>
            <router-link v-if="dispPost.next != ''" tag="md-button" :to="dispPost.parentPath + '/' + dispPost.next + '.txt'" class="md-raised md-primary">{{ dispPost.next }}</router-link>
            <router-link v-if="dispPost.prev != ''" tag="md-button" :to="dispPost.parentPath + '/' + dispPost.prev + '.txt'" class="md-raised md-primary">{{ dispPost.prev}}</router-link>
        </div>
    </div>
</template>
<style lang='scss'>
    .single-blog-view {
        text-align: center;
    }
</style>
<script>
    export default {
        created: function created() {
            if (this.dispPost.prev == '') {
                console.log('ot');
            }
            else {
                console.log(this.dispPost.prev.length);
                console.log(this.dispPost.prev);
                console.log('not');
            }
        },
        props: [
           'dispPost' 
        ]
    }
</script>
