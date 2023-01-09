<template>
  <v-card :class="`pa-5 ${light ? 'light-grey' : ''}`" :to="`/tracks/${nation.name}`" nuxt>
    <v-img contain :src="`https://flagcdn.com/h240/${nation.code}.png`" height="240" :alt="`${nation.name} flag`" class="rounded"/>
    <v-card-title v-text="nation.name" class="justify-center"></v-card-title>
  </v-card>
</template>

<script>
export default {
  name: 'NationCard',
  props: ['nation'],
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
