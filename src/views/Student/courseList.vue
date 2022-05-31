<template>
  <div>
    <div>
      <!-- 课程列表展示 -->
      <h1>课程列表展示</h1>
      <v-card class="mx-auto" tile>
        <v-list shaped>
          <v-subheader>课程列表</v-subheader>
          <el-table :data="courseList" border stripe>
            <el-table-column type="index"></el-table-column>
<!--            <el-table-column prop="id" label="序号" sortable width="75px"></el-table-column>-->
            <el-table-column label="课程名" prop="courseName"></el-table-column>
            <el-table-column label="教师" prop="teacher.name"></el-table-column>
            <el-table-column label="操作">
              <template>
                <el-button
                  type="danger"
                  size="medium"
                  @click="addDialogVisible = true"
                >查看考试
                </el-button>
              </template>
            </el-table-column>
          </el-table>

        </v-list>
      </v-card>
    </div>
    <el-dialog
      title="考试列表"
      :visible.sync="addDialogVisible"
      width="80%"
      @close="addDialogClosed"
      class="dialog"
    >
      <!-- 内容主体区域 -->
      <v-list shaped>
        <v-subheader>课程列表</v-subheader>
        <el-table :data="courseList" border stripe>
          <el-table-column type="index"></el-table-column>
          <!--            <el-table-column prop="id" label="序号" sortable width="75px"></el-table-column>-->
          <el-table-column label="课程名" prop="courseName"></el-table-column>
          <el-table-column label="教师" prop="teacher.name"></el-table-column>
          <el-table-column label="操作">
            <template>
              <el-button
                type="danger"
                size="medium"
                @click="addDialogVisible = true"
              >查看考试
              </el-button>
            </template>
          </el-table-column>
        </el-table>

      </v-list>
<!--      <el-form ref="addFormRef" label-width="70px">-->
<!--        <el-form-item label="旧密码" prop="oldpwd">-->
<!--          <el-input v-model="add.user.oldpwd"></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="新密码" prop="newpwd">-->
<!--          <el-input v-model="add.user.newpwd"></el-input>-->
<!--        </el-form-item>-->
<!--      </el-form>-->
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

export default {
  created() {
    this.getCourseList();
  },
  data: () => ({
    alert: false,
    dialog: false,
    courseList: [],
    addDialogVisible: false

  }),
  methods: {
    formatDate(date) {
      return date.replace("T", " ");
    },
    // 获取课程列表
    async getCourseList() {
      const _this = this;
      let resp = await axios.get("/course/get_courses_learned");
      if (resp.status !== 200) {
        return this.$message.error("获取课程列表失败");
      }
      console.log(resp.data);
      _this.courseList=resp.data.data;
    },
    addDialogClosed() {
      this.$refs.addFormRef.resetFields();
    }

  }
};
</script>
