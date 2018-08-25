<template>
  <div id="app">
    <datepicker  value="2015-02-18" format="DD/MM/YYYY" name="start"></datepicker>
    <!--<datepicker  value="2018-12-08" format="DD/MM/YYYY" name="end"></datepicker>-->
  </div>
</template>

<script>
import datepicker from './components/datepicker.vue'

export default {
  name: 'app',
  components: {
    datepicker
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
