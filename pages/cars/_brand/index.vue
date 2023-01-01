<template>
  <v-container fluid>
    <v-row>
      <v-col cols="0" xl="3" lg="2" md="1" class="d-none d-md-block"/>
      <v-col cols="12" xl="6" lg="8" md="10">
        <v-row>
          <v-col>
            <v-breadcrumbs :items="breadCrumbs" class="px-0"></v-breadcrumbs>
          </v-col>
        </v-row>
        <v-row class="my-3">
          <v-col class="text-center" cols="12">
            <v-img v-if="brand" height="100px" :src="brand.logo" contain></v-img>
            <h1 v-if="brand" class="text-h2 mb-3">{{brand.name}}</h1>
            <h1 v-else class="text-h2 mb-3">{{brandName}}</h1>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field v-model="nameFilter" append-icon="mdi-magnify" clearable label="Type car name"
                          outlined v-on:keyup.enter="nameFilterClick" @click:append="onNameSelected" @click:clear="clearNameFilter"
            />
          </v-col>
        </v-row>
        <v-row v-if="this.totPaginatorPages" class="px-3 my-3">
          <v-col>
            <v-pagination v-model="offset" :length="totPaginatorPages"/>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6" lg="2">
            <v-select v-model="selectedCategory" :items="categories"
                      dense item-text="name" item-value="name" label="Category"
                      outlined @change="v => onSelectedCategory(v)"
            ></v-select>
          </v-col>
          <v-spacer/>
          <v-col cols="6" lg="2">
            <v-select v-model="selectedSort" :items="sortOpts" dense item-text="label" label="Sort"
                      return-object @change="v => sort(v)"
            ></v-select>
          </v-col>

        </v-row>
        <v-row class="mt-0 mb-3">
          <v-col cols="12">
            <v-chip v-if="activeNameFilter" close @click:close="clearNameFilter">Name: {{ this.activeNameFilter }}</v-chip>
            <v-chip v-if="selectedCategory" close @click:close="clearCategoryFilter">Category: {{ this.selectedCategory }}</v-chip>
          </v-col>
        </v-row>
        <v-row v-for="(car, index) in pageCars" :key="index">
          <v-col cols="12">
            <car-card-horizontal :car="car"/>
          </v-col>
        </v-row>
        <v-row v-if="!loading && filteredCars.length === 0">
          <v-col class="text-center">
            <h3 class="display-6">I'm sorry, no car matches your request</h3>
          </v-col>
        </v-row>
        <v-row v-for="i in 20" v-if="loading" :key="i" class="mb-2">
          <v-col>
            <car-card-horizontal-skeleton/>
          </v-col>
        </v-row>
        <v-row v-if="this.totPaginatorPages" class="px-3">
          <v-col>
            <v-pagination v-model="offset" :length="totPaginatorPages" @input="scrollToTop"/>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { carsFilters, carSort } from '@/_helpers'

export default {
  name: 'BrandCars',
  async asyncData ({ params }) {
    const brandName = params.brand
    const breadCrumbs = [
      {
        text: 'Cars',
        disabled : false,
        exact : true,
        to: '/cars/',
      },
      {
        text: params.brand,
        disabled : true,
        exact : true,
        to: `/cars/${params.brand}`,
      }
    ]
    return{ brandName, breadCrumbs}
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
        },
        {
          label: 'Rating',
          sorter: carSort.sortByRating()
        }
      ],
      nameFilter: '',
      activeNameFilter: '',
      categorySelector: c => c,
      authorSelector: c => c,
      nameSelector: c => c,
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
  head(){
    return{
      title : this.brandName
    }
  },
  computed: {
    brand() {
      return this.$store.getters['car/brands'].find(b => b.name.toLowerCase() === this.brandName.toLowerCase())
    },
    categories () {
      return this.$store.getters['car/carCategories']
    },
    loading(){
      return this.$store.getters['car/loadingCars']
    },
    totPaginatorPages () {
      if (this.filteredCars) {
        return Math.ceil(this.filteredCars.length / this.pageRows)
      } else {
        return 0
      }
    },
    loggedIn () {
      return this.$store.getters['authentication/loggedIn']
    },
    isAdmin(){
      return this.$store.getters['authentication/isAdmin']
    },
    selector () {
      return c => this.categorySelector(this.authorSelector(this.nameSelector(carsFilters.filterOfficial(false, this.isAdmin)(c))))
    },
    filteredCars () {
      return [...this.selector(this.cars)].sort(this.sorter)
    },
    pageCars () {
      return this.filteredCars.slice((this.offset - 1) * this.pageRows, ((this.offset - 1) * this.pageRows) + this.pageRows)
    },
    cars () {
      return carsFilters.filterByBrand(this.brandName)(this.$store.getters['car/cars'])
    },
  },
  watch: {
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
      this.$store.dispatch('car/getCarBrands')
    },
    scrollToTop(){
      window.scrollTo(0,0)
    },
    resetOffset(){
      this.offset = 1;
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
    nameFilterClick () {
      this.onNameSelected(this.nameFilter)
    },
    onNameSelected () {
      this.activeNameFilter = this.nameFilter
      this.nameSelector = carsFilters.filterByName(this.nameFilter)
    },
    onSelectedCategory (name) {
      if (name) {
        this.categorySelector = carsFilters.filterByCategory(name)
      } else {
        this.clearCategoryFilter()
      }
      this.resetOffset()
    },
    clearNameFilter () {
      this.activeNameFilter = ''
      this.nameSelector = c => c
      this.resetOffset()
    },
    clearCategoryFilter () {
      this.selectedCategory = ''
      this.categorySelector = c => c
      this.resetOffset()
    },
    resetFilters () {
      this.clearNameFilter()
      this.clearCategoryFilter()
    },
  }
}
</script>

<style>

</style>
