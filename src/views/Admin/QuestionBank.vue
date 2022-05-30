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
      <el-table
        :data="queList"
        :cell-style="{ 'text-align': 'center' }"
        :header-cell-style="{ 'text-align': 'center' }"
        border
        stripe
      >
        <el-table-column
          label="编号"
          type="index"
          style="width: 150px"
        ></el-table-column>
        <el-table-column
          label="题目标题"
          prop="questionTitle"
          style="width: 250px"
        ></el-table-column>
        <el-table-column
          label="题型"
          prop="questionType"
          :formatter="typeFormat"
        ></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="large" @click="check(scope)"
            >题目详情
            </el-button>
          </template>
        </el-table-column>
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
    typeFormat(row, column) {
      if (row.questionType === 0) {
        return "单选题";
      } else if (row.questionType === 1) {
        return "多选题";
      } else if (row.questionType === 2) {
        return "判断题";
      } else if (row.questionType === 3) {
        return "主观题";
      }
    },
    check(param) {
      // dialog
      // 获取index
      const index = param.$index;
      console.log(this.queList[index]);
      // console.log(param.$index);
      this.$router.push({
        name: "questionDetail",
        path: "/questionDetail",
        params: {
          // options: this.queList[index].options,
          // questionField: this.queList[index].questionField,
          // questionId: this.queList[index].questionId,
          // questionTitle: this.queList[index].questionTitle,
          // questionType: this.queList[index].questionType,
          // trueAnswer: this.queList[index].trueAnswer
          queList: this.queList[index]
        }
      });
    },
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
