<template>
    <div class="datepicker">
        <input type="text" :value="date_formatted">
        <input type="text" :value="date_raw" :name="name">

        <datepickerCalendar :date="date"></datepickerCalendar>
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

    computed: {
       date_formatted: function () {
           return this.date.format(this.format)
       },
        date_raw: function () {
           return this.date.format('YYYY-MM-DD')
        }
    },

    data: function () {
        return {
            date: moment(this.value, 'YYYY-MM_DD')
        }
    },
    components: {
        datepickerCalendar
    }
}

</script>