<template>
  <v-card>
    <v-row no-gutters>
      <v-col cols="12" md="5" xl="4">
        <div class="h-100">
          <v-img :src="track.image" alt="track thumbnail" class="ma-3 rounded" contain/>
        </div>
      </v-col>
      <v-col cols="12" md="7" xl="8" class="d-flex flex-column">
        <v-card-title>
          <NuxtLink :to="`/tracks/${track.id}`">
            <h3 class="text-h7">{{ track.name }}</h3>
          </NuxtLink>
          <v-spacer/>
          <v-rating v-model="track.rating/2" background-color="orange lighten-3"
                    class="pb-2" color="orange" dense half-increments readonly
          ></v-rating>
        </v-card-title>
        <v-card-subtitle>
          <v-chip v-for="tag in track.tags" :key="tag"
                  class="mr-1" label x-small
          >{{ tag }}
          </v-chip>
          <v-chip v-if="track.premium" class="mr-1" color="orange" label x-small>Paid</v-chip>

        </v-card-subtitle>
        <v-card-text>
          <strong>Location: </strong>{{ track.location }}, {{ track.nation.name }},
          <strong>Year: </strong>{{track.year}}<br/>
          <strong>Author: </strong>
          <a :href="track.author.link" rel="noopener" target="_blank">
            {{ track.author.name }}
          </a> v{{ track.version }}

        </v-card-text>
        <v-card-actions class="mt-auto pa-4">
          <v-spacer></v-spacer>
          <v-btn v-if="isAdmin" :to="`/tracks/edit/${track.id}`" color="orange">Edit</v-btn>
          <v-btn :href="track.downloadLink" :color="!track.premium || isPremium ? 'primary' : 'orange'" rel="noopener" target="_blank">{{!track.premium || isPremium ? "Download" : "Buy it here!"}}</v-btn>
        </v-card-actions>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>

import {rolesRules} from '@/_helpers/roles-rules'

export default {
  name: 'TrackCard',
  props : ['track', 'userRole'],
  computed : {
    isPremium() {
      return rolesRules.isPremium(this.userRole)
    },
    isAdmin() {
      return rolesRules.isAdmin(this.userRole)
    },
  }
}
</script>

<style scoped>

</style>
