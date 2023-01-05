<template>
  <v-container fluid>
    <v-row>
      <v-col cols="0" xl="3" lg="2" md="1" class="d-none d-md-block"/>
      <v-col cols="12" xl="6" lg="8" md="10">
        <v-row class="text-center">
          <v-col class="mt-5">
            <h1 class="text-h2 mb-3">Assetto Corsa Mod Repository</h1>
            <h2 class="text-h5"><em>Powered by <a href="https://discord.com/invite/uZ5mAJRpv2" rel="noopener"
                                                  target="_blank">Fuddigno Sim Racing Team</a></em></h2>
          </v-col>
        </v-row>
        <v-row class="my-3">
          <v-col>
            <v-img height="200px" src="/acmr-fsr.png" contain></v-img>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <h3>
              Latest
            </h3>
          </v-col>
        </v-row>
        <v-row class="text-left">
          <v-col v-for="(item,i) in latest" :key="i" cols="12">
            <car-card-horizontal v-if="!item.name" :car="item"></car-card-horizontal>
            <track-card v-else :track="item"></track-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import {carSort} from "@/_helpers";

export default {
  name: "Home",
  mounted() {
    this.init()
  },
  computed : {
    latest() {
      return this.cars.concat(this.tracks).sort(carSort.sortByDate())
    },
    cars(){
      return this.$store.getters["car/cars"]
    },
    tracks(){
      return this.$store.getters["track/tracks"]
    }
  },
  methods :{
    init(){
      this.$store.dispatch('car/getAll')
      this.$store.dispatch('track/getAllTracks')
    }
  }
}
</script>

<style scoped>

</style>
