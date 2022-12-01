<template>
  <v-card>
    <v-row class="pa-3">
      <v-col cols="12" md="4">
        <div class="h-100">
          <v-skeleton-loader
            type="image"
          ></v-skeleton-loader>
        </div>
      </v-col>
      <v-col cols="12" md="7">
        <v-skeleton-loader
          class="mx-auto"
          type="article, actions"
        ></v-skeleton-loader>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: 'TrackCardSkeleton'
}
</script>

<style scoped>

</style>
