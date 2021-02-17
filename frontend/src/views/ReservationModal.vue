<template>
  <v-row justify-center>
    <v-dialog v-model="isShowing" persistent max-width="600" width="600">
      <v-card>
        <v-img :src="randomImage" height="100px"> </v-img>
        <v-card-title> Create New Reservation </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4" class="d-flex flex-row">
                <v-text-field label="Name" required> </v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4" class="d-flex flex-row">
                <v-text-field label="Email" required> </v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-select :items="['Foo', 'Bar']" label="Items"></v-select>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-menu
                  ref="menu"
                  v-model="menu"
                  :close-on-content-click="false"
                  :return-value.sync="date"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="date"
                      label="Date"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="date" no-title scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="menu = false">
                      Cancel
                    </v-btn>
                    <v-btn text color="primary" @click="$refs.menu.save(date)">
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-select :items="slots" label="Slots"> </v-select>
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
  },

  data() {
    return {
      date: new Date().toISOString().substr(0, 10),
      menu: false,
      slots: ['01:00 AM - 02:00AM', '02:00AM - 03:00AM', '03:00AM - 04:00AM']
    }
  }
}
</script>