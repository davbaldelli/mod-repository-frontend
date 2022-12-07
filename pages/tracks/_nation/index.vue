<template>
  <v-container fluid>
    <v-row>
      <v-col cols="0" lg="3" md="2" class="d-none d-md-block"/>
      <v-col cols="12" lg="6" md="8">
        <v-row>
          <v-col cols="12" v-for="(track, index) in tracks" :key="index">
            <TrackCard :track="track"/>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="0" lg="3" md="2"/>
    </v-row>
  </v-container>
</template>

<script>
import { tracksFilters } from '@/_helpers'

export default {
  name: 'NationTracks',
  asyncData ({ params }) {
    return {
      nation : params.nation
    }
  },
  head(){
    return{
      title : this.nation
    }
  },
  mounted () {
    this.initiate()
  },
  data(){
    return {
      breadcrumbs : []
    }
  },
  methods:{
    initiate(){
      this.$store.dispatch('track/getAllTracks')
    }
  },
  watch: {
    loggedIn () {
      if (this.loggedIn) {
        this.initiate()
      }
    }
  },
  computed:{
    tracks(){
      return tracksFilters.filterByNation(this.nation)(this.$store.getters['track/tracks'])
    },
    loggedIn () {
      return this.$store.getters['authentication/loggedIn']
    },
  }
}
</script>

<style scoped>

</style>
