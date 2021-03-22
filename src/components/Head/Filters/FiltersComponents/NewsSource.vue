<template>
  <div id="new-source">
   <div class="flex">
      <h1>Источник:</h1>
      <select @change="changeSource(selectedSource.name)"  v-model="selectedSource.name" class="bg-gray-200 rounded-md ml-1">
        <option v-for="option in source" :key="option.id" :value="option.name">
          {{option.name}}
        </option>
      </select>
    </div>
   </div>
</template>

<script>
import {mapState, mapMutations, mapActions} from 'vuex'
export default {
data () {
  return {
    selectedSource: {name:'Все'},
  }
},
methods: {
  ...mapActions(['A_ENTITY_REQUEST']),
  ...mapMutations(['CHOOSE_SOURCE']),
    changeSource(value) {
        let chosen = this.source.find(e=> {
            return e.name == value;
        })
        this.CHOOSE_SOURCE(chosen);
        this.A_ENTITY_REQUEST();
    },
     
},
computed: {
...mapState(['source','chosenSource']),
// newsSource() {
//   let sur = this.source.push({name:'Все',id:2});
//   return sur;
// }
}
}
</script>