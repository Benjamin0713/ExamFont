<template>
  <v-card>
    <v-card-title>学生端操作菜单</v-card-title>
    <v-list>
      <v-list-item to="/studentInfo">
        <v-list-item-icon>
          <v-icon>mdi-home</v-icon>
        </v-list-item-icon>
        <v-list-item-title>个人信息</v-list-item-title>
      </v-list-item>
      <v-list-item to="/examList">
        <v-list-item-icon>
          <v-icon>pets</v-icon>
        </v-list-item-icon>
        <v-list-item-title>考试列表</v-list-item-title>
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
