<template>
  <div>
    <!-- Header -->
    <div class="header bg-gradient-success py-7 py-lg-8 pt-lg-9">
      <!-- <div class="container">
        <div class="header-body text-center mb-7">
          <div class="row justify-content-center">
            <div class="col-xl-5 col-lg-6 col-md-8 px-5">
              <h1 class="text-white">Welcome!</h1>
              <p class="text-lead text-white">Use these awesome forms to login or create new account in your project for free.</p>
            </div>
          </div>
        </div>
      </div> -->
      <div class="separator separator-bottom separator-skew zindex-100">
        <svg x="0" y="0" viewBox="0 0 2560 100" preserveAspectRatio="none" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <polygon class="fill-default" points="2560 0 2560 100 0 100"></polygon>
        </svg>
      </div>
    </div>
    <!-- Page content -->
    <div class="container mt--8 pb-5">
      <div class="row justify-content-center">
        <div class="col-lg-5 col-md-6">
          <div class="card bg-secondary border-0 mb-0">
            <!-- <div class="card-header bg-transparent pb-5">
              <div class="text-muted text-center mt-2 mb-3"><small>Sign in with</small></div>
              <div class="btn-wrapper text-center">
                <a href="#" class="btn btn-neutral btn-icon">
                  <span class="btn-inner--icon"><img src="img/icons/common/github.svg"></span>
                  <span class="btn-inner--text">Github</span>
                </a>
                <a href="#" class="btn btn-neutral btn-icon">
                  <span class="btn-inner--icon"><img src="img/icons/common/google.svg"></span>
                  <span class="btn-inner--text">Google</span>
                </a>
              </div>
            </div> -->
            <div class="card-body px-lg-6 py-lg-5">
              <div class="text-center text-muted mb-4">
                <!-- <small>Or sign in with credentials</small> -->
                <h1 class="">Welcome!</h1>
                <p class="text-lead">Use these awesome forms to login or create new account in your project for free.</p>
              </div>
              <form role="form">
                <base-input alternative
                            class="mb-3"
                            prepend-icon="ni ni-single-02"
                            placeholder="Username"
                            v-model="model.email">
                </base-input>

                <base-input alternative
                            class="mb-3"
                            prepend-icon="ni ni-lock-circle-open"
                            type="password"
                            placeholder="Password"
                            v-model="model.password">
                </base-input>

                <!-- <base-checkbox v-model="model.rememberMe">Remember me</base-checkbox> -->
                <div class="text-center">
                  <base-button type="primary" class="my-4" @click="login">Sign in</base-button>
                </div>
              </form>
            </div>
          </div>
          <!-- <div class="row mt-3">
            <div class="col-6">
              <router-link to="/dashboard" class="text-light"><small>Forgot password?</small></router-link>
            </div>
            <div class="col-6 text-right">
              <router-link to="/register" class="text-light"><small>Create new account</small></router-link>
            </div>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  export default {
    data() {
      return {
        model: {
          email: '',
          password: '',
          msg: null
        }
      };
    },
    methods: {
      login: function () {
        let email = this.model.email 
        let password = this.model.password
        this.$store.dispatch('login', { email, password })
        // this.$store.dispatch('user')
       .then(() => this.$router.push('/'))
       .catch(err => 
          this.model.msg = err.response.data.error_description
          // console.log(err)
        )
      }
    }
  };
</script>
