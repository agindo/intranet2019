<template>
    <div>
        <p class="card-text">{{ isi | substringContent}}</p>
        <p class="card-text"><small class="text-muted">{{ tanggalAwal | moment}} s/d {{ tanggalAkhir | moment }}</small></p>
    </div>
</template>
<script>
import moment from 'moment'
export default {
    props: {
        event: {
            type: Object,
            required: true
        }
    },
    data(){
        return{
            title: this.event.judulEvent,
            isi: this.event.isiEvent,
            tanggalAwal: this.event.tanggal,
            tanggalAkhir: this.event.tanggalAkhir
        }
    },
    filters: {
        moment: function(value){
            moment.locale('id'); 
            return moment(value).format('dddd')+', '+moment(value).format('LL');
        },
        substringTitle: function(value) {
            if(value.length > 45){
                return value.substring(0, 40)+"..."
            }else{
                return value
            }
        },
        substringContent: function(value) {
            if(value.length > 200){
                return value.substring(0, 200)+"..."
            }else{
                return value
            }
        }
    }
}
</script>