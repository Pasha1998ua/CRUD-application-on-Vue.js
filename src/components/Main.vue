<template>
    <div>
        <router-link to='/edit'><button>ADD USER</button></router-link>

        <DataTable></DataTable>
        <router-view />
    </div>
</template>

<script>
import DataTable from '../components/Table.vue'

export default {
    components: { 
        DataTable 
    }
};
</script>

<style scoped>
    button {
        margin: 20px;
        padding: 10px;
        min-width: 300px;
        border: 1px solid #c2c2c2;
        border-radius: 10px;
        font-family: Arial, Helvetica, sans-serif;
        font-size: 1.2em;
        font-weight: 700;
        color: #fff;
        background-color: #6c7ae0;
        cursor: pointer;
    }

    button:hover {
        background-color: #3a47ad;
    }
</style>
