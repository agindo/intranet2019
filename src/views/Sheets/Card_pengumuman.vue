<template>
    <div>
        
        <p class="card-text">{{ isi | substringContent }}</p>
        <p class="card-text"><small class="text-muted">{{ tanggal | moment }}</small></p>
    </div>
</template>
<script>
import moment from 'moment'
export default {
    props: {
        umum: {
            type: Object,
            required: true
        }
    },
    data(){
        return{
            title: this.umum.judul,
            isi: this.umum.isiJudul,
            tanggal: this.umum.tanggal
        }
    },
    filters: {
        moment: function(value){
            moment.locale('id'); 
            return moment(value).format('dddd')+', '+moment(value).format('LL');
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