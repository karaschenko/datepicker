<template>
   <div>
       <select name="pick-period" v-model="pickedPeriod" @change="check">
           <option  v-for="(period, index) in pickPeriod"  :value="index">{{ period }}</option>
       </select>
       {{ pickedPeriod }}
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
    check: function () {
      console.log(this.pickedPeriod)
        if (this.pickedPeriod == 0) {
            alert('xyi')
        } else if (this.pickedPeriod == 1) {
          alert('pizda')
        }
    }
  },
  mounted: function () {
    this.check()
  }

}
</script>