<template>
  <v-container>
    <v-row>
      <v-col>
        <v-skeleton-loader style="width: 100%" type="image"></v-skeleton-loader>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-skeleton-loader
          class="mx-auto"
          type="article, actions"
        ></v-skeleton-loader>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "TrackDetailPanelSkeleton"
}
</script>

<style scoped>

</style>
