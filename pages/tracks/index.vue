<template>
  <v-container fluid>
    <v-row class="mt-5 mb-5">
      <v-col class="text-center" cols="12">
        <h1 class="text-h2 mb-3">Tracks Repository</h1>
        <h2 class="text-h5"><em>A collection of quality tracks</em></h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="0" lg="3" md="2"/>
      <v-col cols="12" lg="6" md="8">
        <v-row>
          <v-col>
            <v-text-field v-model="nameFilter" append-icon="mdi-magnify" clearable label="Type track name"
                          outlined v-on:keyup.enter="nameFilterClick" @click:append="onNameSelected"
            />
          </v-col>
        </v-row>
        <v-row v-if="this.totPaginatorPages">
          <v-col>
            <v-pagination v-model="offset" :length="totPaginatorPages"/>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6" lg="2">
            <v-autocomplete v-model="selectedNation" :items="nations" clearable
                            dense item-text="name" item-value="name" label="Nation" outlined @change="v => onNationSelected(v)"
            ></v-autocomplete>
          </v-col>
          <v-col cols="6" lg="2">
            <v-select v-model="selectedTag" :items="tagsOpts"
                      clearable dense item-text="text" item-value="value" label="Tags"
                      outlined @change="v => onTagSelected(v)"
            ></v-select>
          </v-col>
          <v-col cols="6" lg="2">
            <v-select v-model="selectedLayoutType" :items="categoryOpts"
                      clearable dense item-text="text" item-value="value" label="Layout Type"
                      outlined @change="v => onLayoutCategorySelected(v)"
            ></v-select>
          </v-col>
          <v-col cols="6" lg="2">
            <v-autocomplete v-model="selectedAuthor" :items="authors" clearable
                            dense item-text="name" item-value="name" label="Author" outlined @change="v => onAuthorSelected(v)"
            ></v-autocomplete>
          </v-col>
          <v-spacer/>
          <v-col cols="4" lg="2">
            <v-select v-model="selectedSort" :items="sortOpts" dense item-text="label" label="Sort"
                      return-object @change="v => sort(v)"
            ></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="mt-0 mb-3" cols="12">
            <v-chip v-if="selectedNameFilter" close @click:close="clearNameFilter">Name: {{ this.selectedNameFilter }}
            </v-chip>
            <v-chip v-if="selectedNation" close @click:close="clearNationFilter">Nation: {{ this.selectedNation }}
            </v-chip>
            <v-chip v-if="selectedTag" close @click:close="clearTagFilter">Tag: {{ this.selectedTag }}</v-chip>
            <v-chip v-if="selectedLayoutType" close @click:close="clearLayoutFilter">Tag:
              {{ this.selectedLayoutType }}
            </v-chip>
            <v-chip v-if="selectedAuthor" close @click:close="clearAuthorFilter">Author: {{ this.selectedAuthor }}
            </v-chip>
          </v-col>
        </v-row>
        <v-row v-for="(track, index) in pageTracks" :key="index" class="mb-2">
          <v-col cols="12" >
            <v-card>
              <v-row no-gutters>
                <v-col cols="12" md="5" xl="4">
                  <div class="h-100">
                    <v-img :src="track.image" alt="track thumbnail" class="ma-3 rounded" contain/>
                  </div>
                </v-col>
                <v-col cols="12" md="7" xl="8" class="d-flex flex-column">
                  <v-card-title>
                    <NuxtLink :to="`/tracks/${track.id}`">
                      <h3 class="text-h7">{{ track.name }}</h3>
                    </NuxtLink>
                    <v-spacer/>
                    <v-rating v-model="track.rating/2" background-color="orange lighten-3"
                              class="pb-2" color="orange" dense half-increments readonly
                    ></v-rating>
                  </v-card-title>
                  <v-card-subtitle>
                    <v-chip v-for="tag in track.tags" :key="tag"
                            class="mr-1" label x-small
                    >{{ tag }}
                    </v-chip>
                    <v-chip v-if="track.premium" class="mr-1" color="orange" label x-small>Premium</v-chip>

                  </v-card-subtitle>
                  <v-card-text>
                    <strong>Location: </strong>{{ track.location }}, {{ track.nation.name }}<br/>
                    <strong>Author: </strong>
                    <a :href="track.author.link" rel="noopener" target="_blank">
                      {{ track.author.name }}
                    </a> v{{ track.version }}

                  </v-card-text>
                  <v-card-actions class="mt-auto pa-4">
                    <v-spacer></v-spacer>
                    <v-btn v-if="userRole === 'admin'" :to="`/tracks/edit/${track.id}`" color="orange">Edit</v-btn>
                    <v-btn :href="track.downloadLink" color="primary" rel="noopener" target="_blank">Download</v-btn>
                  </v-card-actions>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
        <v-row v-if="!$store.getters['track/loadingTracks'] && filteredTracks.length === 0">
          <v-col class="text-center">
            <h3 class="display-6">I'm sorry, no car match your request</h3>
          </v-col>
        </v-row>
        <v-row v-for="i in 20" v-if="$store.getters['track/loadingTracks']" :key="i" class="mb-2">
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
        <v-row v-if="this.totPaginatorPages">
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
          sorter: trackSort.sortByName(true)
        },
        {
          label: 'Name (Z-A)',
          sorter: trackSort.sortByName(false)
        },
        {
          label: 'Latest Submitted',
          sorter: trackSort.sortBySubmission()
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
    totPaginatorPages () {
      if (this.filteredTracks) {
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
      this.sorter = value.sorter
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
      if (name) {
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
      if (name) {
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
      if (name) {
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
      if (name) {
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
