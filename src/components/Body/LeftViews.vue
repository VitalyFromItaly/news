<template>
  <div id="short-view" class="border-2 mt-10">
    <div>
      <LeftViewExpand 
        v-for="item in entity" :key="item.id" :item="item"
      />
    </div>
  </div>
</template>
<script>
import LeftViewExpand from './LeftViewExpand'
import { mapState } from "vuex";
export default {
  components: {
    LeftViewExpand
  },
    data() {
        return {
        }
    },
  computed: {
    ...mapState(["entity"]),
  },
};
</script>
