<template>
  <template v-if="user">
    <van-cell title="当前用户" :value="user?.username" />
    <van-cell title="修改信息" is-link to="/user/update" />
    <van-cell title="我创建的队伍" is-link to="/user/team/create" />
    <van-cell title="我加入的队伍" is-link to="/user/team/join" />
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