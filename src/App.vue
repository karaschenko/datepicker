<template>
  <div id="app" class="container">
    {{ currentDate }}
    <periodpicker></periodpicker>
    <timezonepicker></timezonepicker>
    <div class="datepicker-wrapper">
      <datepicker  value="2015-02-18" format="DD/MM/YYYY" name="start" ref="fromPicker" @change="componentChange"></datepicker>
      <datepicker  value="2018-12-08" format="DD/MM/YYYY" name="end" ref="toPicker"></datepicker>
    </div>
    <div>{{ timeZones }}</div>
  </div>
</template>

<script>
import moment from 'moment'
import 'moment-timezone'
import datepicker from './components/datepicker.vue'
import periodpicker from './components/periodpicker.vue'
import timezonepicker from './components/timezonepicker.vue'

export default {
  name: 'app',
  components: {
    datepicker,
    periodpicker,
    timezonepicker
  },
  data () {
    return {
      currentDate: moment().format('DD-MM-YY'),
    }
  },
  methods: {
    componentChange (data) {
      console.log('somethingdata ' +  data)
    }
  },
  mounted: function () {

  }
}
</script>

<style lang="sass">
.container
  font-family: 'Avenir', Helvetica, Arial, sans-serif
  color: #2c3e50
  margin-top: 60px
  width: 400px
  border: 1px solid #000

  .datepicker-wrapper
    display: flex
    justify-content: space-between

</style>
