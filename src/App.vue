<template>
  <div id="app">
    <transition>
      <router-view></router-view>
    </transition>
    <button @click="login">login</button>
    <button class="go" @click="skip">skip</button>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    skip () {
      if(this.$route.name == 'Main') {
        this.$router.push({name:'Test'})
      } else {
        this.$router.push({name:'Main'})
      }

    },
    login() {
      this.$store.state.home = true
      alert('欢迎回来！')
    }
  }
}
</script>

<style>
body {
  margin: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.go {
  width: 100px;
  height: 50px;
  border: 1px solid brown;
  border-radius: 4px;
  background-color: brown;
  color: aqua;
}
</style>
