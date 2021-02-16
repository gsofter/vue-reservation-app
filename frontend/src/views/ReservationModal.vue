<template>
  <v-row justify-center>
    <v-dialog v-model="isShowing" persistent max-width="600" width="600">
      <v-card>
        <v-img :src="randomImage" height="100px"> </v-img>
        <v-card-title> Create New Reservation </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field label="Name" required> </v-text-field>
                <v-text-field label="Email" required> </v-text-field>
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
  props: ['show'],
  name: 'ReservationModal',
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
    }
  },

  methods: {
    saveClick() {
      this.$emit('save')
      // TODO: handle save
    }
  }
}
</script>