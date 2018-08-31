<template>
  <div id="app" class="container">
    <div class="calendar-icon"></div>
    <div class="selected-date">
      {{ dateFrom }} - {{ dateTo }}
    </div>
    <periodpicker @pickPeriod="changePeriod"></periodpicker>
    <timezonepicker @pickTimezone="changeTimezone" v-model="timezone"></timezonepicker>
    <div class="datepicker-wrapper">
      <datepicker  :value="dateFrom" v-model="dateFrom" format="DD/MM/YYYY" name="start" :isDisabled="isDisabled" @selectDate="dateSelectedFrom" ref="fromPicker"></datepicker>
      <datepicker  :value="dateTo" v-model="dateTo" format="DD/MM/YYYY" name="end" :isDisabled="isDisabled" @selectDate="dateSelectedTo" ref="toPicker"></datepicker>
    </div>
    <div>{{ timeZones }}</div>
    <div class="controls main">
      <button class="controls__btn cancel">Cancel</button>
      <button class="controls__btn apply" @click="Apply">Apply</button>
    </div>
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
      currentDate: moment(),
      dateFrom: moment().format('DD-MM-YY'),
      dateTo: moment().format('DD-MM-YY'),
      timezone: 'Africa/Abidjan',
      isDisabled: false
    }
  },
  computed: {
    dataToSend () {
      return {
        period: 'from: ' +  this.dateFrom + ' to: ' + this.dateTo,
        timezoneSend: this.timezone
      }
    }
  },
  methods: {
    checkInputDates () {
      if (this.dateFrom > this.dateTo) {
        this.dateFrom = this.dateTo
      }
    },
    changePeriod (data) {
    // added some hardcode
      switch (data) {
        case 0:
          this.isDisabled = false
          break
        case 1:
          this.isDisabled = true
          this.dateFrom = this.currentDate.format('DD-MM-YY')
          this.currentDate = moment()
          this.dateTo = this.currentDate.format('DD-MM-YY')
          break
        case 2:
          this.isDisabled = true
          this.dateFrom = this.currentDate.add(-1, 'days').format('DD-MM-YY')
          this.currentDate = moment()
          this.dateTo = this.currentDate.format('DD-MM-YY')
          break
        case 3:
          this.isDisabled = true
          this.dateFrom = this.currentDate.add(-7, 'days').format('DD-MM-YY')
          this.currentDate = moment()
          this.dateTo = this.currentDate.format('DD-MM-YY')
          break
        case 4:
          this.isDisabled = true
          this.dateTo = this.currentDate.format('DD-MM-YY')
          this.currentDate = moment()
          this.dateFrom = this.currentDate.add(-30, 'days').format('DD-MM-YY')
          break
        case 5:
          this.isDisabled = true
          this.dateFrom = this.currentDate.add(-90, 'days').format('DD-MM-YY')
          this.currentDate = moment()
          this.dateTo = this.currentDate.format('DD-MM-YY')
          break
      }
    },

    changeTimezone (data) {
      this.timezone = data
    },
    dateSelectedFrom (data) {
      this.dateFrom = data.format('DD-MM-YY')
      this.checkInputDates()
    },
    dateSelectedTo (data) {
      this.dateTo = data.format('DD-MM-YY')
      this.checkInputDates()
    },
    Apply () {
      alert(this.dataToSend.period + ' Timezone ' + this.dataToSend.timezoneSend)
    }
  }
}
</script>

<style lang="sass">
$accent-color: #4f5b6c
*
  box-sizing: border-box

.container
  font-family: 'Avenir', Helvetica, Arial, sans-serif
  color: $accent-color
  margin-top: 60px
  width: 390px
  border: 1px solid #000
  padding: 15px
  position: relative
  
  .calendar-icon
    position: absolute
    width: 16px
    height: 16px
    background: url("assets/calendar.png") no-repeat center
    top: 15px
    right: 15px

  select
    width: 100%
    margin: 15px 0
    height: 40px

  .datepicker-wrapper
    display: flex
    justify-content: space-between

    .datepicker
      position: relative

  .controls
    display: flex
    justify-content: flex-end
    margin-top: 15px

    .controls__btn
      border: 1px solid $accent-color
      display: flex
      min-height: 25px
      align-items: center
      padding: 0 15px
      background: #fff
      cursor: pointer

      &.apply
        background: #ed1c24
        margin-left: 15px
        border-color: #ed1c24
        color: #fff

</style>
