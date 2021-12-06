<template>
  <v-container fluid>
    <v-row class="mt-5 mb-5">
      <v-col cols="12" class="text-center">
        <h1 class="text-h2">Cars Repository</h1>
        <h2 class="text-h5"><em>A collection of quality cars</em></h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="0" md="2" lg="3"/>
      <v-col cols="12" md="8" lg="6">
        <v-row>
          <v-col>
            <v-text-field v-model="nameFilter" label="Type car name" outlined append-icon="mdi-magnify"
                          clearable v-on:keyup.enter="nameFilterClick" @click:append="onNameSelected"
            />
          </v-col>
        </v-row>
        <v-row v-if="this.totPaginatorPages">
          <v-col>
            <v-pagination v-model="offset" :length="totPaginatorPages"/>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4" xl="2">
            <v-autocomplete v-model="selectedBrand" :items="brands" @change="v => onBrandSelected(v)"
                            item-text="name" item-value="name" label="Brand" outlined dense clearable
            ></v-autocomplete>
          </v-col>
          <v-col cols="4" xl="2">
            <v-select v-model="selectedCategory" @change="v => onSelectedCategory(v)"
                      :items="categories" item-text="name" item-value="name" label="Category" outlined
                      dense clearable
            ></v-select>
          </v-col>
          <v-col cols="4" xl="2">
            <v-autocomplete v-model="selectedAuthor" @change="v => onAuthorSelected(v)" :items="authors"
                            item-text="name" item-value="name" label="Author" outlined dense clearable
            ></v-autocomplete>
          </v-col>
          <v-spacer/>

          <v-col cols="2">
              <v-select v-model="selectedSort" item-text="label" return-object  :items="sortOpts" label="Sort" @change="v => sort(v)" ></v-select>
          </v-col>

        </v-row>
        <v-row class="mt-0 mb-3">
          <v-col cols="12">
            <v-chip v-if="activeNameFilter" close @click:close="clearNameFilter">Name: {{ this.activeNameFilter }}
            </v-chip>
            <v-chip v-if="selectedBrand" close @click:close="clearBrandFilter">Brand: {{ this.selectedBrand }}</v-chip>
            <v-chip v-if="selectedCategory" close @click:close="clearCategoryFilter">Category:
              {{ this.selectedCategory }}
            </v-chip>
            <v-chip v-if="selectedAuthor" close @click:close="clearAuthorFilter">Author: {{ this.selectedAuthor }}
            </v-chip>
          </v-col>
        </v-row>
        <v-row v-for="(car, index) in pageCars" :key="index" class="mb-2">
          <v-col cols="12">
            <v-card>
              <v-row>
                <v-col cols="12" md="4">
                  <div>
                    <v-img class="ma-3" contain :src="car.image" alt="car thumbnail"/>
                  </div>
                </v-col>
                <v-col cols="12" md="8">
                  <v-card-title>
                    <NuxtLink :to="`/cars/${car.id}`">
                      <h3 class="text-h7">{{ `${car.brand.name} ${car.modelName}` }}</h3>
                    </NuxtLink>
                    <v-spacer/>
                    <v-rating v-model="car.rating/2" background-color="orange lighten-3"
                              color="orange" half-increments readonly dense class="pb-2"
                    ></v-rating>
                  </v-card-title>
                  <v-card-subtitle>
                    <v-chip v-for="category in car.categories" :key="category.name" class="mr-1" x-small label>
                      {{ category.name }}
                    </v-chip>
                    <v-chip v-if="car.premium" color="orange" x-small label>Premium</v-chip>
                  </v-card-subtitle>
                  <v-card-text>
                    <strong>Year: </strong>{{ car.year }}
                    <br>
                    <strong>Author: </strong>
                    <a :href="car.author.link" rel="noopener" target="_blank">
                      {{ car.author.name }}
                    </a> v{{ car.version }}
                    <br>
                  </v-card-text>
                  <v-card-actions class="mt-auto px-4">
                    <v-spacer></v-spacer>
                    <v-btn :href="car.downloadLink" color="primary">Download</v-btn>
                  </v-card-actions>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
        <v-row v-if="!$store.getters['car/loadingCars'] && filteredCars.length === 0">
          <v-col class="text-center">
            <h3 class="display-6">I'm sorry, no car match your request</h3>
          </v-col>
        </v-row>
        <v-row v-if="$store.getters['car/loadingCars']" v-for="i in 20" :key="i" class="mb-2">
          <v-col>
            <v-card>
              <v-row class="pa-3">
                <v-col cols="12" md="4">
                  <div class="h-100">
                    <v-skeleton-loader
                      type="image"
                    ></v-skeleton-loader>
                  </div>
                </v-col>
                <v-col cols="12" md="7">
                  <v-skeleton-loader
                    class="mx-auto"
                    type="article, actions"
                  ></v-skeleton-loader>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="0" md="2" lg="3"/>
    </v-row>
  </v-container>
