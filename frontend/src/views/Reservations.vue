<template>
  <v-container>
    <div class="d-flex flex-row pa-6">
      <h1>Reservations</h1>
      <v-spacer> </v-spacer>
      <v-btn
        class="green light-1"
        fab
        color="pink"
        @click="openCreateReservationModal"
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
            <td>{{ row.item.seats }}</td>
            <td>{{ row.item.date }}</td>
            <td>
              <v-btn icon @click="openEditReservationModal(row.item)">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn icon @click="openDeleteConfirmModal(row.item)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </td>
          </tr>
        </template>
      </v-data-table>
    </div>
    <ReservationModal
      v-if="showModal"
      :show="showModal"
      :editing="editing"
      :selected="selected"
      @close="closeReservationModal"
      @save="handleSaveReservation"
    />

    <DeleteConfirmModal
      :show="showDeleteConfirmModal"
      @close="closeDeleteConfirmModal"
      @delete="confirmDelete"
    />
  </v-container>
</template>

<script>
import axios from 'axios'
import ReservationModal from './ReservationModal'
import DeleteConfirmModal from './DeleteConfirmModal'

export default {
  name: 'Reservations',
  components: { ReservationModal, DeleteConfirmModal },
  async mounted() {
    await this.fetchData()
  },

  methods: {
    async fetchData() {
      try {
        const response = await axios.get(
          'http://localhost:9090/reservation?restaurant_id=1'
        )
        this.reservations = response.data
        console.log('reservations', response.data)
      } catch (error) {
        console.error(error)
      }
    },
    openCreateReservationModal() {
      this.editing = false
      this.showModal = true
      this.selected = null
    },
    closeReservationModal() {
      this.showModal = false
      this.editing = false
      this.selected = null
    },
    openEditReservationModal(item) {
      console.log('openEditReservationModal')
      this.selected = item
      this.showModal = true
      this.editing = true
    },
    openDeleteConfirmModal(item) {
      this.selected = item
      this.showDeleteConfirmModal = true
    },
    closeDeleteConfirmModal() {
      this.showDeleteConfirmModal = false
    },
    async confirmDelete() {
      try {
        await axios.delete(
          `http://localhost:9090/reservation?reservation_id=${this.selected.id}`
        )
        this.selected = null
        this.showDeleteConfirmModal = false
        this.fetchData()
      } catch (error) {
        console.error(error)
      }
    },

    handleSaveReservation(request) {
      if (this.editing) {
        this.updateReservation(request)
      } else {
        this.createReservation(request)
      }
    },

    async createReservation(request) {
      try {
        await axios.post(`http://localhost:9090/reservation`, request)
        this.fetchData()
        this.selected = null
        this.showModal = false
      } catch (error) {
        console.error(error)
        this.showModal = false
      }
    },

    async updateReservation(request) {
      try {
        const { id, ...rest } = request
        await axios.put(
          `http://localhost:9090/reservation?reservation_id=${request.id}`,
          rest
        )
        this.fetchData()
        this.selected = null
        this.showModal = false
      } catch (error) {
        console.error(error)
        this.showModal = false
      }
    }
  },

  data() {
    return {
      showModal: false,
      showDeleteConfirmModal: false,
      selected: null,
      editing: false,
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
        },
        {
          text: '',
          value: '',
          align: 'center'
        }
      ],
      reservations: []
    }
  }
}
</script>
