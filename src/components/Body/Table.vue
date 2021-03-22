<template>
  <div id="table" class="mb-10 lg:mb-10" v-show="showTable">
    <table class=" lg:w-full border-separate border">
      <thead>
        <tr>
          <th class="text-center border px-2">Объект</th>
          <th class="text-center border px-2">Ситуации</th>
          <th class="text-center border px-2">Комментарии</th>
          <th class="text-center border px-2">Кол-во</th>
        </tr>
      </thead>
      <tbody>
        <tr
          @click="getNews(att)"
          v-for="att in chosenAttributes"
          :key="att.id"
          class="hover:bg-green-200 cursor-pointer"
        >
          <td class="text-center border px-3">{{ att.name }}</td>
          <td class="text-center border px-3" v-if='entity'>
            {{ entity[0].attribute_name }}
          </td>
          <td class="text-center border px-3"></td>
          <td class="text-center border px-3">{{ att.count }}</td>
        </tr>
      </tbody>
    </table>
    <div v-if="showDescription" class="mt-20">
      <div v-for="news in newsDescription" :key="news.index" class="my-2">
        <div class="my-2 bg-gray-100 p-4 rounded-lg space-y-1">
          <p class="text-left text-gray-700 font-semibold uppercase text-xl">{{ news.document_title }}</p>
          <p class="text-gray-600">{{date}}</p>
          <p class="text-blue-700 font-semibold">
            Ресурс: {{ news.source_name }}
          </p>
          <p v-html="news.text"></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import moment from 'moment'
export default {
  computed: {
    date() {
      return moment(this.newsDescription.document_dateSortable).format('DD.MM HH:mm');
    },
    ...mapState([
      "chosenAttributes",
      "showTable",
      "entity",
      "newsDescription",
      "showDescription",
    ]),
  },

};
</script>
