<template>
 <v-container>
   <v-row>
     <v-col cols="0" md="4"/>
     <v-col cols="12" md="4">
       <v-form ref="form" v-model="valid" @submit.prevent="onsubmit">
         <v-container>
           <v-row>
             <v-col cols="9" md="10">
               <v-text-field v-model="form.name" label="Name" required/>
             </v-col>
             <v-col cols="3" md="2">
               <v-checkbox v-model="serverPrivate" label="Private"/>
             </v-col>
           </v-row>
           <v-row>
             <v-col cols="12">
               <v-text-field v-model="form.description" label="Description" required/>
             </v-col>
           </v-row>
           <v-row>
             <v-col cols="12">
               <v-text-field v-model="form.joinLink" label="Join Link" required/>
             </v-col>
           </v-row>
           <v-row v-if="serverPrivate">
             <v-col cols="12">
               <v-text-field v-model="form.password" label="Password" required/>
             </v-col>
           </v-row>
           <v-row>
             <v-col>
               <v-autocomplete  v-model="form.track" :items="tracks" :item-text="t => `${t.name} ${t.year}`" item-value="id"
                                label="Track" required/>
             </v-col>
           </v-row>
           <v-row>
             <v-col>
               <v-autocomplete  v-model="form.cars" :items="cars" item-value="id"
                                :item-text="c => `${c.brand.name} ${c.modelName} ${c.year}`"
                                label="Cars" multiple required chips deletable-chips>
               </v-autocomplete>
             </v-col>
           </v-row>
         </v-container>
         <v-btn block color="primary" type="submit">Submit</v-btn>
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
  name: 'ServerForm',
  props: ['initialValue'],
  emits: ['submit'],
  data(){
    return {
      form : this.initialValue,
      serverPrivate : false,
      valid: true,
      confirm: false,
    }
  },
  computed: {
    cars(){
      return this.$store.getters['car/cars']
    },
    tracks(){
      return this.$store.getters['track/tracks']
    }
  },
  mounted () {
    this.initiate()
  },
  methods:{
    initiate(){
      this.$store.dispatch('car/getAll')
      this.$store.dispatch('track/getAllTracks')
    },
    onsubmit () {
      this.$refs.form.validate()
      if (this.valid) {
        this.confirm = true
      }
    },
    confirmed () {
      this.confirm = false
      this.$emit('submit', this.form)
    },
  }
}
</script>

<style scoped>

</style>
