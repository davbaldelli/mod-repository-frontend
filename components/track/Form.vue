<template>
  <v-container fluid>
    <v-row>
      <v-col cols="0" md="4"/>
      <v-col cols="12" md="4">
        <v-form ref="form" v-model="valid" @submit.prevent="onsubmit">
          <v-container>
            <v-row>
              <v-col cols="6" md="6">
                <v-text-field v-model="form.name" :rules="rules.name" label="Name" required/>
              </v-col>
              <v-col cols="3" md="2">
                <v-checkbox v-model="form.premium" label="Paid"/>
              </v-col>
              <v-col cols="3" md="2">
                <v-checkbox v-model="form.personal" label="Personal"/>
              </v-col>
              <v-col cols="3" md="2">
                <v-checkbox v-model="form.official" label="Official"/>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field v-model="form.location" :rules="rules.location" label="Location" required/>
              </v-col>
            </v-row>
            <v-row>
              <v-col v-if="existingNation" cols="8" md="10">
                <v-autocomplete v-model="form.nation" :items="nations" :rules="rules.nation" item-text="name"
                                label="Nation" required return-object
                />
              </v-col>
              <v-col v-if="!existingNation" cols="4" md="5">
                <v-text-field v-model="form.nation.name" :rules="rules.nationName" label="Nation Name" required/>
              </v-col>
              <v-col v-if="!existingNation" cols="4" md="5">
                <v-text-field v-model="form.nation.code" :rules="rules.nationCode" label="Nation Code" required/>
              </v-col>
              <v-col cols="4" md="2">
                <v-checkbox v-model="existingNation" label="Existing" @change="clearNation"/>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field v-model.number="form.year" :rules="rules.year" label="Year" required type="number"/>
              </v-col>
              <v-col>
                <v-select v-model="form.tags" :items="tagOpts" label="Tag" multiple></v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field v-model="form.version" :rules="rules.version" label="Version" required/>
              </v-col>
              <v-col cols="12" md="6">
                <v-rating v-model="form.rating" :length="10" :rules="rules.rating" dense required/>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field v-model="form.downloadLink" :rules="rules.downloadLink" label="Download Link" required
                              type="url"
                />
              </v-col>
            </v-row>
            <v-row v-if="form.premium">
              <v-col>
                <v-text-field v-model="form.source" label="Source Link"
                              type="url"
                />
              </v-col>
            </v-row>
            <v-row v-for="(image, i) in form.images" :key="i">
              <v-col>
                <v-text-field v-model="image.url" :rules="rules.image" label="Image Link" required type="url"/>
              </v-col>
              <v-col cols="1">
                <v-img :src="image.url" contain height="50"></v-img>
              </v-col>
              <v-col cols="1">
                <v-checkbox v-model="image.favorite" label="Fav"></v-checkbox>
              </v-col>
              <v-col cols="1">
                <v-btn color="red" icon @click="removeImage(i)">
                  <v-icon>mdi-minus</v-icon>
                </v-btn>
              </v-col>
            </v-row>
            <v-row>
              <v-spacer/>
              <v-col cols="1">
                <v-btn color="blue" icon @click="addImage">
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </v-col>
            </v-row>
            <v-row>
              <v-col v-if="existingAuthor" cols="8" md="10">
                <v-select v-model="form.author" :items="authors" :rules="rules.author" item-text="name" label="Author"
                          required return-object
                />
              </v-col>
              <v-col v-if="!existingAuthor" cols="4" md="5">
                <v-text-field v-model="form.author.name" :rules="rules.authorName" label="Author Name"/>
              </v-col>
              <v-col v-if="!existingAuthor" cols="4" md="5">
                <v-text-field v-model="form.author.link" :rules="rules.authorLink" label="Author Link"/>
              </v-col>
              <v-col cols="4" md="2">
                <v-checkbox v-model="existingAuthor" label="Existing" @change="clearAuthor"></v-checkbox>
              </v-col>
            </v-row>
            <v-row v-for="(layout, i) in form.layouts" :key="i">
              <v-col>
                <v-text-field v-model="layout.name" :rules="rules.layoutName" label="Layout Name" required/>
              </v-col>
              <v-col>
                <v-text-field v-model.number="layout.lengthM" :rules="rules.layoutLength" label="Layout Length"
                              required suffix="m" type="number"
                />
              </v-col>
              <v-col>
                <v-select v-model="layout.category" :items="categoryOpts" label="Layout Type"></v-select>
              </v-col>
              <v-col cols="1">
                <v-btn color="red" icon @click="removeLayout(i)">
                  <v-icon>mdi-minus</v-icon>
                </v-btn>
              </v-col>
            </v-row>
            <v-row>
              <v-spacer/>
              <v-col cols="1">
                <v-btn color="blue" icon @click="addLayout">
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-btn block type="submit">Insert</v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-col>
      <v-col cols="0" md="4"/>
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
  props: ['initialValue'],
  emits: ['submit'],
  data () {
    return {
      valid: true,
      existingNation: true,
      existingAuthor: true,
      form: this.initialValue,
      confirm: false,
      rules: {
        name: [v => !!v || 'Name is required'],
        location: [v => !!v || 'Location is required'],
        nation: [v => !!v || 'Nation is required'],
        nationName: [v => !!v || 'Nation Name is required'],
        nationCode: [v => !!v || 'Nation Cod is required'],
        year: [v => !!v || 'Year is required'],
        version: [v => !!v || 'Version is required'],
        rating: [v => !!v || 'Rating is required'],
        image: [v => !!v || 'Image Link is required'],
        downloadLink: [v => !!v || 'Download Link is required'],
        author: [v => !!v || 'Author is required'],
        authorName: [v => !!v || 'Author Name is required'],
        authorLink: [v => !!v || 'Author Link is required'],
        layoutName: [v => !!v || 'Layout Name is required'],
        layoutLength: [v => !!v || 'Layout Length is required'],
        layoutType: [v => !!v || 'Layout Type is required'],
      }
    }
  },
  computed: {
    nations () {
      return this.$store.getters['track/nations']
    },
    authors () {
      return this.$store.getters['author/authors']
    },
    tagOpts(){
      return this.$store.getters['track/trackTags']
    },
    categoryOpts(){
      return this.$store.getters['track/layoutCategories']
    }
  },
  mounted () {
    this.initiate()
  },
  methods: {
    initiate () {
      this.$store.dispatch('author/getAll')
      this.$store.dispatch('track/getAllNations')
    },
    confirmed () {
      this.confirm = false
      this.$emit('submit', this.form)
    },
    onsubmit () {
      this.$refs.form.validate()
      if (this.valid) {
        this.confirm = true
      }
    },
    clearAuthor () {
      this.form.author = {
        name: '',
        link: '',
      }
    },
    clearNation () {
      this.form.brand.nation = {
        name: '',
        code: '',
      }
    },
    removeLayout (index) {
      this.form.layouts.splice(index, 1)
    },
    addLayout () {
      this.form.layouts.push({
        lengthM: 0,
        category: '',
        name: '',
      })
    },
    addImage(){
      this.form.images.push({url:""})
    },
    removeImage (index) {
      this.form.images.splice(index, 1)
    },
  }
}
</script>

<style scoped>

</style>

