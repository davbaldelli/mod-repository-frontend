<template>
  <v-container>
    <v-row>
      <v-col cols="0" lg="4" md="3" class="d-none d-md-block"/>
      <v-col cols="12" lg="4" md="6">
        <v-row class="my-3">
          <v-col class="text-center" cols="12">
            <h1 class="text-h2 mb-3">Edit Servers</h1>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-btn color="success" to="/servers/admin/new" block>Add Server</v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col v-for="(server, index) in servers" :key="index" cols="12">
            <server-edit-card :server="server" :get-track="getServerTrack" :get-cars="getServerCars"></server-edit-card>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="0" lg="4" md="3" class="d-none d-md-block"/>
    </v-row>
  </v-container>
</template>

<script>

export default {
  name: 'ServerAdminPage',
  middleware : 'fsradmin',
  head() {
    return {
      title : "Edit Servers"
    }
  },
  computed: {
    servers(){
      return this.$store.getters['server/servers']
    },
    loadingServers(){
      return this.$store.getters['server/loadingServers']
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
      server.cars.forEach(carId => carMods.push(this.$store.getters['car/getCarById'](carId)))
      return carMods
    },
    getServerTrack(server){
      return this.$store.getters['track/getTrackByName'](server.track)
    }
  }
}
</script>

<style scoped>

</style>
