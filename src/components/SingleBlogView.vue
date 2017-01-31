<template>
    <div class='full-div single-blog-view'>
        <div class='header-section'>
            <h1>{{ dispPost.title }}</h1>
            <span class='date-span'>{{ dispPost.postDate }}, Andrew Szot</span>
        </div>
        <div class='post-content' v-html='dispPost.content'>
        </div>
        <hr />
        <div class='link-holder-nav'>
            <div class='link-holder' style='text-align: left'>
                <a v-if="dispPost.prev != ''" class='btn btn-default btn-norm btn-lg' :href="'/' + dispPost.parentPath + '/' + dispPost.prev ">&lt; {{ convertLocToStr(dispPost.prev) }}</a>
            </div>
            <div class='link-holder' style='text-align: right'>
                <a v-if="dispPost.next != ''" class='btn btn-default btn-norm btn-lg' tag="md-button" :href="'/' + dispPost.parentPath + '/' + dispPost.next ">{{ convertLocToStr(dispPost.next) }} &gt;</a>
            </div>
        </div>
        <div v-if='dispPost.showSubscribe' class='subscribe-section'>
            <p>Be notified when I post a new blog entry.</p>
            <a class='btn btn-default btn-norm btn-lg' href='http://eepurl.com/czkQGf'>Subscribe</a>
        </div>
        <footer>
            © Copyright Andrew Szot 2017
        </footer>
    </div>
</template>
<style lang='scss'>
    .single-blog-view {
        text-align: center;
        
        code {
            background-color: #f5f2f0 !important;
            color: black !important;
        }

        footer {
            padding-bottom: 0px;
        }

        .subscribe-section a {
            font-size: 2em;
        }

        h1 {
            margin-bottom: 5px;
        }

        h5, h4, h3 {
            margin-top: 30px;
        }

        .header-section {
            margin-bottom: 35px;
        }

        .date-span {
            color: #777777;
        }

        .post-content {
            font-size: 1.3em;
            margin-bottom: 60px;
            text-align: left;

            p {
            }
        }

        .link-holder-nav {
            display: inline-flex;
            width: 100%;
            .link-holder {
                width: 50%;
            }
        }
    }
</style>
<script>
    export default {
        created: function created() {
        },

        updated() {
            Prism.highlightAll();
            this.$emit('updateHead');
        },
        head: {
            title: function () {
                return {
                    inner: this.dispPost.title,
                    separator: '',
                    complement: ''
                }
            },
            meta: [
                { name: 'description', content: 'Dynamically generated', id: 'desc' }
            ]
        },
        props: [
           'dispPost' 
        ]
    }
</script>
