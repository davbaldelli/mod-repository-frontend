<template>
  <v-container fluid>

    <v-row>
      <v-col cols="0" xl="3" lg="2" md="1" class="d-none d-md-block"/>
      <v-col cols="12" xl="6" lg="8" md="10">
        <v-row>
          <v-col class="text-center" cols="12">
            <h1 class="text-h2 mb-3">Repository Logs</h1>
            <h2 class="text-h5"><em>Stay updated on what's happening inside the repository</em></h2>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-data-table
              :headers="headers"
              :items="logs"
              class="elevation-1"
              item-key="logId"
            >
              <template v-slot:item.type="{ item }">
                <FontAwesomeIcon :icon="item.name ? 'road' : 'car'" class="p-mr-2"></FontAwesomeIcon>
                <FontAwesomeIcon v-if="item.premium" icon="dollar-sign"></FontAwesomeIcon>
              </template>
              <template v-slot:item.name="{item}">
                <NuxtLink v-if="item.name" :to="`/tracks/${item.nation}/${item.name}/${item.year}`">{{ item.name}}
                </NuxtLink>
                <NuxtLink v-else :to="`/cars/${item.brand}/${item.model}/${item.year}`">{{`${item.brand} ${item.model}`}}</NuxtLink>
              </template>
              <template v-slot:item.action="{item}">
                <v-chip :color="item.action==='Insert' ? 'green' : 'blue'" label>{{ item.action }}</v-chip>
              </template>
              <template v-slot:item.happenedAt="{item}">
                {{ getDate(item.happenedAt) }}
              </template>
            </v-data-table>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import moment from 'moment-timezone'
import { logSort } from '@/_helpers'

export default {
  name: 'LogList',
  components: {
    FontAwesomeIcon,
  },
  head() {
    return {
      title : "Repository Logs",
    }
  },
  data () {
    return {
      headers: [
        {
          text: 'Type',
          value: 'type',
          sortable: false,
        },
        {
          text: 'Mod Name',
          value: 'name',
          sortable: false,
        },
        {
          text: 'Action',
          value: 'action',
          sortable: false,
        },
        {
          text: 'Date',
          value: 'happenedAt',
          sortable: false,
        },
      ],
    }
  },
  computed: {
    logs () {
      return this.$store.getters['logs/carLogs'].concat(this.$store.getters['logs/trackLogs']).sort(logSort.sortByDate)
    },
    loggedIn () {
      return this.$store.getters['authentication/loggedIn']
    },
  },
  watch: {
    loggedIn () {
      if (this.loggedIn) {
        this.initiate()
      }
    }
  },
  mounted () {
    this.initiate()
  },
  methods: {
    getDate (momentString) {
      return moment(momentString).format('DD-MM-YYYY')
    },
    initiate () {
      this.$store.dispatch('logs/getCarLogs')
      this.$store.dispatch('logs/getTrackLogs')
    }
  }
}
</script>

<style scoped>

</style>
