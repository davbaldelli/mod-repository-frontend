<template>
    <div class="p-grid">
        <div class="p-col-12 p-mt-4 text-center">
            <h1 class="display-4">Tracks Repository</h1>
            <h2 class="lead"><em>A collection of quality tracks</em></h2>
        </div>
        <div class="p-col-12 p-lg-3"></div>
        <div class="p-col-12 p-lg-6">
            <div class="p-grid">
                <div class="p-col-12">
                    <div class="p-inputgroup p-mb-2">
                        <InputText v-model="nameFilter" placeholder="Type Track Name"
                                   v-on:keyup.enter="nameFilterClick"
                        />
                        <Button aria-label="search" icon="pi pi-search" @click="nameFilterClick"/>
                    </div>
                </div>
                <div class="p-col-12">
                    <Paginator :first.sync="offset" :rows="pageRows" :total-records="filteredTracks.length"
                    ></Paginator>
                </div>
                <div class="p-col-12">
                    <Dropdown v-model="selectedNation" :filter="true"
                              :loading="this.$store.getters['track/loadingNations']"
                              :options="nations" aria-label="nation filter selection" class="p-mr-2 p-mb-2 p-mb-sm-0" option-label="name"
                              option-value="name"
                              placeholder="Nation" @change="e => onNationSelected(e.value)"
                    ></Dropdown>
                    <Dropdown v-model="selectedLayoutType" :options="categoryOpts"
                              aria-label="layout type selection" class="p-mr-2 p-mb-2 p-mb-sm-0"
                              option-label="text"
                              option-value="value" placeholder="Layout Category" @change="e => onLayoutCategorySelected(e.value)"
                    ></Dropdown>
                    <Dropdown v-model="selectedTag" :options="tagsOpts"
                              class="p-mr-2 p-mb-2 p-mb-sm-0"
                              option-label="text" option-value="value" placeholder="Tag" @change="e => onTagSelected(e.value)"
                    ></Dropdown>
                    <Dropdown v-model="selectedAuthor" :filter="true" :loading="this.$store.getters['tracks/loadingAuthors']"
                              :options="authors"
                              aria-label="mod author selection" class="p-mr-2 p-mb-2 p-mb-sm-0"
                              option-label="name" placeholder="Author"
                              @change="e => onAuthorSelected(e.value.name)"
                    />
                    <Dropdown v-model="selectedSort" :options="sortOpts" aria-label="sort selection"
                              class="p-mr-2 p-mb-2 p-mb-sm-0"
                              option-label="label" option-value="value" placeholder="Sort By"
                              @change="e => sort(e.value)"
                    ></Dropdown>
                </div>
                <div class="p-col-12">
                    <Chip v-if="selectedNameFilter" :label="`Name: ${selectedNameFilter}`" class="p-ml-2"
                          removable @remove="clearNameFilter"
                    />
                    <Chip v-if="selectedNation" :label="`Nation: ${selectedNation}`" class="p-ml-2"
                          removable
                          @remove="clearNationFilter"
                    />
                    <Chip v-if="selectedLayoutType" :label="`Category: ${selectedLayoutType}`"
                          class="p-ml-2"
                          removable @remove="clearLayoutFilter"
                    />
                    <Chip v-if="selectedTag" :label="`Tag: ${selectedTag}`" class="p-ml-2" removable
                          @remove="clearTagFilter"
                    />
                    <Chip v-if="selectedAuthor" :label="`Author: ${selectedAuthor.name}`" class="p-ml-2"
                          removable @remove="clearAuthorFilter"
                    />
                </div>
                <div v-if="this.$store.getters['track/loadingTracks']" class="p-col-12">
                    <div v-for="i in 5" :key="i" class="p-mb-2">
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
                                        <Skeleton class="p-mb-1" height="15px" width="30%"></Skeleton>
                                        <Skeleton class="p-mb-1" height="15px" width="30%"></Skeleton>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="filteredTracks.length === 0 && !this.$store.getters['track/loadingTracks']"
                     class="text-center p-col-12 p-my-3"
                >
                    <h3 class="display-6">I'm sorry, no track match your request</h3>
                </div>
                <div v-else class="p-col-12">
                    <div class="p-grid p-p-2">
                        <div v-for="(track, index) in pageTracks" :key="index" class="p-col-12">
                            <div class="p-grid p-card p-p-2">
                                <div class="p-col-12 p-xl-4 p-p-2">
                                    <div class="d-flex align-items-center" style="height: 100%">
                                        <img :src="track.image" alt="track thumbnail" class="rounded-4 card-img"
                                             loading="lazy"
                                        >
                                    </div>
                                </div>
                                <div class="p-col-12 p-xl-8 p-p-3 d-flex flex-column">
                                    <div class="p-card-title p-mb-0">
                                        <h3>
                                            <router-link :to="`/tracks/${track.id}`">{{ track.name }}</router-link>
                                        </h3>
                                    </div>
                                    <div class="p-card-subtitle">
                      <span v-for="tag in track.tags" :key="tag"
                            class="badge badge-secondary p-mr-1"
                      >{{ tag }}</span>
                                        <span v-if="track.premium" class="badge badge-warning">Premium</span>
                                    </div>
                                    <div class="p-card-body">
                                        <Rating :cancel="false" v-model="track.rating/2" :readonly="true"
                                                class="p-mb-1"
                                        />
                                        <strong>Location: </strong>{{ track.location }}, {{ track.nation.name }}<br/>
                                        <strong>Author: </strong>
                                        <a :href="track.author.link" rel="noopener" target="_blank">{{
                                                track.author.name
                                            }}</a> v{{ track.version }}
                                    </div>
                                    <div class="p-card-footer p-pt-0 p-text-right mt-auto">
                                        <NuxtLink :to="`/tracks/edit/${track.id}`" aria-label="edit link">
                                            <Button v-if="userRole === 'admin'" aria-label="edit button"
                                                    class="p-mr-2 p-button-warning"
                                                    icon="far fa-edit"
                                            ></Button>
                                        </NuxtLink>
                                        <a :href="track.downloadLink" aria-label="mod download link" rel="noopener"
                                           target="_blank"
                                        >
                                            <Button aria-label="download button" icon="pi pi-download"
                                                    iconPos="right"
                                            ></Button>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="p-col-12">
                    <Paginator :first.sync="offset" :rows="pageRows" :total-records="filteredTracks.length"
                    ></Paginator>
                </div>
            </div>
        </div>
        <div class="p-col-0 p-lg-3"></div>
    </div>
