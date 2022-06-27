<template>
  <v-container fluid>
    <v-row>
      <v-col cols="0" lg="4" md="3"/>
      <v-col cols="12" lg="4" md="6">
        <v-row>
          <v-col>
            <v-breadcrumbs :items="breadCrumbs"></v-breadcrumbs>
          </v-col>
        </v-row>
        <v-row v-if="!loading && !car">
          <v-col class="text-center">
            <h3 class="display-6">I'm sorry, but I can't find the car that you are looking for. You can turn back to the <NuxtLink to="/cars/">cars list</NuxtLink> and see if that exits.</h3>
          </v-col>
        </v-row>
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
        <v-row v-if="car">
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
                          <strong>Power</strong><v-spacer/>{{ car.bhp }} bhp
                        </v-list-item>
                        <v-divider/>
                        <v-list-item>
                          <strong>Torque</strong><v-spacer/>{{ car.torque }} Nm
                        </v-list-item>
                        <v-divider/>
                        <v-list-item>
                          <strong>Top Speed</strong><v-spacer/>{{ car.topSpeed }} Km/h
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
                <v-btn block :href="!car.premium || isPremium ? car.downloadLink: car.source " :color="!car.premium || isPremium ? 'primary' : 'orange'" rel="noopener" target="_blank">{{!car.premium || isPremium ? "Download" : "Buy it here!"}}</v-btn>
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
  async asyncData ({ params, store }) {
    await store.dispatch('car/getAll')
    return {
      car : store.getters['car/car'](params.brand, params.model, params.year),
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
      title: `${this.car.brand.name} ${this.car.modelName}`,
    }
  },
  computed: {
    isPremium(){
      return this.$store.getters['authentication/isPremium']
    },
    loading () {
      return this.$store.getters['car/loadingCars']
    }
  },
}
</script>

<style scoped>

</style>
