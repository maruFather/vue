import Vue from 'vue'
import Vuex from 'vuex'

// Vue 를 사용하는 모든 영역에 사용할때 Vue.use()
// EX) App.vue -> this.$store 로 사용가능.
Vue.use(Vuex);

const storage = {
    fetch() {
        // app 이 실행된후 바로 실행 vue 라이프사이클 
        const arr= [];
        if (localStorage.length > 0) {
            for (let i = 0; i < localStorage.length; i++) {
                if (localStorage.key(i) !== 'loglevel:webpack-dev-server') {                    
                    arr.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
                }
            }
        }
        return arr;
    }
}

export const store = new Vuex.Store({
    state: {
       todoItems: storage.fetch() 
    },
    getters: {
        storedTodoItems(state) {
            return state.todoItems
        }
    },
    mutations: {
        addOneItem(state, todoItem) {
            const obj = {completed: false, item: todoItem};
            localStorage.setItem(todoItem,JSON.stringify(obj));
            state.todoItems.push(obj);
        },
        removeOneItem(state, payload) {
            localStorage.removeItem(payload.todoItem.item);
            state.todoItems.splice(payload.index,1);
        },
        toggleOneItem(state,payload) {
            state.todoItems[payload.index].completed = !state.todoItems[payload.index].completed;
            // 로컬스토리지엔 업데이트가없어서 지우고 다시 저장
            localStorage.removeItem(payload.todoItem.item);
            localStorage.setItem(payload.todoItem.item, JSON.stringify(payload.todoItem));
        },
        clearAllItems(state) {
            localStorage.clear();
            state.todoItems = []; 
        }
    }
});
