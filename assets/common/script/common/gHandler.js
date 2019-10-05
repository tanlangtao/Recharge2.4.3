/*
 * @Author: burt
 * @Date: 2019-08-01 13:44:52
 * @LastEditors: burt
 * @LastEditTime: 2019-09-19 13:51:57
 * @Description: 游戏中央模块管理器
 */

let gHandler = {

}
let gameGlobal = {
    isdev: true, // 是否开发状态
    gameNow: "hall", // 当前游戏的名字
    iconPath: "", // 头像地址前缀
    playerKey: "playerKey",
    token: "", // 通信token
    player: { // 玩家信息
        gold: 0, // 金币
        nick: "", // 昵称
        sex: 0,// 男 0  女 1
        headurl: "", // 头像
        account_name: "", // 账号
        account_pass: "", // 密码
        proxy_pid: 0, // 代理id
        uuid: 0,
        id: 0,
    },
    // im_host: "https://im.sempxw.com",
    im_host:'http://161.117.178.174:12352',
    pay: { // 充提数据结构
        // pay_host: "http://payment.sempxw.com",
        // user_id: "548291942",
        // user_name: "游客42651",
        // proxy_user_id: "548291942",
        // proxy_name: "博臣娱乐",
        client: "ios",
        package_id: "1",
        pay_host:'http://161.117.178.174:12353',
        user_id:'151846961',
        user_name:'A091944',
        proxy_user_id:'873797373',
        proxy_name:'贵宾127788',

    }
}
gHandler.gameGlobal = gameGlobal

