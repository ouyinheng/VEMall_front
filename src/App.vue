<template>
  <div id="app">
    <transition name="fade" mode="out-in">
        <router-view/>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
/* #app {
  min-width: 1200px;
  margin: 0 auto;
  font-family: "Helvetica Neue","PingFang SC",Arial,sans-serif;
} */
* {
  padding: 0;
  margin: 0;
}
li {
	list-style: none;
}
a {
	text-decoration: none;
}
</style>
