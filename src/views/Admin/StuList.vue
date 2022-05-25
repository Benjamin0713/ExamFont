<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>学生列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 搜索与添加区域 -->
      <el-row :gutter="50">
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible = true"
          >添加学生
          </el-button
          >
        </el-col>
      </el-row>

      <!-- 用户列表区域 -->
      <el-table :data="userlist" border stripe>
        <el-table-column type="index"></el-table-column>
        <!--        <el-table-column prop="id" label="序号" sortable width="75px"></el-table-column>-->
        <el-table-column label="姓名" prop="name"></el-table-column>
        <el-table-column label="学号" prop="userId"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- 删除按钮 -->
            <el-button
              type="danger"
              size="medium"
              @click="removeUserById(scope.row)"
            >删除
            </el-button>
            <el-button type="primary" size="medium" @click="MakeTea(scope.row)">管理</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 添加用户的对话框 -->
    <el-dialog
      title="添加学生"
      :visible.sync="addDialogVisible"
      width="50%"
      @close="addDialogClosed"
      class="dialog"
    >
      <!-- 内容主体区域 -->
      <el-form ref="addFormRef" label-width="70px">
        <el-form-item label="学号" prop="userId">
          <el-input v-model="add.user.userId"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="add.user.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="add.user.password"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
import qs from "qs";

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
      },
      // 添加表单的验证规则对象
      addFormRules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        userId: [{ required: true, message: "请输入学号", trigger: "blur" }]
      }
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    async getUserList() {
      const _this = this;
      const data = await axios.get("/user/get_all_students");
      if (data.status !== 200) {
        return this.$message.error("获取用户列表失败！");
      }
      _this.userlist = data.data.data;
      console.log(_this.userlist);
      // this.userlist = data.data.data.studentList;
      // console.log(data)
    },
    // 监听添加用户对话框的关闭事件
    addDialogClosed() {
      this.$refs.addFormRef.resetFields();
    },
    // 点击按钮，添加新用户
    async addUser() {
      const resp = await axios.post("/user/register", this.add.user);
      this.addDialogVisible = false;
      // this.userlist = resp.data.data.studentList;
      // 重新获取用户列表数据
      await this.getUserList();
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
      // console.log(confirmResult)
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
    async MakeTea(row) {
      console.log(row.userId);
      const confirmResult = await this.$confirm(
        "此操作将修改该用户身份, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).catch(err => err);
      if (confirmResult !== "confirm") {
        return this.$message.info("已取消修改");
      }
      const data = await axios.get("/user/modify_type/" + row.userId);
      if (data.status !== 200) {
        return this.$message.error("修改用户失败！");
      }

      this.$message.success("修改用户成功！");
      // this.userlist = data.data.data.studentList;
      await this.getUserList();
    }
  }
};
</script>

<style lang="less" scoped></style>
