<template>
  <div>
    <div>
      <h1>授课列表</h1>
      <v-card class="mx-auto" tile>
        <v-list shaped>
          <v-subheader>课程列表</v-subheader>
          <el-table :data="courseList" border stripe>
            <el-table-column type="index"></el-table-column>
            <el-table-column label="课程名" prop="courseName"></el-table-column>
            <el-table-column label="教师" prop="teacher.name"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  type="danger"
                  size="medium"
                  @click="getExamList(scope.row)"
                >管理考试
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
      width="90%"
      @close="addDialogClosed"
      class="dialog"
    >
      <!-- 内容主体区域 -->
      <v-list shaped>
        <v-subheader>考试列表</v-subheader>
        <el-table :data="examList" border stripe>
          <el-table-column type="index"></el-table-column>
          <el-table-column label="考试名称" prop="paperTitle"></el-table-column>
          <el-table-column label="创建时间">
            <template slot-scope="scope"
            >{{ scope.row.createDate | format_date }}
            </template>
          </el-table-column>
          <el-table-column label="开始时间">
            <template slot-scope="scope"
            >{{ scope.row.startDate | format_date }}
            </template>
          </el-table-column>
          <el-table-column label="结束时间">
            <template slot-scope="scope"
            >{{ scope.row.endDate | format_date }}
            </template>
          </el-table-column>
          <el-table-column label="考试状态">
            <template slot-scope="scope"
            >{{ scope.row.status | determine }}
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                type="danger"
                size="medium"
                @click="addDialogVisible = true"
              >查看考试
              </el-button>
              <el-button
                type="danger"
                size="medium"
                @click="detail(scope.row.paperId)"
              >查看学生
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </v-list>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
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
    examList: [],
    addDialogVisible: false
  }),
  methods: {
    formatDate(date) {
      return date.replace("T", " ");
    },
    // 获取课程列表
    async getCourseList() {
      const _this = this;
      let resp = await axios.get("/course/get_courses_taught");
      if (resp.status !== 200) {
        return this.$message.error("获取课程列表失败");
      }
      console.log(resp.data);
      _this.courseList = resp.data.data;
    },
    // 获取考试列表
    async getExamList(row) {
      this.addDialogVisible = true;
      const _this = this;
      let resp = await axios.get("/paper/teacher_get_papers/" + row.courseId);
      if (resp.status !== 200) {
        return this.$message.error("获取考试列表失败");
      }
      console.log(resp.data);
      _this.examList = resp.data.data;
      console.log(_this.examList);
    },
    addDialogClosed() {
      this.$refs.addFormRef.resetFields();
    },
    detail(eid) {
      this.$router.push(`/teacher/exam/${eid}`);
    }
  },
  filters: {
    format_date(date) {
      var json_date = new Date(date).toJSON();
      return new Date(new Date(json_date) + 8 * 3600 * 1000)
        .toISOString()
        .replace(/T/g, " ")
        .replace(/\.[\d]{3}Z/, "");
    },
    determine(status) {
      if (status === 2) {
        return "已结束";
      } else {
        return "未开始";
      }
    }
  }
};
</script>
