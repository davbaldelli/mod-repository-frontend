<template class="p-grid p-m-0">
  <v-app>
    <v-app-bar app elevate-on-scroll elevation="1">
      <v-container fluid class="d-none d-sm-flex">
        <v-row no-gutters>
          <v-col cols="0" xl="3" lg="2" md="1" class="d-none d-md-block"/>
          <v-col class="d-inline-flex" cols="12" xl="6" lg="8" md="10">
            <v-btn v-for="(item, i) in menuItems" class="d-none d-sm-flex" plain :to="item.to" :key="i">
              <FontAwesomeIcon class="mr-1" :icon="item.icon"></FontAwesomeIcon>
              {{item.text}}
            </v-btn>
            <v-spacer></v-spacer>
            <v-menu offset-y v-if="admin">
              <template v-slot:activator="{ on, attrs }">
                <v-btn v-if="admin" class="d-none d-sm-flex" plain v-on="on" v-bind="attrs">
                  <FontAwesomeIcon class="mr-1" icon="user-cog"></FontAwesomeIcon>
                  Admin
                </v-btn>
              </template>
              <v-list>
                <v-list-item v-for="(item, i) in adminOptions" :key="i" link :to="item.to">
                  <v-list-item-content>
                    <v-list-item-title v-text="item.text"></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-menu>
            <v-menu offset-y v-if="fsrAdmin">
              <template v-slot:activator="{ on, attrs }">
                <v-btn v-if="fsrAdmin" class="d-none d-sm-flex" plain v-on="on" v-bind="attrs">
                  <FontAwesomeIcon class="mr-1" icon="user-cog"></FontAwesomeIcon>
                  FSR
                </v-btn>
              </template>
              <v-list>
                <v-list-item v-for="(item, i) in fsrAdminOptions" :key="i" link :to="item.to">
                  <v-list-item-content>
                    <v-list-item-title v-text="item.text"></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-menu>
            <v-btn v-if="admin || fsrAdmin" class="d-none d-sm-flex" plain @click="logOut">
              <FontAwesomeIcon class="mr-1" icon="sign-out-alt"></FontAwesomeIcon>
              Logout
            </v-btn>
          </v-col>
          <v-col cols="0" lg="3" md="2"/>
        </v-row>
      </v-container>
      <v-app-bar-nav-icon class="d-sm-none"  @click.stop="drawer = !drawer" aria-label="navigation drawer button" />
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" disable-resize-watcher app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            Navigation
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list nav dense>
        <v-list-item-group color="primary">
          <v-list-item v-for="(item, i) in menuItems" :key="i" link :to="item.to">
            <FontAwesomeIcon class="mr-3" :icon="item.icon"></FontAwesomeIcon>
            <v-list-item-content>
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <v-divider></v-divider>
      <v-list-item v-if="admin" @click="logOut">
        <FontAwesomeIcon class="mr-4" icon="sign-out-alt"></FontAwesomeIcon>
        Logout
      </v-list-item>
    </v-navigation-drawer>
    <v-main app>
      <Nuxt :keep-alive-props="{include:['AllCars','AllTracks','BrandCars','NationTracks']}" keep-alive/>
    </v-main>
    <v-footer padless>
      <v-container>
        <v-row class="text-center">
          <v-col cols="12" >
            {{ new Date().getFullYear() }} — <strong>BWS</strong>
          </v-col>
        </v-row>
      </v-container>
    </v-footer>
    <cookie-control/>
  </v-app>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { useVuelidate } from '@vuelidate/core'

export default {
  name: 'App',
  components: {
    FontAwesomeIcon,
  },
  emits: ['loggedOut', 'loggedIn'],
  setup () {
    return { v$: useVuelidate() }
  },
  data () {
    return {
      drawer: false,
      menuItems : [
        {text : "Home", to : "/", icon : "home"},
        {text : "Cars", to : "/cars", icon : "car"},
        {text : "Tracks", to : "/tracks", icon : "road"},
        //{text: 'Servers', to : '/servers', icon : 'fire'},
        {text : "Logs", to : "/logs", icon : "clipboard-list"},
      ],
      adminOptions : [
        {text: "Add Car", to :"/admin/add/car", icon : "plus"},
        {text: "Add Track", to :"/admin/add/track", icon : "plus"},
        {text: "Add User", to : "/admin/add/user", icon: "plus"},
        {text: "Add Skin", to : "/admin/add/skin", icon: "plus"}
      ],
      fsrAdminOptions : [
        {text: "Modify Servers", to : "/admin/servers"}
      ],
    }
  },
  mounted() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      this.$vuetify.theme.dark = true
    }
    if(this.notCheckedUser){
      let user = JSON.parse(localStorage.getItem('user'))
      if(user) {
        this.$store.dispatch('authentication/setUser', user)
      }
    }
  },
  computed: {
    admin () {
      return this.$store.getters['authentication/isAdmin']
    },
    fsrAdmin() {
      return this.$store.getters['authentication/isFsrAdmin']
    },
    alert () {
      return this.$store.getters['alert/alert']
    },
    notCheckedUser() {
      return this.$store.getters['authentication/notChecked']
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
          await this.$router.push('/login')
        }
      },
      deep: true
    },
  },
  methods: {
    async logOut () {
      await this.$store.dispatch('authentication/logout').then(() =>
        this.$store.dispatch('alert/clear')
      )
      this.$emit('loggedOut')
    }
  }
}
</script>
<style>

</style>

