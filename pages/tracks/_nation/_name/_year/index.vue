<template>
  <v-container fluid>
    <v-row>
      <v-col cols="0" xl="4" lg="3" md="1"/>
      <v-col cols="12" xl="4" lg="6" md="10">
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
        <v-row v-else-if="loading">
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
  async asyncData ({params}) {
    return {
      nation : params.nation,
      name : params.name,
      year : params.year
    }
  },
  head() {
    return {
      title: this.name,
    }
  },
  computed: {
    breadCrumbs () {
      return this.track ? [
        {
          text: 'Tracks',
          disabled: false,
          exact: true,
          to: '/tracks/',
        },
        {
          text: this.nation,
          disabled: false,
          exact: true,
          to: `/tracks/${this.nation}`,
        },
        {
          text: this.name,
          disabled: true,
          exact: true,
        },
        {
          text: this.year,
          disabled: true,
          exact: true,
          to: `/tracks/${this.year}/`,
        },
      ] : []
    },
    track () {
      return this.$store.getters['track/track'](this.name, this.year)
    },
    loading () {
      return this.$store.getters['track/loadingTracks']
    },
  },
  mounted() {
    this.$store.dispatch('track/getAllTracks')
  },
}
</script>

<style scoped>

</style>
