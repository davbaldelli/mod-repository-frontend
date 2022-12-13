<template>
<v-container>
  <v-row>
    <v-col cols="0" md="4"/>
    <v-col cols="12" md="4">
      <v-form ref="form" v-model="valid" @submit.prevent="onSubmit">
        <v-row>
          <v-col>
            <v-text-field v-model="username" :rules="rules.username" required></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field v-model="password" :append-icon="showPswd ? 'mdi-eye' : 'mdi-eye-off'" :rules="rules.password"
                          :type="showPswd ? 'text' : 'password'" required
                          @click:append="showPswd = !showPswd"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-select v-model="role" :items="roles" :rules="rules.role" label="Role" required/>
          </v-col>
        </v-row>
        <v-row>
          <v-btn block color="blue" type="submit">Add user</v-btn>
        </v-row>
      </v-form>
    </v-col>
    <v-col cols="0" md="4"/>
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
  name: 'index',
  middleware : 'admin',
  data() {
    return {
      roles : [
        'admin',
        'premium',
        'fsrteam',
      ],
      username : '',
      password : '',
      role : '',
      showPswd : false,
      rules: {
        username: [v => !!v || 'Username is required'],
        password: [v => !!v || 'Password is required'],
        role: [v => !!v || 'Role is required'],
      },
      valid : false,
      showMsg : '',
      message : '',
    }
  },
  methods : {
    onSubmit () {
      this.$refs.form.validate()
      if (this.valid) {
        this.onValidated()
      }
    },
    onValidated(){
      this.$store.dispatch('authentication/signIn',{
        username : this.username,
        password : this.password,
        role : this.role,
      }).then((user) => {
        this.message = 'User added successfully'
        this.showMsg = true
      })
        .catch(error => {
          this.message = error
          this.showMsg = true
        })
    },
    close(){

    }
  }

}
</script>

<style scoped>

</style>
