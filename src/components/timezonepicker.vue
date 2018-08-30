<template>
    <select>
        <option  v-for="(timeZone, index) in timeZones" :value="index"> Timez{{timeZone}} </option>
    </select>
</template>

<style lang="sass">

</style>

<script>
import moment from 'moment'
import 'moment-timezone'

export default {
  data () {
    return {
      timeZones: moment.tz.names()
    }
  }
}
</script>