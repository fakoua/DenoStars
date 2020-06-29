<template>
  <div class="q-pa-md">
    <q-table
      title="Deno Modules"
      :data="database"
      :columns="columns"
      :pagination="initialPagination"
      :loading="loading"
      :dense="isDense"
      :grid="isGrid"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
           <q-td key="stars" :props="props">
             <q-badge color="green">
              {{ props.row.stars }}
             </q-badge>
          </q-td>
          <q-td key="module" :props="props">
              <a :href="getRepositoryUrl(props.row.module, props.row.owner)" target="_blank" class="clean"><q-icon name="open_in_new" class="q-ml-xs" /> {{ props.row.module }}</a>
          </q-td>
          <q-td key="owner" :props="props">
              <a :href="getOwnerUrl(props.row.owner)" target="_blank" class="clean"><q-icon name="open_in_new" class="q-ml-xs" /> {{ props.row.owner }}</a>
          </q-td>
          <q-td key="description" :props="props">
              {{ props.row.description }}
          </q-td>
          <q-td key="forks" :props="props">
              {{ props.row.forks }}
          </q-td>
           <q-td key="open_issues" :props="props">
              <q-badge v-if="props.row.open_issues == 0" color="green">
                <q-icon name="thumb_up" color="white" class="q-ml-xs" />
              </q-badge>
              <q-badge v-if="props.row.open_issues != 0" color="red">
                {{ props.row.open_issues }} <q-icon name="warning" color="white" class="q-ml-xs" />
              </q-badge>
          </q-td>
           <q-td key="created" :props="props">
              {{ props.row.created }}
           </q-td>
           <q-td key="updated" :props="props">
              {{ props.row.updated }}
           </q-td>
        </q-tr>
      </template>
      <template v-slot:loading>
        <q-inner-loading showing color="primary" />
      </template>
      <template v-slot:top="props">
        <div class="col-2 q-table__title">Deno Modules</div>
        <q-space />
        <div class="col">
          <q-toggle label="Dense" v-model="isDense" />
          <q-toggle label="Grid View" v-model="isGrid" />
        </div>
        <q-btn
          flat round dense
          :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
          @click="props.toggleFullscreen"
          class="q-ml-md"
        />
      </template>
    </q-table>
  </div>
</template>

<script>
export default {
  name: 'DenoStars',
  methods: {
    getRepositoryUrl: (module, owner) => {
      return 'https://github.com/' + owner + '/' + module
    },
    getOwnerUrl: (owner) => {
      return 'https://github.com/' + owner
    }
  },
  mounted () {
    this.$axios
      .get('/database.json')
      .then((res) => {
        this.database = res.data
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        this.loading = false
      })
  },
  data () {
    return {
      isDense: true,
      isGrid: false,
      initialPagination: {
        sortBy: 'asc',
        descending: false,
        page: 1,
        rowsPerPage: 25
      },
      loading: true,
      columns: [
        { name: 'stars', align: 'left', label: 'Stars', field: 'stars', sortable: true },
        { name: 'module', align: 'left', label: 'Module', field: 'module', sortable: true },
        { name: 'owner', label: 'Owner', field: 'owner', sortable: true, align: 'left' },
        { name: 'description', label: 'Description', field: 'description', align: 'left', style: 'max-width:300px;overflow:hidden;' },
        { name: 'forks', label: 'Forks', field: 'forks', align: 'center', sortable: true },
        { name: 'open_issues', label: 'Open issues', field: 'open_issues', align: 'left', sortable: true },
        { name: 'created', label: 'Created', field: 'created', align: 'left', sortable: true },
        { name: 'updated', label: 'Updated', field: 'updated', align: 'left', sortable: true }
      ],
      database: [
      ]
    }
  }
}
</script>
<style scoped>
a.clean {
  text-decoration: none;
}
</style>
