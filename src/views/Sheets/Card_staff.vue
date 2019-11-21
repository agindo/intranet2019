<template>
    <div>
<div class="list-group list-group-flush">
    
    <a href="#!" class="list-group-item list-group-item-action">
        <div class="row align-items-center">
            <div class="col-auto">
                <!-- Avatar -->
                <!-- <img alt="Image placeholder" src="https://demos.creative-tim.com/vue-argon-dashboard-pro/img/theme/team-1.jpg" class="avatar rounded-circle"> -->
                <avatar :username="getWord(username)" :size="40" :background-color="getColor(grading)"></avatar>
            </div>
            <div class="col ml--2">
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <h4 class="mb-0 text-sm">{{ nama }}</h4>
                    </div>
                    <div class="text-right text-muted">
                        <small>{{ nip }}</small>
                    </div>
                </div>
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <!-- <h4 class="mb-0 text-sm">{{ nama }}</h4> -->
                        <p class="text-sm mb-0">{{ jabatan }}</p>
                    </div>
                    <div class="text-right text-muted">
                        <small>{{ getGeneration(nip) }}</small>
                    </div>
                </div>
                <!-- <p class="text-sm mb-0">Let's meet at Starbucks at 11:30. Wdyt?</p> -->
            </div>
        </div>

    </a>
</div>




    </div>
</template>
<script>
import moment from 'moment'
import Avatar from 'vue-avatar'
export default {
    props: {
        staff: {
            type: Object,
            required: true
        }
    },
    data(){
        return{
            nip: this.staff.nip,
            nama: this.staff.nama,
            jabatan: this.staff.jabatan,
            username: this.staff.username,
            grading: this.staff.grading
        }
    },
    methods: {
        getGeneration: function(value){
            var ab = value.substring(0,4)
            var cd = moment().format('YYYY') - ab
            if( ab < 1960){
                return 'Baby Boomers / '+cd+'th'
            }else if( ab >= 1961 && ab <= 1980){
                return 'Generasi X / '+cd+'th'
            }else if( ab >= 1981 && ab <= 1994){
                return 'Generasi Y - Generasi Millennial / '+cd+'th'
            }else if( ab >= 1985 && ab <= 2010){
                return 'Generasi Z / '+cd+'th'
            }else if( ab >= 2010 && ab <= 2019){
                return 'Generasi Alpha / '+cd+'th'
            }else{
                return ab
            }
        },
        getWord: function(value){
            return value.substring(0, 1)
        },
        getColor: function(value){
            return '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6)
        }
    },
    components: {
        Avatar
    }
}
</script>