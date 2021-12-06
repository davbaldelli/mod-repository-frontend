<template>
    <v-container fluid>
        <v-row class="mt-5 mb-5">
            <v-col cols="0" lg="3"></v-col>
            <v-col cols="12" lg="6" class="text-center">
                <v-row>
                    <v-col>
                        <h1 class="text-h2">Assetto Corsa Mod Repository</h1>
                        <h2 class="text-h5"><em>Finding mod has never been so easy</em></h2>
                        <p class="text-body mt-4">
                            <strong>Benvenuto!</strong><br>
                            Questo sito è una raccolta di mod di qualità, un tentativo di riunire nello stesso punto le
                            migliori
                            macchine e
                            piste sparse sul web.<br/>
                            Le mod qui presenti sono rimaste inalterate, e, ove possibile, sono presenti i riferimenti
                            ai
                            rispettivi autori.<br/>
                        </p>
                        <p class="text-body">
                            Se ti piace il nostro lavoro e vorresti premiarci ti invito a fare una piccola donazione
                            <a href="https://paypal.me/teamItaliaracing?locale.x=it_IT" rel="noopener" target="_blank">qui</a>
                        </p>
                        <p class="text-body">
                            Se invece siete in ricerca di una comunità dove poter girare in compagnia vi invitiamo sul
                            nostro
                            gruppo <a
                            href="https://discord.gg/5HTA8xZgTA"
                            rel="noopener" target="_blank"
                        >discord</a>
                        </p>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-btn to="/cars/" color="primary" elevation="2" outlined x-large>
                            <FontAwesomeIcon icon="car" class="mr-1"></FontAwesomeIcon>
                            Cars
                        </v-btn>
                        <v-btn to="/tracks" color="primary" elevation="2" outlined x-large>
                            <FontAwesomeIcon icon="road" class="mr-1"></FontAwesomeIcon>
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
    }
}
</script>
