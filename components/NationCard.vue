<template>
  <v-card class="pa-2 light-grey" :to="`/tracks/${nation.name}`">
    <v-img contain :src="`https://flagcdn.com/h240/${nation.code}.png`" height="240"></v-img>
    <v-card-title v-text="nation.name" class="justify-center"></v-card-title>
  </v-card>
</template>

<script>
export default {
  name: 'NationCard',
  props: ['nation']
}
</script>

<style scoped>
  .light-grey{
    background-color : #F5F5F5;
  }
</style>
