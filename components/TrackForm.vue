<template>
  <v-container fluid>
    <v-row>
      <v-col/>
      <v-col>
        <v-form v-model="valid" ref="form" @submit.prevent="onsubmit">
          <v-container>
            <v-row>
              <v-col cols="10">
                <v-text-field v-model="form.name" :rules="rules.name" label="Name" required/>
              </v-col>
              <v-col cols="2">
                <v-checkbox v-model="form.premium" label="Premium"/>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field v-model="form.location" :rules="rules.location" label="Location" required/>
              </v-col>
            </v-row>
            <v-row>
              <v-col v-if="existingNation" cols="10">
                <v-autocomplete v-model="form.nation" :items="nations" return-object item-text="name" :rules="rules.nation" label="Nation" required/>
              </v-col>
              <v-col v-if="!existingNation" cols="5">
                <v-text-field v-model="form.nation.name" :rules="rules.nationName" label="Nation Name" required/>
              </v-col>
              <v-col v-if="!existingNation" cols="5">
                <v-text-field v-model="form.nation.code" :rules="rules.nationCode" label="Nation Code" required/>
              </v-col>
              <v-col cols="2">
                <v-checkbox v-model="existingNation" label="Existing" @change="clearNation"/>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field v-model.number="form.year" :rules="rules.year" label="Year" required type="number" />
              </v-col>
              <v-col>
                <v-select v-model="form.tags" :items="trackTags" label="Tag" multiple return-object></v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <v-text-field v-model="form.version" :rules="rules.version" label="Version" required/>
              </v-col>
              <v-col cols="6">
                <v-rating v-model="form.rating" :rules="rules.rating" :length="10" required/>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field v-model="form.downloadLink" :rules="rules.downloadLink" label="Download Link" required type="url" />
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field v-model="form.image" :rules="rules.image" label="Image Link" required type="url" />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="10" v-if="existingAuthor">
                <v-select v-model="form.author" :items="authors" :rules="rules.author" item-text="name" label="Author" return-object required/>
              </v-col>
              <v-col v-if="!existingAuthor" cols="5">
                <v-text-field v-model="form.author.name" :rules="rules.authorName" label="Author Name"/>
              </v-col>
              <v-col v-if="!existingAuthor" cols="5">
                <v-text-field v-model="form.author.link" :rules="rules.authorLink" label="Author Link"/>
              </v-col>
              <v-col cols="2">
                <v-checkbox v-model="existingAuthor" label="Existing" @change="clearAuthor"></v-checkbox>
              </v-col>
            </v-row>
            <v-row v-for="(layout, i) in form.layouts" :key="i">
              <v-col>
                <v-text-field v-model="layout.name" :rules="rules.layoutName" label="Layout Name" required/>
              </v-col>
              <v-col>
                <v-text-field v-model.number="layout.lengthM" :rules="rules.layoutLength" suffix="m" label="Layout Length" type="number" required/>
              </v-col>
              <v-col>
                <v-select v-model="layout.category" :items="layoutTypeOptions" label="Layout Type"></v-select>
              </v-col>
            </v-row>
          </v-container>
          <v-btn block type="submit">Insert</v-btn>
        </v-form>
      </v-col>
      <v-col/>
      <v-dialog v-model="confirm" max-width="290" v-on:keydown.enter="confirmed">
        <v-card>
          <v-card-title class="text-h5">
            Are you sure you want to submit?
          </v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="confirm = false">No</v-btn>
            <v-btn color="blue darken-1" text @click="confirmed">Yes</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>


</template>

<script>
export default {
  name: 'TrackForm',
  props: ["initialValue"],
  emits : ['submit'],
  data () {
    return {
      valid: true,
      existingNation: true,
      existingAuthor: true,
      form: this.initialValue,
      confirm : false,
      trackTags: [
        {text: "F1", value: "F1"},
        {text: "NASCAR", value: "NASCAR"},
        {text: "Historic", value: "Historic"},
        {text: "Rally", value: "Rally"},
        {text: "Drift", value: "Drift"},
        {text: "Open World", value: "Open World"},
        {text: "City Track", value: "City Track"},
        {text: "Touge", value: "Touge"},
        {text: "Endurance", value: "Endurance"},
        {text: "Street Circuit", value: "Street Track"},
        {text: "Fictional", value: "Fictional"},
        {text: "Karting", value: "Karting"},
      ],
      layoutTypeOptions: [
        {text: "Oval", value: "Oval"},
        {text: "Road Course", value: "Road Course"},
        {text: "A to B", value: "A to B"},
      ],
      rules: {
        name: [v => !!v || 'Name is required'],
        location : [v => !!v || 'Location is required'],
        nation: [v => !!v || 'Nation is required'],
        nationName: [v => !!v || 'Nation Name is required'],
        nationCode: [v => !!v || 'Nation Cod is required'],
        year: [v => !!v || 'Year is required' ],
        version: [v => !!v || 'Version is required'],
        rating: [v => !!v || 'Rating is required'],
        image: [v => !!v || 'Image Link is required'],
        downloadLink: [v => !!v || 'Download Link is required'],
        author: [v => !!v || 'Author is required'],
        authorName: [v => !!v || 'Author Name is required'],
        authorLink: [v => !!v || 'Author Link is required'],
        layoutName: [v => !!v || 'Layout Name is required'],
        layoutLength : [v => !!v || 'Layout Length is required'],
        layoutType : [v => !!v || 'Layout Type is required'],
      }
    }
  },
  computed:{
    nations(){
      return this.$store.getters['track/nations']
    },
    authors(){
      return this.$store.getters['author/authors']
    },
  },
  mounted () {
    this.initiate()
  },
  methods: {
    initiate(){
      this.$store.dispatch('author/getAll')
      this.$store.dispatch('track/getAllNations')
    },
    confirmed(){
      this.confirm = false
      this.$emit('submit', this.form)
    },
    onsubmit(){
      this.$refs.form.validate()
      if(this.valid){
        this.confirm = true
      }
    },
    clearAuthor () {
      this.form.author = {
        name : "",
        link : "",
      }
    },
    clearNation () {
      this.form.brand.nation = {
        name: '',
        code: '',
      }
    }
  }
}
</script>

<style scoped>

</style>

