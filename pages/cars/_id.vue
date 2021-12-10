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
                <h1 class="text-h3">{{ `${car.brand.name} ${car.modelName}` }}</h1>
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
                  <v-row>
                    <v-col cols="12" md="6">
                      <v-list>
                        <v-list-item>
                          <strong>Brand</strong><v-spacer/>{{ car.brand.name }}
                        </v-list-item>
                        <v-divider></v-divider>
                        <v-list-item>
                          <strong>Nation</strong><v-spacer/>{{ car.brand.nation.name }}
                        </v-list-item>
                        <v-divider></v-divider>
                        <v-list-item>
                          <strong>Year</strong><v-spacer/>{{ car.year }}
                        </v-list-item>
                        <v-divider />
                        <v-list-item>
                          <strong>Author</strong><v-spacer/>
                          <a :href="car.author.link" rel="noopener" target="_blank">{{ car.author.name }}</a>
                        </v-list-item>
                        <v-divider/>
                        <v-list-item>
                          <strong>Mod Version</strong><v-spacer/>{{ car.version }}
                        </v-list-item>
                        <v-divider/>
                      </v-list>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-list>
                        <v-list-item>
                          <strong>Power</strong><v-spacer/>{{ car.bhp }}
                        </v-list-item>
                        <v-divider/>
                        <v-list-item>
                          <strong>Torque</strong><v-spacer/>{{ car.torque }}
                        </v-list-item>
                        <v-divider/>
                        <v-list-item>
                          <strong>Top Speed</strong><v-spacer/>{{ car.topSpeed }}
                        </v-list-item>
                        <v-divider/>
                        <v-list-item>
                          <strong>Transmission</strong><v-spacer/>{{ car.transmission }}
                        </v-list-item>
                        <v-divider/>
                        <v-list-item>
                          <strong>Drivetrain</strong><v-spacer/>{{car.drivetrain}}
                        </v-list-item>
                        <v-divider/>
                      </v-list>
                    </v-col>
                  </v-row>
                </v-card>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-btn color="primary" block :href="car.downloadLink" rel="noopener" target="_blank">Download</v-btn>
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