let gameConfig = {
    hallconfig: {
        zhname: "大厅", // 中文游戏名
        enname: "hall", // 英文游戏名 （子游戏文件路径，更新子路径）
        lanchscene: "hall", // 跳转场景名
    },
    subModel: {
        "pay": {
            zhname: "充值", // 中文名
            enname: "pay", // 英文名 （子游戏文件路径，更新子路径）
            lanchscene: "payRecharge", // 跳转场景名
        },
        "cash": {
            zhname: "提现", // 中文名
            enname: "cash", // 英文名 （子游戏文件路径，更新子路径）
            lanchscene: "payCash", // 跳转场景名
        },
        "im": {
            zhname: "聊天", // 中文名
            enname: "im", // 英文名 （子游戏文件路径，更新子路径）
            lanchscene: "", // 跳转场景名
        }
    },
    gamelist: {
        "qznn": {
            zhname: "抢庄牛牛", // 中文游戏名
            enname: "qznn", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "NNGame", // 跳转场景名
            game_id: "5b1f3a3cb76a591e7f251714",
            serverUrl: "", // 游戏服务器地址
            hasAccount: false, // 是否已创建子游戏账号
            remoteData: null, // 服务端发送过来的游戏数据
            hallid: 0,
            resid: 12,
        },
        "zjh": {
            zhname: "扎金花", // 中文游戏名
            enname: "zjh", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "ZJHLoad", // 跳转场景名
            game_id: "5b1f3a3cb76a591e7f251715",
            serverUrl: "", // 游戏服务器地址
            hasAccount: false, // 是否已创建子游戏账号
            remoteData: null, // 服务端发送过来的游戏数据
            hallid: 1,
            resid: 20,
        },
        "zrsx": {
            zhname: "真人视讯", // 中文游戏名
            enname: "zrsx", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "LiveGame", // 跳转场景名
            game_id: "5b1f3a3cb76a591e7f25173",
            serverUrl: "ws://liveagin.0351sxzc.com:80", // 游戏服务器地址
            hasAccount: false, // 是否已创建子游戏账号
            remoteData: null, // 服务端发送过来的游戏数据
            hallid: 2,
            resid: 15,
        },
        "sgj": {
            zhname: "水果机", // 中文游戏名
            enname: "sgj", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "FruitGame", // 跳转场景名
            game_id: "5b1f3a3cb76a591e7f251712",
            serverUrl: "ws://fruit.0351sxzc.com:80", // 游戏服务器地址
            hasAccount: false, // 是否已创建子游戏账号
            remoteData: null, // 服务端发送过来的游戏数据
            hallid: 3,
            resid: 17,
        },
        "bcbm": {
            zhname: "奔驰宝马", // 中文游戏名
            enname: "bcbm", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "bcbmloading", // 跳转场景名
            game_id: "5b1f3a3cb76a591e7f251716",
            serverUrl: "", // 游戏服务器地址
            hasAccount: false, // 是否已创建子游戏账号
            remoteData: null, // 服务端发送过来的游戏数据
            hallid: 4,
            resid: 3,
        },
        "hh": {
            zhname: "红黑", // 中文游戏名
            enname: "hh", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "hhlogin", // 跳转场景名
            game_id: "5b306af74f435269eea74b94",
            serverUrl: "", // 游戏服务器地址
            hasAccount: false, // 是否已创建子游戏账号
            remoteData: null, // 服务端发送过来的游戏数据
            hallid: 5,
            resid: 8,
        },

        "21d": {
            zhname: "二十一点", // 中文游戏名
            enname: "21d", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "21d", // 跳转场景名
            game_id: "5b1f3a3cb76a591e7f25172",
            serverUrl: "", // 游戏服务器地址
            hasAccount: false, // 是否已创建子游戏账号
            remoteData: null, // 服务端发送过来的游戏数据
            hallid: 6,
            resid: 0,
        },
        "2rmj": {
            zhname: "二人麻将", // 中文游戏名
            enname: "2rmj", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "2rmj", // 跳转场景名
            game_id: "5b1f3a3cb76a591e7f25170",
            serverUrl: "", // 游戏服务器地址
            hasAccount: false, // 是否已创建子游戏账号
            remoteData: null, // 服务端发送过来的游戏数据
            hallid: 7,
            resid: 1,
        },
        "bjl": {
            zhname: "百家乐", // 中文游戏名
            enname: "bjl", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "bjl", // 跳转场景名
            game_id: "5b1f3a3cb76a591e7f2517a5",
            serverUrl: "", // 游戏服务器地址
            hasAccount: false, // 是否已创建子游戏账号
            remoteData: null, // 服务端发送过来的游戏数据
            hallid: 8,
            resid: 2,
        },
        "brnn": {
            zhname: "百人牛牛", // 中文游戏名
            enname: "brnn", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "brnn", // 跳转场景名
            game_id: "5bd00260e847f16fb65a13c1",
            serverUrl: "", // 游戏服务器地址
            hasAccount: false, // 是否已创建子游戏账号
            remoteData: null, // 服务端发送过来的游戏数据
            hallid: 9,
            resid: 4,
        },
        "hwby": {
            zhname: "海王捕鱼", // 中文游戏名
            enname: "hwby", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "hwby", // 跳转场景名
            game_id: "5b1f3a3cb76a591e7f2517a6",
            serverUrl: "", // 游戏服务器地址
            hasAccount: false, // 是否已创建子游戏账号
            remoteData: null, // 服务端发送过来的游戏数据
            hallid: 10,
            resid: 5,
        },
        "dz": {
            zhname: "德州扑克", // 中文游戏名
            enname: "dz", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "dz", // 跳转场景名
            game_id: "5b1f3a3cb76a591e7f25176",
            serverUrl: "", // 游戏服务器地址
            hasAccount: false, // 是否已创建子游戏账号
            remoteData: null, // 服务端发送过来的游戏数据
            hallid: 11,
            resid: 6,
        },
        "ddz": {
            zhname: "斗地主", // 中文游戏名
            enname: "ddz", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "ddz", // 跳转场景名
            game_id: "5c6a62be7ff09ac117d446aa",
            serverUrl: "", // 游戏服务器地址
            hasAccount: false, // 是否已创建子游戏账号
            remoteData: null, // 服务端发送过来的游戏数据
            hallid: 12,
            resid: 7,
        },
        "lp": {
            zhname: "轮盘游戏", // 中文游戏名
            enname: "lp", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "lp", // 跳转场景名
            game_id: "5b1f3a3cb76a591e7f251713",
            serverUrl: "", // 游戏服务器地址
            hasAccount: false, // 是否已创建子游戏账号
            remoteData: null, // 服务端发送过来的游戏数据
            hallid: 13,
            resid: 10,
        },
        "lhd": {
            zhname: "龙虎斗", // 中文游戏名
            enname: "lhd", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "lhd", // 跳转场景名
            game_id: "5b1f3a98b76a591e7f2517b6",
            serverUrl: "", // 游戏服务器地址
            hasAccount: false, // 是否已创建子游戏账号
            remoteData: null, // 服务端发送过来的游戏数据
            hallid: 14,
            resid: 9,
        },
        "sss": {
            zhname: "十三水", // 中文游戏名
            enname: "sss", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "sss", // 跳转场景名
            game_id: "5b1f3a3cb76a591e7f25171",
            serverUrl: "", // 游戏服务器地址
            hasAccount: false, // 是否已创建子游戏账号
            remoteData: null, // 服务端发送过来的游戏数据
            hallid: 15,
            resid: 14,
        },
        "pdk": {
            zhname: "跑得快", // 中文游戏名
            enname: "pdk", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "pdk", // 跳转场景名
            game_id: "123456789",
            serverUrl: "", // 游戏服务器地址
            hasAccount: false, // 是否已创建子游戏账号
            remoteData: null, // 服务端发送过来的游戏数据
            hallid: 16,
            resid: 11,
        },
        "tb": {
            zhname: "骰宝", // 中文游戏名
            enname: "tb", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "tb", // 跳转场景名
            game_id: "123456789",
            serverUrl: "", // 游戏服务器地址
            hasAccount: false, // 是否已创建子游戏账号
            remoteData: null, // 服务端发送过来的游戏数据
            hallid: 17,
            resid: 13,
        },
        "szwg": {
            zhname: "狮子王国", // 中文游戏名
            enname: "szwg", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "szwg", // 跳转场景名
            game_id: "123456789",
            serverUrl: "", // 游戏服务器地址
            hasAccount: false, // 是否已创建子游戏账号
            remoteData: null, // 服务端发送过来的游戏数据
            hallid: 18,
            resid: 16,
        },
        "sh": {
            zhname: "梭哈", // 中文游戏名
            enname: "sh", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "sh", // 跳转场景名
            game_id: "123456789",
            serverUrl: "", // 游戏服务器地址
            hasAccount: false, // 是否已创建子游戏账号
            remoteData: null, // 服务端发送过来的游戏数据
            hallid: 19,
            resid: 18,
        },
        "xlch": {
            zhname: "血流成河", // 中文游戏名
            enname: "xlch", // 英文游戏名 （子游戏文件路径，更新子路径）
            lanchscene: "xlch", // 跳转场景名
            game_id: "123456789",
            serverUrl: "", // 游戏服务器地址
            hasAccount: false, // 是否已创建子游戏账号
            remoteData: null, // 服务端发送过来的游戏数据
            hallid: 20,
            resid: 19,
        },
    },
    oldGameList: {
        "bjl": {
            zhname: "百家乐",
            enname: "bjl",
            game_id: "5b1f3a3cb76a591e7f2517a5",
            remoteData: null,
            hasAccount: false, // 是否已创建子游戏账号
        },
        'brnn': {
            zhname: "百人牛牛",
            enname: "brnn",
            game_id: "5bd00260e847f16fb65a13c1",
            remoteData: null,
            hasAccount: false, // 是否已创建子游戏账号
        }

    }
}
gHandler.gameConfig = gameConfig

module.exports = gHandler;