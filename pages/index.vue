<template>
  <v-container class="text-center" fluid>
    <v-row>
      <v-col cols="0" xl="3" lg="2" md="1" class="d-none d-md-block"/>
      <v-col cols="12" xl="6" lg="8" md="10">
        <v-row>
          <v-col class="mt-5">
            <h1 class="text-h2 mb-3">Assetto Corsa Mod Repository</h1>
            <h2 class="text-h5"><em>A collection of quality mods</em></h2>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <p>
              <strong class="text-h6">Welcome!</strong><br>
            </p>
            <p class="text-body mt-4">
              This is a collection of quality mods, an attempt to gather in one place the best car and tracks scattered
              in the web.<br/>
              Every mod has remained untouched, and, where it was possible, we linked the original author.<br/>
              Born to be only a tool for our community, we decided to share it with you all. If you want to join us you
              here's our <a href="https://discord.com/invite/uZ5mAJRpv2" rel="noopener" target="_blank">discord</a>.
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
    </v-row>
  </v-container>
</template>

<script>
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'

export default {
  name: 'Home',
  components: {
    FontAwesomeIcon,
  },
  head() {
    return {
      title: "Assetto Corsa Mod Repository"
    }
  }
}
</script>
