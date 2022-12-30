<template>
  <v-container fluid>
    <v-row>
      <v-col cols="0" xl="4" lg="3" md="1"/>
      <v-col cols="12" xl="4" lg="6" md="10">
        <v-row>
          <v-col>
            <v-breadcrumbs :items="breadCrumbs" class="px-0"></v-breadcrumbs>
          </v-col>
        </v-row>
        <v-row v-if="!loading && !car">
          <v-col class="text-center">
            <h3 class="display-6">I'm sorry, but I can't find the car that you are looking for. You can turn back to the <NuxtLink to="/cars/">cars list</NuxtLink> and see if that exits.</h3>
          </v-col>
        </v-row>
        <v-row v-else-if="loading && !car">
          <v-col>
            <v-row>
              <v-col>
                <v-skeleton-loader style="width: 100%" type="image"></v-skeleton-loader>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-skeleton-loader
                  class="mx-auto"
                  type="article, actions"
                ></v-skeleton-loader>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <client-only v-else>
          <car-detail-panel  :car="car"/>
        </client-only>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'CarDetail',
  asyncData ({params}) {
    return {
      model : params.model,
      brand : params.brand,
      year : params.year,
      breadCrumbs : [
        {
          text: 'Cars',
          disabled : false,
          exact : true,
          to: '/cars/',
        },
        {
          text: params.brand,
          disabled : false,
          exact : true,
          to: `/cars/${params.brand}/`,
        },
        {
          text: params.model,
          disabled : true,
          exact : true,
          to: `/cars/${params.brand}/${params.model}/`,
        },
        {
          text: params.year,
          disabled : true,
          exact : true,
          to: `/cars/${params.brand}/${params.model}/${params.year}/`,
        },
      ],
    }
  },
  head() {
    return {
      title: `${this.brand} ${this.model}`,
    }
  },
  mounted() {
    this.$store.dispatch('car/getAll')
  },
  computed: {
    loading () {
      return this.$store.getters['car/loadingCars']
    },
    car () {
      return this.$store.getters['car/car'](this.brand, this.model, this.year)
    }
  },
}
</script>

<style scoped>

</style>
