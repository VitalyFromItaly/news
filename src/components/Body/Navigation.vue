<template>
  <div id="nav">
    <ul class="flex">
      <li
        v-for="tab in tabs"
        :key="tab.id"
        @click="selectTab(tab)"
        class=" mx-0.5  border-2  px-1 rounded-md hover:bg-green-300 hover:border-green-400 hover:text-green-900 cursor-pointer"
        :class="[tab.isActive ? 'text-green-900 bg-green-300 border-green-400' : 'text-blue-900 bg-blue-300 border-blue-400']"
      >
        <router-link :to="{path:tab.name}">
          {{ tab.caption }}
        </router-link>
        <!-- <router-view></router-view>  -->
      </li>
    </ul>
  </div>
</template>
<script>
import { mapActions, mapMutations, mapState } from "vuex";
export default {
  methods: {
    ...mapActions(['ACTION_CHOSEN_TAB','A_ENTITY_REQUEST']),
    ...mapMutations(['SET_TAB','SHOW_TABLE']),
      setTab() {
        let pathName = this.$route.name;
        let tab = this.tabs.find(e => {
            return e.name == pathName;
        })
      this.SET_TAB(tab);
    },

    selectTab(tab) {
      this.SHOW_TABLE(false);
      this.SET_TAB(tab);
      this.A_ENTITY_REQUEST();
      
    },
  },
  computed: {
    ...mapState(["tabs"]),
    routes() {
        return this.$router.options.routes;
    }
  },
};
</script>
