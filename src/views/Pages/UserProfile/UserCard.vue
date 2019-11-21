<template>
  <div class="card card-profile">
    <img src="img/theme/img-1-1000x600.jpg" alt="Image placeholder" class="card-img-top">

    <div class="row justify-content-center">
      <div class="col-lg-3 order-lg-2">
        <div class="card-profile-image">
          <a href="#">
            <!-- <img src="img/theme/team-4.jpg" class="rounded-circle"> -->
            <span v-if="jeniskelamin == 'L'">
              <img src="@/assets/img/user_p.png" class="rounded-circle">
            </span>
            <span v-if="jeniskelamin == 'P'">
              <img src="@/assets/img/user_w.png" class="rounded-circle">
            </span>
          </a>
        </div>
      </div>
    </div>

    <div class="card-header text-center border-0 pt-8 pt-md-4 pb-0 pb-md-5">
      <div class="d-flex justify-content-between">
        <!-- <a href="#" class="btn btn-sm btn-info mr-4">Connect</a>
        <a href="#" class="btn btn-sm btn-default float-right">Message</a> -->
        &nbsp;
      </div>
    </div>

    <div class="card-body pt-0">
      <!-- <div class="row">
        <div class="col">
          <div class="card-profile-stats d-flex justify-content-center">
            <div>
              <span class="heading">22</span>
              <span class="description">Friends</span>
            </div>
            <div>
              <span class="heading">10</span>
              <span class="description">Photos</span>
            </div>
            <div>
              <span class="heading">89</span>
              <span class="description">Comments</span>
            </div>
          </div>
        </div>
      </div> -->
      <div class="text-center">
        <h5 class="h3">
          {{ nama }}
        </h5>
        <div class="h5 font-weight-300">
          <i class="ni location_pin mr-2"></i>{{ nip }}
        </div>
        <div class="h5 mt-4">
          <i class="ni business_briefcase-24 mr-2"></i>{{ jabatan }}
        </div>
        <div>
          <i class="ni education_hat mr-2"></i>{{ unitkerja }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    user: {
      type: Object,
      required: false
    }
  },
  data(){
    return{
      nip: this.user.nip,
      nama: this.user.nama,
      username: this.user.username,
      jabatan: this.user.jabatan,
      unitkerja: this.user.perEselonDua,
      jeniskelamin: this.user.jenisKelamin
    }
  }
}
</script>
<style></style>
