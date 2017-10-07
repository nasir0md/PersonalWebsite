<template>
  <div style='color: white' v-if="error == ''">
    <h3>Server Info</h3>
    <p v-for='endpoint in dashData.machine.endpoints'>{{ endpoint.name }}: {{endpoint.url}}</p>
  </div>
  <div v-else>
    <span>{{ error }}</span>
  </div>
</template>

<script>
  import auth from '../util/auth'

  export default {
    mounted: function () {
      this.fetchData();

      //setInterval(function () {
      //  this.fetchData();
      //}.bind(this), 30000);
    },
    methods: {
      fetchData() {
        var _this = this;
        this.error = 'Loading data';

        this.$http.get(auth.api_endpoint + '/api/protected/dash', {headers: auth.getAuthHeader()}).then(response => {
          var res = response.body;
          _this.error = '';
          _this.dashData.machine.endpoints = res.endpoints;
        }, response => {
          console.log(response);
          _this.error = 'Could not fetch dashboard data';
        }).catch(e => {
          console.log(e);
          _this.error = 'Could not fetch dashboard data';
        });
      }
    },
    data() {
      return {
        error: '',
        dashData: {
          machine: {
            endpoints: [
            ]
          }
        }
      }
    },
    route: {
      canActivate() {
        return auth.user.authenticated
      }
    }
  }
</script>
