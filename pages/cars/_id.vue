<template>
  <v-container fluid>
    <v-row v-if="car">
      <v-col cols="0" lg="4" md="3"/>
      <v-col cols="12" lg="4" md="6">
        <v-row v-if="loading">
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
        <v-row>
          <v-col>
            <v-row>
              <v-col cols="12">
                <v-img :src="car.image" contain></v-img>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <h1 class="text-h2">{{ `${car.brand.name} ${car.modelName}` }}</h1>
              </v-col>
            </v-row>
            <v-row class="mt-0">
              <v-col>
                <v-rating v-model="car.rating" background-color="orange lighten-3" color="orange" dense
                          length="10"
                          readonly
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-card class="pa-4">
                  <v-row class="pt-3">
                    <v-col cols="12" md="6">
                      <strong>Brand</strong> {{ car.brand.name }}
                      <hr>
                    </v-col>
                    <v-col cols="12" md="6">
                      <strong>Nation</strong> {{ car.brand.nation.name }}
                      <hr>
                    </v-col>
                    <v-col cols="12" md="6">
                      <strong>Year</strong> {{ car.year }}
                      <hr>
                    </v-col>
                    <v-col cols="12" md="6">
                      <strong>Author</strong><a :href="car.author.link" rel="noopener"
                                                target="_blank"
                    > {{ car.author.name }}</a>
                      <hr>
                    </v-col>
                    <v-col cols="12" md="6">
                      <strong>Mod Version</strong> {{ car.version }}
                      <hr>
                    </v-col>
                    <v-col cols="12" md="6">
                      <strong>Power</strong> {{ car.bhp }}
                      <hr>
                    </v-col>
                    <v-col cols="12" md="6">
                      <strong>Torque</strong> {{ car.torque }}
                      <hr>
                    </v-col>
                    <v-col cols="12" md="6">
                      <strong>Top Speed</strong> {{ car.topSpeed }}
                      <hr>
                    </v-col>
                    <v-col cols="12" md="6">
                      <strong>Transmission</strong> {{ car.transmission }}
                      <hr>
                    </v-col>
                    <v-col cols="12" md="6">
                      <strong>Drivetrain</strong>
                      <hr>
                    </v-col>
                  </v-row>
                </v-card>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-col cols="0" lg="4" md="3"/>
  </v-container>
</template>

<script>
export default {
  name: 'CarDetail',
  data () {
    return {
      id: this.$route.params.id
    }
  },
  computed: {
    car () {
      return this.$store.getters['car/getCarById'](this.id)
    },
    loading () {
      return this.$store.getters['car/loadingCars']
    }
  },
  mounted () {
    this.$store.dispatch('car/getAll')
  }
}
</script>

<style scoped>

</style>
