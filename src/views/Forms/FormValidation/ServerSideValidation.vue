<template>
  <card>
    <!-- Card header -->
    <h3 slot="header" class="mb-0">Server side validation</h3>

    <!-- Card body -->
    <div class="row">
      <div class="col-lg-8">
        <p class="mb-0">
          We recommend using client side validation, but in case you require server side, you can indicate invalid and valid form fields with <code>.is-invalid</code> and <code>.is-valid</code>. Note that <code>.invalid-feedback</code>
          is also supported with these classes.
        </p>
      </div>
    </div>
    <hr>
    <form class="needs-validation"
          @submit.prevent="firstFormSubmit">
      <div class="form-row">
        <div class="col-md-4">
          <base-input label="First name"
                      name="First name"
                      placeholder="First name"
                      :error="getError('First name')"
                      valid
                      v-validate="'required'"
                      v-model="model.firstName">
          </base-input>
        </div>

        <div class="col-md-4">
          <base-input label="Last name"
                      name="Last name"
                      placeholder="Last name"
                      :error="getError('Last name')"
                      valid
                      v-validate="'required'"
                      v-model="model.lastName">
          </base-input>
        </div>

        <div class="col-md-4">
          <base-input label="Username"
                      name="Username"
                      placeholder="Username"
                      error="Username is required"
                      valid
                      v-validate="'required'"
                      v-model="model.username">
          </base-input>
        </div>
      </div>
      <div class="form-row">
        <div class="col-md-6">
          <base-input label="City"
                      name="City"
                      placeholder="City"
                      error="City is required"
                      :valid="false"
                      v-validate="'required'"
                      v-model="model.city">
          </base-input>
        </div>
        <div class="col-md-3">
          <base-input label="State"
                      name="State"
                      placeholder="State"
                      error="State is required"
                      :valid="false"
                      v-validate="'required'"
                      v-model="model.state">
          </base-input>
        </div>
        <div class="col-md-3">
          <base-input label="Zip"
                      name="Zip"
                      placeholder="Zip"
                      error="Zip is required"
                      :valid="false"
                      v-validate="'required'"
                      v-model="model.zip">
          </base-input>
        </div>
      </div>
      <base-input>
        <base-checkbox v-model="model.agree">
          Agree to terms and conditions
        </base-checkbox>
      </base-input>
      <base-button type="primary" native-type="submit">Submit form</base-button>
    </form>
  </card>
</template>
<script>
  export default {
    components: {},
    data() {
      return {
        validated: false,
        model: {
          firstName: 'Mark',
          lastName: 'Otto',
          username: '',
          city: '',
          state: '',
          zip: '',
          agree: false
        }
      }
    },
    methods: {
      async firstFormSubmit() {
        try {
          await this.$validator.validateAll()
        } finally {
          this.validated = true;
        }
      },
      getError(name){
        return this.errors.first(name)
      },
      isValid(name) {
        return this.validated && !this.errors.has(name);
      }
    }
  }
</script>
<style>
</style>
