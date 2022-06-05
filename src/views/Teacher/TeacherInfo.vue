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
          label="职工号"
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
        <v-btn depressed small color="primary" @click="addDialogVisible = true"
        >修改密码
        </v-btn>
      </v-card-actions>
    </v-card>
    <el-dialog
      title="修改密码"
      :visible.sync="addDialogVisible"
      width="50%"
      @close="addDialogClosed"
      class="dialog"
    >
      <!-- 内容主体区域 -->
      <el-form ref="addFormRef" label-width="70px">
        <el-form-item label="旧密码" prop="oldpwd">
          <el-input v-model="add.user.oldpwd"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newpwd">
          <el-input v-model="add.user.newpwd"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateInfo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
import * as types from "../../store/type.js";
import qs from "qs";
export default {
  created() {
    this.getStudentInfo();
  },
  data: () => ({
    msg: null,
    addDialogVisible: false,
    add: {
      user: {
        oldpwd: "",
        newpwd: ""
      }
    },
    data: {
      user: {
        name: "",
        password: "",
        type: "0",
        userId: ""
      }
    }
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
        if (resp.data.data.type === 1) {
          this.data.user.type = "老师";
        }
      } else {
        console.log("响应为空");
      }
    },
    async updateInfo() {
      let resp = await axios.post(
        "/user/modifyPwd",
        qs.stringify({
          oldPwd: this.add.user.oldpwd,
          newPwd: this.add.user.newpwd
        })
      );
      console.log(resp);
      if (resp.data.rspCode !== "200") {
        let rspMsg = resp.data.rspMsg;
        this.$message({
          showClose: true,
          message: rspMsg
        });
      } else {
        this.$message("修改密码成功");
        this.addDialogVisible = false;
      }
    },
    // 监听添加用户对话框的关闭事件
    addDialogClosed() {
      this.$refs.addFormRef.resetFields();
    }
  }
};
</script>
