<template>
  <v-card>
    <v-card-title>学生端操作菜单</v-card-title>
    <v-list>
      <v-list-item to="/studentInfo">
        <v-list-item-icon>
          <v-icon>subject</v-icon>
        </v-list-item-icon>
        <v-list-item-title>个人信息</v-list-item-title>
      </v-list-item>
      <v-list-item to="/courseList">
        <v-list-item-icon>
          <v-icon>subject</v-icon>
        </v-list-item-icon>
        <v-list-item-title>课程列表</v-list-item-title>
      </v-list-item>
      <v-list-item to="/gradeList">
        <v-list-item-icon>
          <v-icon>subject</v-icon>
        </v-list-item-icon>
        <v-list-item-title>成绩列表</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-card>
</template>
