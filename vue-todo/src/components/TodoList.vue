<template>
  <div>
      <ul>
          <li v-for="(todoItem, index) in propsdata" v-bind:key="todoItem.item" class="shadow">
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
    props: ['propsdata'],
    methods: {
        removeTodo: function(todoItem, index) {
            this.$emit('removeItem',todoItem, index);
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