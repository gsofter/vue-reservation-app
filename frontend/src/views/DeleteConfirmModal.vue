<template>
  <v-dialog v-model="isShowing" persistent max-width="290">
    <v-card>
      <v-card-title class="headline"> Delete Confirmation </v-card-title>
      <v-card-text>Are you sure to remove?.</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="danger darken-1" text @click="agreeClick"> Yes </v-btn>
        <v-btn color="green darken-1" text @click="declineClick"> No </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'DeleteConfirmModal',
  props: ['show'],
  computed: {
    isShowing: {
      get() {
        return this.show
      },
      set(e) {
        !e && this.$emit('close')
      }
    }
  },
  methods: {
    agreeClick() {
      this.$emit('delete')
    },
    declineClick() {
      this.$emit('close')
    }
  }
}
</script>