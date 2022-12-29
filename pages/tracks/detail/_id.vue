<template>
  <v-container fluid>
    <v-row>
      <v-col cols="0" lg="4" md="3"/>
      <v-col cols="12" lg="4" md="6">
        <v-row>
          <v-col>
            <v-breadcrumbs :items="breadCrumbs" class="px-0"></v-breadcrumbs>
          </v-col>
        </v-row>
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
        <client-only v-else>
          <track-detail-panel :track="track"/>
        </client-only>
      </v-col>
      <v-col cols="0" lg="4" md="3"/>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'TrackDetail',
  async asyncData ({ params,store, redirect}) {
    await store.dispatch('track/getAllTracks')
      .catch(error => {
        if (error && error.status === 401) {
          redirect(401, '/login')
        }
      })
    return {
      track : store.getters['track/getTrackByName'](params.id)
    }
  },
  head() {
    return {
      title: this.track.name,
    }
  },
  computed: {
    breadCrumbs () {
      return [
        {
          text: 'Tracks',
          disabled: false,
          exact: true,
          to: '/tracks/',
        },
        {
          text: this.track.nation.name,
          disabled: false,
          exact: true,
          to: `/tracks/${this.track.nation.name}`,
        },
        {
          text: this.track.name,
          disabled: true,
          exact: true,
        },
        {
          text: this.track.year,
          disabled: true,
          exact: true,
          to: `/tracks/${this.track.id}/`,
        },
      ]
    },
    loading () {
      return this.$store.getters['track/loadingTracks']
    }
  },
  methods :{

  }
}
</script>

<style scoped>

</style>
