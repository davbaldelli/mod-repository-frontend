<template>
<v-container>
  <v-row>
    <v-col cols="0" md="4"/>
    <v-col cols="12" md="4">
      <v-form ref="form" v-model="valid" @submit.prevent="onSubmit">
        <v-container>
          <v-row>
            <v-col>
              <v-text-field v-model="form.name" label="Name" :rules="rules.name" required/>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field v-model="form.downloadLink" label="Download Link" :rules="rules.downloadLink" required/>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field v-model="form.imageUrl" label="Image Url" :rules="rules.imageUrl" required/>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-autocomplete  v-model="form.carId" :items="cars" item-value="id"
                               :item-text="c => `${c.brand.name} ${c.modelName} ${c.year}`"
                               label="Cars" :rules="rules.carId" required chips deletable-chips>
              </v-autocomplete>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-btn block color="primary" type="submit">Submit</v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-col>
  </v-row>
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
</v-container>
</template>

<script>
export default {
  name: "SkinForm",
  props: ['initialValue'],
  emits: ['submit'],
  mounted() {
    this.initiate()
  },
  data(){
    return {
      valid : false,
      form : this.initialValue,
      confirm : false,
      rules: {
        name: [v => !!v || 'Name is required'],
        downloadLink : [v => !!v || 'Download Link is required'],
        imageUrl : [v => !!v || 'Image Url is required'],
        carId : [v => !!v || 'Car id is required']
      }
    }
  },
  computed : {
    cars(){
      return this.$store.getters['car/cars']
    }
  },
  methods : {
    onSubmit() {
      this.$refs.form.validate()
      if (this.valid) {
        this.confirm = true
      }
    },
    confirmed(){
      this.confirm = false
      this.$emit('submit', this.form)
    },
    initiate(){
      this.$store.dispatch('car/getAll')
    },
  },
}
</script>

<style scoped>

</style>
