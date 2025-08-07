<template>
  <li  class="child" >
    <span  >

    <div @click="selectNode(node)"  @dblclick="expandNode(node)"  :class="{'expanded':node.isExpanded}" >
      <strong :class="{ 'current':node.isHighlighted}" >{{ node._name }}</strong> <br>
    </div>
    <ul v-if="hasChildren"  >
      <div     >
         <TreeNode
           v-for="child in node.children"
           :key="child._nodeId"
           :node="child"
         />
      </div>
    </ul>
    </span>
  </li>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'TreeNode',
  props: {
    node: Object,
  },
  data() {
    return {
      currentNode: Object || null,
      isHighlighted: false,
      expanded: false,
    };
  },
   methods:{

    cheaking(item){
        if(this.currentNodeGlobal._nodeId  == item._nodeId  ){
          item.isHighlighted = !item.isHighlighted;
          this.$store.state.previousNode.isHighlighted  = !item.isHighlighted;
        }
    },

    check(item, list){
      console.log(list.includes(item._name));
      return !list.includes(item._name);
    },
    setCurrentNode(){
      if(this.currentNodeGlobal._nodeId == 1)
       node.isHighlighted =! node.isHighlighted ;
    },
    selectNode(item){
      this.$store.commit('SET_CURRENT_NODE',item );
      const list = this.$store.state.selectedList;
      //if( this.check(item,list))
        list.push(item._name);
      this.cheaking(item);
      this.$store.commit('SET_PREVIOUS_NODE',item);
    },

    expandNode(item, is_full_exspand = false){ 
       
      // for(let i = 0; i < this.$store.state.expandedArray.length; i++){
      //    this.$store.state.expandedArray[i].isExpanded = !this.$store.state.expandedArray[i].isExpanded;
      // }
      this.expanded = ! this.expanded;
      const currentExspandedList = []; 

        item.isExpanded = true;
        currentExspandedList.push(item);

        for (let i = 0; i < item.children.length; i++) {
          item.children[i].isExpanded = true;
          currentExspandedList.push(item.children[i]);
          
          if(is_full_exspand && item.children[i].children && item.children[i].children.length > 0 ){
               this.expandNode(item.children[i] );
          }
        }
        
        //console.log(currentExspandedList);
        this.$store.commit('SET_EXPANDED_ARRAY',currentExspandedList );
    }
   },
  computed: {

    hasChildren() {
      return this.node.children && this.node.children.length > 0
    },

    isFirstElement(){
      if (this.node.children == 1){
        return true;
      } 
    },


     ...mapGetters(['getCurretNode']),

    currentNodeGlobal() {
         return this.getCurretNode
    },

  }
}
</script>

<style scoped>
ul {
  padding-left: 1rem;
  list-style-type: none;
}
</style>

sdf