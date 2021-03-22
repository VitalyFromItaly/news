<template>
  <div id="app">
    <Wrapper />
  </div>
</template>
<script>
import { mapActions, mapMutations, mapState } from "vuex";
import Wrapper from "./components/Wrapper";
export default {
  components: {
    Wrapper,
  },
  methods: {
    setTab() {
        let pathName = this.$route.name;
        let tab = this.tabs.find(e => {
            return e.name == pathName;
        })
      this.SET_TAB(tab);
    },
    ...mapActions(["GET_TABS", "GET_SOURCE", "GET_TIMEFRAME",'A_ENTITY_REQUEST']),
    ...mapMutations(['SET_TAB'])
  },
  async created() {
    await this.GET_TABS();
    await this.GET_SOURCE();
    await this.GET_TIMEFRAME();
    this.setTab();
    this.A_ENTITY_REQUEST();

    // this.fetch()
  },
  computed: {
    ...mapState(["tabs"]),
  }
};
</script>
