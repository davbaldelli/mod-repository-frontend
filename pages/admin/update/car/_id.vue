<template>
  <lazy-car-form v-if="initialValue" :initial-value="initialValue" @submit="onSubmit"/>
</template>

<script>
export default {
  name: 'CarEdit',
  middleware: 'admin',
  head() {
    return {
      title : "Edit Car"
    }
  },
  data () {
    return {
      id: this.$route.params.id
    }
  },
  computed: {
    initialValue () {
      return this.car ? {...this.car} : null
    },
    car () {
      return this.$store.getters['car/getCarById'](this.id)
    },
    loading () {
      return this.$store.getters['car/loadingCars']
    }
  },
  mounted () {
    this.$store.dispatch('car/getAll')
  },
  methods: {
    onSubmit (track) {
      this.$store.dispatch('car/updateCar', track).then(() =>
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