</template>

<script>
import { carsFilters, carSort } from '@/_helpers'

export default {
  name: 'CarList',
  setup () {
  },
  data () {
    return {
      sortOpts: [
        {
          label: 'Name (A-Z)',
          sorter: carSort.sortByName(true)
        },
        {
          label: 'Name (Z-A)',
          sorter: carSort.sortByName(false)
        },
        {
          label: 'Latest Submitted',
          sorter: carSort.sortByDate()
        },
        {
          label: 'Production Year (Newer)',
          sorter: carSort.sortByYear(true)
        },
        {
          label: 'Production Year (Older)',
          sorter: carSort.sortByYear(false)
        }
      ],
      categoryOpts: [],
      brandOpts: [],
      nameFilter: '',
      activeNameFilter: '',
      categorySelector: c => c,
      brandSelector: c => c,
      authorSelector: c => c,
      nameSelector: c => c,
      categories: [
        { name: 'Endurance' },
        { name: 'Formula' },
        { name: 'GT' },
        { name: 'Prototype' },
        { name: 'Rally' },
        { name: 'Stock Car' },
        { name: 'Street' },
        { name: 'Tuned' },
        { name: 'Touring' },
        { name: 'Vintage' },
      ],
      sorter: carSort.sortByName(true),
      pageRows: 20,
      offset: 1,
      categorySearch: '',
      selectedCategory: '',
      selectedAuthor: '',
      selectedBrand: '',
      selectedSort: '',
    }
  },
  computed: {
    totPaginatorPages () {
      if (this.filteredCars) {
        return parseInt(this.filteredCars.length / this.pageRows) + 1
      } else {
        return 0
      }
    },
    loggedIn () {
      return this.$store.getters['authentication/loggedIn']
    },
    selector () {
      return c => this.categorySelector(this.authorSelector(this.brandSelector(this.nameSelector(c))))
    },
    userRole () {
      return this.$store.getters['authentication/user'].role
    },
    filteredCars () {
      return [...this.selector(this.cars)].sort(this.sorter)
    },
    pageCars () {
      return this.filteredCars.slice((this.offset - 1) * this.pageRows, ((this.offset - 1) * this.pageRows) + this.pageRows)
    },
    cars () {
      return this.$store.getters['car/cars']
    },
    brands () {
      return this.$store.getters['car/brands']
    },
    authors () {
      return this.$store.getters['car/authors']
    },
  },
  watch: {
    brand () {
      this.brandOpts = this.brands
    },
    loggedIn () {
      if (this.loggedIn) {
        this.initiate()
      }
    }
  },
  mounted () {
    this.initiate()
  },
  methods: {
    initiate () {
      this.getAllCars()
      this.$store.dispatch('car/getCarAuthors')
      this.$store.dispatch('car/getCarBrands')
    },
    getAllCars () {
      this.$store.dispatch('car/getAll')
    },
    searchCategory (e) {
      this.categoryOpts = this.categories.filter(v => v.name.toLowerCase().includes(e.query.toLowerCase()))
    },
    sort (value) {
      this.sorter = value.sorter
    },
    scrollToTop () {
      console.log('change')
      const element = this.$refs['paginatorTop']
      const top = element.offsetTop
      window.scrollTo(0, top)
    },
    nameFilterClick () {
      this.onNameSelected(this.nameFilter)
    },
    onNameSelected () {
      this.activeNameFilter = this.nameFilter
      this.nameSelector = carsFilters.filterByName(this.nameFilter)
    },
    onBrandSelected (name) {
      if (name) {
        this.brandSelector = carsFilters.filterByBrand(name)
      } else {
        this.clearBrandFilter()
      }

    },
    onAuthorSelected (name) {
      if (name) {
        this.authorSelector = carsFilters.filterByAuthor(name)
      } else {
        this.clearAuthorFilter()
      }

    },
    onSelectedCategory (name) {
      if (name) {
        this.categorySelector = carsFilters.filterByCategory(name)
      } else {
        this.clearCategoryFilter()
      }
    },
    clearNameFilter () {
      this.activeNameFilter = ''
      this.nameSelector = c => c
    },
    clearCategoryFilter () {
      this.selectedCategory = ''
      this.categorySelector = c => c
    },
    clearBrandFilter () {
      this.selectedBrand = ''
      this.brandSelector = c => c
    },
    clearAuthorFilter () {
      this.selectedAuthor = ''
      this.authorSelector = c => c
    },
    resetFilters () {
      this.clearNameFilter()
      this.clearCategoryFilter()
      this.clearBrandFilter()
      this.clearAuthorFilter()
    },
    openInNewTab (url) {
      window.open(url, '_blank').focus()
    },
    openEditTab (car) {
      this.$router.push({
        name: 'CarEdit',
        params: { id: car.id }
      })
    }
  }
}
</script>

<style>

</style>
