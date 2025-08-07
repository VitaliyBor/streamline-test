<template>
  <div class="col">
    <div> <strong>List</strong> </div>
    <div v-for="(item,index) in items" >
      {{item}}
 
      <button @click="deleteItem(index )">delete</button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'


export default {
  name: 'SelectedList',
    data(){
    return{
        items: this.$store.state.selectedList
    }
  },
  methods:{
    deleteItem(index){
       // var index = this.items.indexOf(item);
         if (index > -1) {
          this.items.splice(index, 1);
         }
    }
  },
//   computed: {
//     ...mapGetters(['getTree']),
//     tree() {
//       return this.getTree
//     }
//   },
//   mounted() {
//     this.$store.dispatch('loadTree')
//   }
}
</script>