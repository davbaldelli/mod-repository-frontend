<template>
  <v-card>
    <v-card-title>{{server.name}}</v-card-title>
    <v-card-text>
      <strong v-if="!loadingTracks && !server.outsideTrack">{{track.name}}</strong>
      <strong v-else>{{server.outsideTrackName}}</strong><br>
      <span v-if="!loadingCars" v-for="(car, index) in cars" :key="index">
        <span v-if="index !==0">, </span>{{`${car.brand.name} ${car.modelName}`}}
      </span>
      <span v-if="server.outsideCars" v-for="(car, index) in server.outsideCars" :key="index">
        <span v-if="cars.length>0">, </span>{{car.name}}
      </span>
    </v-card-text>
    <v-card-actions>
      <v-btn :to="`/admin/update/server/${server.id}`" color="warning">Edit</v-btn>
      <v-btn color="error" @click="onDeleteClick">Delete</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'ServerEditCard',
  props : ['getCars', 'getTrack', 'server'],
  emits : ['delete-click'],
  computed : {
    cars(){
      return this.getCars(this.server)
    },
    track(){
      return this.getTrack(this.server)
    },
    loadingCars(){
      return this.$store.getters['car/loadingCars']
    },
    loadingTracks(){
      return this.$store.getters['track/loadingTracks']
    }
  },
  methods : {
    onDeleteClick(){
      this.$emit('delete-click')
    }
  }
}
</script>

<style scoped>

</style>
