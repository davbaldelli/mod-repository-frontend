<template>
  <v-container fluid>
    <v-row>
      <v-col cols="0" lg="3" md="2" class="d-none d-md-block"/>
      <v-col cols="12" lg="6" md="8">
        <v-row>
          <v-col>
            <v-breadcrumbs :items="breadCrumbs" class="px-0"></v-breadcrumbs>
          </v-col>
        </v-row>
        <v-row class="my-3">
          <v-col class="text-center" cols="12">
            <v-img v-if="nation" height="120px" :src="`https://flagcdn.com/h120/${nation.code}.png`" contain class="mb-3"></v-img>
            <h1 class="text-h2 mb-3">{{nationName}}</h1>
          </v-col>
        </v-row>
        <v-row v-if="this.totPaginatorPages" class="px-3 my-3">
          <v-col>
            <v-pagination v-model="offset" :length="totPaginatorPages"/>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" v-for="(track, index) in pageTracks" :key="index">
            <TrackCard :track="track"/>
          </v-col>
        </v-row>
        <v-row v-for="i in 20" v-if="loading" :key="i" class="mb-2">
          <v-col>
            <track-card-skeleton/>
          </v-col>
        </v-row>
        <v-row v-if="this.totPaginatorPages" class="px-3 my-3">
          <v-col>
            <v-pagination v-model="offset" :length="totPaginatorPages" @input="scrollToTop"/>
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
      breadCrumbs : [
        {
          text: 'Tracks',
          disabled : false,
          exact : true,
          to: '/tracks/',
        },
        {
          text: params.nation,
          disabled : true,
          exact : true,
          to: `/tracks/${params.nation}`,
        }
      ],
      nationName : params.nation
    }
  },
  head(){
    return{
      title : this.nationName
    }
  },
  mounted () {
    this.initiate()
  },
  data(){
    return {
      offset : 1,
      tracksPerPage : 20,
    }
  },
  computed:{
    tracks(){
      return tracksFilters.filterByNation(this.nationName)(this.$store.getters['track/tracks'])
    },
    pageTracks(){
      return this.tracks.slice((this.offset - 1) * this.tracksPerPage, ((this.offset - 1) * this.tracksPerPage) + this.tracksPerPage)
    },
    loggedIn () {
      return this.$store.getters['authentication/loggedIn']
    },
    loading(){
      return this.$store.getters['track/loadingTracks'] && this.tracks.length === 0
    },
    nation(){
      return this.$store.getters['track/nations'].find(n => n.name.toLowerCase() === this.nationName.toLowerCase())
    },
    totPaginatorPages(){
      if (this.tracks) {
        return Math.ceil(this.tracks.length / this.tracksPerPage)
      } else {
        return 0
      }
    }
  },
  methods:{
    initiate(){
      this.$store.dispatch('track/getAllTracks')
      this.$store.dispatch('track/getAllNations')
    },
    scrollToTop(){
      window.scrollTo(0,0)
    },
  },
  watch: {
    loggedIn () {
      if (this.loggedIn) {
        this.initiate()
      }
    }
  },
}
</script>

<style scoped>

</style>
