<template>
    <div class="q-pa-md">
        <h5>Deno Starts </h5>
        <div class="text-weight-light">Deno modules as it should be!</div>
        <hr />
        <h6>Credits</h6>
        <q-list bordered separator>
            <q-item clickable v-ripple href="https://quasar.dev/" tag="a" target="_blank">
                <q-item-section avatar>
                <q-icon color="primary" name="open_in_new" />
                </q-item-section>

                <q-item-section>
                    <q-item-label>Quasar Framework</q-item-label>
                <q-item-label caption lines="2">Build high-performance VueJS user interfaces in record time.</q-item-label>
                </q-item-section>
            </q-item>
            <q-item clickable v-ripple href="https://vuejs.org/" tag="a" target="_blank">
                <q-item-section avatar>
                <q-icon color="primary" name="open_in_new" />
                </q-item-section>

                <q-item-section>
                    <q-item-label>Vue.js</q-item-label>
                <q-item-label caption lines="2">The Progressive JavaScript Framework.</q-item-label>
                </q-item-section>
            </q-item>
            <q-item clickable v-ripple href="https://fusejs.io/" tag="a" target="_blank">
                <q-item-section avatar>
                <q-icon color="primary" name="open_in_new" />
                </q-item-section>

                <q-item-section>
                    <q-item-label>Fuse.js</q-item-label>
                <q-item-label caption lines="2">Fuse.js is a powerful, lightweight fuzzy-search library, with zero dependencies.</q-item-label>
                </q-item-section>
            </q-item>
        </q-list>
        <h6>Author</h6>
        <q-card class="my-card" flat bordered>
            <q-card-section horizontal>
                <q-img
                class="col"
                src="https://s.gravatar.com/avatar/5ca427173d5346a9f0dc1ac2a214c9f4?s=360"
                >
                <div class="absolute-bottom text-h6">
                    Sameh Fakoua
                </div>
                </q-img>
                <q-card-actions vertical class="justify-around q-px-md">
                <q-btn flat round color="red" icon="language" type="a" href="https://github.com/fakoua" target="_blank" />
                <q-btn flat round color="accent" icon="alternate_email" type="a" href="mailto:s.fakoua@gmail.com" />
                <q-btn flat round color="primary" icon="code" type="a" href="https://github.com/fakoua/denostars" target="_blank" />
                </q-card-actions>
            </q-card-section>
        </q-card>
    </div>
</template>

<script>
export default {
  name: 'About'
}
</script>
<style scoped>
h5 {
    margin-top: 1px;
    margin-bottom: 2px;
}
.my-card {
    max-width: 320px;
}
</style>
