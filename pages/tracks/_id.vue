<template>
  <v-container fluid>
    <v-row>
      <v-col cols="0" lg="4" md="3"/>
      <v-col cols="12" lg="4" md="6">
        <v-row v-if="!loading && !track">
          <v-col class="text-center">
            <h3 class="display-6">I'm sorry, but I can't find the track that you are looking for. You can turn back to the <NuxtLink to="/tracks/">tracks list</NuxtLink> and see if that exits.</h3>
          </v-col>
        </v-row>
        <v-row v-if="loading">
          <v-col>
            <v-row>
              <v-col>
                <v-skeleton-loader style="width: 100%" type="image"></v-skeleton-loader>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-skeleton-loader
                  class="mx-auto"
                  type="article, actions"
                ></v-skeleton-loader>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row v-if="track">
          <v-col>
            <v-row>
              <v-col cols="12">
                <v-img :src="track.image" contain></v-img>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <h1 class="text-h3">{{ track.name }}</h1>
              </v-col>
            </v-row>
            <v-row class="mt-0">
              <v-col>
                <v-rating v-model="track.rating" background-color="orange lighten-3" color="orange" dense length="10"
                          readonly
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-card class="pa-4">
                  <v-row>
                    <v-col cols="12" md="6">
                      <v-list>
                        <v-list-item>
                          <strong>Location</strong><v-spacer/>{{ `${track.location}, ${track.nation.name}` }}
                        </v-list-item>
                        <v-divider/>
                        <v-list-item>
                          <strong>Construction Year</strong><v-spacer/>{{ track.year }}
                        </v-list-item>
                        <v-divider/>
                      </v-list>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-list>
                        <v-list-item>
                          <strong>Author</strong><v-spacer/>
                          <a :href="track.author.link" rel="noopener" target="_blank">{{ track.author.name }}</a>
                        </v-list-item>
                        <v-divider/>
                        <v-list-item>
                          <strong>Mod Version</strong><v-spacer/>{{ track.version }}
                        </v-list-item>
                        <v-divider/>
                      </v-list>
                    </v-col>
                  </v-row>
                </v-card>
              </v-col>
            </v-row>
            <v-row class="mt-6">
              <v-col>
                <h2 class="text-h4">Layouts</h2>
              </v-col>
            </v-row>
            <v-row class="mt-1">
              <v-col>
                <v-card v-for="layout in track.layouts" :key="layout.name" class="pa-4 mb-2">
                  <v-row>
                    <v-col cols="12" md="4"><strong>Name</strong> {{ layout.name }}</v-col>
                    <v-col cols="12" md="4"><strong>Length</strong> {{ layout.lengthM }}m</v-col>
                    <v-col cols="12" md="4"><strong>Type</strong> {{ layout.category }}</v-col>
                  </v-row>
                </v-card>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-btn color="primary" block :href="track.downloadLink" rel="noopener" target="_blank">Download</v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="0" lg="4" md="3"/>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'TrackDetail',
  data () {
    return {
      id: this.$route.params.id,
      title : "Assetto Corsa Mod Repository",
      ogTitle : "AC Mod Repository",
      ogDescription : "A user friendly website where you can download a large selection of quality cars and tracks for Assetto Corsa.",
      ogImage : "https://i.imgur.com/tUa6yJt.png",
    }
  },
  head() {
    return {
      title: this.title,
      meta: [
        {
          hid : "og:title",
          name : "og:title",
          content : this.ogTitle,
        },
        {
          hid:"og:url",name:"og:url",content :`https://www.acmodrepository.com/tracks/${this.id}`
        },
        {
          hid:"og:image",name:"og:image",content : this.ogImage
        },
        {
          hid:"og:image:alt",name:"og:image:alt",content :"track"
        },
      ]
    }
  },
  computed: {
    track () {
      return this.$store.getters['track/getTrackByName'](this.id)
    },
    loading () {
      return this.$store.getters['track/loadingTracks']
    }
  },
  watch:{
    track(){
      if(this.track){
        this.ogTitle = this.track.name
        this.ogImage = this.track.image
        this.title = this.track.name
      }
    }
  },
  mounted () {
    this.$store.dispatch('track/getAllTracks')
  }
}
</script>

<style scoped>

</style>
