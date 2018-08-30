<template>
    <div class="datepicker">

        <input type="text" :value="date_formatted" @click="showDatepicker" ref="dateInput">
        <input type="hidden" :name="name" :value="date_raw">
        <datepickerCalendar :date="date" v-if="isVisible == true" :isVisible="isVisible" @selectDate="selectDate"></datepickerCalendar>
    </div>
</template>

<style lang="sass">
    .datepicker
        position: relative
        display: flex
        justify-content: flex-start

</style>

<script>
import moment from 'moment'
import datepickerCalendar from './datepickerCalendar.vue'

export default {
  props: {
    value: {type: String, required: true},
    format: {type: String, required: true},
    name: {type: String}
  },

  methods: {
    selectDate (data) {
      this.date = data.date
      this.hideDatepicker()
      this.$emit('change', this.date)
      console.log('select date')
      this.$emit('selectDate', this.date)
    },
    showDatepicker () {
      this.isVisible = true
      setTimeout(() => document.addEventListener('click', this.hideDatepicker), 0.1)
      console.log('show')
    },
    hideDatepicker () {
      this.isVisible = false
      document.removeEventListener('click', this.hideDatepicker)
    }
  },

  computed: {
    date_formatted () {
      return this.date.format(this.format)
    },
    date_raw () {
      return this.date.format('YYYY-MM-DD')
    }
  },

  data () {
    return {
      isVisible: false,
      date: moment(this.value, 'YYYY-MM_DD')
    }
  },
  components: {
    datepickerCalendar
  }
}

</script>
