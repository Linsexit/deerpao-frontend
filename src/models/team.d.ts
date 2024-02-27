/**
 * 队伍信息类别
 */
import {UserType} from "./user";

export type TeamType = {
    id: number;
    userId: number;
    name: string;
    description: string;
    expireTime?: Date;
    maxNum: number;
    password?: string;
    // todo 定义枚举值类型更规范
    status: number;
    createTime: Date;
    updateTime: Date;
    createUser?: UserType;
    hasJoin: boolean;
    hasJoinNum?: number;
};