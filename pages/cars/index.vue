<template>
    <div class="p-grid">
        <div class="p-col-12 text-center p-mt-4">
            <h1 class="display-4">Cars Repository</h1>
            <h2 class="lead"><em>A collection of quality cars</em></h2>
        </div>
        <div class="p-col-12 p-lg-3"></div>
        <div class="p-col-12 p-lg-6">
            <div class="p-grid">
                <div class="p-col-12">
                    <div class="p-inputgroup p-mb-2">
                        <InputText v-model="nameFilter" placeholder="Type Car Name" v-on:keyup.enter="nameFilterClick"/>
                        <Button aria-label="search" icon="pi pi-search" @click="nameFilterClick"/>
                    </div>
                </div>
                <div class="p-col-12">
                    <Paginator :first.sync="offset" :rows="pageRows" :total-records="filteredCars.length"></Paginator>
                </div>
                <div class="p-col-12">
                    <Dropdown v-model="selectedBrand" :filter="true" :loading="this.$store.getters['car/loadingBrands']"
                              :options="brands"
                              aria-label="car brand selection" class="p-mr-2 p-mb-2 p-mb-sm-0"
                              option-label="name"
                              placeholder="Brand" @change="e => onBrandSelected(e.value.name)"
                    >
                    </Dropdown>
                    <Dropdown v-model="selectedCategory" :options="categories" aria-label="car category selection"
                              class="p-mr-2 p-mb-2 p-mb-sm-0"
                              option-label="name" placeholder="Category"
                              @change="e => onSelectedCategory(e.value.name)"
                    />
                    <Dropdown v-model="selectedAuthor" :filter="true" :loading="this.$store.getters['car/loadingAuthors']"
                              :options="authors"
                              aria-label="mod author selection" class="p-mr-2 p-mb-2 p-mb-sm-0"
                              option-label="name" placeholder="Author"
                              @change="e => onAuthorSelected(e.value.name)"
                    />
                    <Dropdown v-model="selectedSort" :options="sortOpts" aria-label="sort type selection"
                              class="p-mr-2 p-mb-2 p-mb-sm-0"
                              option-label="label" option-value="value" placeholder="Sort By"
                              @change="e => sort(e.value)"
                    ></Dropdown>
                </div>
                <div class="p-col-12">
                    <Chip v-if="selectedCategory" :label="`Category: ${selectedCategory.name}`" class="p-mr-2"
                          removable @remove="clearCategoryFilter"
                    />
                    <Chip v-if="activeNameFilter" :label="`Name: ${activeNameFilter}`" class="p-mr-2"
                          removable
                          @remove="clearNameFilter"
                    />
                    <Chip v-if="selectedBrand" :label="`Brand: ${selectedBrand.name}`" class="p-mr-2"
                          removable
                          @remove="clearBrandFilter"
                    />
                    <Chip v-if="selectedAuthor" :label="`Author: ${selectedAuthor.name}`" class="p-mr-2"
                          removable @remove="clearAuthorFilter"
                    />
                </div>
                <div v-if="this.$store.getters['car/loadingCars']" class="p-col-12">
                    <div v-for="i in 25" :key="i" class="p-mb-2">
                        <div class="custom-skeleton p-card container-fluid p-py-2">
                            <div class="row">
                                <div class="col-lg-12 col-xl-4">
                                    <Skeleton height="200px" shape="rectangle" width="100%"></Skeleton>
                                </div>
                                <div class="col-lg-12 col-xl-8 mt-2 d-flex flex-column">
                                    <div class="p-card-title">
                                        <Skeleton height="40px" width="100%"></Skeleton>
                                    </div>
                                    <div class="p-card-subtitle">
                                        <Skeleton height="20px" width="20%"></Skeleton>
                                    </div>
                                    <div class="p-card-body p-my-2">
                                        <Skeleton class="p-mb-1" height="15px" width="10%"></Skeleton>
                                        <Skeleton class="p-mb-1" height="15px" width="30%"></Skeleton>
                                        <Skeleton height="15px" width="80%"></Skeleton>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="filteredCars.length === 0 && !this.$store.getters['car/loadingCars']"
                     class="p-mt-3 text-center p-col-12"
                >
                    <h3 class="display-6">I'm sorry, no car match your request</h3>
                </div>
                <div v-else class="p-col-12">
                    <div class="p-grid p-p-2">
                        <div v-for="(car,index) in pageCars" :key="index" class="p-col-12">
                            <div class="p-grid p-card p-p-2">
                                <div class="p-col-12 p-xl-4 p-p-2">
                                    <div class="d-flex align-items-center" style="height: 100%">
                                        <img :src="car.image" alt="car thumbnail" class="rounded-4 card-img"
                                             loading="lazy"
                                        >
                                    </div>
                                </div>
                                <div class="p-col-12 p-xl-8 p-p-3 d-flex flex-column">
                                    <div class="p-card-title p-mb-0">
                                        <h3>
                                            <NuxtLink
                                                :to="`/cars/${car.id}`"
                                            >{{
                                                    `${car.brand.name} ${car.modelName}`
                                                }}
                                            </NuxtLink>
                                        </h3>
                                    </div>
                                    <div class="p-card-subtitle">
                <span v-for="category in car.categories" :key="category.name"
                      class="badge badge-secondary p-mr-1"
                >{{ category.name }}</span>
                                        <span v-if="car.premium" class="badge badge-warning">Premium</span>
                                    </div>
                                    <div class="p-card-body">
                                        <Rating v-model="car.rating/2" :cancel="false" :readonly="true" class="p-mb-1"/>
                                        <strong>Year: </strong>{{ car.year }}
                                        <br>
                                        <strong>Author: </strong><a :href="car.author.link" rel="noopener"
                                                                    target="_blank"
                                    >{{
                                            car.author.name
                                        }}</a> v{{ car.version }}
                                        <br>
                                    </div>
                                    <div class="p-card-footer p-pt-0  p-text-right mt-auto">
                                        <NuxtLink :to="`/cars/edit/${car.id}`" aria-label="mod edit link">
                                            <Button v-if="userRole === 'admin'" aria-label="edit button"
                                                    class="p-mr-2 p-button-warning"
                                                    icon="far fa-edit"
                                            ></Button>
                                        </NuxtLink>
                                        <a :href="car.downloadLink" aria-label="mod download link" rel="noopener"
                                           target="_blank"
                                        >
                                            <Button aria-label="download button" icon="pi pi-download"></Button>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="p-col-12">
                    <Paginator :first.sync="offset" :rows="pageRows" :total-records="filteredCars.length"></Paginator>
                </div>
            </div>
        </div>
        <div class="p-col-0 p-lg-3"></div>
    </div>
