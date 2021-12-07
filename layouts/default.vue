<template class="p-grid p-m-0">
  <v-app>
    <v-app-bar app elevate-on-scroll elevation="1">
      <v-container fluid class="d-none d-sm-flex">
        <v-row no-gutters>
          <v-col cols="0" lg="3" md="2"/>
          <v-col class="d-inline-flex" cols="12" lg="6" md="8">
            <v-btn class="d-none d-sm-flex" plain to="/">
              <FontAwesomeIcon class="mr-1" icon="home"></FontAwesomeIcon>
              Home
            </v-btn>
            <v-btn class="d-none d-sm-flex" plain to="/cars/">
              <FontAwesomeIcon class="mr-1" icon="car"></FontAwesomeIcon>
              Cars
            </v-btn>
            <v-btn class="d-none d-sm-flex" plain to="/tracks/">
              <FontAwesomeIcon class="mr-1" icon="road"></FontAwesomeIcon>
              Tracks
            </v-btn>
            <v-btn class="d-none d-sm-flex" plain to="/logs/">
              <FontAwesomeIcon class="mr-1" icon="clipboard-list"></FontAwesomeIcon>
              Logs
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn v-if="adminLogged" class="d-none d-sm-flex" plain @click="logOut">
              <FontAwesomeIcon class="mr-1" icon="sign-out-alt"></FontAwesomeIcon>
              Logout
            </v-btn>
          </v-col>
          <v-col cols="0" lg="3" md="2"/>
        </v-row>
      </v-container>
      <v-app-bar-nav-icon class="d-sm-none" @click.stop="drawer = !drawer" aria-label="navigation drawer button"/>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            Navigation
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list dense nav>
        <v-list-item link to="/">
          <FontAwesomeIcon class="mr-4" icon="home"></FontAwesomeIcon>
          Home
        </v-list-item>
        <v-list-item link to="/cars/">
          <FontAwesomeIcon class="mr-4" icon="car"></FontAwesomeIcon>
          Cars
        </v-list-item>
        <v-list-item link to="/tracks/">
          <FontAwesomeIcon class="mr-4" icon="road"></FontAwesomeIcon>
          Tracks
        </v-list-item>
        <v-list-item link to="/logs/">
          <FontAwesomeIcon class="mr-4" icon="clipboard-list"></FontAwesomeIcon>
          Logs
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list-item v-if="adminLogged" @click="logOut">
        <FontAwesomeIcon class="mr-4" icon="sign-out-alt"></FontAwesomeIcon>
        Logout
      </v-list-item>
    </v-navigation-drawer>
    <v-main app>
      <Nuxt :keep-alive-props="{include:['CarList','TracksList']}" keep-alive/>
    </v-main>
    <cookie-law theme="base"></cookie-law>
  </v-app>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import useVuelidate from '@vuelidate/core'
import required from 'vuelidate/lib/validators/required'

export default {
  name: 'App',
  components: {
    FontAwesomeIcon
  },
  emits: ['loggedOut', 'loggedIn'],
  setup () {
    return { v$: useVuelidate() }
  },
  data () {
    return {
      drawer: false,
    }
  },
  validations () {
    return {
      username: {
        required
      },
      password: {
        required
      },
    }
  },
  computed: {
    logged () {
      return this.$store.getters['authentication/isLogged']
    },
    adminLogged () {
      return this.$store.getters['authentication/isAdmin']
    },
    alert () {
      return this.$store.getters['alert/alert']
    },
    loggedUsername () {
      return this.$store.getters['authentication/user'].username
    }
  },
  watch: {
    $route () {
      // clear alert on location change
      this.$store.dispatch('alert/clear')
    },
    alert: {
      async handler (value) {
        if (value.message && value.message.status === 401) {
          if (this.$store.getters['authentication/user'].username === 'base') {
            await this.$store.dispatch('authentication/login', {
              'username': 'base',
              'password': 'dumbass'
            })
              .then(() => this.$store.dispatch('alert/clear'))
            this.$emit('loggedOut')
          } else {
            await this.$router.push('/login')
          }
        }
      },
      deep: true
    },
  },
  methods: {
    handleSubmit (isFormValid) {
      this.submitted = true
      if (!isFormValid) {
        return
      }

      this.$store.dispatch('authentication/login', {
        username: this.username,
        password: this.password
      })
        .then(() => {
          this.$store.dispatch('alert/clear')
          this.$emit('logged')
          this.closeDialog()
        })
        .catch(() => {
          alert('wrong username or password!')
        })

    },
    toggleDialog () {
      console.log('dio can')
      this.display = true
    },
    closeDialog () {
      this.display = false
    },
    resetModal () {
      if (!this.submitted && this.alert.message && this.alert.message.status === 401) {
        this.logOut()
      }
      this.username = ''
      this.password = ''
      this.submitted = false
    },
    async logOut () {
      this.closeDialog()
      await this.$store.dispatch('authentication/login', {
        'username': 'base',
        'password': 'dumbass'
      }).then(() =>
        this.$store.dispatch('alert/clear')
      )
      this.$emit('loggedOut')
    }
  }
}
</script>
<style>

</style>

