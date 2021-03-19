<template>
  <div class="inputBox" shadow>
      <input tpye="text" v-model="newTodoItem" v-on:keyup.enter="addTodo">
      <span class="addContainer" v-on:click="addTodo">
         <i class="fas fa-plus addBtn"></i>
      </span>

      <Modal v-if="showModal" @close="showModal = false">
        <!--
            you can use custom content here to overwrite
            default content
        -->
        <h3 slot="header">경고!
            <i class="closeModalBtn fas fa-times"  @click="showModal = false"></i>
            </h3>
        <div slot="body"> 무언가를 입력하세요.</div>
        <!-- <div slot="footer"> copy right</div> -->
      </Modal>
  </div>
</template>

<script>
import Modal from './common/Modal.vue'

//  화면에 있는데이터와 스크립트 단의 데이터가 동기화 (투웨이 바인딩)
export default {
    data: function() {
        return {
            newTodoItem: "",
            showModal: false
        }
    },
    methods: {
        addTodo: function() {
            if (this.newTodoItem !== ''){
                this.$emit('addTodo',this.newTodoItem);
                this.clearInput();
            } else {
                this.showModal = !this.showModal;
            }
        },
        clearInput: function() {
            this.newTodoItem = '';
        }
    },
    components: {
        'Modal': Modal
    }
}
</script>

<style scoped>
    input:focus{
        outline: none;
    }
    .inputBox {
        background: white;
        height: 50px;
        line-height: 50px;
        border-radius: 5px;
    }
    .inputBox input {
        border-style: none;
        font-size: 0.9rem;
    }
    .addContainer{
        float: right;
        background: linear-gradient(to right, #6478FB, #8763FB);
        display: block;
        width: 3rem;
        border-radius: 0 5px 5px 0;
    }
    .addBtn {
        color: white;
        vertical-align: middle;
    }
    .closeModalBtn {
        color: #42b983;
    }
    /* 리스트 아이템 트렌지션 효과 */
    .list-item {
        display: inline-block;
        margin-right: 10px;
    }
    .list-enter-active, .list-leave-active {
        transition: all 1s;
    }
    .list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
        opacity: 0;
        transform: translateY(30px);
    }



</style>