<template>
    <div>
        <div class="header pb-8 d-flex align-items-center profile-header-custom">
            <!-- Mask -->
            <span class="mask bg-gradient-default opacity-8"></span>
            <!-- Header container -->
            <div class="container-fluid ">
                <!-- <div class="row">
                    <div class="col-lg-12 col-md-12 bg-blue">
                        <h1 class="display-2 text-white">Change Password</h1>
                        <p class="text-white mt-0 mb-5">This is your profile page. You can see the progress you've made with your work and manage your projects or assigned tasks</p>
                    </div>
                </div> -->
            
<div class="row">
    <div class="col-sm"></div>
    <div class="col-sm ">
<card  class="m-0 p-0">
    <h3 class="pb-2">Change Password</h3>
    <span v-if="alertDanger">
        <base-alert type="danger" class="mt-3">Your passwords are not the same</base-alert>
    </span>
    <span v-if="alertSuccess">
        <base-alert type="info" class="mt-3">Your password has been changed successfully</base-alert>
    </span>
    <base-input type="password" placeholder="New Password" class="my-3" v-model="new_password"></base-input>
    <base-input type="password" placeholder="Confirmation Password" class="m-0" v-model="confirmation_password"></base-input>
    <base-button block type="primary" class="mt-4" @click="submitChange">Submit</base-button>
</card>
    </div>
    <div class="col-sm"></div>
  </div>


            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    data(){
        return{
            new_password: null,
            confirmation_password: null,
            alertDanger: false,
            alertSuccess: false,
            alertPassword: false,
            alertConfPassword: false,
        }
    },
    computed: {
        getUsers(){
            return this.$store.state.users
        },
    },
    created(){
        this.$store.dispatch('getUsers')
    },
    methods: {
        submitChange: function(){
            if(this.new_password == null){
                this.alertPassword = true
            }else{
                this.alertPassword = false
            }
                
            if(this.confirmation_password == null){
                this.alertConfPassword = true
            }else{
                this.alertConfPassword = false
            }

            if(this.new_password != null && this.confirmation_password != null){
                if(this.new_password != this.confirmation_password){
                    this.alertDanger = true
                    this.alertSuccess = false
                }else{
                    let headers = {
                        'Authorization': 'Bearer '+localStorage.getItem('token'),
                        'Content-Type': 'application/json'
                    }

                    axios.post('https://intranet.lan.go.id:8445/employee/gantipassword', {"username": this.getUsers.username, "password": this.new_password, "konfirmasiPassword": this.confirmation_password}, {headers: headers})
                    .then(response => {
                        this.alertSuccess = true
                        this.new_password = ""
                        this.confirmation_password = ""
                    })
                    .catch(err => {
                        console.log(err)
                    })
                    this.alertDanger = false
                    this.alertSuccess = true
                }
            }
        },
    }
}
</script>
<style scoped>
.profile-header-custom {
    background-image: url(/img/theme/profile-cover.jpg);
    background-size: cover;
    background-position: center top;
    min-height: 100vh;
}
</style>