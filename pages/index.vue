<template>
  <v-container class="text-center" fluid>
    <v-row>
      <v-col class="mt-5">
        <h1 class="text-h2 mb-3">Assetto Corsa Mod Repository</h1>
        <h2 class="text-h5"><em>Powered by <a href="https://discord.com/invite/uZ5mAJRpv2" rel="noopener" target="_blank">Fuddigno Sim Racing Team</a></em></h2>
      </v-col>
    </v-row>
    <v-row class="my-3">
      <v-col>
        <v-img height="200px" src="/acmr-fsr.png" contain></v-img>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="0" lg="3" class="d-none d-lg-block"></v-col>
      <v-col cols="12" lg="6">
        <v-row>
          <v-col>
            <p>
              <strong class="text-h6">Welcome!</strong><br>
            </p>
            <p class="text-body mt-4">
              This is a collection of quality mods, an attempt to gather in one place the best car and tracks scattered in the web.<br/>
              Every mod has remained untouched, and, where it was possible, we linked the original author.<br/>
              Born to be only a tool for our community, we decided to share it with you all. If you want to join us you here's our <a href="https://discord.com/invite/uZ5mAJRpv2" rel="noopener" target="_blank">discord</a>.
            </p>
            <p class="text-body">
              If you like our work, you can reward us with a small donation
              <a href="https://paypal.me/teamItaliaracing?locale.x=it_IT" rel="noopener" target="_blank">here</a>.
            </p>
            <p>
              Now let's get some some mods!
            </p>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-btn color="primary" elevation="2" outlined to="/cars/" min-width="150px" x-large>
              <FontAwesomeIcon class="mr-1" icon="car"></FontAwesomeIcon>
              Cars
            </v-btn>
            <v-btn color="primary" elevation="2" outlined to="/tracks" min-width="150px" x-large>
              <FontAwesomeIcon class="mr-1" icon="road"></FontAwesomeIcon>
              Tracks
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="0" lg="3"></v-col>
    </v-row>
  </v-container>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

export default {
  name: 'main',
  components: {
    FontAwesomeIcon,
  },
  head() {
    return {
      title : "Assetto Corsa Mod Repository"
    }
  }
}
</script>
