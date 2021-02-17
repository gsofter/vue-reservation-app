<template>
  <v-row justify-center>
    <v-dialog v-model="isShowing" persistent max-width="600" width="600">
      <v-card>
        <v-img :src="randomImage" height="100px"> </v-img>
        <v-card-title>
          {{ editing ? 'Edit inventory' : 'Create a new inventory' }}
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" class="d-flex flex-row">
                <v-text-field
                  label="Name"
                  required
                  :rules="[v => !!v || 'Field is required!']"
                  v-model="itemBuffer.name"
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" md="4" class="d-flex flex-row">
                <v-select
                  :items="startTimeSlots"
                  label="Start Time"
                  v-model="itemBuffer.startTime"
                ></v-select>
              </v-col>
              <v-col cols="12" md="4" class="d-flex flex-row">
                <v-select
                  :items="endTimeSlots"
                  label="End Time"
                  v-model="itemBuffer.endTime"
                ></v-select>
              </v-col>
              <v-col cols="12" md="4" class="d-flex flex-row">
                <v-text-field
                  label="Slots per 15 min"
                  required
                  :rules="[v => !!v || 'Field is required!']"
                  v-model="itemBuffer.slots"
                  type="number"
                >
                </v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-divider></v-divider>
        <v-card-actions>
          <v-btn outlined tile color="cyan" @click="saveClick">Save</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" outlined tile @click="$emit('close')">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  props: ['show', 'editing', 'selected'],
  name: 'InventoryModal',
  mounted() {
    this.refreshItemBuffer()
  },
  computed: {
    isShowing: {
      get() {
        return this.show
      },

      set(e) {
        !e && this.$emit('close')
      }
    },
    randomImage() {
      return 'https://picsum.photos/500?' + Math.floor(Math.random() * 100)
    },

    daySlots() {
      return Array(25)
        .fill(0)
        .map((val, index) => {
          return index < 10 ? `0${index}:00` : `${index}:00`
        })
    },
    startTimeSlots() {
      if (this.itemBuffer.endTime) {
        const endId = this.daySlots.findIndex(
          s => s === this.itemBuffer.endTime
        )
        return this.daySlots.slice(0, endId)
      }

      return this.daySlots
    },
    endTimeSlots() {
      if (this.itemBuffer.startTime) {
        const startId = this.daySlots.findIndex(
          s => s === this.itemBuffer.startTime
        )
        return this.daySlots.slice(startId + 1, this.daySlots.length)
      }
      return this.daySlots
    }
  },

  methods: {
    refreshItemBuffer() {
      if (this.editing) this.itemBuffer = { ...this.selected }
      else this.itemBuffer = {}
    },

    saveClick() {
      //  TODO: validation
      this.itemBuffer['restaurant_id'] = 1
      this.$emit('save', this.itemBuffer)
    },

    onClickSaveDate(date) {
      console.log('onClickSaveDate', this.itemBuffer.date)
    }
  },

  data() {
    return {
      itemBuffer: {},
      date: new Date().toISOString().substr(0, 10),
      menu: false
    }
  }
}
</script>