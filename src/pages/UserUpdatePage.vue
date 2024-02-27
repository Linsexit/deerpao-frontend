<template>
  <template v-if="user">
    <van-cell title="昵称" is-link :value="user.username" @click="toEdit('username','昵称' , user.username)"/>
    <van-cell title="账号" :value="user.userAccount" />
    <van-cell title="头像" is-link to="/user/edit" >
      <img style="height: 48px" :src="user.avatarUrl" />
    </van-cell>
    <van-cell title="性别" is-link :value="user.gender" @click="toEdit('gender','性别' , user.gender)" />
    <van-cell title="电话" is-link :value="user.phone" @click="toEdit('phone','电话' , user.phone)" />
    <van-cell title="邮箱" is-link :value="user.email" @click="toEdit('email','邮箱' , user.email)" />
    <van-cell title="晓鹿编号" :value="user.deerCode" />
    <!--时间格式化：new Date(+new Date(user.createTime) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')-->
    <van-cell title="注册时间" :value="new Date(+new Date(user.createTime) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')" />
  </template>

</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {getCurrentUser} from "../services/user";

// const user = {
//   id: 1,
//   username: '小鹿',
//   userAccount: 'xiaolu',
//   avatarUrl: 'https://tse4-mm.cn.bing.net/th/id/OIP-C.ONUUhGF5kYwGjbPTegp4GQAAAA?pid=ImgDet&rs=1',
//   gender: '男',
//   phone : '123123123',
//   email: 'sadad11@qq.com',
//   deerCode: '1',
//   createTime: new Date(),
// }

const user = ref();

onMounted(async () => {
  user.value = await getCurrentUser();

})

const router = useRouter();

const toEdit = (editKey: string, editName:string, currentValue: string) => {
  router.push({
    path: '/user/edit',
    query: {
      editKey,
      editName,
      currentValue,
    }
  });

}

</script>

<style scoped>

</style>