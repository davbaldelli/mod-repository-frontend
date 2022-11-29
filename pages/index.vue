<template>
  <v-container class="text-center" fluid>
    <v-row>
      <v-col class="mt-5">
        <h1 class="text-h2 mb-3">Assetto Corsa Mod Repository</h1>
        <h2 class="text-h5"><em>Finding mod has never been so easy</em></h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="0" lg="3" class="d-none d-lg-block"></v-col>
      <v-col cols="12" lg="6">
        <v-row>
          <v-col>
            <p>
              <strong>Welcome!</strong><br>
            </p>
            <p class="text-body mt-4">
              This is a collection of quality mods, an attempt to gather in one place the best car and tracks scattered in the web.<br/>
              Every mod has remained untouched, and, where it was possible, i linked the original author.<br/>
            </p>
            <p class="text-body">
              If you like my work, you can reward me with a small donation
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
