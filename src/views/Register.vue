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
      <v-btn class="ma-2" outlined @click="logOutAndClearStorage">登出</v-btn>
      <!--      <v-btn-->
      <!--        href="https://github.com/SanguineWang/Examination-System-Vue"-->
      <!--        target="_blank"-->
      <!--        text-->
      <!--      >-->
      <!--        <span class="mr-2">our Github</span>-->
      <!--        <v-icon>mdi-open-in-new</v-icon>-->
      <!--      </v-btn>-->
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
              <!-- <v-divider></v-divider> -->
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
import qs from "qs";
import axios from "axios";
import { rspCode } from "../store/type.js";
export default {
  name: "Login",
  data() {
    return {
      // msg:sessionStorage.getItem(types.rspMsg),
      // show:false,//控制消息弹窗显示
      // loginFormRules: {
      //   // 验证用户名是否合法
      //   id: [
      //     { required: true, message: '学号', trigger: 'blur' },
      //     {
      //       min: 3,
      //       max: 8,
      //       message: '长度在 3 到 8个字符',
      //       trigger: 'blur'
      //     }
      //   ],
      //   name: [
      //     { required: true, message: '请输入姓名', trigger: 'blur' },
      //     {
      //       min: 3,
      //       max: 10,
      //       message: '长度在 2 到 5 个字符',
      //       trigger: 'blur'
      //     }
      //   ],
      //   // 验证密码是否合法
      //   password: [
      //     { required: true, message: '请输入密码', trigger: 'blur' },
      //     {
      //       min: 3,
      //       max: 10,
      //       message: '长度在 3 到 15 个字符',
      //       trigger: 'blur'
      //     }
      //   ]
      // },
      notNullRules: [
        v => /^[0-9]*$/.test(v) || "必须是数字",
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
      // console.log(this.user);

      this.userRegister(this.user).then(() => {
        updateRouters();
        // let role = sessionStorage.getItem(types.role);
        // console.log(role);
        // if (role === types.teacherRole) {
        //   this.$router.push("/teacher/exam");
        // }
        // if (role === types.studentRole) {
        //   this.$router.push("/student");
        // }
        // if (role === types.adminRole) {
        this.$router.push("/");
        // }
      });
    },
    //登录
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
        //  置于本地session仓库
        // let token = resp.data.data.token;
        // let role = resp.data.data.user.type;
        // sessionStorage.setItem(types.author, token);
        sessionStorage.setItem(types.rspMsg, rspMsg);
        sessionStorage.setItem(types.rspCode, rspCode);
        // console.log(token);
        // console.log("1111"+role);
      } else {
        console.log("响应为空");
      }
    }
  }
};
</script>
<style scoped></style>
