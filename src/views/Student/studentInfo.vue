<template>
  <div>
    <!-- 用户个人信息显示  -->
    <v-card>
      <v-card-title>
        <v-icon large left>el-icon-postcard</v-icon>
        <span class="title font-weight-light">个人信息</span>
      </v-card-title>
      <v-card-text class="headline font-weight-bold">
        <v-text-field
          label="学号"
          hide-details="auto"
          disabled=""
          v-model="data.user.userId"
        ></v-text-field>
        <v-text-field
          label="角色"
          hide-details="auto"
          disabled=""
          v-model="data.user.type"
        ></v-text-field>
        <v-text-field
          label="姓名"
          required
          disabled=""
          v-model="data.user.name"
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn depressed small color="primary" @click="updateInfo"
        >修改密码
        </v-btn>
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
        name: "",
        password: "",
        type: "0",
        userId: ""
      }
    }
    // rules: [value => !!value || "不能为空."]
  }),
  methods: {
    // 获取用户信息
    async getStudentInfo() {
      let userId = sessionStorage.getItem(types.userId);
      console.log(userId);
      let resp = await axios.get("/user/view/id/" + userId);
      if (resp != null) {
        console.log(resp);
        this.data.user = resp.data.data;
        if (resp.data.data.type === 0) {
          this.data.user.type = "学生";
        }
      } else {
        console.log("响应为空");
      }
    }
  }
};
</script>
