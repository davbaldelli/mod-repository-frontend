<template>
  <v-container fluid>
    <v-row>
      <v-col cols="0" lg="3" md="2" class="d-none d-md-block"/>
      <v-col cols="12" lg="6" md="8">
        <v-row>
          <v-col>
            <v-breadcrumbs :items="breadcrumbs" class="px-0"></v-breadcrumbs>
          </v-col>
        </v-row>
        <v-row class="my-3">
          <v-col class="text-center" cols="12">
            <h1 class="text-h2 mb-3">Tracks Repository</h1>
            <h2 class="text-h5"><em>A collection of quality tracks</em></h2>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field v-model="nameFilter" append-icon="mdi-magnify" clearable label="Type track name"
                          outlined v-on:keyup.enter="nameFilterClick" @click:append="onNameSelected" @click:clear="clearNameFilter"
            />
          </v-col>
        </v-row>
        <v-row v-if="this.totPaginatorPages" class="my-3">
          <v-col>
            <v-pagination v-model="offset" :length="totPaginatorPages" />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6" lg="2">
            <v-autocomplete v-model="selectedNation" :items="nations"
                            dense item-text="name" item-value="name" label="Nation" outlined @change="v => onNationSelected(v)"
            ></v-autocomplete>
          </v-col>
          <v-col cols="6" lg="2">
            <v-select v-model="selectedTag" :items="tagOpts"
                      dense item-text="text" item-value="value" label="Tags"
                      outlined @change="v => onTagSelected(v)"
            ></v-select>
          </v-col>
          <v-col cols="6" lg="2">
            <v-select v-model="selectedLayoutType" :items="categoryOpts"
                      dense item-text="text" item-value="value" label="Layout Type"
                      outlined @change="v => onLayoutTypeSelected(v)"
            ></v-select>
          </v-col>
          <v-col cols="6" lg="2">
            <v-autocomplete v-model="selectedAuthor" :items="authors"
                            dense item-text="name" item-value="name" label="Author" outlined @change="v => onAuthorSelected(v)"
            ></v-autocomplete>
          </v-col>
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
        <v-row v-for="(track, index) in pageTracks" :key="index">
          <v-col cols="12">
            <TrackCard :track="track" @tag-click="onCardTagSelected"/>
          </v-col>
        </v-row>
        <v-row v-if="!$store.getters['track/loadingTracks'] && filteredTracks.length === 0">
          <v-col class="text-center">
            <h3 class="display-6">I'm sorry, no track matches your request</h3>
          </v-col>
        </v-row>
        <v-row v-for="i in 20" v-if="loading" :key="i" class="mb-2">
          <v-col>
            <track-card-skeleton/>
          </v-col>
        </v-row>
        <v-row v-if="this.totPaginatorPages">
          <v-col>
            <v-pagination v-model="offset" :length="totPaginatorPages" @input="scrollToTop"/>
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

  head(){
    return{
      title : "All Tracks"
    }
  },
  asyncData ($route) {
    return {
      breadcrumbs : [
        {
          text: 'Tracks',
          disabled : false,
          exact : true,
          to: '/tracks/',
        },
        {
          text: "All",
          disabled : true,
          exact: true,
          to: `/tracks/all`,
        }
      ],
      initialTag : $route.query.tag,
      initialAuthor : $route.query.author,
      initialNation : $route.query.nation,
      initialLayoutType : $route.query.layoutType,
    }
  },
  data () {
    return {
      nameFilter: '',
      selectedNameFilter: '',
      pageRows: 20,
      offset: 1,
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
          label: 'Last Added',
          sorter: trackSort.sortBySubmission()
        },
        {
          label: 'Rating',
          sorter: trackSort.sortByRating()
        }
      ],
      sorter: trackSort.sortByName(true),
      nameSelector: t => t,
      layoutTypeSelector: t => t,
      selectedLayoutType: undefined,
      nationSelector: t => t,
      selectedNation: undefined,
      trackTagsSelector: t => t,
      selectedTag: undefined,
      authorSelector: t => t,
      selectedAuthor: undefined,
      selectedSort: undefined,
    }
  },
  mounted () {
    this.initiate()
  },
  computed: {
    totPaginatorPages () {
      if (this.filteredTracks) {
        return Math.ceil(this.filteredTracks.length / this.pageRows)
      } else {
        return 0
      }
    },
    tagOpts(){
      return this.$store.getters['track/trackTags']
    },
    categoryOpts(){
      return this.$store.getters['track/layoutCategories']
    },
    loading(){
      return this.$store.getters['track/loadingTracks'] && this.tracks.length === 0
    },
    filter () {
      return t => this.authorSelector(this.nameSelector(this.layoutTypeSelector(this.trackTagsSelector(this.nationSelector(tracksFilters.filterByOfficial(false, this.isAdmin)(t))))))
    },
    loggedIn () {
      return this.$store.getters['authentication/loggedIn']
    },
    isAdmin(){
      return this.$store.getters['authentication/isAdmin']
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
    },
    pageRows(){
      this.resetOffset()
    },
  },
  methods: {
    updateQuery(){
      this.$router.replace({
        query : {
          tag : this.selectedTag,
          author : this.selectedAuthor,
          nation : this.selectedNation,
          layoutType : this.selectedLayoutType
        }})
    },
    scrollToTop(){
      window.scrollTo(0,0)
    },
    resetOffset(){
      this.offset = 1;
    },
    nameFilterClick () {
      this.onNameSelected(this.nameFilter)
    },
    initiate () {
      this.getAllTracks()
      this.$store.dispatch('track/getTracksAuthors')
      this.$store.dispatch('track/getAllNations')
      if(this.initialTag){
        this.selectedTag = this.initialTag
        this.onTagSelected(this.initialTag)
      }
      if(this.initialNation){
        this.selectedNation = this.initialNation
        this.onNationSelected(this.initialNation)
      }
      if(this.initialAuthor){
        this.selectedAuthor = this.initialAuthor
        this.onAuthorSelected(this.initialAuthor)
      }
      if(this.initialLayoutType){
        this.selectedLayoutType = this.initialLayoutType
        this.onLayoutTypeSelected(this.initialLayoutType)
      }
    },
    getAllTracks () {
      this.$store.dispatch('track/getAllTracks')
    },
    sort (value) {
      this.sorter = value.sorter
      this.resetOffset()
    },
    onNameSelected () {
      this.selectedNameFilter = this.nameFilter
      this.nameSelector = tracksFilters.filterByName(this.nameFilter)
      this.resetOffset()
    },
    clearNameFilter () {
      this.selectedNameFilter = ''
      this.nameSelector = t => t
      this.resetOffset()
    },
    onLayoutTypeSelected (name) {
      if (name) {
        this.layoutTypeSelector = tracksFilters.filterByLayoutCategory(name)
      } else {
        this.clearLayoutFilter()
      }
      this.updateQuery()
      this.resetOffset()
    },
    clearLayoutFilter () {
      this.selectedLayoutType = undefined
      this.layoutTypeSelector = t => t
      this.updateQuery()
      this.resetOffset()
    },
    onCardTagSelected(name){
      this.selectedTag=name
      this.scrollToTop()
      this.onTagSelected(name)
    },
    onTagSelected (name) {
      if (name) {
        this.trackTagsSelector = tracksFilters.filterByTag(name)
      } else {
        this.clearTagFilter()
      }
      this.updateQuery()
      this.resetOffset()
    },
    clearTagFilter () {
      this.selectedTag = undefined
      this.trackTagsSelector = t => t
      this.updateQuery()
      this.resetOffset()
    },
    onNationSelected (name) {
      if (name) {
        this.nationSelector = tracksFilters.filterByNation(name)
      } else {
        this.clearNationFilter()
      }
      this.updateQuery()
      this.resetOffset()
    },
    clearNationFilter () {
      this.selectedNation = undefined
      this.nationSelector = t => t
      this.updateQuery()
      this.resetOffset()
    },
    onAuthorSelected (name) {
      if (name) {
        this.authorSelector = tracksFilters.filterByAuthor(name)
      } else {
        this.clearAuthorFilter()
      }
      this.updateQuery()
      this.resetOffset()
    },
    clearAuthorFilter () {
      this.selectedAuthor = undefined
      this.authorSelector = t => t
      this.updateQuery()
      this.resetOffset()
    },
  }
}
</script>

<style scoped>
</style>
