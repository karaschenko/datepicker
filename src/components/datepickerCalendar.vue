<style lang="sass">
    $header-height: 100px
    $calendar-width: 200px
    $day-size: ($calendar-width - 30px)/7

    .calendar
        border-bottom: 1px solid #ccc
        margin-bottom: 30px
        position: absolute
        top: 100%
        z-index: 2
        background: #fff
        box-shadow: 0 12px 45px rgba(0, 0, 0, 0.25), 0 10px 18px rgba(0, 0, 0, 0.25)
        width: $calendar-width

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
            width: $day-size
            text-align: center

        &-days
            background: red
            display: flex
            flex-wrap: wrap
            padding: 15px

            &__day
                width: $day-size
                height: $day-size
                text-align: center
                display: flex
                justify-content: center
                align-items: center
                cursor: pointer

                &.selected
                    color: blue


</style>
<template>
    <div class="calendar">
        <div class="calendar-header">
            <div class="calendar-header__year">
                {{year}}
            </div>
            <div class="calendar-header__date">
                {{date_formatted}}
            </div>
        </div>

        <div class="calendar-controls">
          <div class="calendar-controls__label">{{ month.getFormatted() }}</div>
            <button class="calendar-controls__prev" @click="prevMounth()">Prev</button>
            <button class="calendar-controls__next" @click="nextMonth()">Next</button>
        </div>

        <div class="calendar-week">
            <div v-for="weekday in weekdays" class="calendar__weekday">
                {{weekday}}
            </div>
        </div>
        <div class="calendar-days">
            <!--i don't know how to attach variable from sass-->
            <div class="calendar-days__day" :style="{width: (month.getWeekStart() * (200-30)/7)+'px'  }">
            </div>
            <div class="calendar-days__day" @click="selectDate(day)" v-for="day in month.getDays()"
                 :class="{selected: isSelected(day)}">{{day.format('DD')}}
            </div>
        </div>
    </div>

</template>

<script>
    import Month from '../modules/month'

    export default {
        props: ['date'],
        data() {
            console.log(this.date.unix());
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
                if (month < 1) {
                    year += 1
                    month = 11
                }
                this.month = new Month(month, year)
            }

        },
        computed: {
            year() {
                return this.date.format('YYYY')
            },
            date_formatted () {
                return this.date.format('dddd DD MMM')
            }
        }

    }

</script>
