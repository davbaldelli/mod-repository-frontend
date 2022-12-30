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
            <server-edit-card :server="server" :get-track="getServerTrack" :get-cars="getServerCars" @delete-click="onDelete(server)"></server-edit-card>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="0" lg="4" md="3" class="d-none d-md-block"/>
    </v-row>
    <v-dialog v-model="confirm" max-width="290" v-on:keydown.enter="confirmed">
      <v-card>
        <v-card-title class="text-h5">
          Are you sure you want to submit?
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="confirm = false">No</v-btn>
          <v-btn color="blue darken-1" text @click="confirmed">Yes</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
  data(){
    return {
      confirm : false,
      pendingServer : ''
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
      if (server.cars) {
        server.cars.forEach(carId => carMods.push(this.$store.getters['car/getCarById'](carId)))
      }
      return carMods
    },
    getServerTrack(server){
      return this.$store.getters['track/getTrackById'](server.track)
    },
    onDelete(server){
      this.pendingServer = server
      this.confirm = true
    },
    confirmed(){
      this.$store.dispatch('server/deleteServer', this.pendingServer)
      this.confirm = false
    }
  }
}
</script>

<style scoped>

</style>
