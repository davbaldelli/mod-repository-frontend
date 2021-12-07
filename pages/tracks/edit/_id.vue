<template>
  <LazyTrackForm v-if="initialValue" :initial-value="initialValue" @submit="onSubmit"/>
</template>

<script>

export default {
  name: 'TrackEdit',
  middleware: 'admin',
  data () {
    return {
      id: this.$route.params.id
    }
  },
  computed: {
    initialValue () {
      return this.track ? JSON.parse(JSON.stringify(this.track)) : null
    },
    track () {
      return this.$store.getters['track/getTrackByName'](this.id)
    },
    loading () {
      return this.$store.getters['track/loadingTracks']
    }
  },
  mounted () {
    this.$store.dispatch('track/getAllTracks')
  },
  methods: {
    onSubmit (track) {
      this.$store.dispatch('track/updateTrack', track).then(() =>
        this.$router.back()
      ).catch(e => {
        window.alert(e)
      })
    }
  }
}
</script>

<style scoped>

</style>
