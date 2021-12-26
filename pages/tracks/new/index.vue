<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <LazyTrackForm :initialValue="this.form" @submit="onSubmit"/>
      </v-col>
    </v-row>
    <v-snackbar v-model="showMsg">
      {{ message }}
      <template v-slot:action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="close()">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
export default {
  name: 'TrackInput',
  middleware: 'admin',
  head() {
    return {
      title : "Add Track"
    }
  },
  data () {
    return {
      showMsg: false,
      message: '',
      form: {
        downloadLink: '',
        image: '',
        name: '',
        location: '',
        tags: [],
        year: 0,
        nation: {
          name: '',
        },
        premium: false,
        layouts: [
          {
            lengthM: 0,
            category: '',
            name: '',
          },
        ],
        author: {
          name: '',
          link: '',
        },
        rating: 0,
        version: '',
      },
      success: false,
      successMessage: '',
      fail: false,
      failMessage: '',
    }
  },
  methods: {
    onSubmit (form) {
      this.$store.dispatch('track/addTrack', form)
        .then(() => {
          this.message = 'Track added successfully'
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
