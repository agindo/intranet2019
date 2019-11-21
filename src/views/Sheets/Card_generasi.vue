<template>
    <div>
        <div class="flex justify-between border-b-2 border-solid border-gray-100">
            <div class="font-thin text-center px-4 py-2">{{ text }}</div>
            <div class="font-thin text-center px-4 py-2">{{ val }} Orang</div>
        </div>
    </div>
</template>
<script>
import moment from 'moment'
export default {
    props: {
        generasi: {
            type: Object,
            required: true
        }
    },
    data(){
        return{
            text: this.generasi.text,
            val: this.generasi.value
        }
    }
}
</script>