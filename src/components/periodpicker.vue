<template>
   <div class="datepicker">
       <select name="pick-period" v-model="pickedPeriod" @change="changePeriod">
           <option  v-for="(period, index) in pickPeriod"  :value="index">{{ period }}</option>
       </select>
   </div>
</template>

<script>
export default {
  data () {
    return {
      pickPeriod: ['custom', 'today', 'yesterday', 'last 7 days', 'last 30 days', 'last 90 days'],
      pickedPeriod: 0
    }
  },
  methods: {
    changePeriod: function () {
      this.$emit('pickPeriod', this.pickedPeriod)
    }
  }
}
</script>