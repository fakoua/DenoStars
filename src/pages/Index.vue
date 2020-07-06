<template>
  <div class="q-pa-md">
    <GridView :database="database" :loading="loading"  />
  <div>
      Fetched date: {{ this.fetchDate }}
    </div>
    <div></div>
  </div>
</template>

<script>
import GridView from '../components/GridView'
export default {
  components: {
    GridView
  },
  name: 'DenoStars',
  mounted () {
    const databaseUrl = this.$q.platform.is.electron ? 'https://deno-stars.vercel.app/' : '/'
    this.$axios
      .get(databaseUrl + 'database.json')
      .then((res) => {
        this.database = res.data
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        this.loading = false
      })

    this.$axios
      .get(databaseUrl + 'fetch.txt')
      .then((res) => {
        this.fetchDate = res.data
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
      })
  },
  data () {
    return {
      database: [],
      fetchDate: '',
      loading: true
    }
  }
}
</script>
