<template>
  <div id="v-body" class="lg:flex lg:space-x-5">
      <div class="w-min" >
         <Navigation />
         <LeftViews />
      </div>
      <Table class="w-full" />
  </div>
</template>
<script>
import Navigation from './Navigation'
import LeftViews from './LeftViews'
import Table from './Table'
export default {
    components: {
        Table, Navigation, LeftViews
    },
    data() {
        return {

        }
    }
}
</script>

<style>

</style>