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
      key="name"
      :filter="filter"
    >
    <template v-slot:item="props">
      <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4">
          <q-card>
            <q-card-section class="text-center">
              <a :href="props.row.url" target="_blank" class="clean big">
                <q-icon name="open_in_new" class="q-ml-xs" />
                {{ props.row.owner }}/{{ props.row.name }}
              </a>
              <br>
              {{ props.row.description }}
            </q-card-section>
            <q-card-section>
              <div class="row justify-between">
                <div>
                    <q-badge v-if="props.row.open_issues == 0" color="green">
                    Issues: <q-icon name="thumb_up" color="white" class="q-ml-xs" />
                  </q-badge>
                    <q-badge v-if="props.row.open_issues != 0" color="red">
                      Issues: {{ props.row.open_issues }} <q-icon name="warning" color="white" class="q-ml-xs" />
                    </q-badge>
                </div>
                <div>
                  <q-badge color="blue">
                      Forks: {{ props.row.forks }}
                    </q-badge>
                </div>
              </div>
            </q-card-section>
            <q-separator ></q-separator>
            <q-card-section class="flex flex-center grade">
              <div><q-icon name="grade" />{{ props.row.stars }}</div>
            </q-card-section>
          </q-card>
        </div>
    </template>
      <template v-slot:body="props">
        <q-tr :props="props">
           <q-td key="stars" :props="props">
             <q-badge color="green">
              {{ props.row.stars }}
             </q-badge>
          </q-td>
          <q-td key="name" :props="props">
              <a :href="props.row.url" target="_blank" class="clean"><q-icon name="open_in_new" class="q-ml-xs" /> {{ props.row.name }}</a>
          </q-td>
          <q-td key="owner" :props="props">
              <a :href="props.row.owner_url" target="_blank" class="clean"><q-icon name="open_in_new" class="q-ml-xs" /> {{ props.row.owner }}</a>
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
        <div class="col q-table__title" v-if="!$q.platform.is.mobile">Deno Modules</div>
        <div class="col">
          <q-input dense class="q-ml-md" v-model="filter" label="Filter ...">
          <template v-slot:append>
            <q-icon v-if="filter === ''" name="search" />
            <q-icon v-else name="clear" class="cursor-pointer" @click="filter = ''" />
          </template>
        </q-input>
        </div>
        <q-space />
        <div class="col" v-if="!$q.platform.is.mobile">
          <q-toggle label="Dense" v-model="isDense" />
        </div>
        <div class="col">
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
    <div>
      Fetched date: {{ this.fetchDate }}
    </div>
    <div></div>
  </div>
</template>

<script>
export default {
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
      filter: '',
      isDense: true,
      isGrid: this.$q.platform.is.mobile === true,
      initialPagination: {
        sortBy: 'asc',
        descending: false,
        page: 1,
        rowsPerPage: 25
      },
      loading: true,
      columns: [
        { name: 'stars', align: 'left', label: 'Stars', field: 'stars', sortable: true },
        { name: 'name', align: 'left', label: 'Module', field: 'name', sortable: true },
        { name: 'owner', label: 'Owner', field: 'owner', sortable: true, align: 'left' },
        { name: 'description', label: 'Description', field: 'description', align: 'left', style: 'max-width:300px;overflow:hidden;' },
        { name: 'forks', label: 'Forks', field: 'forks', align: 'center', sortable: true },
        { name: 'open_issues', label: 'Open issues', field: 'open_issues', align: 'left', sortable: true },
        { name: 'created', label: 'Created', field: 'created', align: 'left', sortable: true },
        { name: 'updated', label: 'Updated', field: 'updated', align: 'left', sortable: true }
      ]
    }
  }
}
</script>
<style scoped>
a.clean {
  text-decoration: none;
}
a.clean.big {
font-size: 20px;
}
.grade {
  font-size: 18px;
}
</style>
