<template>
  <div
    id="teamCardList"
  >
    <van-card
        v-for="team in props.teamList"
        :thumb="cat"
        :desc="team.description"
        :title="`${team.name}`"
    >
      <template #tags>
        <van-tag plain type="danger" style="margin-right: 8px;margin-top: 8px">
          {{ teamStatusEnum[team.status] }}
        </van-tag>
      </template>
      <template #bottom>
        <div>
          {{`队伍人数：${team.hasJoinNum}/${team.maxNum}`}}
        </div>
        <div v-if="team.expireTime">
          {{'过期时间：' + team.expireTime}}
        </div>
        <div>
          {{'创建时间：' + team.createTime}}
        </div>
      </template>
      <template #footer>
        <van-button plain type="primary" size="small"
                    v-if="team.userId !== currentUser?.id && !team.hasJoin"
                    @click="preJoinTeam(team)" >
          加入队伍</van-button>
        <van-button v-if="team.userId === currentUser?.id" plain type="default" size="small"
                    @click="doUpdateTeam(team.id)" >更新队伍</van-button>
        <van-button plain type="default" size="small"
                    v-if="team.userId !== currentUser?.id && team.hasJoin"
                    @click="doQuitTeam(team.id)" >退出队伍</van-button>
        <van-button v-if="team.userId === currentUser?.id" plain type="danger" size="small"
                    @click="doDeleteTeam(team.id)" >解散队伍</van-button>
      </template>
    </van-card>

    <!--弹窗-->
    <van-dialog v-model:show="showPasswordDialog" title="请输入密码"
                show-cancel-button
                @confirm="doJoinTeam"
                @cancel="doJoinCancel">
      <van-field v-model="password" placeholder="请输入密码" />
    </van-dialog>

    <!--小鹿自定义弹窗-->
<!--    <van-popup  closeable-->
<!--                round-->
<!--                close-icon="close"-->
<!--                style="height: 25%;width: 70%"-->
<!--                v-model:show="showPasswordDialog"-->
<!--                @doJoinCancel="doJoinCancel"-->
<!--    >-->
<!--      <h4 style="padding-left: 20px; margin-bottom: 10px">请输入密码</h4>-->
<!--      <van-field style="margin-bottom: 10px" v-model="password" placeholder="请输入密码" />-->
<!--      <van-button style="display:block;margin:0 auto"-->
<!--                  round type="primary" size="normal" @click="doJoinTeam">确认</van-button>-->
<!--    </van-popup>-->

  </div>

</template>

<script setup lang="ts">
import {TeamType} from "../models/team";
import {defineProps, onMounted, ref, withDefaults} from "vue";
import {teamStatusEnum} from "../constants/team";
import cat from '../assets/cat.png'
import myAxios from "../plugins/myAxios";
import {Dialog, Toast} from "vant";
import {getCurrentUser} from "../services/user";
import {useRouter} from "vue-router";

interface TeamCardListProps {
  teamList: TeamType[];
}

const router = useRouter();
const currentUser = ref();
const showPasswordDialog = ref(false);
const password = ref('');
const joinTeamId = ref();
// 适配van-dialog组件，不然会报错
const VanDialog = Dialog.Component;


onMounted(async () => {
  currentUser.value = await getCurrentUser();
})

const preJoinTeam = (team: TeamType) => {
  joinTeamId.value = team.id;
  if (team.status === 0) {
    doJoinTeam();
  } else {
    showPasswordDialog.value = true;
  }}

const doJoinCancel = () => {
  password.value = '';
  joinTeamId.value = 0;
}

/**
 * 加入队伍
 */
const doJoinTeam = async () => {
  // 如果joinTeamId为空 直接return掉
  if (!joinTeamId) {
    console.log('joinTeamId 为空')
    return;
  }
  const res = await myAxios.post('/team/join', {
    teamId: joinTeamId.value,
    password: password.value,
  })
  if (res?.code === 0) {
    Toast.success("加入成功");
  } else {
    Toast.fail("加入失败" + (res.description ? `，${res.description}` : `，${res?.message}`));
  }
  doJoinCancel();
}

/**
 * 退出队伍
 * @param id
 */
const doQuitTeam = async (id: number) => {
  const res = await myAxios.post('/team/quit', {
    teamId: id,
  })
  if (res?.code === 0) {
    Toast.success("操作成功");
  } else {
    Toast.fail("操作失败" + (res.description ? `，${res.description}` : `，${res?.message}`));
  }
}

/**
 * 解散队伍
 * @param id
 */
const doDeleteTeam = async (id: number) => {
  const res = await myAxios.post('/team/delete', {
    id,
  })
  if (res?.code === 0) {
    Toast.success("操作成功");
  } else {
    Toast.fail("操作失败" + (res.description ? `，${res.description}` : `，${res?.message}`));
  }
}

/**
 * 跳转至更新队伍页
 * @param id
 */
const doUpdateTeam = (id: number) => {
  router.push({
    path: '/team/update',
    query: {
      id,
    }
  });

}

// 定义属性，用于接收父组件传递的变量
const props = withDefaults(defineProps<TeamCardListProps>(), {
  // @ts-ignore
  teamList: [] as TeamType[],
});


</script>

<style scoped>
#teamCardList :deep(.van-image__img) {
  height: 128px;
  object-fit: unset;
}

</style>