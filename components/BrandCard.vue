<template>
  <v-card :class="`pa-5 ${light? 'light-grey' : ''}`" :to="`/cars/${brand.name}`">
    <v-img contain :src="brand.logo" height="200px" ></v-img>
    <v-card-title v-text="brand.name" class="justify-center" ></v-card-title>
  </v-card>
</template>

<script>
export default {
  name: 'BrandCard',
  props : ['brand'],
  computed : {
    light() {
      return !this.$vuetify.theme.dark
    }
  }
}
</script>

<style scoped>
  .light-grey{
    background-color : #F5F5F5;
  }
</style>
