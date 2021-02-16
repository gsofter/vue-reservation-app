<template>
  <v-container>
    <div class="d-flex flex-row pa-6">
      <h1>Reservations</h1>
      <v-spacer> </v-spacer>
      <v-btn
        class="green light-1"
        fab
        color="pink"
        @click="openNewReservationDialog"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </div>
    <div>
      <v-data-table
        :headers="headers"
        :items="reservations"
        :items-per-page="5"
        elevation="2"
      >
        <template v-slot:item="row">
          <tr>
            <td>{{ row.item.name }}</td>
            <td>{{ row.item.email }}</td>
            <td>{{ row.item.partySize }}</td>
            <td>
              <v-btn icon> <v-icon>mdi-pencil</v-icon> </v-btn>
              <v-btn icon> <v-icon>mdi-delete</v-icon> </v-btn>
            </td>
          </tr>
        </template>
      </v-data-table>
    </div>
    <ReservationModal
      v-if="showDialog"
      :show="showDialog"
      @close="closeReservationModal"
      @save="handleSaveReservation"
    />
  </v-container>
</template>

<script>
import axios from 'axios'
import ReservationModal from './ReservationModal'
export default {
  name: 'Reservations',
  components: { ReservationModal },
  async mounted() {
    try {
      const response = await axios.get('http://localhost:9090/test')
      console.log(response)
    } catch (error) {
      console.error(error)
    }
  },

  methods: {
    openNewReservationDialog() {
      console.log('openNewReservationDialog')
      this.showDialog = true
    },
    closeReservationModal() {
      this.showDialog = false
    },
    handleSaveReservation(request) {
      console.log('handleSaveReservation', request)
      this.showDialog = false
    }
  },

  data() {
    return {
      showDialog: false,
      headers: [
        {
          text: 'Name',
          value: 'name',
          align: 'center'
        },
        {
          text: 'Email',
          value: 'email',
          align: 'center'
        },
        {
          text: 'Party Size',
          value: 'partySize',
          align: 'center'
        },
        {
          text: 'Date',
          value: 'date',
          align: 'center'
        }
      ],
      reservations: [
        {
          name: 'First',
          email: 'first@test.com',
          partySize: '1',
          date: '2020/3/23'
        },
        {
          name: 'Second',
          email: 'Second@test.com',
          partySize: '2',
          date: '2020/3/24'
        },
        {
          name: 'Third',
          email: 'Third@test.com',
          partySize: '3',
          date: '2020/3/11'
        }
      ]
    }
  }
}
</script>
