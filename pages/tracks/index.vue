<template>
    <v-container fluid>
        <v-row>
            <v-col cols="12" class="text-center">
                <h1 class="text-h2">Tracks Repository</h1>
                <h2 class="text-h5"><em>A collection of quality tracks</em></h2>
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
                    <v-col cols="4" lg="2">
                        <v-autocomplete v-model="selectedNation" :items="nations" @change="v => onNationSelected(v)"
                                        item-text="name" item-value="name" label="Nation" outlined dense clearable
                        ></v-autocomplete>
                    </v-col>
                    <v-col cols="4" lg="2">
                        <v-select v-model="selectedTag" @change="v => onTagSelected(v)"
                                  :items="tagsOpts" item-text="text" item-value="value" label="Tags" outlined
                                  dense clearable
                        ></v-select>
                    </v-col>
                  <v-col cols="4" lg="2">
                    <v-select v-model="selectedLayoutType" @change="v => onLayoutCategorySelected(v)"
                              :items="categoryOpts" item-text="text" item-value="value" label="Layout Type" outlined
                              dense clearable
                    ></v-select>
                  </v-col>
                    <v-col cols="4" lg="2">
                        <v-autocomplete v-model="selectedAuthor" @change="v => onAuthorSelected(v)" :items="authors"
                                        item-text="name" item-value="name" label="Author" outlined dense clearable
                        ></v-autocomplete>
                    </v-col>
                    <v-spacer/>
                    <!--
                    <v-col cols="2">
                        <v-select v-model="selectedSort" item-text="label" item-value="sorter" :items="sortOpts" label="Sort" @change="v => sort(v)" ></v-select>
                    </v-col>
                    -->
                </v-row>
                <v-row>
                    <v-col cols="12">
                        <v-chip v-if="selectedNameFilter" close @click:close="clearNameFilter" >Name: {{this.selectedNameFilter}}</v-chip>
                        <v-chip v-if="selectedNation" close @click:close="clearNationFilter">Nation: {{this.selectedNation}}</v-chip>
                        <v-chip v-if="selectedTag" close @click:close="clearTagFilter">Tag: {{this.selectedTag}}</v-chip>
                        <v-chip v-if="selectedAuthor" close @click:close="clearAuthorFilter">Author: {{this.selectedAuthor}}</v-chip>
                    </v-col>
                </v-row>
                <v-row v-for="(track, index) in pageTracks" :key="index" class="mb-2">
                    <v-col cols="12">
                        <v-card>
                            <v-row>
                                <v-col cols="12" md="4">
                                    <div class="h-100">
                                        <v-img class="ma-3" contain :src="track.image" alt="car thumbnail"/>
                                    </div>
                                </v-col>
                                <v-col cols="12" md="8" class="d-flex flex-column">
                                    <v-card-title class="text-h5">
                                        <NuxtLink :to="`/tracks/${track.id}`">
                                            <h3 class="text-h7">{{track.name}}</h3>
                                        </NuxtLink>
                                        <v-spacer/>
                                        <v-rating v-model="track.rating/2" background-color="orange lighten-3"
                                                  color="orange" half-increments readonly dense class="pb-2"
                                        ></v-rating>
                                    </v-card-title>
                                    <v-card-subtitle>
                                            <span v-for="tag in track.tags" :key="tag"
                                                  class="badge badge-secondary mr-1"
                                            >{{ tag }}</span>
                                        <span v-if="track.premium" class="badge badge-warning">Premium</span>

                                    </v-card-subtitle>
                                    <v-card-text>
                                        <strong>Location: </strong>{{ track.location }}, {{ track.nation.name }}<br/>
                                        <strong>Author: </strong>
                                        <a :href="track.author.link" rel="noopener" target="_blank">
                                            {{ track.author.name }}
                                        </a> v{{ track.version }}

                                    </v-card-text>
                                    <v-card-actions class="mt-auto px-4">
                                        <v-spacer></v-spacer>
                                        <v-btn :href="track.downloadLink" color="primary">Download</v-btn>
                                    </v-card-actions>
                                </v-col>
                            </v-row>
                        </v-card>
                    </v-col>
                </v-row>
                <v-row v-if="!this.$store.getters['track/loadingTracks'] && filteredTracks.length === 0">
                    <v-col class="text-center">
                        <h3 class="display-6">I'm sorry, no car match your request</h3>
                    </v-col>
                </v-row>
            </v-col>
            <v-col cols="0" md="2" lg="3"/>
        </v-row>
    </v-container>
</template>

<script>
import { tracksFilters, trackSort } from '@/_helpers'

export default {
    name: 'TracksList',

    setup () {
    },
    data () {
        return {
            nameFilter: '',
            selectedNameFilter: '',
            pageRows: 25,
            offset: 1,
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
        totPaginatorPages(){
            if(this.filteredTracks){
                return parseInt(this.filteredTracks.length / this.pageRows) + 1
            } else {
                return 0
            }
        },
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
            return this.filteredTracks.slice((this.offset - 1) * this.pageRows, ((this.offset - 1) * this.pageRows) + this.pageRows)
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
        onNameSelected () {
            this.selectedNameFilter = this.nameFilter
            this.nameSelector = tracksFilters.filterByName(this.nameFilter)
        },
        clearNameFilter () {
            this.selectedNameFilter = ''
            this.nameSelector = t => t
        },
        onLayoutCategorySelected (name) {
            if(name) {
                this.layoutTypeSelector = tracksFilters.filterByLayoutCategory(name)
            } else {
                this.clearLayoutFilter()
            }
        },
        clearLayoutFilter () {
            this.selectedLayoutType = ''
            this.layoutTypeSelector = t => t
        },
        onTagSelected (name) {
            if(name) {
                this.trackTagsSelector = tracksFilters.filterByTag(name)
            } else {
                this.clearTagFilter()
            }
        },
        clearTagFilter () {
            this.selectedTag = ''
            this.trackTagsSelector = t => t
        },
        onNationSelected (name) {
            if(name){
                this.nationSelector = tracksFilters.filterByNation(name)
            } else {
                this.clearNationFilter()
            }

        },
        clearNationFilter () {
            this.selectedNation = ''
            this.nationSelector = t => t
        },
        onAuthorSelected (name) {
            if(name){
                this.authorSelector = tracksFilters.filterByAuthor(name)
            } else {
                this.clearAuthorFilter()
            }
        },
        clearAuthorFilter () {
            this.selectedAuthor = ''
            this.authorSelector = t => t
        },
    }
}
</script>

<style scoped>

</style>
