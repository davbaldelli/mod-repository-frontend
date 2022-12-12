<template>
 <lazy-server-form v-if="initialValue" :initial-value="initialValue" @submit="onSubmit"></lazy-server-form>
</template>

<script>
export default {
  name: 'EditServer',
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
    },
    onSubmit(server){
      this.$store.dispatch('server/updateServer', server).then(() =>
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
