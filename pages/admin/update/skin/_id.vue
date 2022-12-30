<template>
  <div>
    <skin-form v-if="initialValue" :initial-value="this.initialValue" @submit="onSubmit"></skin-form>
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
  name: "SkinUpdate",
  asyncData({params}) {
    return {
      skinId : params.id
    }
  },
  data() {
    return {
      showMsg : false,
      message : ""
    }
  },
  computed : {
    initialValue(){
      return this.skin ? {...this.skin} : null
    },
    skin(){
      return this.$store.getters["skin/skin"](this.skinId)
    },
    skins(){
      return this.$store.getters["skin/skins"]
    }
  },
  mounted() {
    this.initialize()
  },
  methods : {
    initialize(){
      this.$store.dispatch('skin/getAllSkins')
    },
    onSubmit (form) {
      this.$store.dispatch('skin/updateSkin', form)
        .then(() => {
          this.message = 'Skin updated successfully'
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
