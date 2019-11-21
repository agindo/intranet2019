<template>
  <div>
    <base-header class="pb-6">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <!-- <h6 class="h2 text-white d-inline-block mb-0">Default</h6>
          <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
            <route-bread-crumb></route-bread-crumb>
          </nav> -->
        </div>
        <!-- <div class="col-lg-6 col-5 text-right">
          <base-button size="sm" type="neutral">New</base-button>
          <base-button size="sm" type="neutral">Filters</base-button>
        </div> -->
      </div>
      <!-- Card stats -->
      <div class="row">
        <!-- <div class="col-xl-3 col-md-6">
          <stats-card title="Total traffic"
                      type="gradient-red"
                      sub-title="350,897"
                      icon="ni ni-active-40">

            <template slot="footer">
              <span class="text-success mr-2"><i class="fa fa-arrow-up"></i> 3.48%</span>
              <span class="text-nowrap">Since last month</span>
            </template>
          </stats-card>
        </div> -->
        <div class="col-xl-4 col-md-6">
          <card style="height: 17.75rem;">
            <card-one :user="getUsers" :staff="getStaff.length"></card-one>
          </card>
          <!-- <stats-card title="Total traffic"
                      type="gradient-orange"
                      sub-title="2,356"
                      icon="ni ni-chart-pie-35">

            <template slot="footer">
              <span class="text-success mr-2"><i class="fa fa-arrow-up"></i> 12.18%</span>
              <span class="text-nowrap">Since last month</span>
            </template>
          </stats-card> -->
        </div>
        <div class="col-xl-4 col-md-6">
          <card style="height: 17.75rem;">
            <div class="flex flex-col">
              <div class="text-gray-700 px-4">Grafik Pendidikan</div>
              <div class="text-gray-700 text-center px-4 m-2">
                <VueApexCharts width="300" type="donut" :options="options" :series="series"></VueApexCharts>
              </div>
            </div>
          </card>
        </div>
        <div class="col-xl-4 col-md-6">
          <card style="height: 17.75rem;">
            <div class="flex flex-col">
              <div class="text-gray-700 px-4">Grafik Jenis Kelamin</div>
              <div class="text-gray-700 text-center px-4 m-2">
                <VueApexCharts width="300" type="donut" :options="options1" :series="series1"></VueApexCharts>
              </div>
            </div>
          </card>
        </div>
      </div>
    </base-header>
    <div class="container-fluid mt--6">
      <!-- <div class="row starter-page"> -->
      <div class="starter-page">

<div class="card-deck">
  <card>
    <h5 class="card-title">Pengumuman</h5>
    <card-pengumuman v-for="(umum, index) in paginatedDataPengumuman" :key="index" :umum="umum"></card-pengumuman>
  </card>
  <card>    
    <h5 class="card-title">Event</h5>
    <card-event v-for="(event, index) in paginatedDataEvents" :key="index" :event="event"></card-event>
    <!-- <base-button type="facebook" class="btn-icon-only rounded-circle" @click="prevPageEvents">
      <span class="btn-inner--icon"><i class="ni ni-bold-left"></i></span>
    </base-button>
    <base-button type="facebook" class="btn-icon-only rounded-circle" @click="nextPageEvents">
      <span class="btn-inner--icon"><i class="ni ni-bold-right"></i></span>
    </base-button> -->
  </card>
</div>


<div class="card-deck">
  <card>
    <span v-if="getStaff.length != 0">
      <card-staff v-for="(staff, index) in getStaff" :key="index" :staff="staff"></card-staff>
    </span>
    <span class="text-center" v-else>
      <pulse-loader class="my-24"></pulse-loader>
    </span>
  </card>
</div>

