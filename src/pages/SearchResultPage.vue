<template>
  <user-card-list :user-list="userList" :loading="loading" />
  <!-- 搜索提示 -->
  <van-empty v-if="!userList || userList.length < 1" image="search" description="暂无结果" />

</template>

<script setup lang="ts">

import {useRoute} from "vue-router";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios";
import { Toast } from 'vant';
import qs from 'qs';
import UserCardList from "../components/UserCardList.vue";

const route = useRoute();
const { tags } = route.query;
const userList = ref([]);
const loading = ref(true);

onMounted(async () => {
  loading.value = true;
  const userListData = await myAxios.get('/user/search/tags', {
    params: {
      tagNameList: tags
    },
    // 使用qs库将请求参数做一个序列化
    paramsSerializer: params => {
      return qs.stringify(params, { indices: false})
    }
  })
    .then(function (response) {
      console.log('/user/search/tags', response);
      // Toast.success('请求成功');
      return response?.data;
    })
    .catch(function (error) {
      console.log('/user/search/tags', error);
      Toast.fail('请求失败');
    })
  if (userListData) {
    userListData.forEach(user => {
      if (user.tags) {
        user.tags = JSON.parse(user.tags);
      }
    })
    userList.value = userListData;
    loading.value = false;
  }
})


// const mockUser = {
//   id: 123,
//   username: '小鹿',
//   userAccount: '1234',
//   avatarUrl: 'https://bkimg.cdn.bcebos.com/pic/8c1001e93901213fb80e1f7b54ae21d12f2eb9383f49',
//   profile: '一名精神小伙，时代售后欧道理活动哦吼嗲红底哦地哈所虎导航殴打阿偶湿度好哦好的苏奥啊',
//   gender: 0,
//   phone : '13411011101',
//   email: '123@gmail',
//   userRole: 0,
//   deerCode: '12',
//   tags: ['java', 'emo', '打工中','java', 'emo'],
//   createTime: new Date(),
// }



</script>

<style scoped>

</style>