<style lang="sass" scoped>
    $header-height: 40px
    $calendar-width: 300
    $day-size: ($calendar-width - 30)/7
    $accent-color: #4f5b6c

    .calendar
        border-bottom: 1px solid #ccc
        margin-bottom: 30px
        position: absolute
        top: 100%
        z-index: 2
        background: #fff
        box-shadow: 0 12px 45px rgba(0, 0, 0, 0.25), 0 10px 18px rgba(0, 0, 0, 0.25)
        width: $calendar-width+px

        &-controls
            position: relative
            height: 60px
            display: flex
            align-items: center
            justify-content: space-between
            padding: 15px

            &__prev, &__next
                background: url("../assets/arrow.png") no-repeat center
                border: 0
                width: 16px
                height: 16px
                cursor: pointer
                &:hover
                    opacity: 0.6

            &__prev
                transform: rotate(180deg)

        &-header
            background: #0097a7
            color: #fff
            padding: 15px
            height: $header-height

        &-week
            font-size: 12px
            color: rgba(0, 0, 0, 0.8)
            display: flex
            padding: 15px

        &__weekday
            width: $day-size+px
            text-align: center

        &-days
            display: flex
            flex-wrap: wrap
            padding: 0 15px 15px

            &__day
                width: $day-size+px
                height: $day-size+px
                font-size: 12px
                text-align: center
                display: flex
                justify-content: center
                align-items: center
                cursor: pointer
                position: relative

                &.space
                    opacity: 0.5

                &_effect
                    position: absolute
                    opacity: 0
                    width: ($day-size - 4)+px
                    height: ($day-size - 4)+px
                    top: 2px
                    left: 2px
                    transform: scale(0)
                    border: 1px solid $accent-color
                    border-radius: 50%
                    transition: all, 450ms

                &:hover &_effect
                    opacity: 1
                    transform: scale(1)
                    transition: all, 450ms

                &.selected
                    color: #fff
                    background: $accent-color
                    border-radius: 50%

</style>
<template>
    <div class="calendar" @click.stop="">
        <div class="calendar-controls">
            <button class="calendar-controls__prev" @click="prevMounth()"></button>
            <div class="calendar-controls__label">{{ month.getFormatted() }}</div>
            <button class="calendar-controls__next" @click="nextMonth()"></button>
        </div>
        <div class="calendar-week">
            <div v-for="weekday in weekdays" class="calendar__weekday">
                {{weekday}}
            </div>
        </div>
        <div class="calendar-days">
            <div class="calendar-days__day space" v-for="prevDay in prev_month_days">{{prevDay}}</div>


            <div class="calendar-days__day" @click="selectDate(day)" v-for="day in month.getDays()"
                 :class="{selected: isSelected(day)}">
                {{ day.format('D') }}
                <span class="calendar-days__day_effect"></span>
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment'
import Month from '../modules/month'

export default {
  props: ['date', 'isVisible'],
  data () {
    return {
      weekdays: ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'],
      month: new Month(this.date.month(), this.date.year())
    }
  },
  methods: {
    isSelected (day) {
      return this.date.unix() === day.unix()
    },
    selectDate (day) {
      this.date = day.clone()
      this.isVisible = false
      console.log('blalbal ' + this.prevMonth)
      this.$emit('selectDate', {date: this.date, isVisible: this.isVisible})
    },
    nextMonth () {
      let month = this.month.month + 1
      let year = this.month.year
      if (month > 11) {
        year += 1
        month = 0
      }
      this.month = new Month(month, year)
    },
    prevMounth () {
      let month = this.month.month - 1
      let year = this.month.year
      if (month < 0) {
        year -= 1
        month = 11
      }
      this.month = new Month(month, year)
    }
  },
  computed: {
    year () {
      return this.date.format('YYYY')
    },
    date_formatted () {
      return this.date.format('dddd DD MMM')
    },
    prev_month_days () {
      let month = this.month.month
      let year = this.month.year
      if (month < 1) {
        year -= 1
        month = 12
      }
      let prevMonthDays = moment(year + '-' + month, 'YYYY-MM').daysInMonth()
      let daysPrev = []
      for (let i = this.month.getWeekStart(); i--; i > 0) {
        daysPrev.push(prevMonthDays - i)
      }
      return daysPrev
    }
  }
}

</script>
