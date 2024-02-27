<template>
  <form action="/">
    <van-search
        v-model="searchText"
        show-action
        placeholder="请输入要搜索的标签"
        @search="onSearch"
        @cancel="onCancel"
    />
  </form>

  <van-divider content-position="left">已选标签</van-divider>
  <div v-if="activeIds.length === 0">暂无信息</div>
  <van-row gutter="16" style="padding: 0 16px">
    <van-col v-for="tag in activeIds" >
      <van-tag closeable size="small" type="primary" @close="doClose(tag)">
        {{ tag }}
      </van-tag>
    </van-col>
  </van-row>

  <van-divider content-position="left" >选择标签</van-divider>
    <van-tree-select
        v-model:active-id="activeIds"
        v-model:main-active-index="activeIndex"
        :items="tagList"
    />

  <div style="padding: 12px">
    <van-button type="primary" block @click="doSearchResult">搜索</van-button>
  </div>

</template>

<script setup lang="ts">
import { ref } from 'vue';
import {useRouter} from 'vue-router'


const router = useRouter()
const searchText = ref('');
// 已选中标签
const activeIds = ref([]);
const activeIndex = ref(0);
// 原始标签列表
const originTagList = [
  {
    text: '性别',
    children: [
      { text: '男', id: '男' },
      { text: '女', id: '女' },
      { text: '猫娘', id: '猫娘'},
    ],
  },
  {
    text: '年级',
    children: [
      { text: '大一', id: '大一' },
      { text: '大二', id: '大二' },
      { text: '大三', id: '大三' },
      { text: '大三', id: '大222三' },
      { text: '大三', id: '大223三' },
      { text: '大三', id: '大231231三' },
      { text: '大三', id: '大231312三' },
      { text: '大三', id: '大三2312312' },
      { text: '大三', id: '大213333三' },
      { text: '大三', id: '大111333三' },
    ],
  },
];
let tagList = ref(originTagList);

const onSearch = (val) => {
  // tagList.flatMap(parentTage => parentTage.children)
  // flatMap 的作用就是把tagList的每一项的children拿出来(打)铺平了
  tagList.value = originTagList.map(parentTag => {
    const tempChildren = [...parentTag.children];
    const tempParentTag = {...parentTag};
    tempParentTag.children = tempChildren
            .filter(item => item.text.includes(searchText.value));
        return tempParentTag;
      })

}
const onCancel = () => {
  searchText.value = '';
  tagList.value = originTagList;
};

// 移除标签
const doClose = (tag) => {
  activeIds.value = activeIds.value.filter(item => {
    return item !== tag
  })
}

/**
 * 执行搜索
 */
const doSearchResult = () => {
  router.push({
    path: '/user/list',
    query: {
      tags: activeIds.value
    }
  })
}

</script>

<style scoped>

</style>