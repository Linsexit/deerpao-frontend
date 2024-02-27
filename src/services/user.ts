import myAxios from "../plugins/myAxios";
import {getCurrentUserState, setCurrentUserState} from "../states/user";
import {Toast} from "vant";


export const getCurrentUser = async () => {

    // const currentUser = getCurrentUserState();
    // if (currentUser) {
    //     return currentUser;
    // }

    // 不存在则从远程获取
    const res = await myAxios.get('/user/current');
    if (res.code === 0) {
        // 设置缓存
        setCurrentUserState(res.data);
        return res.data;
    }
}