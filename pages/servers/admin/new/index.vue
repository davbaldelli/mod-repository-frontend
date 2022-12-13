<template>
  <v-container>
    <v-row>
      <v-col>
        <lazy-server-form :initial-value="form" @submit="onSubmit"></lazy-server-form>
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
  name: 'AddServer',
  middleware : 'fsradmin',
  head(){
    return {
      title : "Add Server"
    }
  },
  data(){
    return{
      showMsg: false,
      message: '',
      form : {
        name: "",
        description: "",
        joinLink: "",
        password: "",
        online: false,
        track: 9,
        cars: [],
        outsideCars : [],

      },
    }
  },
  methods : {
    onSubmit (form) {
      this.$store.dispatch('server/addServer', form)
        .then(() => {
          this.message = 'Server added successfully'
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
