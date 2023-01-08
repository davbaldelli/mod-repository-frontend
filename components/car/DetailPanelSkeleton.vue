<template>
  <v-container>
    <v-row>
      <v-col>
        <v-skeleton-loader width="100%" type="image"></v-skeleton-loader>
      </v-col>
    </v-row>
    <v-row>
      <v-col>

      </v-col>
      <v-col>

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
  name: "CarDetailPanelSkeleton"
}
</script>

<style scoped>

</style>
