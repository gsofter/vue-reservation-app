<template>
  <div>
    <h1>Reservations</h1>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Reservations',

  async mounted() {
    try {
      const response = await axios.get('http://localhost:9090/test')
      console.log(response)
    } catch (error) {
      console.error(error)
    }
  }
}
</script>
