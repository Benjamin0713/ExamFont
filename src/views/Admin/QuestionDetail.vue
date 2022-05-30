<template>
  <el-form
    :model="question"
    ref="ruleForm"
    label-width="150px"
    class="demo-ruleForm"
  >
    <el-form-item label="题目标题" prop="questionTitle">
      <el-input
        v-model="question.questionTitle"
        style="width: 500px"
      ></el-input>
    </el-form-item>
    <el-form-item label="题目领域" prop="questionField">
      <el-input
        v-model="question.questionField"
        style="width: 500px"
      ></el-input>
    </el-form-item>
    <el-form-item label="题目类型" prop="questionType">
      <el-input
        v-model="question.questionType"
        style="width: 500px"
      ></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')"
      >修改数据
      </el-button
      >
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import axios from "axios";
import * as types from "../../store/type.js";
import qs from "qs";

export default {
  name: "QuestionDetail",
  data() {
    return {
      question: {
        options: "",
        questionField: "",
        questionId: "",
        questionTitle: "",
        questionType: "",
        trueAnswer: ""
      }
    };
  },
  created() {
    // this.quesiton.options = this.$route.params.options;
    // this.quesiton.questionField = this.$route.params.questionField;
    // this.quesiton.questionId = this.$route.params.questionId;
    // this.quesiton.questionTitle = this.$route.params.questionTitle;
    // this.quesiton.questionType = this.$route.params.questionType;
    // this.quesiton.trueAnswer = this.$route.params.trueAnswer;
    // console.log(this.quesiton);
  },
  methods: {
    resetForm(formName) {
      console.log(this.$route.params.queList);
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style scoped></style>
