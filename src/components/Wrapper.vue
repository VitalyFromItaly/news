<template>
  <div id="wrapper" class="subpixel-antialiased" >
       <Header />
       <div class="px-5">
          <Filters />
          <Body class="flex-grow" />
       </div>
  </div>
</template>

<script>
import Body from './Body/Body'
import Header from './Head/Header'
import Filters from './Head/Filters/Filters'
import {mapState} from 'vuex'
export default {
components: {
  Header, Filters, Body
},
computed: {
...mapState(['defaultDataLoaded'])
}
}
</script>
