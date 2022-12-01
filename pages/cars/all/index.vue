<template>
  <v-container fluid>
    <v-row>
      <v-col cols="0" lg="3" md="2" class="d-none d-md-block"/>
      <v-col cols="12" lg="6" md="8">
        <v-breadcrumbs :items="breadCrumbs"></v-breadcrumbs>
      </v-col>
    </v-row>
    <v-row class="my-3">
      <v-col class="text-center" cols="12">
        <h1 class="text-h2 mb-3">Cars Repository</h1>
        <h2 class="text-h5"><em>A collection of quality cars</em></h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="0" lg="3" md="2" class="d-none d-md-block"/>
      <v-col cols="12" lg="6" md="8">
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
            <v-autocomplete v-model="selectedBrand" :items="brands"
                            dense item-text="name" item-value="name" label="Brand" outlined @change="v => onBrandSelected(v)"
            ></v-autocomplete>
          </v-col>
          <v-col cols="6" lg="2">
            <v-select v-model="selectedCategory" :items="categories"
                      dense item-text="name" item-value="name" label="Category"
                      outlined @change="v => onSelectedCategory(v)"
            ></v-select>
          </v-col>
          <v-col cols="6" lg="2">
            <v-autocomplete v-model="selectedAuthor" :items="authors"
                            dense item-text="name" item-value="name" label="Author" outlined @change="v => onAuthorSelected(v)"
            ></v-autocomplete>
          </v-col >
          <v-spacer/>
          <v-col cols="6" lg="2">
            <v-select
              v-model.number="pageRows"
              :items="[20,50,100]"
              outlined
              dense
              label="Rows Per Page"
            ></v-select>
          </v-col>
          <v-col cols="6" lg="2">
            <v-select v-model="selectedSort" :items="sortOpts" dense item-text="label" label="Sort"
                      return-object @change="v => sort(v)"
            ></v-select>
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
        <v-row>
          <v-col cols="12" v-for="(car, index) in pageCars" :key="index">
            <car-card-horizontal :car="car"/>
          </v-col>
        </v-row>
        <v-row v-if="!$store.getters['car/loadingCars'] && filteredCars.length === 0">
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
            <v-pagination v-model="offset" :length="totPaginatorPages"/>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="0" lg="3" md="2"/>
    </v-row>
  </v-container>
</template>

<script>
import { carsFilters, carSort } from '@/_helpers'

export default {
  name: 'CarList',
  scrollToTop : true,
  asyncData () {
    return {
      breadCrumbs : [
        {
          text: 'Cars',
          disabled : false,
          exact : true,
          to: '/cars/',
        },
        {
          text: "All",
          disabled : true,
          exact: true,
          to: `/cars/all`,
        }
      ],
    }
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
          label: 'Last Added',
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
      nameFilter: '',
      activeNameFilter: '',
      categorySelector: c => c,
      brandSelector: c => c,
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
      title : "All Cars"
    }
  },
  computed: {
    loading(){
      return this.$store.getters['car/loadingCars'] && this.cars.length === 0
    },
    totPaginatorPages () {
      if (this.filteredCars) {
        return Math.ceil(this.filteredCars.length / this.pageRows)
      } else {
        return 0
      }
    },
    categories() {
      return this.$store.getters['car/carCategories']
    },
    loggedIn () {
      return this.$store.getters['authentication/loggedIn']
    },
    selector () {
      return c => this.categorySelector(this.authorSelector(this.brandSelector(this.nameSelector(c))))
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
    filteredCars() {
      this.offset = 1;
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
