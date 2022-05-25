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

      <v-spacer></v-spacer>
      <v-btn class="ma-2" outlined @click="logOutAndClearStorage">退出</v-btn>
    </v-app-bar>
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="5">
            <v-card>
              <v-card-title>
                <span class="headline">注册账户</span>
                <v-spacer></v-spacer>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        label="学号"
                        required
                        :rules="notNullRules"
                        v-model="user.userId"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        label="姓名"
                        required
                        :rules="notNullRules"
                        v-model="user.name"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        label="密码"
                        type="password"
                        :rules="notNullRules"
                        required
                        v-model="user.password"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
                <small>请确认您使用自己的帐户</small>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="black darken-1" text @click="register">注册</v-btn>
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
import axios from "axios";
export default {
  name: "Login",
  data() {
    return {
      notNullRules: [
        v => v !== "" || "不能为空"
      ],
      user: {
        userId: "",
        name: "",
        password: ""
      }
    };
  },
  components: {},
  created() {},
  mounted() {},
  methods: {
    logOutAndClearStorage() {
      sessionStorage.clear();
      this.$router.push("/");
    },
    register() {
      console.log("click register");
      this.userRegister(this.user).then(() => {
        updateRouters();
        let rspCode = sessionStorage.getItem(types.rspCode);
        if (rspCode === "200") {
          this.$router.push("/");
        }
      });
    },
    //注册
    async userRegister(user) {
      const resp = await axios.post(
        "/user/register",
        user
      )
      console.log(resp);
      if (resp != null) {
        let rspMsg = resp.data.rspMsg;
        let rspCode = resp.data.rspCode;
        console.log(rspMsg);
        this.$message({
          showClose: true,
          message: rspMsg
        });
        //  置于本地session仓库
        sessionStorage.setItem(types.rspMsg, rspMsg);
        sessionStorage.setItem(types.rspCode, rspCode);
      } else {
        console.log("响应为空");
      }
    }
  }
};
</script>
<style scoped></style>
