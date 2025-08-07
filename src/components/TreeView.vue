<template>
  <div class="col">
    <button @click="exspandAll(currentNode)" style="margin-right:20px">Expand</button>
    <button @click="collapseAll(currentNode)">Collapse</button>
    <!-- use current element -->
    <ul>
      <TreeNode 
        v-for="item in tree"
        :key="item._nodeId"
        :node="item"
      />
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import TreeNode from './TreeNode.vue'

export default {
  name: 'TreeView',
  components: { TreeNode },
  methods:{

      exspandAll(current) {
        const fullExspand = true;
        this.expandNode(current, fullExspand);
      },

      //shouldn't be like that

      expandNode(item, is_full_espand = false){ 
       
      // for(let i = 0; i < this.$store.state.expandedArray.length; i++){
      //    this.$store.state.expandedArray[i].isExpanded = !this.$store.state.expandedArray[i].isExpanded;
      // }
      
      const currentExspandedList = []; 

        item.isExpanded = true;
        currentExspandedList.push(item);
        

        for (let i = 0; i < item.children.length; i++) {
          item.children[i].isExpanded = true;
          currentExspandedList.push(item.children[i]);
          
          if(is_full_espand && item.children[i].children && item.children[i].children.length > 0 ){
               this.expandNode(item.children[i],true );
          }
        }
        
        //console.log(currentExspandedList);
        this.$store.commit('SET_EXPANDED_ARRAY',currentExspandedList );
    },

    collapseAll(item){
      item.isExpanded = false;


      for (let i = 0; i < item.children.length; i++) {
          item.children[i].isExpanded = false;
          
          if(item.children[i].children && item.children[i].children.length > 0 ){
               this.collapseAll(item.children[i] );
          }
        }

    }
  },
  computed: {
    ...mapGetters(['getTree']),
    ...mapGetters(['getCurretNode']),
    tree() {
      return this.getTree
    },
    currentNode(){
         return this.getCurretNode
    }

  },
  // created() {
  //    this.$store.commit('SET_CURRENT_NODE', this.tree[0] ); 
    
  // },
 
  mounted() {
  //   this.$store.dispatch('loadTree')
  //   this.$store.commit('SET_CURRENT_NODE', this.tree[0] ); 
  //  // this.$store.commit('SET_PREVIOUS_NODE', this.tree[0] ); 
  //   console.log(this.currentNode._nodeId);
  //    console.log(this.currentNode.isHighlighted);
  //   //this.currentNode.isHighlighted = !this.currentNode.isHighlighted;

  //   console.log(!this.currentNode.isHighlighted);
  }
}
</script>
