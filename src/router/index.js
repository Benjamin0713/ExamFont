import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import * as tpyes from "../store/type";
import Home from "../views/Admin/Home.vue";
import Welcome from "../views/Admin/Welcome.vue";
import StuList from "../views/Admin/StuList.vue";
import TeachList from "../views/Admin/TeachList.vue";
import QuestionBank from "../views/Admin/QuestionBank";
import AdminInfo from "../views/Admin/AdminInfo";
import QuestionDetail from "../views/Admin/QuestionDetail";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login
  },
  {
    path: "/register",
    name: "Register",
    component: Register
  }
];
let teacherRouters = [
  {
    path: "/teacher",
    component: () => import("../views/Teacher/TeacherIndex.vue"),
    children: [
      {
        path: "exam/:eid",
        props: true,
        component: () => import("../views/Teacher/Exam/ExamDetail.vue")
      },
      {
        path: "myInfo",
        name: "myInfo",
        component: () => import("../views/Teacher/TeacherInfo.vue")
      },
      {
        path: "courseInfo",
        name: "courseInfo",
        component: () => import("../views/Teacher/CourseInfo.vue")
      }
    ]
  }
];
let studentRouters = [
  {
    path: "/student",
    name: "StudentHome",
    component: () => import("../views/Student/StudentIndex.vue"),
    children: [
      {
        props: true,
        path: "/courseList",
        component: () => import("../views/Student/courseList.vue")
      },
      {
        path: "/studentInfo",
        component: () => import("../views/Student/studentInfo.vue")
      },
      {
        path: "/gradeList",
        component: () => import("../views/Student/gradeInfo.vue")
      }
    ]
  }
];
let adminRouters = [
  {
    path: "/home",
    component: Home,
    redirect: "/welcome",
    children: [
      { path: "/welcome", component: Welcome },
      { path: "/stuList", component: StuList },
      { path: "/teachList", component: TeachList },
      { path: "/questionBank", component: QuestionBank },
      { path: "/adminInfo", component: AdminInfo },
      {
        name: "questionDetail",
        path: "/questionDetail",
        component: QuestionDetail
      }
    ]
  }
];
const router = new VueRouter({
  routes
});
// ??????????????????????????????
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

export default router;

// ????????????
export function updateRouters() {
  let role = sessionStorage.getItem(tpyes.role);
  switch (role) {
    case tpyes.teacherRole:
      router.addRoutes(teacherRouters);
      break;
    case tpyes.studentRole:
      router.addRoutes(studentRouters);
      break;
    case tpyes.adminRole:
      router.addRoutes(adminRouters);
      break;
  }
}

// ????????????????????????
updateRouters();
