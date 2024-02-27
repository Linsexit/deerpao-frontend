<template>
  <van-nav-bar
      :title="title"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
  >
    <template #right>
      <van-icon name="search" size="18" />
    </template>
  </van-nav-bar>

  <div id="content">
    <router-view />
  </div>

  <!--底侧边栏-->
  <van-tabbar route @change="onChange">
    <van-tabbar-item to="/" icon="home-o" name="index">主页</van-tabbar-item>
    <van-tabbar-item to="/team" icon="search" name="team">队伍</van-tabbar-item>
    <van-tabbar-item to="/user" icon="friends-o" name="user">个人</van-tabbar-item>
  </van-tabbar>

</template>

<script setup lang="ts">

import {useRoute, useRouter} from "vue-router";
import {ref} from "vue";
import routes from "../config/route";

// 控制跳转
const router = useRouter();
// 获取信息
const route = useRoute();
const DEFAULT_TITLE = '惠交友';
const title = ref(DEFAULT_TITLE);

const onClickLeft = () => history.back();
const onClickRight = () => {
  router.push('/search')
};
// const active = ref("index");

// const onChange = (index) => Toast(`标签 ${index}`);

/**
 * 根据路由动态切换标题
 */
router.beforeEach((to, from) => {
  const toPath = to.path;
  const route = routes.find((route) => {
    return toPath === route.path;
  })
  // if (!route?.title) {
  //   title.value = DEFAULT_TITLE;
  // } else {
  //   title.value = route.title;
  // }
  title.value = route?.title ?? DEFAULT_TITLE;
})

</script>

<style scoped>
#content {
  padding-bottom: 50px;
}
</style>