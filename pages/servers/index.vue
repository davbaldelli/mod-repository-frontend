<template>
  <v-container fluid>
    <v-row>
      <v-col cols="0" xl="3" lg="2" md="1" class="d-none d-md-block"/>
      <v-col cols="12" xl="6" lg="8" md="10">
        <v-row>
          <v-col>
            <v-row class="my-3">
              <v-col class="text-center" cols="12">
                <h1 class="text-h2 mb-3">Repository Servers</h1>
                <h2 class="text-h5"><em>Powered by <a href="https://discord.com/invite/uZ5mAJRpv2" rel="noopener" target="_blank">FSR</a></em></h2>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row v-if="!loading">
          <v-col v-for="(server, index) in servers" :key="index" cols="12">
            <server-card :get-cars="getServerCars" :get-track="getServerTrack" :server="server"/>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Servers',
  head() {
    return {
      title : "Repository Servers"
    }
  },
  computed: {
    servers(){
      return this.$store.getters['server/servers'].filter(server => server.online)
    },
    loading(){
      return this.$store.getters['server/loadingServers']
        || this.$store.getters["car/loadingCars"]
        || this.$store.getters["track/loadingTracks"]
    }
  },
  mounted () {
    this.initiate()
  },
  methods: {
    initiate(){
      this.$store.dispatch('server/getAll')
      this.$store.dispatch('car/getAll')
      this.$store.dispatch('track/getAllTracks')
    },
    getServerCars(server){
      let carMods = []
      if(server.cars) {
        server.cars.forEach(carId => carMods.push(this.$store.getters['car/getCarById'](carId)))
      }
      return carMods
    },
    getServerTrack(server){
      return this.$store.getters['track/getTrackById'](server.track)
    }
  }

}
</script>

<style scoped>

</style>
