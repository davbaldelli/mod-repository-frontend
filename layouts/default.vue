<template class="p-grid p-m-0">
    <v-app>
        <v-app-bar elevation="4" elevate-on-scroll app>
            <v-btn plain to="/">
                <FontAwesomeIcon icon="home" class="mr-1"></FontAwesomeIcon>
                Home
            </v-btn>
            <v-btn plain to="/cars/">
                <FontAwesomeIcon icon="car" class="mr-1"></FontAwesomeIcon>
                Cars
            </v-btn>
            <v-btn plain to="/tracks/">
                <FontAwesomeIcon icon="road" class="mr-1"></FontAwesomeIcon>
                Tracks
            </v-btn>
            <v-btn plain to="/logs/">
                <FontAwesomeIcon icon="clipboard-list" class="mr-1"></FontAwesomeIcon>
                Logs
            </v-btn>
        </v-app-bar>
        <v-main app>
            <Nuxt keep-alive :keep-alive-props="{include:['CarList','TracksList']}"/>
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
            routerViewKey: 0,
            username: '',
            password: '',
            menuItems: [
                {
                    label: 'Home',
                    icon: 'fas fa-home',
                    to: '/',
                },
                {
                    label: 'Cars',
                    to: '/cars',
                    icon: 'fas fa-car'
                },
                {
                    label: 'Tracks',
                    to: '/tracks',
                    icon: 'fas fa-road'
                },
                {
                    label: 'Logs',
                    to: '/logs',
                    icon: 'fas fa-clipboard-list'
                },
                {
                    separator: true,
                    style: 'width = 100%'
                },
            ],
            display: false,
            submitted: false,
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

