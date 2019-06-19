<template>
    <div>
        <router-link to='/'><button>BACK TO TABLE</button></router-link>
        <div class="form">
            <h2>Manage User</h2>
            <label for="name">Name </label>
            <input type="text" name="name" v-model="name" title="Format: Name" autocomplete="off">
            <label for="surname">Surname </label>
            <input type="text" name="surname" v-model="surname" title="Format: Surame" autocomplete="off">
            <label for="phone">Phone </label>
            <input type="text" name="phone" v-model="phone" title="Format: (000)000-00-00" autocomplete="off">
            <label for="email">Email </label>
            <input type="text" name="email" v-model="email" title="Format: somemail@mail.com" autocomplete="off">
            <button v-on:click="addUser">{{this.edit ? "Edit User" : "Add User"}}</button>
        </div>
        <div class="form">
            <h2>Import JSON</h2>
            <input type="text" name="json" v-model="json" autocomplete="off">
            <button v-on:click="importJSON">Import</button>
        </div>
    </div>
</template>

<script>
export default {
    beforeCreate() {
        this.$store.dispatch('load');
    },
    created() {
        if(this.$route.params.index !== undefined){
            this.name = this.$store.getters.getData[this.$route.params.index].name;
            this.surname = this.$store.getters.getData[this.$route.params.index].surname;
            this.phone = this.$store.getters.getData[this.$route.params.index].phone;
            this.email = this.$store.getters.getData[this.$route.params.index].email;
            this.edit = true;
        }
    },
    data() {
        return {
            name: "",
            surname: "",
            phone: "",
            email: "",
            json: "",
            edit: false
        }
    },
    methods: {
        addUser() {
            let flag = this.checkUser(this.name, this.surname, this.phone, this.email);
            if(flag){
                if(!this.edit){
                    this.$store.dispatch('addUser',{"name": this.name,"surname":this.surname,"phone": this.phone,"email": this.email});
                    alert("User added");
                } else {
                    this.$store.dispatch('setUser', {index: this.$route.params.index, user: {"name": this.name,"surname":this.surname,"phone": this.phone,"email": this.email}});
                    alert("User modified");
                }
            } else {
                alert("Wrong input");
            }
        },
        importJSON() {
            try {
                let userArr = JSON.parse(this.json); //If array valid import only object with correct props
                for (const user of userArr) { 
                    let flag = true;
                    if(Object.keys(user).length !== 4){ flag = false } 
                    if(!("name" in user)){ flag = false }
                    if(!("surname" in user)){ flag = false }
                    if(!("phone" in user)){ flag = false }
                    if(!("email" in user)){ flag = false }
                    if(!this.checkUser(user.name, user.surname, user.phone, user.email)){ flag = false }
                    if(flag){
                        this.$store.dispatch('addUser',user);
                        alert("User imported");
                    } else {
                        alert("Wrong format!"); 
                    }
                }
            } catch (err) {
                alert(err);
            }
        },
        checkUser(name,surname,phone,email) {
            let flag = true
            if(!(/^[A-Z][a-z]+$/.test(name))){flag = false}
            if(!(/^[A-Z][a-z]+$/.test(surname))){flag = false}
            if(!(/^[(]{0,1}[0-9]{1,4}[)][0-9]{3}(\-[0-9]{2}){2}$/.test(phone))){flag = false}
            if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))){flag = false}
            return flag;
        }
    },
};
</script>

<style scoped>
    * {
        box-sizing: border-box;
    }

    .form {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        margin: 15px;
        padding-top: 0;
        width: 60%;
        border-radius: 10px;
        background-color: #fff;
        font-family: Arial, Helvetica, sans-serif;  
        overflow: hidden; 
    }

    h2 {
        margin: 0 0 25px 0;
        padding: 10px 50px;
        width: 100%;
        color: #fff;
        background-color: #6c7ae0;
    }

    input[type="text"]{
        outline: none;
        display: block;
        margin-bottom: 20px;
        padding: 10px;
        width: 80%;
        border: none;
        border-bottom: 1px solid #c2c2c2;
        background: transparent;
        color: #363636;
        font: 1.2em Arial, Helvetica, sans-serif;
    }

    label {
        width: 80%;
        color: #363636;
    }

    button {
        margin: 20px;
        padding: 10px;
        min-width: 300px;
        border: 1px solid #c2c2c2;
        border-radius: 10px;
        background-color: #6c7ae0;
        font-size: 1.2em;
        color: #fff;
        font-family: Arial, Helvetica, sans-serif;
        font-weight: 700;
        cursor: pointer;
    }

    button:hover {
        background-color: #3a47ad;
    }

    .form button{
        padding: 5px;
        min-width: 100px;
        border-radius: 0;
        font-size: 1em;
    }
</style>