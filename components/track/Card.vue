<template>
  <v-card>
    <v-row no-gutters>
      <v-col cols="12" md="4">
        <v-img :src="getFavImage(track.images).url" height="220" alt="track thumbnail" class="ma-3 rounded"/>
      </v-col>
      <v-col cols="12" md="8" xl="8" class="d-flex flex-column">
        <v-card-title>
          <NuxtLink :to="`/tracks/${track.nation.name}/${track.name}/${track.year}`">
            <h3 class="text-h7">{{ track.name }}</h3>
          </NuxtLink>
          <v-spacer/>
          <v-rating v-model="track.rating/2" background-color="orange lighten-3"
                    class="pb-2" color="orange" dense half-increments readonly
          ></v-rating>
        </v-card-title>
        <v-card-subtitle>
          <v-chip v-for="tag in track.tags" :key="tag" @click="$emit('tag-click', tag)"
                  class="mr-1" label x-small
          >{{ tag }}
          </v-chip>
          <v-chip v-if="track.premium" class="mr-1" color="orange" label x-small>Paid</v-chip>
          <v-chip v-else color="green" label x-small>Free</v-chip>
        </v-card-subtitle>
        <v-card-text>
          <strong>Location: </strong>{{ track.location }}, {{ track.nation.name }},
          <strong>Year: </strong>{{track.year}}<br/>
          <strong>Author: </strong>
          <a v-if="track.author.link && track.author.link !== '#'"  :href="track.author.link" rel="noopener" target="_blank">{{ track.author.name }}</a>
          <span v-else>{{ track.author.name }}</span> v{{ track.version }}
        </v-card-text>
        <v-card-actions class="mt-auto pa-4">
          <v-spacer></v-spacer>
          <v-btn v-if="isAdmin" :to="`/admin/update/track/${track.id}`" color="orange">Edit</v-btn>
          <v-btn v-if="!track.premium || isPremium" :href="track.downloadLink" color="primary" rel="noopener" target="_blank">Download</v-btn>
          <v-btn v-else :href="track.source" color="orange" rel="noopener" target="_blank">Buy it here!</v-btn>
        </v-card-actions>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>

export default {
  name: 'TrackCard',
  props : ['track'],
  emits : ['tag-click'],
  computed : {
    isPremium() {
      return this.$store.getters['authentication/isPremium']
    },
    isAdmin() {
      return this.$store.getters['authentication/isAdmin']
    }
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
