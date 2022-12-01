<template>
  <v-card>
    <v-row class="no-gutters">
      <v-col cols="12">
        <v-img :src="car.image" alt="car thumbnail" class="ma-2 rounded" contain/>
      </v-col>
      <v-col cols="12">
        <v-card-title class="py-1 d-block" >
          <NuxtLink :to="`/cars/${car.brand.name}/${car.modelName}/${car.year}/`">
            <div>
              <h3 class="text-h5 single-line" >{{ `${car.brand.name} ${car.modelName}` }}</h3>
            </div>
          </NuxtLink>
        </v-card-title>
      </v-col>
      <v-col cols="12">
        <v-card-text class="py-1">
          <v-rating v-model="car.rating/2" background-color="orange lighten-3" color="orange" dense half-increments readonly
          ></v-rating>
        </v-card-text>
      </v-col>
      <v-col cols="12">
        <v-card-subtitle class="pt-1 pb-3">
          <v-chip v-for="category in car.categories" :key="category.name" class="mr-1" label x-small>
            {{ category.name }}
          </v-chip>
          <v-chip v-if="car.premium" color="orange" label x-small>Paid</v-chip>
        </v-card-subtitle>
        <v-card-text class="pb-2">
          <strong>Year: </strong>{{ car.year }}
          <br>
          <strong>Author: </strong>
          <a :href="car.author.link" rel="noopener" target="_blank">
            {{ car.author.name }}
          </a> v{{ car.version }}
          <br>
        </v-card-text>
        <v-card-actions class="mt-auto px-2 pb-4 py-3">
          <v-col>
            <v-btn v-if="isAdmin" :to="`/cars/edit/${car.id}`" color="orange" block>Edit</v-btn>
          </v-col>
          <v-col>
            <v-btn :href="car.downloadLink" :color="!car.premium || isPremium ? 'primary' : 'orange'" rel="noopener" target="_blank" block>{{!car.premium || isPremium ? "Download" : "Buy it here!"}}</v-btn>
          </v-col>
        </v-card-actions>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>

export default {
  name: 'CarCard',
  props : ['car'],
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
  .single-line{
    display: block !important;
    white-space: nowrap ;
    word-break: normal;
    overflow: hidden ;
    text-overflow: ellipsis;
  }
</style>