</template>

<script>
import Paginator from 'primevue/paginator'
import Dropdown from 'primevue/dropdown'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Chip from 'primevue/chip'
import Skeleton from 'primevue/skeleton'
import Rating from 'primevue/rating'

import { carsFilters, carSort } from '@/_helpers'

export default {
    name: 'CarList',
    components: {
        Paginator,
        Dropdown,
        Button,
        InputText,
        Chip,
        Skeleton,
        Rating,
    },
    setup () {
    },
    data () {
        return {
            sortOpts: [
                {
                    label: 'Name (A-Z)',
                    value: carSort.sortByName(true)
                },
                {
                    label: 'Name (Z-A)',
                    value: carSort.sortByName(false)
                },
                {
                    label: 'Latest Submitted',
                    value: carSort.sortByDate()
                },
                {
                    label: 'Production Year (Newer)',
                    value: carSort.sortByYear(true)
                },
                {
                    label: 'Production Year (Older)',
                    value: carSort.sortByYear(false)
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
            offset: 0,
            categorySearch: '',
            selectedCategory: '',
            selectedAuthor: '',
            selectedBrand: '',
            selectedSort: '',
        }
    },
    computed: {
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
            return this.filteredCars.slice(this.offset, this.offset + this.pageRows)
        },
        cars () {
            return this.$store.getters['car/cars']
        },
        brands() {
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
            this.sorter = value
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
        onNameSelected (name) {
            this.activeNameFilter = name
            this.nameSelector = carsFilters.filterByName(name)
        },
        onBrandSelected (name) {
            this.brandSelector = carsFilters.filterByBrand(name)
        },
        onAuthorSelected (name) {
            this.authorSelector = carsFilters.filterByAuthor(name)
        },
        onSelectedCategory (name) {
            this.categorySelector = carsFilters.filterByCategory(name)
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
.p-card .p-card-content {
    padding: 0 !important;
}

.p-card .p-card-body {
    padding: 0.25rem !important;
}

.p-panel-content {
    padding: 0 !important;
}

.p-listbox {
    border: none !important;
}

.p-listbox .p-listbox-header {
    border-top-left-radius: 0 !important;
    border-top-right-radius: 0 !important;
}

.p-accordion .p-accordion-content {
    padding: 0 !important;
}

.p-dropdown > span {
    padding: 0.5rem;
}

.custom-skeleton {
    border: 1px solid var(--surface-d);
    border-radius: 4px;
}

.custom-skeleton ul {
    list-style: none;
}
.p-dropdown{
    width: 10rem;
}
</style>
