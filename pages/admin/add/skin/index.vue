<template>
  <div>
    <skin-form :initial-value="this.initialValue" @submit="onSubmit"></skin-form>
    <v-snackbar v-model="showMsg">
      {{ message }}
      <template v-slot:action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="close">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      initialValue : {
        name : "",
        imageUrl : "",
        downloadLink : "",
        carId : null
      },
      showMsg : false
    }
  },
  methods : {
    onSubmit (form) {
      this.$store.dispatch('skin/addSkin', form)
        .then(() => {
          this.message = 'Skin added successfully'
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
