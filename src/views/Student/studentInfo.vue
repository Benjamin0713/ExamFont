<template>
  <div>
    <!-- 用户个人信息显示  -->
    <v-card>
      <v-card-title>
        <v-icon large left>mdi-twitter</v-icon>
        <span class="title font-weight-light">个人信息</span>
      </v-card-title>
      <v-card-text class="headline font-weight-bold">
        <v-text-field
          label="学号"
          :rules="rules"
          hide-details="auto"
          disabled=""
          v-model="data.user.userId"
        ></v-text-field>
        <v-text-field
          label="角色"
          :rules="rules"
          hide-details="auto"
          disabled=""
          v-model="data.user.role"
        ></v-text-field>
        <v-text-field
          label="姓名"
          required
          v-model="data.user.name"
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn depressed small color="primary" @click="updateInfo"
        >修改密码
        </v-btn
        >
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";
import * as types from "../../store/type.js";
export default {
  created() {
    this.getStudentInfo();
  },
  data: () => ({
    msg: null,
    data: {
      user: {
        name: "1",
        password: "",
        role: "1",
        userId: "0"
      }
    },
    rules: [value => !!value || "不能为空."]
  }),
  methods: {
    // 获取用户信息
    async getStudentInfo() {
      let userId = sessionStorage.getItem(types.userId);
      console.log(userId);
      let resp = await axios.get("/user/view/id/" + userId);
      if (resp != null) {
        console.log(1111, this.data.user);
        this.data.user.userId = resp.data.data.userId;
      } else {
        console.log("响应为空");
      }
    }
    // //修改用户信息
    // async updateStudentInfo(student) {
    //   let resp = await axios.patch("/students/myInfo", student);
    //   if (resp != null) {
    //     console.log("resp");
    //   } else {
    //     console.log("响应为空");
    //   }
    // },
    // updateInfo() {
    //   console.log("click updateInfo");
    //   console.log(this.data.myInfo);
    //   this.updateStudentInfo(this.data.myInfo);
    // }
  }
};
</script>
