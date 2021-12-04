<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-12 col-lg-4"></div>
            <div class="col-12 col-lg-4">
                <TrackForm v-if="track" :initial-value="track" @submit="onSubmit"></TrackForm>
            </div>
            <div class="col-12 col-lg-4"></div>
        </div>
        <Dialog v-model:visible="success" :modal="true" header="Success!" @hide="closeSuccess">
            {{ successMessage }}
            <template #footer>
                <Button autofocus icon="pi pi-check" label="OK" @click="closeSuccess"></Button>
            </template>
        </Dialog>
        <Dialog v-model:visible="fail" :modal="true" header="Failure :(">{{ failMessage }}
            <template #footer>
                <Button autofocus icon="pi pi-check" label="OK" @click="this.fail = false"></Button>
            </template>
        </Dialog>
    </div>
</template>

<script>
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'

export default {
    name: 'TrackEdit',
    props: ['initialTrack'],
    middleware ({ store, redirect }) {
        // If the user is not authenticated
        if (!store.getters['authentication/isAdmin']) {
            return redirect('/')
        }
    },
    components: {
        Dialog,
        Button,
    },
    data () {
        return {
            id: this.$route.params.id,
            success: false,
            successMessage: '',
            fail: false,
            failMessage: '',
        }
    },
    computed: {
        track () {
            return this.$store.getters['track/getTrackByName'](this.id)
        },
    },
    mounted () {
        this.$store.dispatch('track/getAllTracks')
    },
    methods: {
        onSubmit (track) {
            this.$store.dispatch('track/updateTrack', track)
                .then(() => {
                    this.success = true
                    this.successMessage = 'Track edited successfully'
                })
                .catch((e) => {
                    this.fail = true
                    this.failMessage = e.data.error
                })
        },
        closeSuccess () {
            this.$router.back()
        },
    }
}
</script>

<style scoped>

</style>
