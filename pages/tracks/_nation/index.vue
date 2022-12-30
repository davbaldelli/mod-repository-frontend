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
            <v-img v-if="nation" height="120px" :src="`https://flagcdn.com/h120/${nation.code}.png`" contain class="mb-3"></v-img>
            <h1 class="text-h2 mb-3">{{nationName}}</h1>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field v-model="nameFilter" append-icon="mdi-magnify" clearable label="Type track name"
                          outlined v-on:keyup.enter="nameFilterClick" @click:append="onNameSelected" @click:clear="clearNameFilter"
            />
          </v-col>
        </v-row>
        <v-row>
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
              v-model.number="tracksPerPage"
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
            <v-chip v-if="selectedTag" close @click:close="clearTagFilter">Tag: {{ this.selectedTag }}</v-chip>
            <v-chip v-if="selectedLayoutType" close @click:close="clearLayoutFilter">Tag:
              {{ this.selectedLayoutType }}
            </v-chip>
            <v-chip v-if="selectedAuthor" close @click:close="clearAuthorFilter">Author: {{ this.selectedAuthor }}
            </v-chip>
          </v-col>
        </v-row>
        <v-row v-if="this.totPaginatorPages" class="px-3 my-3">
          <v-col>
            <v-pagination v-model="offset" :length="totPaginatorPages"/>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" v-for="(track, index) in pageTracks" :key="index">
            <TrackCard :track="track" @tag-click="onCardTagSelected"/>
          </v-col>
        </v-row>
        <v-row v-for="i in 20" v-if="loading" :key="i" class="mb-2">
          <v-col>
            <track-card-skeleton/>
          </v-col>
        </v-row>
        <v-row v-if="this.totPaginatorPages" class="px-3 my-3">
          <v-col>
            <v-pagination v-model="offset" :length="totPaginatorPages" @input="scrollToTop"/>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { tracksFilters, trackSort } from '@/_helpers'

export default {
  name: 'NationTracks',
  asyncData ({ params }) {
    return {
      breadCrumbs : [
        {
          text: 'Tracks',
          disabled : false,
          exact : true,
          to: '/tracks/',
        },
        {
          text: params.nation,
          disabled : true,
          exact : true,
          to: `/tracks/${params.nation}`,
        }
      ],
      nationName : params.nation.charAt(0).toUpperCase() + params.nation.slice(1)
    }
  },
  head(){
    return{
      title : this.nationName
    }
  },
  mounted () {
    this.initiate()
  },
  data(){
    return {
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
      offset : 1,
      tracksPerPage : 20,
      sorter: trackSort.sortByName(true),
      nameFilter: '',
      selectedNameFilter: '',
      nameSelector: t => t,
      layoutTypeSelector: t => t,
      selectedLayoutType: undefined,
      trackTagsSelector: t => t,
      selectedTag: undefined,
      authorSelector: t => t,
      selectedAuthor: undefined,
      selectedSort: undefined,
    }
  },
  computed:{
    tracks(){
      return tracksFilters.filterByNation(this.nationName)(this.$store.getters['track/tracks'])
    },
    pageTracks(){
      return this.filteredTracks.slice((this.offset - 1) * this.tracksPerPage, ((this.offset - 1) * this.tracksPerPage) + this.tracksPerPage)
    },
    filteredTracks () {
      return [...this.filter(this.tracks)].sort(this.sorter)
    },
    authors(){
      return this.$store.getters['track/authors']
    },
    tagOpts(){
      return this.$store.getters['track/trackTags']
    },
    categoryOpts(){
      return this.$store.getters['track/layoutCategories']
    },
    filter () {
      return t => this.authorSelector(this.nameSelector(this.layoutTypeSelector(this.trackTagsSelector(tracksFilters.filterByOfficial(false,this.isAdmin)(t)))))
    },
    loggedIn () {
      return this.$store.getters['authentication/loggedIn']
    },
    isAdmin(){
      return this.$store.getters['authentication/isAdmin']
    },
    loading(){
      return this.$store.getters['track/loadingTracks'] && this.tracks.length === 0
    },
    nation(){
      return this.$store.getters['track/nations'].find(n => n.name.toLowerCase() === this.nationName.toLowerCase())
    },
    totPaginatorPages(){
      if (this.tracks) {
        return Math.ceil(this.tracks.length / this.tracksPerPage)
      } else {
        return 0
      }
    }
  },
  methods:{
    initiate(){
      this.$store.dispatch('track/getAllTracks')
      this.$store.dispatch('track/getAllNations')
      this.$store.dispatch('track/getTracksAuthors')
    },
    scrollToTop(){
      window.scrollTo(0,0)
    },
    resetOffset(){
      this.offset = 1
    },
    sort (value) {
      this.sorter = value.sorter
      this.resetOffset()
    },
    nameFilterClick () {
      this.onNameSelected(this.nameFilter)
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
      //this.updateQuery()
      this.resetOffset()
    },
    clearLayoutFilter () {
      this.selectedLayoutType = undefined
      this.layoutTypeSelector = t => t
      //this.updateQuery()
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
      //this.updateQuery()
      this.resetOffset()
    },
    clearTagFilter () {
      this.selectedTag = undefined
      this.trackTagsSelector = t => t
      //this.updateQuery()
      this.resetOffset()
    },
    onAuthorSelected (name) {
      if (name) {
        this.authorSelector = tracksFilters.filterByAuthor(name)
      } else {
        this.clearAuthorFilter()
      }
      //this.updateQuery()
      this.resetOffset()
    },
    clearAuthorFilter () {
      this.selectedAuthor = undefined
      this.authorSelector = t => t
      //this.updateQuery()
      this.resetOffset()
    },
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
}
</script>

<style scoped>

</style>
