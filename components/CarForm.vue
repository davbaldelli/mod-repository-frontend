<template>
  <v-container fluid>
    <v-row>
      <v-col/>
      <v-col>
        <v-form v-model="valid" ref="form" @submit.prevent="onsubmit">
          <v-container>
            <v-row>
              <v-col cols="10">
                <v-text-field v-model="form.modelName" :rules="rules.name" label="Model" required/>
              </v-col>
              <v-col cols="2">
                <v-checkbox v-model="form.premium" label="Premium"/>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="10">
                <v-autocomplete v-if="existingBrand" :items="brands" item-text="name"  return-object v-model="form.brand" :rules="rules.brand" label="Brand" required/>
                <v-text-field v-else v-model="form.brand.name" :rules="rules.brandName" label="Brand Name"/>
              </v-col>
              <v-col cols="2">
                <v-checkbox v-model="existingBrand" label="Existing"/>
              </v-col>
            </v-row>
            <v-row>
              <v-col v-if="existingNation && !existingBrand" cols="10">
                <v-autocomplete v-model="form.brand.nation" :items="nations" return-object item-text="name" :rules="rules.nation" label="Nation" required/>
              </v-col>
              <v-col v-if="!existingNation && !existingBrand" cols="5">
                <v-text-field v-model="form.brand.nation.name" :rules="rules.nationName" label="Nation Name" required/>
              </v-col>
              <v-col v-if="!existingNation && !existingBrand" cols="5">
                <v-text-field v-model="form.brand.nation.code" :rules="rules.nationCode" label="Nation Code" required/>
              </v-col>
              <v-col v-if="!existingBrand" cols="2">
                <v-checkbox v-model="existingNation" label="Existing"/>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field v-model="form.year" :rules="rules.year" label="Year" required type="number" />
              </v-col>
              <v-col>
                <v-select v-model="form.categories" :items="categories" item-text="name" label="Categories" multiple return-object></v-select>
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
                <v-text-field v-model="form.bhp" :rules="rules.power" label="Power" suffix="BHP" required type="number" />
              </v-col>
              <v-col>
                <v-text-field v-model="form.torque" :rules="rules.torque" label="Torque" suffix="Nm" required type="number" />
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field v-model="form.weight" :rules="rules.weight" label="Weight" suffix="Kg" required type="number" />
              </v-col>
              <v-col>
                <v-text-field v-model="form.topSpeed" :rules="rules.topSpeed" label="Top Speed" suffix="Km/h" required type="number" />
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-select v-model="form.drivetrain" :items="drivetrainOptions" :rules="rules.drivetrain" label="Drivetrain" required/>
              </v-col>
              <v-col>
                <v-select v-model="form.transmission" :items="transmissionOptions" :rules="rules.transmission" label="Transmission" required/>
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
                <v-checkbox v-model="existingAuthor" label="Existing"></v-checkbox>
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
  name: 'CarForm',
  props: ["initialValue"],
  emits : ['submit'],
  data () {
    return {
      valid: true,
      existingBrand: true,
      existingNation: true,
      existingAuthor: true,
      form: this.initialValue,
      confirm : false,
      transmissionOptions: [
        {value: "SEQUENTIAL", text: "Sequential"},
        {value: "MANUAL", text: "Manual"},
      ],
      drivetrainOptions: [
        {value: "AWD", text: "AWD"},
        {value: "RWD", text: "RWD"},
        {value: "FWD", text: "FWD"},
      ],
      categories : [
        {name : "Endurance"},
        {name : "Formula"},
        {name : "GT"},
        {name : "Prototype"},
        {name : "Rally"},
        {name : "Stock Car"},
        {name : "Street"},
        {name : "Tuned"},
        {name : "Touring"},
        {name : "Vintage"},
      ],
      rules: {
        name: [v => !!v || 'Name is required'],
        brand: [v => !!v || 'Brand is required'],
        brandName: [v => !!v || 'Brand Name is required'],
        nation: [v => !!v || 'Nation is required'],
        nationName: [v => !!v || 'Nation Name is required'],
        nationCode: [v => !!v || 'Nation Cod is required'],
        year: [v => !!v || 'Year is required' ],
        version: [v => !!v || 'Version is required'],
        rating: [v => !!v || 'Rating is required'],
        power: [v => !!v || 'Power is required'],
        torque: [v => !!v || 'Torque is required'],
        weight: [v => !!v || 'Weight is required'],
        topSpeed: [v => !!v || 'Top Speed is required'],
        drivetrain: [v => !!v || 'Drivetrain is required'],
        transmission: [v => !!v || 'Transmission is required'],
        image: [v => !!v || 'Image Link is required'],
        downloadLink: [v => !!v || 'Download Link is required'],
        author: [v => !!v || 'Author is required'],
        authorName: [v => !!v || 'Author Name is required'],
        authorLink: [v => !!v || 'Author Link is required'],
      }
    }
  },
  computed:{
    nations(){
      return this.$store.getters['car/nations']
    },
    brands(){
      return this.$store.getters['car/brands']
    } ,
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
      this.$store.dispatch('car/getCarBrands')
      this.$store.dispatch('car/getBrandNations')
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
    }
  }
}
</script>

<style scoped>

</style>
