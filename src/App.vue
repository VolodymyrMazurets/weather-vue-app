<template>
  <div id="app" class="app">
    <el-menu
      :default-active="$route.path"
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
    >
      <template v-for="rule in filteredRoutes">
        <el-menu-item :index="rule.path" :key="rule.path">{{ rule.name }}</el-menu-item>
      </template>
    </el-menu>
    <transition name="fade" :appear="false" mode="out-in">
      <router-view class="app__content" />
    </transition>
  </div>
</template>

<script>
export default {
  computed: {
    filteredRoutes() {
      return this.$router.options.routes.filter((item) => item.name !== 'FilmDetails');
    },
  },
};
</script>

<style lang="scss">
body,
html {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  height: 100vh;
  background-color: #c3c3c3;
}
.fade-enter-active {
  animation: fadeIn 0.2s;
}
.fade-leave-active {
  animation: fadeOut 0.2s;
}
@-webkit-keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

.fadeIn {
  -webkit-animation-name: fadeIn;
  animation-name: fadeIn;
}

@-webkit-keyframes fadeOut {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
}

.fadeOut {
  -webkit-animation-name: fadeOut;
  animation-name: fadeOut;
}

.app {
  height: 100vh;
  display: flex;
  align-items: stretch;
  justify-content: stretch;
  flex-direction: column;
  &__content {
    flex: 1;
    padding: 24px 5%;
  }
}
</style>
