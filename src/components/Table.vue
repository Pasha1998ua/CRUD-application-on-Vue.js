<template>
    <table>
        <tr>
            <th>Name</th>
            <th>Surnam</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Delete</th>
            <th>Edit</th>
        </tr>
        <tr v-for="(row,index) in dataRows" v-bind:key="row.id">
            <th>{{row.name}}</th>
            <th>{{row.surname}}</th>
            <th>{{row.phone}}</th>
            <th>{{row.email}}</th>
            <th><button v-on:click="deleteUser(index)">Delete</button></th>
            <th><button v-on:click="pushEdit(index)">Edit</button></th>
        </tr>
    </table>
</template>

<script>
export default {
  beforeCreate() {
    this.$store.dispatch('load');
  },
  computed: {
    dataRows() {
      return this.$store.getters.getData;
    }
  },
  methods: {
    deleteUser(elem){
      this.$store.dispatch('deleteUser',elem)
    },
    pushEdit(index) {
      this.$router.push({ path: `/edit/${index}` });
    }
  }
}
</script>

<style scoped>
  table {
    width: 80%;
    border-collapse: collapse;
    border-radius: 10px;
    font-family: Arial, Helvetica, sans-serif;
    overflow: hidden;
  }

  tr{
    border-bottom: 1px solid #c2c2c2;
    color: #363636;
    background-color: #fff;
  }
  tr:first-child {
    font-size: 1.2em;
    color: #fff;
    background-color: #6c7ae0;
  }
  th {
    padding: 10px;
  }

  button {
    padding: 5px;
    min-width: 100px;
    border: 1px solid #c2c2c2;
    font-size: 1em;
    color: #fff;
    background-color: #6c7ae0;
    cursor: pointer;
  }

  button:hover {
    background-color: #3a47ad;
  }
</style>
