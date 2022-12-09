<template>
  <v-container fluid>
    <v-row>
      <v-col cols="0" lg="3" md="2" class="d-none d-md-block"/>
      <v-col cols="12" lg="6" md="8">
        <v-row class="my-3">
          <v-col class="text-center" cols="12">
            <h1 class="text-h2 mb-3">Tracks Repository</h1>
            <h2 class="text-h5"><em>A collection of quality tracks</em></h2>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field v-model="nameFilter" append-icon="mdi-magnify" clearable label="Type Nation Name" outlined/>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <NuxtLink to="/tracks/all">See all tracks</NuxtLink>
          </v-col>
        </v-row>
        <v-row>
          <v-col v-for="(nation, id) in nations" :key="id" cols="12" sm="6" xl="4">
            <nation-card :nation="nation"></nation-card>
          </v-col>
        </v-row>
        <v-row v-if="loading">
          <v-col v-for="i in 12" :key="i" cols="12" sm="6" xl="4">
            <v-skeleton-loader height="250px" type="card"></v-skeleton-loader>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="0" lg="3" md="2"/>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'TrackNations',
  head() {
    return{
      title : "Tracks Repository"
    }
  },
  mounted () {
    this.initiate()
  },
  data() {
    return {
      nameFilter : '',
      selector : nation => this.nameFilter ? nation.name.toLowerCase().includes(this.nameFilter.toLowerCase()) : true
    }
  },
  computed :{
    nations(){
      return this.$store.getters['track/nations'].filter(this.selector)
    },
    loading(){
      return this.$store.getters['track/loadingNations'] && this.$store.getters['track/nations'].length === 0
    },
    loggedIn () {
      return this.$store.getters['authentication/loggedIn']
    },
  },
  methods:{
    initiate() {
      this.$store.dispatch('track/getAllNations')
    }
  },
  watch: {
    loggedIn () {
      if (this.loggedIn) {
        this.initiate()
      }
    },
  }
}
</script>

<style scoped>

</style>
