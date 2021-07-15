<template>
  <div id="nav">
    <router-link to="/">CEP</router-link> |
    <router-link to="/address">Endereço</router-link>
  </div>
  <router-view/>
</template>

<style>
#app {
  padding: 30px;
}

#nav {
  padding: 30px;
  text-align: center;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  padding: 15px;
}

#nav a.router-link-exact-active {
  color: hsl(204, 86%, 53%);
}

.page{
  max-width: 800px;
  margin: 0 auto;
}
</style>
