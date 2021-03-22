<template>
  <div id="nav" class="flex items-center space-x-5">
      <Timeframe />
      <NewsSource />
  </div>
</template>
<script>
import Timeframe from './FiltersComponents/Timeframe'
import NewsSource from './FiltersComponents/NewsSource'
export default {
components: {
    Timeframe, NewsSource
  }
}
</script>