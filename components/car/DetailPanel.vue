<template>
  <v-row>
    <v-col>
      <v-row>
        <v-col cols="12" md="12" >
          <v-img :src="carImage" class="rounded" contain alt="car image"></v-img>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <div class="overflow-auto pb-4 d-flex flex-row flex-nowrap">
            <v-card v-for="image in car.images" :key="image.id" @click="changeCarImage(image.url)" class="mr-2">
              <v-img :src="image.url" :width="imageThumbnailWidth" alt="car image preview"></v-img>
            </v-card>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <h1 class="text-h3">{{ `${car.brand.name} ${car.modelName}` }}</h1>
        </v-col>
      </v-row>
      <v-row class="mt-0">
        <v-col>
          <v-rating v-model="car.rating/2" background-color="orange lighten-3" color="orange" dense
                    length="5" half-increments
                    readonly
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-btn v-if="(!car.premium || isPremium) && !car.official" block :href="car.downloadLink" color="primary"
                 rel="noopener" target="_blank">Download
          </v-btn>
          <v-btn v-else-if="!car.official" block :href="car.source" color="orange" rel="noopener" target="_blank">Buy
            it here!
          </v-btn>
          <v-btn v-else disabled block>Official Content</v-btn>
        </v-col>
        <v-col v-if="isAdmin" cols="12" md="2">
          <v-btn  :to="`/admin/update/car/${car.id}`" color="warning" block><FontAwesomeIcon icon="pen-square"/></v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-card class="pa-4">
            <v-row>
              <v-col cols="12" md="6">
                <v-list>
                  <v-list-item>
                    <strong>Brand</strong>
                    <v-spacer/>
                    {{ car.brand.name }}
                  </v-list-item>
                  <v-divider></v-divider>
                  <v-list-item>
                    <strong>Nation</strong>
                    <v-spacer/>
                    {{ car.brand.nation.name }}
                  </v-list-item>
                  <v-divider></v-divider>
                  <v-list-item>
                    <strong>Year</strong>
                    <v-spacer/>
                    {{ car.year }}
                  </v-list-item>
                  <v-divider/>
                  <v-list-item>
                    <strong>Author</strong>
                    <v-spacer/>
                    <a v-if="car.author.link && car.author.link !== '#'" :href="car.author.link" rel="noopener"
                       target="_blank">{{ car.author.name }}</a>
                    <span v-else>{{ car.author.name }}</span>
                  </v-list-item>
                  <v-divider/>
                  <v-list-item>
                    <strong>Mod Version</strong>
                    <v-spacer/>
                    {{ car.version }}
                  </v-list-item>
                  <v-divider/>
                </v-list>
              </v-col>
              <v-col cols="12" md="6">
                <v-list>
                  <v-list-item>
                    <strong>Power</strong>
                    <v-spacer/>
                    {{ car.bhp }} bhp
                  </v-list-item>
                  <v-divider/>
                  <v-list-item>
                    <strong>Torque</strong>
                    <v-spacer/>
                    {{ car.torque }} Nm
                  </v-list-item>
                  <v-divider/>
                  <v-list-item>
                    <strong>Top Speed</strong>
                    <v-spacer/>
                    {{ car.topSpeed }} Km/h
                  </v-list-item>
                  <v-divider/>
                  <v-list-item>
                    <strong>Transmission</strong>
                    <v-spacer/>
                    {{ car.transmission }}
                  </v-list-item>
                  <v-divider/>
                  <v-list-item>
                    <strong>Drivetrain</strong>
                    <v-spacer/>
                    {{ car.drivetrain }}
                  </v-list-item>
                  <v-divider/>
                </v-list>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
      <v-row class="mt-6" v-if="skins.length">
        <v-col>
          <h2 class="text-h4">Skins</h2>
        </v-col>
      </v-row>
      <v-row v-for="(skin,id) in skins" :key="id" class="mt-1">
        <v-col>
          <v-card class="mb-2">
            <v-row no-gutters align="center">
              <v-col cols="12" lg="2" class="pa-2">
                <v-img :src="skin.imageUrl" height="70" class="rounded" alt="car skin thumbnail"/>
              </v-col>
              <v-col cols="12" lg="6" xl="7">
                <v-card-title>
                  <span class="single-line">{{skin.name}}</span>
                </v-card-title>
              </v-col>
              <v-col>
                <v-card-actions>
                  <v-row>
                    <v-col v-if="isAdmin">
                      <v-btn  :to="`/admin/update/skin/${skin.id}`" color="warning" block><FontAwesomeIcon icon="pen-square"/></v-btn>
                    </v-col>
                    <v-col>
                      <v-btn :href="skin.downloadLink" color="success" rel="noopener" target="_blank" block >Download</v-btn>
                    </v-col>
                  </v-row>
                </v-card-actions>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

export default {
  name: "CarDetailPanel",
  props: ['car'],
  components: {
    FontAwesomeIcon,
  },
  data() {
    return {
      carImage : this.getFavImage(this.car.images).url,

    }
  },
  mounted() {
    this.initialize()
  },
  computed: {
    isPremium() {
      return this.$store.getters['authentication/isPremium']
    },
    isAdmin(){
      return this.$store.getters['authentication/isAdmin']
    },
    skins(){
      return this.$store.getters["skin/carSkins"](this.car.id)
    },
    imageThumbnailWidth () {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return 100
        case 'sm': return 130
        case 'md': return 130
        case 'lg': return 130
        case 'xl': return 130
      }
    },
  },
  methods: {
    initialize() {
      this.$store.dispatch('skin/getCarSkins', this.car.id)
    },
    getFavImage(images){
      return images.find(img => img.favorite)
    },
    changeCarImage(url){
      this.carImage = url
    },
  },
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
