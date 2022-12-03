<template>
  <v-card>
    <v-row class="no-gutters">
      <v-col cols="12" md="5" xl="4">
        <v-img :src="car.image" alt="car thumbnail" class="ma-2 rounded" contain/>
      </v-col>
      <v-col cols="12" md="7" xl="8" class="d-flex flex-column">
        <v-card-title>
          <NuxtLink :to="`/cars/${car.brand.name}/${car.modelName}/${car.year}`">
            <h3 class="text-h5">{{ `${car.brand.name} ${car.modelName}` }}</h3>
          </NuxtLink>
          <v-spacer/>
          <v-rating v-model="car.rating/2" background-color="orange lighten-3"
                    class="pb-2" color="orange" dense half-increments readonly
          ></v-rating>
        </v-card-title>
        <v-card-subtitle class="pb-2">
          <v-chip v-for="category in car.categories" :key="category.name" class="mr-1" @click="$emit('chip-clicked',category.name)" label x-small>
            {{ category.name }}
          </v-chip>
          <v-chip v-if="car.premium" color="orange" label x-small>Paid</v-chip>
          <v-chip v-else color="green" label x-small>Free</v-chip>
        </v-card-subtitle>
        <v-card-text class="pb-2">
          <strong>Year: </strong>{{ car.year }}
          <br>
          <strong>Author: </strong>
          <a v-if="car.author.link && car.author.link !== '#'" :href="car.author.link" rel="noopener" target="_blank">{{ car.author.name }}</a><span v-else>
            {{ car.author.name }}
          </span> v{{ car.version }}
          <br>
        </v-card-text>
        <v-card-actions class="mt-auto px-4 pb-4 pt-0">
          <v-spacer></v-spacer>
          <NuxtLink v-if="isAdmin" :to="`/cars/edit/${car.id}`" class="mx-2">
            <v-btn color="orange">Edit</v-btn>
          </NuxtLink>
          <v-btn :href="car.downloadLink" :color="!car.premium || isPremium ? 'primary' : 'orange'" rel="noopener" target="_blank">{{!car.premium || isPremium ? "Download" : "Buy it here!"}}</v-btn>
        </v-card-actions>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>

export default {
  name: 'CarCardHorizontal',
  props : ['car'],
  emits : ['chip-clicked'],
  computed : {
    isPremium() {
      return this.$store.getters['authentication/isPremium']
    },
    isAdmin() {
      return this.$store.getters['authentication/isAdmin']
    }
  }
}
</script>

<style scoped>

</style>
