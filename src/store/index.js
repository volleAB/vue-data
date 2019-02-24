import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    count: 0,
    todos: [],
    home: false
  },
  mutations: {
    increment (state) {
      state.count++
    }
  }
})

store.commit('increment')

// console.log(store.state.count)

export default store
