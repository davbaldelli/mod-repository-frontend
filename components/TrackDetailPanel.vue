<template>
  <v-row>
    <v-col>
      <v-row>
        <v-col cols="12">
          <v-img :src="track.images[0].url" contain></v-img>
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
          <v-btn v-if="(!track.premium || isPremium) && !track.official"  block :href="track.downloadLink" color="primary" rel="noopener" target="_blank">Download</v-btn>
          <v-btn v-else-if="!track.official" block :href="track.source" color="orange" rel="noopener" target="_blank">Buy it here!</v-btn>
          <v-btn v-else disabled block>Official Content</v-btn>
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
                    <strong>Year</strong><v-spacer/>{{ track.year }}
                  </v-list-item>
                  <v-divider/>
                </v-list>
              </v-col>
              <v-col cols="12" md="6">
                <v-list>
                  <v-list-item>
                    <strong>Author</strong><v-spacer/>
                    <a  v-if="track.author.link && track.author.link !== '#'" :href="track.author.link" rel="noopener" target="_blank">{{ track.author.name }}</a>
                    <span v-else>{{ track.author.name }}</span>
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
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "TrackDetailPanel",
  props: ["track"],
  computed:{
    isPremium(){
      return this.$store.getters['authentication/isPremium']
    },
  }
}
</script>

<style scoped>

</style>
