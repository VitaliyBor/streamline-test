
    import { createStore } from 'vuex';
    import RawTreeData from '../assets/test';


    function buildCleanTree(node, parentId = null) {
          const result = []
        
          if (!node) return result
        
          const entries = Array.isArray(node) ? node : [node]

          for (const entry of entries) {
            const currentNode = entry._nodeId || null;
            const cleanNode = {
              _nodeId: entry._nodeId || null,
              _name: entry._name || null,
              _overstock: entry._overstock || null,
              _stockout: entry._stockout || null,
              children: [],
              parent: parentId || null,
              isHighlighted: false,
              isExpanded: false,
            }

            for (const key in entry) {
              const value = entry[key]
        
            
              if (Array.isArray(value) || (typeof value === 'object' && value !== null)) {

                cleanNode.children.push(...buildCleanTree(value,currentNode ));
              }
            }
        
            // Додаємо тільки вузли з назвою
            if (cleanNode._name){
              // console.log(cleanNode);
              result.push(cleanNode);
            } 
          }
          // console.log("out");
          return result
        }

    export default createStore({
      state: {
        count: 0,
        tree:[],
        currentNode:{},
        previousNode:{},
        expandedArray:[],
        selectedList:[]
      },
      mutations: {
        SET_TREE(state, treeData){
          state.tree = treeData;
        },
        
        SET_CURRENT_NODE(state, currentNode){  
          state.currentNode = currentNode;
        },
        SET_PREVIOUS_NODE(state, previousNode){
          state.previousNode = previousNode;
        },

        SET_EXPANDED_ARRAY(state, expandedArray){
          state.expandedArray = expandedArray;
        },

      },
      actions: {
        async loadTree({commit}){
          const cleanTree = buildCleanTree(RawTreeData.tree.cat)
          commit('SET_TREE', cleanTree);
        },

      },
      getters: {
        // Derived state
         getTree: state => state.tree,
         getCurretNode: state => state.currentNode,
         getPreviousNode: state => state.previousNode,
      },

    });