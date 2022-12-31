<template>
  <v-card class="my-2">
    <v-card-title>
      {{server.name}}
    </v-card-title>
    <v-card-subtitle>
      {{server.description}}
    </v-card-subtitle>
    <v-card-text>
      <v-row no-gutters>
        <v-col cols="12">
          <h3>Cars on this server</h3>
        </v-col>
        <v-col cols="12">
          <v-list v-if="!loadingCars">
            <v-list-item
              v-for="(car, index) in cars" :key="index">
              <v-list-item-avatar>
                <v-img :src="getFavImage(car.images).url"/>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title v-html="`${car.brand.name} ${car.modelName}`"></v-list-item-title>
                <v-list-item-subtitle>
                  <a v-if="(!car.premium || isPremium) && !car.official" :href="car.downloadLink" rel="noopener" target="_blank">Download Here</a>
                  <a v-else-if="!car.official" :href="car.source" rel="noopener" target="_blank">Buy Here</a>
                  <span v-else>Official content</span>
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              v-for="(car, index) in server.outsideCars" :key="index">
              <v-list-item-avatar>
                <v-img src="https://i.imgur.com/h23Gi6Ot.jpg"/>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title v-html="car.name"></v-list-item-title>
                <v-list-item-subtitle>
                  <a :href="car.downloadLink" rel="noopener" target="_blank">Download Here</a>
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col cols="12">
          <h3>Track on this server</h3>
        </v-col>
        <v-col cols="12">
          <v-list v-if="!loadingTracks && !server.outsideTrack">
            <v-list-item>
              <v-list-item-avatar>
                <v-img :src="getFavImage(track.images).url"/>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title v-html="`${track.name}`"></v-list-item-title>
                <v-list-item-subtitle>
                  <a v-if="!track.official" :href="track.downloadLink" rel="noopener" target="_blank">Download Here</a>
                  <span v-else>Official content</span>
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <v-list v-else>
            <v-list-item>
              <v-list-item-avatar>
                <v-img src="https://i.imgur.com/9N7ClFu.png"/>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title v-html="`${server.outsideTrackName}`"></v-list-item-title>
                <v-list-item-subtitle>
                  <a :href="server.outsideTrackLink" rel="noopener" target="_blank">Download Here</a>
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-btn :href="server.joinLink" color="orange" block rel="noopener" target="_blank">Join</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'ServerCard',
  props : ['getCars', 'getTrack', 'server'],
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
    },
    isPremium(){
      return this.$store.getters['authentication/isPremium']
    },
  },
  methods : {
    getFavImage(images){
      return images.find(img => img.favorite)
    },
  }
}
</script>

<style scoped>

</style>
