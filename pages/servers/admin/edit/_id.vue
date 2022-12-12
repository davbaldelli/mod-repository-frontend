<template>
 <lazy-server-form v-if="initialValue" :initial-value="initialValue"></lazy-server-form>
</template>

<script>
export default {
  name: 'Edit Server',
  middleware : 'fsradmin',
  head(){
    return {
      title : "Edit Server"
    }
  },
  asyncData ({params}) {
    return {
      id : params.id
    }
  },
  computed : {
    server(){
      return this.$store.getters['server/getById'](this.id)
    },
    initialValue(){
      return this.server ? this.server : null
    }
  },
  mounted () {
    this.initiate()
  },
  methods:{
    initiate(){
      this.$store.dispatch('server/getAll')
      //this.$store.dispatch('car/getAll')
      //this.$store.dispatch('track/getAllTracks')
    },
  }
}
</script>

<style scoped>

</style>
