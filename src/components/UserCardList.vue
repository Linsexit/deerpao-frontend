<template>
  <van-skeleton title avatar :row="3" :loading="props.loading" v-for="user in props.userList">

    <van-card
        :desc="user.profile"
        :title="`${user.username} （${user.deerCode}）`"
        :thumb="user.avatarUrl"
    >
      <template #tags>
        <van-tag plain type="danger" v-for="tag in user.tags" style="margin-right: 8px;margin-top: 8px">
          {{ tag }}
        </van-tag>
      </template>
      <template #footer>
        <van-button size="mini">联系我</van-button>
      </template>

    </van-card>
  </van-skeleton>
</template>

<script setup lang="ts">
import {UserType} from "../models/user";
import {defineProps, withDefaults} from "vue";

interface UserCardListProps {
  loading: boolean;
  userList: UserType[];
}

// 定义属性，用于接收父组件传递的变量
const props = withDefaults(defineProps<UserCardListProps>(), {
  loading: true,
  userList: [] as UserType[],
});


</script>

<style scoped>

</style>