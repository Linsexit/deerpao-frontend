<template>
  <van-form @submit="onSubmit">
      <van-field
          v-model="editUser.currentValue"
          :name="editUser.editKey"
          :label="editUser.editName"
          :placeholder="`请输入${editUser.editName}`"
      />

    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>


</template>

<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {ref} from "vue";
import myAxios from "../plugins/myAxios";
import { Toast } from "vant";
import {getCurrentUser} from "../services/user";

const route = useRoute();
const router = useRouter();

const editUser = ref({
  editKey: route.query.editKey,
  editName: route.query.editName,
  currentValue: route.query.currentValue
})

const onSubmit = async (values) => {
  const currentUser =await getCurrentUser();

  if (!currentUser) {
    Toast.fail('用户未登录');
    return;
  }
  const res = await myAxios.post('/user/update', {
    'id': currentUser.id,
    // [] ：js动态语法糖
    [editUser.value.editKey as string]: editUser.value.currentValue,

  })
  if (res.code === 0 && (Object.keys(res.data).length > 0 || res.data > 0)) {
    Toast.success('修改成功');
    router.back()
  }else {
    Toast.fail('修改错误');
  }
};

</script>

<style scoped>
</style>
