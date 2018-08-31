<template>
    <select class="timezonepicker__select" v-model="pickedTimezone" @change="selectTimezone">
        <option  v-for="timeZone in timeZones" :value="timeZone"> Timezone: {{timeZone}} </option>
    </select>
</template>

<style lang="sass" scoped="">
    .timezonepicker__select
        margin-top: 0
</style>

<script>
import moment from 'moment'
import 'moment-timezone'

export default {
  data () {
    return {
      timeZones: moment.tz.names(),
      pickedTimezone: 'Africa/Abidjan'
    }
  },
  methods: {
    selectTimezone () {
      this.$emit('pickTimezone', this.pickedTimezone)
    }
  }
}
</script>