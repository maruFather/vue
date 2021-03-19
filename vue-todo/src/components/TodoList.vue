<template>
  <div>
      <ul>
          <li v-for="(todoItem, index) in todoItems" v-bind:key="todoItem.item" class="shadow">
              <i class="checkBtn fas fa-check" v-bind:class="{checkBtnComplete : todoItem.completed}" v-on:click="toggleComplete(todoItem, index)"></i>
              <span v-bind:class="{textComplete: todoItem.completed}">
                  {{ todoItem.item }}
              </span>
              <span class="removeBtn" v-on:click="removeTodo(todoItem, index)">
                  <i class="fas fa-trash-alt"></i>
              </span>
          </li>
      </ul>
  </div>
</template>

<script>
export default {
    data: function() {
        return {
            todoItems: []
        }
    },
    created: function() {
        // app 이 실행된후 바로 실행 vue 라이프사이클 
        if (localStorage.length > 0) {
            for (var i = 0; i < localStorage.length; i++) {
                if (localStorage.key(i) !== 'loglevel:webpack-dev-server') {                    
                    this.todoItems.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
                    //this.todoItems.push(localStorage.key(i));
                }
                
            }
        }
    },
    methods: {
        removeTodo: function(todoItem, index) {
            localStorage.removeItem(todoItem);
            // 로컬스토리지를 삭제하고 리스트도 삭제
            this.todoItems.splice(index,1);
        },
        toggleComplete: function(todoItem, index) {
            console.log(index);
            todoItem.completed = !todoItem.completed;
            // 로컬스토리지엔 업데이트가없어서 지우고 다시 저장
            localStorage.removeItem(todoItem.item);
            localStorage.setItem(todoItem.item, JSON.stringify(todoItem));
        }
    }
}
</script>

<style scoped>
    ul {
        /* li 의 점 없앰 */
        list-style-type: none; 
        padding-left: 0px;
        margin-top: 0px;
        text-align: left;
    }
    li {
        display: flex;
        min-height: 50px;
        height: 50px;
        line-height: 50px;
        margin:0.5rem 0;
        padding: 0 0.9rem;
        background: white;
        border-radius: 5px;
    }
    .removeBtn {
        margin-left: auto;
        color: #de4343;
    }
    .checkBtn {
        line-height: 45px;
        color: #62acde;
        margin-right: 5px;
    }
    .checkBtnComplete {
        color: #b3adad;
    }
    .textComplete {
        text-decoration:line-through;
        color: #b3adad;
    }

</style>