<template>
    <div class='not-found-view'>
        <h1>404: Page Not Found</h1>
        <div class='nav-back-area'>
            <router-link to='blog' class="btn btn-default btn-norm btn-lg">To Blog Home</router-link>
        </div>
    </div>
</template>
<style lang='scss'>
    .not-found-view {
        text-align: center;

        h1 {
            padding-top: 200px;
        }

        .nav-back-area {
            margin-top: 300px;
        }
    }
</style>
<script>
</script>
