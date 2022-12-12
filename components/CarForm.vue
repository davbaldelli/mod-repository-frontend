<template>
  <v-container fluid>
    <v-row>
      <v-col cols="0" md="4"/>
      <v-col cols="12" md="4">
        <v-form ref="form" v-model="valid" @submit.prevent="onsubmit">
          <v-container>
            <v-row>
              <v-col cols="8" md="6">
                <v-text-field v-model="form.modelName" :rules="rules.name" label="Model" required/>
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
              <v-col v-if="existingBrand" cols="8" md="10">
                <v-autocomplete  v-model="form.brand" :items="brands" :rules="rules.brand" item-text="name"
                                label="Brand" required return-object
                />
              </v-col>
              <v-col v-if="!existingBrand" cols="4" md="5">
                <v-text-field v-model="form.brand.name" :rules="rules.brandName" label="Brand Name"/>
              </v-col>
              <v-col v-if="!existingBrand" cols="4" md="5">
                <v-text-field v-model="form.brand.logo" :rules="rules.brandLogo" label="Brand Logo"/>
              </v-col>
              <v-col cols="4" md="2">
                <v-checkbox v-model="existingBrand" label="Existing" @change="clearBrand"/>
              </v-col>
            </v-row>
            <v-row>
              <v-col v-if="existingNation && !existingBrand" cols="8" md="10">
                <v-autocomplete v-model="form.brand.nation" :items="nations" :rules="rules.nation" item-text="name"
                                label="Nation" required return-object
                />
              </v-col>
              <v-col v-if="!existingNation && !existingBrand" cols="4" md="5">
                <v-text-field v-model="form.brand.nation.name" :rules="rules.nationName" label="Nation Name" required/>
              </v-col>
              <v-col v-if="!existingNation && !existingBrand" cols="4" md="5">
                <v-text-field v-model="form.brand.nation.code" :rules="rules.nationCode" label="Nation Code" required/>
              </v-col>
              <v-col v-if="!existingBrand" cols="4" md="2">
                <v-checkbox v-model="existingNation" label="Existing" @change="clearNation"/>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field v-model.number="form.year" :rules="rules.year" label="Year" required type="number"/>
              </v-col>
              <v-col>
                <v-select v-model="form.categories" :items="categories" item-text="name" label="Categories" multiple
                          return-object
                ></v-select>
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
                <v-text-field v-model.number="form.bhp" :rules="rules.power" label="Power" required suffix="BHP"
                              type="number"
                />
              </v-col>
              <v-col>
                <v-text-field v-model.number="form.torque" :rules="rules.torque" label="Torque" required suffix="Nm"
                              type="number"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field v-model.number="form.weight" :rules="rules.weight" label="Weight" required suffix="Kg"
                              type="number"
                />
              </v-col>
              <v-col>
                <v-text-field v-model.number="form.topSpeed" :rules="rules.topSpeed" label="Top Speed" required
                              suffix="Km/h" type="number"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-select v-model="form.drivetrain" :items="drivetrainOptions" :rules="rules.drivetrain"
                          label="Drivetrain" required
                />
              </v-col>
              <v-col>
                <v-select v-model="form.transmission" :items="transmissionOptions" :rules="rules.transmission"
                          label="Transmission" required
                />
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
            <v-row>
              <v-col>
                <v-text-field v-model="form.image" :rules="rules.image" label="Image Link" required type="url"/>
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
          </v-container>
          <v-btn block color="primary" type="submit">Insert</v-btn>
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
  name: 'CarForm',
  props: ['initialValue'],
  emits: ['submit'],
  data () {
    return {
      valid: true,
      existingBrand: true,
      existingNation: true,
      existingAuthor: true,
      form: this.initialValue,
      confirm: false,
      transmissionOptions: [
        {
          value: 'SEQUENTIAL',
          text: 'Sequential'
        },
        {
          value: 'MANUAL',
          text: 'Manual'
        },
      ],
      drivetrainOptions: [
        {
          value: 'AWD',
          text: 'AWD'
        },
        {
          value: 'RWD',
          text: 'RWD'
        },
        {
          value: 'FWD',
          text: 'FWD'
        },
      ],
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
      rules: {
        name: [v => !!v || 'Name is required'],
        brand: [v => !!v || 'Brand is required'],
        brandName: [v => !!v || 'Brand Name is required'],
        brandLogo : [v => !!v || 'Brand Logo is required'],
        nation: [v => !!v || 'Nation is required'],
        nationName: [v => !!v || 'Nation Name is required'],
        nationCode: [v => !!v || 'Nation Cod is required'],
        year: [v => !!v || 'Year is required'],
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
  computed: {
    nations () {
      return this.$store.getters['car/nations']
    },
    brands () {
      return this.$store.getters['car/brands']
    },
    authors () {
      return this.$store.getters['author/authors']
    },
  },
  mounted () {
    this.initiate()
  },
  methods: {
    initiate () {
      this.$store.dispatch('author/getAll')
      this.$store.dispatch('car/getCarBrands')
      this.$store.dispatch('car/getBrandNations')
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
    clearBrand () {
      this.form.brand = {
        name: '',
        nation: {
          name: '',
          code: '',
        }
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
    }
  }
}
</script>

<style scoped>

</style>
