<template>
  <div>
    <ul>
      <li class="py-1">
        <button
          v-if="!openAttributes"
          @click.prevent="getAttributes(item)"
          class="text-xl hover:bg-gray-400 px-1 rounded-md font-bold"
        >
          +
        </button>
        <button
          @click.prevent="openAttributes = !openAttributes"
          v-else
          class="text-xl hover:bg-gray-400 px-1 rounded-md font-bold"
        >
          -
        </button>
        <span @click.prevent="showAtttributesInTable(item)" class=" cursor-pointer" :class="[openAttributes ? 'font-bold': '']">
            {{ item.attribute_name }}
            <sup v-if="item.count > 1">({{ item.count }})</sup>
        </span>
      </li>
      <div v-if="openAttributes">
        <Atribute 
          :attribute="attribute" :item="item"
          v-for="attribute in attributes"
          :key="attribute.name_id"
        />
      </div>
    </ul>
  </div>
</template>
<script>
import { mapMutations, mapState } from "vuex";
import axios from "axios";
import Atribute from "./Atribute";
export default {
  props: ["item"],
  data() {
    return {
      openAttributes: false,
      attributes: null,
    };
  },
  components: {
    Atribute,
  },
  methods: {
    ...mapMutations(["SAVE_ATTRIBUTES_IN_STORE",'SHOW_TABLE']),
    showAtttributesInTable(value) {
        if (this.attributes !== null) {
            this.SAVE_ATTRIBUTES_IN_STORE(this.attributes);
            this.SHOW_TABLE(true);
        } else {
            this.requestAttributes(value);
            this.SHOW_TABLE(true);
            }
        },
    getAttributes(value) {
        if (this.attributes == null) {
            this.requestAttributes(value);
        } else {
            this.openAttributes = !this.openAttributes
        }
    },
  async requestAttributes(value) {
        axios.get(this.url+ 'Attribute', {
              headers: this.header,
              params: {
                attribute_id: value.attribute_id,
                name_id: value.name_id,
                source_id: this.chosenSource.id,
                time_frame_id: this.chosenTimeFrame.timeFrame,
              },
            }).then(res => {
                this.attributes = res.data;
                this.openAttributes = !this.openAttributes;
            }).then(()=> {
                this.SAVE_ATTRIBUTES_IN_STORE(this.attributes);
            })
            .catch(err => {
                console.log(err);
            })
    }
  },
  computed: {
    ...mapState(["attributesLoaded", "url", "header",'chosenSource','chosenTimeFrame']),
  },
};
</script>
