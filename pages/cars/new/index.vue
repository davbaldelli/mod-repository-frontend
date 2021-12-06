<template>
  <LazyCarForm :initialValue="this.form" @submit="onSubmit"/>
</template>

<script>



export default {
  name: 'CarInput',
  middleware : 'admin',
  data(){
    return{
      form: {
        torque: 0,
        bhp: 0,
        weight: 0,
        topSpeed: 0,
        downloadLink: "",
        image: "",
        modelName: "",
        author: {
          name: "",
          link: "",
        },
        brand: {
          name: "",
          nation: {
            name: "",
            code: "",
          },
        },
        year: 0,
        drivetrain: "",
        transmission: "",
        categories: [],
        premium: false,
        rating: 0,
        version : "",
      }
    }
  },
  methods:{
    onSubmit(form){
      this.$store.dispatch('car/addCar', form)
    }
  }
}
</script>

<style scoped>

</style>
