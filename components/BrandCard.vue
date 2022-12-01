<template>
  <v-card class="pa-5" :to="`/cars/${brand.name}/`">
    <v-img contain :src="brand.logo" height="200px" ></v-img>
    <v-card-title v-text="brand.name" class="justify-center"></v-card-title>
  </v-card>
</template>

<script>
export default {
  name: 'BrandCard',
  props : ['brand']
}
</script>

<style scoped>

</style>
