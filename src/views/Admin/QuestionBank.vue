<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>题库管理</el-breadcrumb-item>
      <el-breadcrumb-item>题目列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 搜索与添加区域 -->
      <el-row :gutter="50">
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible = true"
          >添加题目
          </el-button>
        </el-col>
      </el-row>

      <!-- 用户列表区域 -->
      <el-table :data="queList" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column
          label="题目标题"
          prop="questionTitle"
        ></el-table-column>
        <el-table-column
          label="题型(0单选/1多选/2判断/3主观)"
          prop="questionType"
        ></el-table-column>
        <!--        <el-table-column label="操作">-->
        <!--          <template slot-scope="scope">-->
        <!--            &lt;!&ndash; 删除按钮 &ndash;&gt;-->
        <!--            <el-button-->
        <!--              type="danger"-->
        <!--              size="medium"-->
        <!--              @click="removeUserById(scope.row)"-->
        <!--            >删除-->
        <!--            </el-button>-->
        <!--            <el-button type="primary" size="medium" @click="MakeTea(scope.row)">管理</el-button>-->
        <!--          </template>-->
        <!--        </el-table-column>-->
      </el-table>
    </el-card>
  </div>
</template>

<script>
import axios from "axios";
import qs from "qs";

export default {
  name: "QuestionBank",
  data: function() {
    return {
      queList: [],
      addDialogVisible: false
    };
  },
  created() {
    this.getQueList();
  },
  methods: {
    async getQueList() {
      const _this = this;
      const data = await axios.get("/questionbank/get_all");
      if (data.status !== 200) {
        return this.$message.error("获取题目列表失败！");
      }
      _this.queList = data.data.data;
    }
  }
};
</script>

<style scoped></style>
