import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    url: "https://addr.rco.ru/fxweb/api/",
    header: { "Content-Type": "application/x-www-form-urlencoded" },
    timeFrame: null,
    chosenTimeFrame: null,
    tabs: null,
    chosenTab: null,
    source: null,
    chosenSource: "Все",
    defaultDataLoaded: false,
    entity: null,
    entityAttributeId:null,
    attributes: null,
    chosenAttributes: null,
    attributesLoaded:false,
    showTable: false,
    newsDescription:null,
    showDescription: false
  },
  getters: {},
  mutations: {
    SHOW_TABLE(state,value) {
      state.showTable = value;
    },
    SAVE_ATTRIBUTES_IN_STORE(state, value) {
      state.chosenAttributes = value
    },
    DEFINE_ENTITY_ID(state, value) {
      state.entityAttributeId = value;
    },
    CHOOSE_TIMEFRAME(state, value) {
      state.chosenTimeFrame = value;
    },
    CHOOSE_SOURCE(state, value) {
      state.chosenSource = value;
    },
    // CHOSEN_TAB(state, value) {
    //   state.tabs.forEach((e) => {
    //     e.isActive = false;
    //   });
    //   value.isActive = true;
    //   state.chosenTab = value;
    // },
    SET_DEFAULT_TIMEFRAME(state, value) {
      state.timeFrame = value.slice(0,6);
      state.chosenTimeFrame = state.timeFrame.find((item) => {
        return item.title == "3 часа";
      });
    },
    SET_DEFAULT_TABS(state, value) {
      state.tabs = value.map((v) => ({ ...v, isActive: false }));
      state.chosenTab = state.tabs.find((e) => {
        return (e.name = "Facts");
      });
      state.tabs.forEach((e) => {
        e.isActive = false;
      });
      state.chosenTab.isActive = true; 
    },
    SET_DEFAULT_SOURCE(state, value) {
      state.source = value;
      state.source.unshift({ name: "Все", id: "all" });
    },
    SAVE_ENTITY(state, value) {
      state.entity = value;
    },
    RESET_ENTITY(state) {
      state.entity = null
    },
    SAVE_ATTRIBUTES(state, value) {
      state.attributes = value;
      state.attributesLoaded = true;
    },
    SET_TAB(state,value) {
      state.chosenTab = value;
      state.tabs.forEach((e) => {
        e.isActive = false;
      });
      state.chosenTab.isActive = true;
      state.showDescription = false;
      state.newsDescription = null;
    },
    SAVE_NEWS_DESCRIPTION(state, payload) {
      let length = state.chosenAttributes.find(e=> {
        return e.id == payload.id
      })
      state.newsDescription = payload.data.slice(0, length.count);
      state.showDescription = true;
    }
  },
  actions: {
    async  GET_NEWS_DESCRIPTION ({commit,state},value ) {
      let res = await axios.get(state.url + 'Sentence', {
        headers:state.header,
        params: {
          attribute_id: value.attributeId,
          name_id : value.nameId,
          source_id: state.chosenSource.id,
          time_frame: state.chosenTimeFrame.timeFrame,
        }
      });
      commit('SAVE_NEWS_DESCRIPTION',{data:res.data, id:value.nameId});
    },
    async GET_TABS({commit, state}) {
      let response = await axios.get(state.url + 'Tab', {headers: state.header});
      commit('SET_DEFAULT_TABS', response.data);
    },
    async GET_TIMEFRAME({commit,state}) {
      let res = await axios.get(state.url + 'TimeFrame', {headers:state.header});
      commit('SET_DEFAULT_TIMEFRAME',res.data);
    },
   async GET_SOURCE({commit,state}) {
      let res = await axios.get(state.url + 'Source', {headers:state.header});
      commit('SET_DEFAULT_SOURCE',res.data);
    },
    A_ENTITY_REQUEST({commit,state}) {
      commit('RESET_ENTITY');
        axios.get(state.url + "Entity", {
            header: state.header,
            params: {
              tab_id: state.chosenTab.id,
              source_id: state.chosenSource.id,
              time_frame: state.chosenTimeFrame.timeFrame,
            },
          }).then((res) => {
            if(res.status == 200) {
              commit('SAVE_ENTITY',res.data);
            }
          }).catch((err) => {
            console.log(err);
          });
    },
  },
});