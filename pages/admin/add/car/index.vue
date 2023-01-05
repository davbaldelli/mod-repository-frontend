<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <LazyCarForm :initialValue="this.form" @submit="onSubmit"/>
      </v-col>
    </v-row>
    <v-snackbar v-model="showMsg">
      {{ message }}
      <template v-slot:action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="close">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>

export default {
  name: 'CarInput',
  middleware: 'admin',
  head() {
    return {
      title : "Add Car"
    }
  },
  data () {
    return {
      showMsg: false,
      message: '',
      form: {
        torque: 0,
        bhp: 0,
        weight: 0,
        topSpeed: 0,
        downloadLink: '',
        images: [{url:"", favorite:true}],
        modelName: '',
        author: {
          name: '',
          link: '',
        },
        brand: {
          name: '',
          logo : '',
          nation: {
            name: '',
            code: '',
          },
        },
        year: 0,
        drivetrain: '',
        transmission: '',
        categories: [],
        premium: false,
        personal : false,
        official: false,
        rating: 0,
        version: '',
      }
    }
  },
  methods: {
    onSubmit (form) {
      this.$store.dispatch('car/addCar', form)
        .then(() => {
          this.message = 'Car added successfully'
          this.showMsg = true
        })
        .catch(e => {
          this.message = e
          this.showMsg = true
        })
    },
    close(){
      this.showMsg = false
      this.$router.back()
    }
  }
}
</script>

<style scoped>

</style>
