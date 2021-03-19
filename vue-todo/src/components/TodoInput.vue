<template>
  <div>
      <input tpye="text" v-model="newTodoItem" >
      <button v-on:click="addTodo">add</button>
  </div>
</template>

<script>
//  화면에 있는데이터와 스크립트 단의 데이터가 동기화 (투웨이 바인딩)
export default {
    data: function() {
        return {
            newTodoItem: ""
        }
    },
    methods: {
        addTodo: function() {
            localStorage.setItem(this.newTodoItem,this.newTodoItem)
            this.newTodoItem = '';
        }
    }
}
</script>

<style>

</style>