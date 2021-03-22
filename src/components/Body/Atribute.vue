<template>
  <div>
      <li class="ml-8">
        <button class="text-gray-500 font-bold hover:text-blue-500" 
        @click.prevent="getNewsDescription({attribute, item})">
          - {{attribute.name}} <sup v-if="attribute.count > 1">({{ attribute.count }})</sup>
        </button>
      </li>
  </div>
</template>
<script>
import { mapActions} from 'vuex'
export default {
props:['attribute','item'],
methods: {
  ...mapActions(['GET_NEWS_DESCRIPTION']),
  getNewsDescription(value) {
    let attributeId = value.item.attribute_id;
    let nameId = value.attribute.id
    this.GET_NEWS_DESCRIPTION({attributeId, nameId});
  }
}
}
</script>