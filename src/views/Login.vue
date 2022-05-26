<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="../assets/title.png"
          width="250"
        />
      </div>
    </v-app-bar>
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="5">
            <v-card>
              <v-card-title>
                <span class="headline">输入您的账户</span>
                <v-spacer></v-spacer>
              </v-card-title>
              <!-- <v-divider></v-divider> -->
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        label="*账号"
                        required
                        :rules="notNullRules"
                        v-model="user.id"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        label="*密码"
                        type="password"
                        :rules="notNullRules"
                        required
                        v-model="user.password"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
                <small>*请确认您使用自己的帐户</small>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="black darken-1" text @click="register">注册</v-btn>
                <v-btn color="black darken-1" text @click="login">登入</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import * as types from "../store/type.js";
import { updateRouters } from "../router";
import qs from "qs";
import axios from "axios";
export default {
  name: "Login",
  data() {
    return {
      notNullRules: [
        v => /^[0-9]*$/.test(v) || "必须是数字",
        v => v !== "" || "不能为空"
      ],
      user: {
        id: "",
        password: ""
      }
    };
  },
  components: {},
  created() {},
  mounted() {},
  methods: {
    login() {
      console.log("click login");
      // console.log(this.user);

      this.userLogin(this.user).then(() => {
        updateRouters();
        let role = sessionStorage.getItem(types.role);
        console.log(role);
        if (role === types.teacherRole) {
          this.$router.push("/teacher/exam");
        }
        if (role === types.studentRole) {
          this.$router.push("/student");
        }
        if (role === types.adminRole) {
          this.$router.push("/home");
        }
      });
    },
    register() {
      this.$router.push("/register");
    },
    //登录
    async userLogin(user) {
      const resp = await axios.post(
        "/user/login",
        qs.stringify({
          id: user.id,
          password: user.password
        })
      )
      console.log(resp);
      if (resp != null) {
        //  置于本地session仓库
        let token = resp.data.data.token;
        let role = resp.data.data.user.type;
        sessionStorage.setItem(types.userId, user.id);
        sessionStorage.setItem(types.author, token);
        sessionStorage.setItem(types.role, role);
      } else {
        console.log("响应为空");
      }
    }
  }
};
</script>
<style scoped></style>
