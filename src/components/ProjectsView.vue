<template>
    <div id='portfolio' class='projects-view'>
        <section v-for='listInfo in allListData' v-bind:id='listInfo.listId' class="container sub-content-section text-center">
            <div class='row'>
                <h2>{{ listInfo.title }}</h2>
            </div>
            <div class='row' v-for='project in listInfo.listData'>
                <div class='col-md-2'></div>
                <div class='col-md-8 project-list'>
                    <h3>{{ project.title }}</h3>
                    <hr />
                    <span>{{ project.subtitle }}</span>
                    <br />
                    <i class='date-spn'>{{ project.datetxt }}</i>
                    <ul>
                        <li v-for='point in project.points'>
                            {{ point }}
                        </li>
                    </ul>
                </div>
                <div class='col-md-2'></div>
            </div>
        </section>
    </div>
</template>
<style lang='scss'>
    @import '../../static/sass/variables';

    .projects-view {
        padding-bottom: 100px;
        margin-top: 100px;
        padding-top: 40px;
        background-color: #2b2b2b;
    }
    .sub-content-section {
        padding-top: 20px;
    }

    .project-list {
        text-align: left;
        font-size: 1.2em;
        h3, h4 {
            margin-bottom: 5px;
        }
        .date-spn {
            color: #cacaca;
        }

        hr {
            margin-top: 5px;
            margin-bottom: 10px;
        }
        ul {
        }
    }
</style>
<script>
    export default {
        methods: {
            loadListData: function loadListData(filename, listTitle) {
                this.$http.get(filename).then((response) => {
                    var textData = response.data;

                    var sections = textData.split('|');
                    var appendList = [];
                    for (var i = 0; i < sections.length; ++i) {
                        var section = sections[i];

                        if (section == '') {
                            continue;
                        }

                        var sectionParts = section.split('\n');
                        if (sectionParts.length < 4) {
                            continue;
                        }

                        var title = sectionParts[0];
                        var subtitle = sectionParts[1];
                        var datetxt = sectionParts[2];
                        var points = [];
                        for (var j = 3; j < sectionParts.length; ++j) {
                            var subsection = sectionParts[j];
                            subsection = subsection.substr(1);
                            if (subsection != "") {
                                points.push(subsection);
                            }
                        }

                        appendList.push({
                            'title': title,
                            'subtitle': subtitle,
                            'datetxt': datetxt,
                            'points': points
                        });
                    }

                    this.allListData.push({
                        'title': listTitle,
                        'listId': listTitle.toLowerCase(),
                        'listData': appendList
                    });
                }, (response) => {
                    console.log('error');
                });
            }
        },
        created: function created() {
            for (var i = 0; i < this.loadDataTargets.length; ++i) {
                var loadDataTarget = this.loadDataTargets[i];
                this.loadListData('/static/text/' + loadDataTarget.loc, loadDataTarget.title);
            }
        },
        data() {
            return {
                loadDataTargets: [
                    {'title': 'Work', 'loc': 'work.txt'},
                    {'title': 'Big Projects', 'loc': 'projects.txt'},
                    {'title': 'Education', 'loc': 'education.txt'},
                ],
                allListData: [],
            }
        }
    }
</script>
