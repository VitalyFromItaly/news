<template>
  <div id="nav" class="flex my-2">
      <div class="flex">
            <h1>Таймфрейм:</h1>
            <select @change="changeTimeFrame(selectedTime)" v-model="selectedTime"  class="bg-gray-200 rounded-md ml-1">
                <option  v-for="option in timeFrame" :key="option.id" :value="option.title">
                    {{option.title}}
                </option>
            </select>
      </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
export default {
data() {
    return {
        selectedTime: '3 часа',
    }
},
methods: {
    ...mapActions(['A_ENTITY_REQUEST']),
    changeTimeFrame(selectedTime) {
        let chosen = this.timeFrame.find(e=> {
            return e.title == selectedTime;
        })
        this.CHOOSE_TIMEFRAME(chosen);
        this.A_ENTITY_REQUEST();
    },
     ...mapMutations(['CHOOSE_TIMEFRAME']),
},
computed: {
    ...mapState(['timeFrame', 'chosenTimeFrame']), 
    }
}
</script>