<div class="card-deck">
  <card>
    <h5 class="card-title">Jumlah Usia per Orang</h5>
    <card-usia v-for="(usia, index) in jumlahUsia" :key="index" :usia="usia"></card-usia>
  </card>
  <card>
    <h5 class="card-title">Jumlah Generasi per Orang</h5>   
    <card-generasi v-for="(generasi, index) in jumlahGenerasi" :key="index" :generasi="generasi"></card-generasi>
  </card>
</div>


      </div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  import moment from 'moment'
  import RouteBreadCrumb from '@/components/Breadcrumb/RouteBreadcrumb';
  import StatsCard from '@/components/Cards/StatsCard';
  import cardOne from '../Sheets/Card_one'
  import cardTwo from '../Sheets/Card_two'
  import cardThree from '../Sheets/Card_three'
  import cardEvent from '../Sheets/Card_event'
  import cardPengumuman from '../Sheets/Card_pengumuman'
  import cardStaff from '../Sheets/Card_staff'
  import cardUsia from '../Sheets/Card_usia'
  import cardGenerasi from '../Sheets/Card_generasi'
  import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
  import VueApexCharts from 'vue-apexcharts'

  export default {
    name: 'starter-page',
    data() {
      return {
        loading: true,
        jumlahUsia: [],
        jumlahGenerasi: [],
        options: { labels: [] },
        series: [],
        options1: { labels: [] },
        series1: [],
        pengumuman: [],
        pagePengumuman: { size: 1, next: true, prev: false, pageNumber: 0 },
        events: [],
        pageEvents: { size: 1, next: true, prev: false, pageNumber: 0 },
        nextEvents: true,
        prevEvents: false,
      }
    },
    computed: {
      getStaff(){
        return this.$store.state.staff
      },
      getUsers(){
        return this.$store.state.users
      },
      pageCountPengumuman(){
        let l = this.pengumuman.length, s = this.pagePengumuman.size;
        return Math.ceil(l/s);
      },
      paginatedDataPengumuman(){
        const start = this.pagePengumuman.pageNumber * this.pagePengumuman.size, end = start + this.pagePengumuman.size;
        return this.pengumuman.slice(start, end);
      },
      pageCountEvents(){
        let l = this.events.length, s = this.pageEvents.size;
        return Math.ceil(l/s);
      },
      paginatedDataEvents(){
        const start = this.pageEvents.pageNumber * this.pageEvents.size, end = start + this.pageEvents.size;
        return this.events.slice(start, end);
      },
    },
    created(){
      this.$store.dispatch('getStaff')
      this.$store.dispatch('getUsers')
    },
    mounted(){
      this.getUsia()
      this.getGenerasi()
      this.getPendidikan()
      this.getJk()
      this.getPengumuman()
      this.getEvent()
    },
    methods: {
      compareValues: function(key, order="asc"){
        return function(a, b) {
          if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
            return 0;
          }

          const varA = (typeof a[key] === 'string') ? a[key].toUppercase() : a[key]
          const varB = (typeof b[key] === 'string') ? b[key].toUppercase() : b[key]

          let comparison = 0
          if (varA > varB) {
            comparison = 1
          }else if (varA < varB) {
            comparison = -1
          }
        
          return ((order == 'desc') ? (comparison * -1) : comparison)
        }
      },
      getUsia: function(){
        let headers = { 'Authorization': 'Bearer '+localStorage.getItem('token') }
        axios.get('https://intranet.lan.go.id:8445/employee/unit', {headers: headers})
        .then(response => {
          
          var jm = moment().format('YYYY')
          var usia=[], u2=[], u3=[], u4=[], u5=[]
          for (let k = 0; k < response.data.length; k++) {
            const element = response.data[k];
            const th = element.nip.substring(0,4)            
            usia.push({'nama': element.nama, 'th': jm-th})
          }

          for (let l = 0; l < usia.length; l++) {
            const el = usia[l];
            if(el.th > 20 && el.th < 30){
              u2.push(el.nama)
            }

            if(el.th >= 30 && el.th < 40){
              u3.push(el.nama)
            }

            if(el.th >= 40 && el.th < 50){
              u4.push(el.nama)
            }

            if(el.th >= 50){
              u5.push(el.nama)
            }
          }

          this.jumlahUsia.push({'text': '> 20th', 'value': u2.length})
          this.jumlahUsia.push({'text': '> 30th', 'value': u3.length})
          this.jumlahUsia.push({'text': '> 40th', 'value': u4.length})
          this.jumlahUsia.push({'text': '> 50th', 'value': u5.length})
          
        })
        .catch(error => {
          console.log(error)
        })
        
        // for (let l = 0; l < usia.length; l++) {
        //   const el = usia[l];
        //   if(el.th > 20 && el.th < 30){
        //     u2.push(el.nama)
        //   }

        //   if(el.th >= 30 && el.th < 40){
        //     u3.push(el.nama)
        //   }

        //   if(el.th >= 40 && el.th < 50){
        //     u4.push(el.nama)
        //   }

        //   if(el.th >= 50){
        //     u5.push(el.nama)
        //   }
        // }
        
        // this.jumlahUsia.push({'text': '> 20th', 'value': u2.length})
        // this.jumlahUsia.push({'text': '> 30th', 'value': u3.length})
        // this.jumlahUsia.push({'text': '> 40th', 'value': u4.length})
        // this.jumlahUsia.push({'text': '> 50th', 'value': u5.length})
        
      },
      getGenerasi: function() {
        let headers = { 'Authorization': 'Bearer '+localStorage.getItem('token') }
        axios.get('https://intranet.lan.go.id:8445/employee/unit', {headers: headers})
        .then(response => {
        
            var gen1=[], gen2=[], gen3=[], gen4=[], gen5=[]
            for (let m = 0; m < response.data.length; m++) {
              const el = response.data[m];
              var tahun = el.nip.substring(0,4)
              if (tahun < 1960) {
                gen1.push(el.nama)
              }else if( tahun >= 1961 && tahun <= 1980){
                gen2.push(el.nama)
              }else if( tahun >= 1981 && tahun <= 1994){
                gen3.push(el.nama)
              }else if( tahun >= 1985 && tahun <= 2010){
                gen4.push(el.nama)
              }else if( tahun >= 2010 && tahun <= 2019){
                gen5.push(el.nama)
              }
            }

            this.jumlahGenerasi.push({'text': 'Baby Boomers (< 1960)', 'value': gen1.length})
            this.jumlahGenerasi.push({'text': 'Generasi X (1961 - 1980)', 'value': gen2.length})
            this.jumlahGenerasi.push({'text': 'Generasi Y - Generasi Millennial (1981 - 1994)', 'value': gen3.length})
            this.jumlahGenerasi.push({'text': 'Generasi Z (1985 - 2010)', 'value': gen4.length})
            this.jumlahGenerasi.push({'text': 'Generasi Alpha (2010 - 2019)', 'value': gen5.length})
            
        })
        .catch(erro => {
          console.log(error);
        })
      },
      getPendidikan: function() {
        let headers = { 'Authorization': 'Bearer '+localStorage.getItem('token') }
        axios.get('https://intranet.lan.go.id:8445/employee/unit', {headers: headers})
        .then(response => {
          var ab=[], sd=[], smp=[], sma=[], smk=[], d1=[], d2=[], d3=[], s1=[], s2=[], s3=[]
          for (let i = 0; i < response.data.length; i++) {
            const element = response.data[i];
            if(element.pendidikan == 'SD'){
              sd.push(element.nama)
            }

            if(element.pendidikan == 'SMP'){
              smp.push(element.nama)
            }

            if(element.pendidikan == 'SMA'){
              sma.push(element.nama)
            }

            if(element.pendidikan == 'SMK'){
              smk.push(element.nama)
            }

            if(element.pendidikan == 'D-1'){
              d1.push(element.nama)
            }

            if(element.pendidikan == 'D-2'){
              d2.push(element.nama)
            }

            if(element.pendidikan == 'D-3'){
              d3.push(element.nama)
            }

            if(element.pendidikan == 'S-1'){
              s1.push(element.nama)
            }
                        
            if(element.pendidikan == 'S-2'){
              s2.push(element.nama)
            }

            if(element.pendidikan == 'S-3'){
              s3.push(element.nama)
            }
          }

          ab.push({'pendidikan':'SD', 'jumlah': sd.length})
          ab.push({'pendidikan':'SMP', 'jumlah': smp.length})
          ab.push({'pendidikan':'SMA', 'jumlah': sma.length})
          ab.push({'pendidikan':'SMK', 'jumlah': smk.length})
          ab.push({'pendidikan':'D1', 'jumlah': d1.length})
          ab.push({'pendidikan':'D2', 'jumlah': d2.length})
          ab.push({'pendidikan':'D3', 'jumlah': d3.length})
          ab.push({'pendidikan':'S1', 'jumlah': s1.length})
          ab.push({'pendidikan':'S2', 'jumlah': s2.length})
          ab.push({'pendidikan':'S3', 'jumlah': s3.length})

          for (let i = 0; i < ab.length; i++) {
            const element = ab[i];
            if(element.jumlah != 0){
              this.options.labels.push(element.pendidikan)
              this.series.push(element.jumlah)
            }
          }

        })
        .catch(error => {
          console.log(error)
        })
      },
      getJk: function() {
        let headers = { 'Authorization': 'Bearer '+localStorage.getItem('token') }
        axios.get('https://intranet.lan.go.id:8445/employee/unit', {headers: headers})
        .then(response => {
          var p=[], w=[]
          for (let j = 0; j < response.data.length; j++) {
            const elemen = response.data[j];
            if(elemen.jenisKelamin == 'P'){
              w.push(elemen.nama)
            }

            if(elemen.jenisKelamin == 'L'){
              p.push(elemen.nama)
            }
          }

          this.options1.labels.push('Pria')
          this.series1.push(p.length)
          this.options1.labels.push('Wanita')
          this.series1.push(w.length)
        })
        .catch(error => {
          console.log(error)
        })
      },
      getPengumuman: function() {
        let headers = { 'Authorization': 'Bearer '+ this.$store.getters.getToken }
        axios.get('https://intranet.lan.go.id:8446/pengumuman', {headers: headers})
        .then(response => {
          this.pengumuman = response.data.sort(this.compareValues('id', 'desc'))
          // console.log(response.data)
        })
        .catch(error => {
          console.log(error)
        })
      },
      getEvent: function() {
        let headers = { 'Authorization': 'Bearer '+ this.$store.getters.getToken }
        axios.get('https://intranet.lan.go.id:8446/kegiatan', {headers: headers})
        .then(response => {
          this.events = response.data.sort(this.compareValues('id', 'desc'))
          // console.log(response.data)
        })
        .catch(error => {
          console.log(error)
        })
      },
      nextPageEvents(){
        this.pageEvents.pageNumber++;
        if (this.pageEvents.pageNumber == this.events.length-1) {
          // this.nextEvents = false
          this.pageEvents.next = false
        }else{
          // this.prevEvents = true
          this.pageEvents.prev = true
        }      
      },
      prevPageEvents(){
        this.pageEvents.pageNumber--;
        if (this.pageEvents.pageNumber == 0) {
          this.prevEvents = false
          this.nextEvents = true
        }else{
          this.nextEvents = true
          this.prevEvents = true
        }
      }
    },
    components: {
      StatsCard,
      RouteBreadCrumb,
      cardOne,
      cardTwo,
      cardThree,
      cardEvent,
      cardPengumuman,
      cardStaff,
      cardUsia,
      cardGenerasi,
      PulseLoader,
      VueApexCharts
    },
  }
</script>
<style>
  .starter-page {
    min-height: calc(100vh - 380px);
  }
</style>
