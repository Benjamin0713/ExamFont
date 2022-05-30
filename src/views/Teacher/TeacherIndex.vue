<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
    >
      <v-list dense>
        <template v-for="item in navItems">
          <v-list-item :key="item.text" link @click="routeToPath(item.path)">
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                {{ item.text }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="blue darken-3"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
        <span class="hidden-sm-and-down">在线考试系统-教师后台</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn class="ma-2" outlined @click="logOutAndClearStorage">退出</v-btn>
      <v-btn icon large>
        <v-avatar size="32px" item>
          <v-img
            src="https://cdn.vuetifyjs.com/images/logos/logo.svg"
            alt="Vuetify"
          ></v-img
        ></v-avatar>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container fluid class="mx-auto">
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import router from "../../router";
import axios from "axios";
export default {
  data: () => ({
    drawer: null,
    myInfo: {},
    navItems: [
      { icon: "el-icon-s-claim", text: "授课管理", path: "/teacher/exam" },
      {
        icon: "el-icon-user-solid",
        text: "个人信息管理",
        path: "/teacher/myInfo"
      }
    ]
  }),
  components: {},
  created() {},
  computed: {
    getStartTime() {
      return this.startDate + "T" + this.startTime;
    },
    getEndTime() {
      return this.endDate + "T" + this.endTime;
    }
  },
  mounted() {},
  methods: {
    routeToPath(path) {
      this.$router.push(path);
    },
    logOutAndClearStorage() {
      sessionStorage.clear();
      this.$router.push("/");
    }
  }
};
</script>
<style scoped></style>
