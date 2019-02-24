<template>
  <div id="other">
    <div class="test">
      <div ref="test">this is my {{name}}</div>
      <div>no nextTick: this is my {{msg1}}</div>
      <div>nextTick: this is my {{msg2}}</div>
      <div>no nextTick: this is my {{msg3}}</div>
      <div>{{now}}</div>
      <div>{{reversedMessage}}</div>
      <button @click="getMes">go</button>
      <div>{{$store.state.count}}</div>
      <button @click="$store.commit('increment')">add</button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      name: 'test',
      msg1: '',
      msg2: '',
      msg3: '',
      message: 'hello'
    }
  },
  created () {
    //this.getName()
  },
  mounted () {
    this.getName()
  },
  computed: {
    now () {
      return Date.now()
    },
    reversedMessage: function () {
      return this.message.split('').reverse().join('')
    },
    ...mapGetters([
      'doneTodosCount',
      'anotherGetter'
    ])
  },
  methods: {
    getName () {
      this.name = 'pzx'
      this.msg1 = this.$refs.test.innerHTML
      this.$nextTick(() => {
        this.msg2 = this.$refs.test.innerHTML
      })
      this.msg3 = this.$refs.test.innerHTML
    },
    getMes () {
      console.log(this.reversedMessage)
    }
  }
}
</script>

<style lang="css">
  .test {
    width: 100%;
    height: 500px;
    background: #333;
    color: #fff;
  }
</style>
