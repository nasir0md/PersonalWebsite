<template>
    <div id='portfolio' class='projects-view'>
      <section v-for='listInfo in allListData'>
            <div class='row' v-for='project in listInfo.listData'>
                <div class='col-md-2'></div>
                <div class='col-md-8 project-list'>
                    <h3>{{ project.title }}</h3>
                    <hr />
                    <span>{{ project.subtitle }}</span>
                    <br />
                    <i class='date-spn'>{{ project.datetxt }}</i>
                    <ul>
                        <li v-for='point in project.points' v-html="point"></li>
                    </ul>
                </div>
                <div class='col-md-2'></div>
            </div>
        </section>
    </div>
</template>
<style lang='scss'>
    @import '../../static/sass/variables';
</style>
<script>
    export default {
        methods: {
            loadListData: function loadListData(filename) {
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
                        'listData': appendList
                    });
                }, (response) => {
                    console.log('error');
                });
            }
        },
        created: function created() {
            this.loadListData('/static/text/' + this.loadDataTargetLoc);
        },
        data() {
            return {
              allListData: [],
            }
        },
        props: [
          'loadDataTargetLoc' 
        ]
    }
</script>
