<template>
<v-container fluid>
  <v-row>
    <v-col cols="0" lg="3" md="2" class="d-none d-md-block"/>
    <v-col cols="12" lg="6" md="8">
      <v-row class="my-3">
        <v-col class="text-center" cols="12">
          <h1 class="text-h2 mb-3">Cars Repository</h1>
          <h2 class="text-h5"><em>A collection of quality cars</em></h2>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field v-model="nameFilter" append-icon="mdi-magnify" clearable label="Type Brand Name"
                        outlined
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <NuxtLink to="/cars/all/">See all cars</NuxtLink>
        </v-col>
      </v-row>
      <v-row v-if="loading">
        <v-col v-for="i in 12" :key="i" cols="12" sm="6" xl="4">
          <v-skeleton-loader height="250px" type="card"></v-skeleton-loader>
        </v-col>
      </v-row>
      <v-row v-else>
        <v-col v-for="(brand, id) in brands" :key="id" cols="12" sm="6" xl="4">
          <brand-card :brand="brand"/>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="0" lg="3" md="2" class="d-none d-md-block"/>
  </v-row>
</v-container>
</template>

<script>
export default {
  name: 'BrandList',
  head(){
    return{
      title : "Cars Repository"
    }
  },
  data(){
    return {
      nameFilter : "",
    }
  },
  computed : {
    brands(){
      return this.$store.getters['car/brands'].filter(this.selector)
    },
    loading(){
      return this.$store.getters['car/loadingBrands'] && this.$store.getters['car/brands'].length === 0
    },
    selector () {
      return brand => this.nameFilter ? brand.name.toLowerCase().includes(this.nameFilter.toLowerCase()) : true
    },
    loggedIn () {
      return this.$store.getters['authentication/loggedIn']
    },
  },
  watch : {
    loggedIn () {
      if (this.loggedIn) {
        this.initiate()
      }
    }
  },
  mounted () {
    this.initiate()
  },
  methods : {
    initiate(){
      this.$store.dispatch('car/getCarBrands')
    }
  }
}
</script>

<style scoped>

</style>
