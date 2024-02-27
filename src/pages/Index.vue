<template>

  <van-cell center title="匹配模式">
    <template #right-icon>
      <van-switch v-model="isMatchMode" size="24" />
    </template>
  </van-cell>
  <van-notice-bar
      mode="closeable"
      left-icon="volume-o"
      text="无论我们能活多久，我们能够享受的只有无法分割的此刻，此外别无其他。"
  />
  <user-card-list :user-list="userList" :loading="loading"/>
  <!-- 空数据提示 -->
  <van-empty v-if="!userList || userList.length < 1" description="数据为空" />

</template>

<script setup lang="ts">

import {ref, watchEffect} from "vue";
import myAxios from "../plugins/myAxios";
import { Toast } from 'vant';
import UserCardList from "../components/UserCardList.vue";
import {UserType} from "../models/user";


const isMatchMode = ref<boolean>(false);

const userList = ref([]);
const loading = ref(true);

const loadData = async () => {
  loading.value = true;
  let userListData: any | void;
  // 心动模式，根据标签匹配用户
  if (isMatchMode.value) {
    const num = 10;
    userListData = await myAxios.get('/user/match', {
      params: {
        num
      },

    })
        .then(function (response) {
          console.log('/user/match succeed', response);
          // Toast.success('请求成功');
          return response?.data;
        })
        .catch(function (error) {
          console.log('/user/match error', error);
          Toast.fail('请求失败');
        })

  } else {
    // 普通模式，直接分页查询
    userListData = await myAxios.get('/user/recommend', {
      params: {
        pageSize: 8,
        pageNum: 1,
      },

    })
        .then(function (response) {
          console.log('/user/recommend', response);
          // Toast.success('请求成功');
          return response?.data?.records;
        })
        .catch(function (error) {
          console.log('/user/recommend', error);
          Toast.fail('请求失败');
        })
  }

  if (userListData) {
    userListData.forEach((user: UserType) => {
      if (user.tags) {
        user.tags = JSON.parse(user.tags);
      }
    })
    userList.value = userListData;
  }
  loading.value = false;
}

// 监听引用数据类型的所有属性
watchEffect(() => {
  loadData();
})

</script>

<style scoped>

</style>