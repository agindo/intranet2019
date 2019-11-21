<template>
    <div>
        
        <div class="flex flex-col">
            <div class="font-sans text-lg text-gray-800 text-center py-2">{{ user.perEselonDua }}</div>
            <div class="text-6xl text-gray-800 text-center px-4 py-2 m-2">{{ staff }}</div>
            <div class="font-sans text-lg text-gray-800 text-center px-4 py-2">Personel</div>
        </div>
    </div>
</template>
<script>
import StatsCard from '@/components/Cards/StatsCard';
export default {
    props: {
        user: {
            type: Object,
            required: true
        },
        staff: {
            type: Number,
            default: 0
        }
    },
    // data(){
    //     return{
    //         jumlahUnit: this.unit
    //     }
    // }
}
</script>