<template>
<v-container fluid>
  <v-row>
    <v-col cols="0" lg="3" md="2" class="d-none d-md-block"/>
    <v-col cols="12" lg="6" md="8">
      <v-row>
        <v-col v-for="(brand, id) in brands" :key="id" col="12" md="4">
          <v-card class="pa-5" :to="`/cars/${brand.name}/`">
            <v-img contain :src="brand.logo" height="200px" ></v-img>
            <v-card-title v-text="brand.name" class="text-center"></v-card-title>
          </v-card>
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
  computed : {
    brands(){
      return this.$store.getters['car/brands']
    }
  },
  mounted () {
    this.$store.dispatch('car/getCarBrands')
  }
}
</script>

<style scoped>

</style>
