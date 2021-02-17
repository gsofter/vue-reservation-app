<template>
  <v-container>
    <div class="d-flex flex-row pa-6">
      <h1>Inventories</h1>
      <v-spacer> </v-spacer>
      <v-btn
        class="green light-1"
        fab
        color="pink"
        @click="openCreateInventoryModal"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </div>
    <div>
      <v-data-table
        :headers="headers"
        :items="inventories"
        :items-per-page="5"
        elevation="2"
      >
        <template v-slot:item="row">
          <tr>
            <td>{{ row.item.startTime }}</td>
            <td>{{ row.item.endTime }}</td>
            <td>{{ row.item.slots }}</td>
            <td>
              <v-btn icon @click="openEditInventoryModal(row.item)">
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
    <InventoryModal
      v-if="showModal"
      :show="showModal"
      :editing="editing"
      :selected="selected"
      @close="closeInventoryModal"
      @save="handleSaveInventory"
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
import InventoryModal from './InventoryModal'
import DeleteConfirmModal from './DeleteConfirmModal'

export default {
  name: 'Inventorys',
  components: { InventoryModal, DeleteConfirmModal },
  async mounted() {
    await this.fetchData()
  },

  methods: {
    async fetchData() {
      try {
        const response = await axios.get(
          'http://localhost:9090/inventory?restaurant_id=1'
        )
        this.inventories = response.data.map(inv => {
          return {
            id: inv.id,
            name: inv.name,
            startTime: inv['start_time'],
            endTime: inv['end_time'],
            slots: inv.slots
          }
        })
        // console.log(this.)
      } catch (error) {
        console.error(error)
      }
    },
    openCreateInventoryModal() {
      this.editing = false
      this.showModal = true
      this.selected = null
    },
    closeInventoryModal() {
      this.showModal = false
      this.editing = false
      this.selected = null
    },
    openEditInventoryModal(item) {
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
          `http://localhost:9090/inventory?inventory_id=${this.selected.id}`
        )
        this.selected = null
        this.showDeleteConfirmModal = false
        this.fetchData()
      } catch (error) {
        console.error(error)
      }
    },

    handleSaveInventory(request) {
      if (this.editing) {
        this.updateInventory(request)
      } else {
        this.createInventory(request)
      }
    },

    async createInventory(request) {
      try {
        await axios.post(`http://localhost:9090/inventory`, {
          name: request.name,
          [`start_time`]: request.startTime,
          [`end_time`]: request.endTime,
          [`slots`]: request.slots,
          [`restaurant_id`]: 1
        })
        this.fetchData()
        this.selected = null
        this.showModal = false
      } catch (error) {
        console.error(error)
        this.showModal = false
      }
    },

    async updateInventory(request) {
      try {
        const req = {
          name: request.name,
          [`start_time`]: request.startTime,
          [`end_time`]: request.endTime,
          [`slots`]: request.slots,
          [`restaurant_id`]: 1
        }

        await axios.put(
          `http://localhost:9090/inventory?inventory_id=${request.id}`,
          req
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
          text: 'Start Time',
          value: 'startTime',
          align: 'center'
        },
        {
          text: 'End Time',
          value: 'endTime',
          align: 'center'
        },
        {
          text: 'Slots per 15 min',
          value: 'slots',
          align: 'center'
        },
        {
          text: '',
          value: '',
          align: 'center'
        }
      ],
      inventories: []
    }
  }
}
</script>
