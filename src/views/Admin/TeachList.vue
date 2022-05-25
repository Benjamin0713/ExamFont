<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>教师列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 用户列表区域 -->
      <el-table :data="userlist" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="姓名" prop="name"></el-table-column>
        <el-table-column label="教工号" prop="userId"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- 删除按钮 -->
            <el-button
              type="danger"
              size="medium"
              @click="removeUserById(scope.row)"
            >删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      userlist: [],
      // 控制添加用户对话框的显示与隐藏
      addDialogVisible: false,
      add: {
        user: {
          userId: "",
          name: "",
          password: ""
        }
      }
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    async getUserList() {
      const _this = this;
      const data = await axios.get("/user/get_all_teacher");
      if (data.status !== 200) {
        return this.$message.error("获取用户列表失败！");
      }
      _this.userlist = data.data.data;
      console.log(_this.userlist);
    },
    // 根据Id删除对应的用户信息
    async removeUserById(row) {
      // 弹框询问用户是否删除数据
      console.log(row.userId);
      const confirmResult = await this.$confirm(
        "此操作将永久删除该用户, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).catch(err => err);
      // 如果用户确认删除，则返回值为字符串 confirm
      // 如果用户取消了删除，则返回值为字符串 cancel
      if (confirmResult !== "confirm") {
        return this.$message.info("已取消删除");
      }

      const data = await axios.delete("/user/delete/" + row.userId);

      if (data.status !== 200) {
        return this.$message.error("删除用户失败！");
      }

      this.$message.success("删除用户成功！");
      // this.userlist = data.data.data.studentList;
      await this.getUserList();
    },
  }
};
</script>

<style lang="less" scoped>
</style>