</template>

<script>

import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Paginator from 'primevue/paginator'
import Chip from 'primevue/chip'
import Dropdown from 'primevue/dropdown'
import Skeleton from 'primevue/skeleton'
import Rating from 'primevue/rating'
import { tracksFilters, trackSort } from '@/_helpers'

export default {
    name: 'TracksList',
    components: {
        InputText,
        Button,
        Paginator,
        Chip,
        Dropdown,
        Skeleton,
        Rating,
    },
    setup () {
    },
    data () {
        return {
            nameFilter: '',
            selectedNameFilter: '',
            pageRows: 25,
            offset: 0,
            tagsOpts: [{
                text: 'F1',
                value: 'F1'
            },
                {
                    text: 'NASCAR',
                    value: 'NASCAR'
                },
                {
                    text: 'Historic',
                    value: 'Historic'
                },
                {
                    text: 'Rally',
                    value: 'Rally'
                },
                {
                    text: 'Drift',
                    value: 'Drift'
                },
                {
                    text: 'Open World',
                    value: 'Open World'
                },
                {
                    text: 'City Track',
                    value: 'City Track'
                },
                {
                    text: 'Touge',
                    value: 'Touge'
                },
                {
                    text: 'Endurance',
                    value: 'Endurance'
                },
                {
                    text: 'Street Circuit',
                    value: 'Street Track'
                },
                {
                    text: 'Fictional',
                    value: 'Fictional'
                },
                {
                    text: 'Karting',
                    value: 'Karting'
                },],
            categoryOpts: [
                {
                    text: 'Oval',
                    value: 'Oval'
                },
                {
                    text: 'Road Course',
                    value: 'Road Course'
                },
                {
                    text: 'A to B',
                    value: 'A to B'
                },
            ],
            sortOpts: [
                {
                    label: 'Name (A-Z)',
                    value: trackSort.sortByName(true)
                },
                {
                    label: 'Name (Z-A)',
                    value: trackSort.sortByName(false)
                },
                {
                    label: 'Latest Submitted',
                    value: trackSort.sortBySubmission()
                },
            ],
            sorter: trackSort.sortByName(true),
            nameSelector: t => t,
            layoutTypeSelector: t => t,
            selectedLayoutType: '',
            nationSelector: t => t,
            selectedNation: '',
            trackTagsSelector: t => t,
            selectedTag: '',
            authorSelector: t => t,
            selectedAuthor: '',
            selectedSort: '',
        }
    },
    mounted () {
        this.initiate()
    },
    computed: {
        filter () {
            return t => this.authorSelector(this.nameSelector(this.layoutTypeSelector(this.trackTagsSelector(this.nationSelector(t)))))
        },
        loggedIn () {
            return this.$store.getters['authentication/loggedIn']
        },
        userRole () {
            return this.$store.getters['authentication/user'].role
        },
        tracks () {
            return this.$store.getters['track/tracks']
        },
        nations () {
            return this.$store.getters['track/nations']
        },
        filteredTracks () {
            return [...this.filter(this.tracks)].sort(this.sorter)
        },
        pageTracks () {
            return this.filteredTracks.slice(this.offset, this.offset + this.pageRows)
        },
        authors () {
            return this.$store.getters['track/authors']
        }
    },
    watch: {
        loggedIn () {
            if (this.loggedIn) {
                this.initiate()
            }
        }
    },
    methods: {
        nameFilterClick () {
            this.onNameSelected(this.nameFilter)
        },
        initiate () {
            this.getAllTracks()
            this.$store.dispatch('track/getTracksAuthors')
            this.$store.dispatch('track/getAllNations')
        },
        getAllTracks () {
            this.$store.dispatch('track/getAllTracks')
        },
        sort (value) {
            this.sorter = value
        },
        onNameSelected (name) {
            this.selectedNameFilter = name
            this.nameSelector = tracksFilters.filterByName(name)
        },
        clearNameFilter () {
            this.selectedNameFilter = ''
            this.nameSelector = t => t
        },
        onLayoutCategorySelected (name) {
            this.layoutTypeSelector = tracksFilters.filterByLayoutCategory(name)
        },
        clearLayoutFilter () {
            this.selectedLayoutType = ''
            this.layoutTypeSelector = t => t
        },
        onTagSelected (name) {
            this.trackTagsSelector = tracksFilters.filterByTag(name)
        },
        clearTagFilter () {
            this.selectedTag = ''
            this.trackTagsSelector = t => t
        },
        onNationSelected (name) {
            this.nationSelector = tracksFilters.filterByNation(name)
        },
        clearNationFilter () {
            this.selectedNation = ''
            this.nationSelector = t => t
        },
        onAuthorSelected (name) {
            this.authorSelector = tracksFilters.filterByAuthor(name)
        },
        clearAuthorFilter () {
            this.selectedAuthor = ''
            this.authorSelector = t => t
        },
        openInNewTab (url) {
            window.open(url, '_blank').focus()
        },
        openEditTab (track) {
            this.$router.push({
                name: 'TrackEdit',
                params: { id: track.id }
            })
        }
    }
}
</script>

<style scoped>
.p-dropdown{
    width: 10rem;
}
</style>
