<template>
    <div class="datepicker">
        <input class="datepicker__input" type="text" :value="value" :name="name" :disabled="isDisabled" @click="showDatepicker" ref="dateInput">
        <datepickerCalendar :date="date" v-if="isVisible == true" :isVisible="isVisible" @selectDate="selectDate"></datepickerCalendar>
        <div class="calendar-icon"></div>
    </div>
</template>

<style lang="sass">
    .datepicker
        position: relative
        display: flex
        justify-content: flex-start

        &__input
            height: 40px
            padding-left: 15px
            max-width: 160px

        .calendar-icon
            top: 12px
            pointer-events: none

</style>

<script>
import moment from 'moment'
import datepickerCalendar from './datepickerCalendar.vue'

export default {
  props: {
    value: {type: String, required: true},
    format: {type: String, required: true},
    name: {type: String},
    isDisabled: {type: Boolean}
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
    },
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
