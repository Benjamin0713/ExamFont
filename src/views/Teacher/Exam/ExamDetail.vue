<template>
  <div class="detail">
    <v-row align="center" class="mx-auto" justify="center">
      <v-toolbar-title
        ><h3>{{ examDetail.name }}</h3>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn class="ma-2" outlined @click="openGradeSheet()">
        <v-icon left dark>sort</v-icon>
        统计成绩
      </v-btn>
      <v-btn class="ma-2" outlined @click="dialog = !dialog">
        <v-icon left dark>search</v-icon>
        查看试卷
      </v-btn>
    </v-row>

    <v-row>
      <v-col cols="12" md="12">
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">序号</th>
                <th class="text-left">学号</th>
                <th class="text-left">学生名</th>
                <th class="text-left">提交情况</th>
                <th class="text-left">答题卡</th>
              </tr>
            </thead>
            <tbody>
            <tr v-for="(item, index) in examDetail" :key="item.answerSheetId">
              <td>{{ index + 1 }}</td>
              <td>{{ item.student.userId }}</td>
              <td>{{ item.student.name }}</td>
              <td>{{ item.status ? "已提交" : "未提交" }}</td>
              <td>
                <v-btn
                  class="ma-2"
                  outlined
                  v-if="item.status"
                  @click="openStuentSheet(item.student.user.id)"
                >
                  查看答题卡
                  <v-icon right dark>keyboard_arrow_right</v-icon>
                </v-btn>
              </td>
            </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </v-row>
    <v-dialog v-model="dialog" max-width="800px">
      <v-card class="pa-6">
        <v-card-title>
          试卷
          <v-spacer></v-spacer>
          <v-btn color="black darken-1" text @click="dialog = !dialog">
            <v-icon> mdi-close</v-icon></v-btn
          >
        </v-card-title>
        <v-container>
          <h3>一、选择题</h3>
          <template v-for="(item, index) in question.questionTitle">
            <div :key="item.questionList">
              <h5>
                {{ index + 1 }}.{{ item.questionTitle }} ({{ item.score }}分)
              </h5>
              <br />
              <v-list-item-subtitle>
                A.{{ item.options }}
              </v-list-item-subtitle>
              <br />
              <v-list-item-subtitle>
                B.{{ item.options }}
              </v-list-item-subtitle>
              <br />
              <v-list-item-subtitle>
                C.{{ item.options }}
              </v-list-item-subtitle>
              <br />
              <v-list-item-subtitle>
                D.{{ item.options }}
              </v-list-item-subtitle>
              <br />

              <v-list-item-subtitle>
                答案：{{ item.answer }}
              </v-list-item-subtitle>
              <br />
            </div>
          </template>
          <h3>二、判断题</h3>
          <template v-for="(item, index) in examDetail.judgmentList">
            <div :key="`judgmentList-${item.id}`">
              <h5>{{ index + 1 }}.{{ item.title }} ({{ item.score }}分)</h5>
              <br />
              <v-list-item-subtitle>
                答案：{{ item.answer == 0 ? "×" : "√" }}
              </v-list-item-subtitle>
              <br />
            </div>
          </template>
          <h3>三、简答题</h3>
          <template v-for="(item, index) in examDetail.subjectiveList">
            <div :key="`subjectiveList-${item.id}`">
              <h5>{{ index + 1 }}.{{ item.title }} ({{ item.score }}分)</h5>
              <br />
              <p>参考答案：{{ item.trueAnswer[0] }}</p>
              <br />
            </div>
          </template>
        </v-container>
      </v-card>
    </v-dialog>

    <v-dialog v-model="studentSheetDialog" max-width="800px">
      <v-card class="pa-6">
        <v-card-title>
          答题卡
          <v-spacer></v-spacer>
          <v-btn
            color="black darken-1"
            text
            @click="studentSheetDialog = !studentSheetDialog"
          >
            <v-icon> mdi-close</v-icon></v-btn
          >
        </v-card-title>
        <v-container>
          <h3>简答题</h3>
          <template v-for="(item, index) in subjectiveList">
            <div :key="`subjectiveList-${item.id}`">
              <h3>
                {{ index + 1 }}.{{ item.subjective.title }} ({{
                  item.subjective.score
                }}分)
              </h3>
              <br />
              <p>他的回答：{{ item.answer }}</p>
              <br />
              <p>参考答案：{{ item.subjective.answer }}</p>
              <br />
              <v-text-field
                label="评分"
                v-model="item.score"
                :rules="scoreRules"
              ></v-text-field>
              <br />
            </div>
          </template>
          <v-col cols="12" md="4" class="mx-auto">
            <v-btn
              class="mx-auto"
              color="secondary"
              @click="closeStuentSheet(subjectiveList[0].student.user.id)"
            >
              <v-icon>check</v-icon>Submit
            </v-btn>
          </v-col>
        </v-container>
      </v-card>
    </v-dialog>

    <v-dialog v-model="gradeDialog" max-width="800px">
      <v-card class="pa-6">
        <v-card-title>
          成绩单
          <v-spacer></v-spacer>
          <v-btn
            color="black darken-1"
            text
            @click="gradeDialog = !gradeDialog"
          >
            <v-icon> mdi-close</v-icon></v-btn
          >
        </v-card-title>
        <v-container>
          <v-col cols="12" md="12">
            <v-simple-table>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">序号</th>
                    <th class="text-left">学号</th>
                    <th class="text-left">学生名</th>
                    <th class="text-left">考试名</th>
                    <th class="text-left">教师名</th>
                    <th class="text-left">总分</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(item, index) in gradeSheetList"
                    :key="`gradeSheetList-${index}`"
                  >
                    <td>{{ index + 1 }}</td>
                    <td>{{ item.student.user.number }}</td>
                    <td>{{ item.student.user.name }}</td>
                    <td>{{ item.exam }}</td>
                    <td>{{ item.teacher }}</td>
                    <td>{{ item.grade }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-col>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import * as analysis from "@/util/analysisExcel.js";
import axios from "axios";
export default {
  props: ["eid"],
  data() {
    return {
      paper: {},
      students: [],
      gradeDialog: false,
      dialog: false,
      studentSheetDialog: false,
      gradeSheetList: [],
      scoreRules: [v => v != "" || "不能为空"],
      // 考试学生列表和试卷
      examDetail: [],
      // 学生主观题答题卡
      subjectiveList: [],
      question: [],
      breadItems: [
        {
          text: "exam",
          disabled: false,
          href: "#/teacher/exam"
        },
        {
          text: "examDetail",
          disabled: true
        }
      ]
    };
  },
  components: {},
  created() {
    this.getExamDetail();
    this.getQuestion();
  },
  mounted() {},
  methods: {
    // 打开统计成绩面板
    openGradeSheet() {
      this.getGradeSheetList().then(() => {
        this.gradeDialog = !this.gradeDialog;
      });
    },
    // 打开学生答题卡，传入学生sid
    openStuentSheet(sid) {
      this.getStudentSheet(sid).then(() => {
        this.studentSheetDialog = !this.studentSheetDialog;
      });
    },
    // 关闭学生答题卡，上传评卷结果
    closeStuentSheet(sid) {
      this.updateStudentsSubjective(sid).then(() => {
        this.getExamDetail();
        this.studentSheetDialog = !this.studentSheetDialog;
      });
    },
    // 获取考试详细
    async getExamDetail() {
      console.log(this.eid);
      let resp = await axios.get(
        `/answersheet/teacher_get_basic_info/${this.eid}`
      );
      this.examDetail = resp.data.data;
      console.log("222222");
      console.log(this.examDetail);
      console.log("22222");
    },
    async getQuestion() {
      console.log(this.eid);
      let resp = await axios.get(`/paper/view/${this.eid}`);
      this.question = resp.data.data;
      console.log("33333");
      console.log(this.question);
      console.log("33333");
    }
  }
};
</script>
<style scoped></style>
